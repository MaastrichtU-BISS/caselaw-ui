/**
 * The arithmetic behind Bizzy's date picker (DatePicker.vue, DatePop.vue,
 * DateField.vue). Pure, for tests (tests/date-pick.test.ts).
 *
 * Every day is an ISO "YYYY-MM-DD" string and every step is done in UTC, so a
 * change of summer time never shifts a day. Weeks start on Monday (NL/EU).
 *
 * - `parseDay` reads what someone types: "12 nov", "12-11-2026", "2026-11-12",
 *   "12/11", "nov 12", "today", "tomorrow" / "morgen", "next friday" /
 *   "volgende vrijdag", "next week", "in 3 days" / "over 3 dagen", "+3".
 *   Numbers are day first, as in Dutch and British usage.
 * - `monthGrid` lays out a month as whole Monday–Sunday weeks.
 * - `keyStep` is the grid's keyboard: arrows, PageUp/PageDown (Shift: a year),
 *   Home/End (start and end of the week).
 */
// Kept free of imports: the picker loads on demand, and an import of the
// board model here would drag its whole dependency tree into that chunk.
const DAY = /^\d{4}-\d{2}-\d{2}$/;
/** A real "YYYY-MM-DD" day. */
export const isPickDay = (v: unknown): v is string =>
  typeof v === 'string' &&
  DAY.test(v) &&
  !Number.isNaN(Date.parse(`${v}T00:00:00Z`)) &&
  new Date(`${v}T00:00:00Z`).toISOString().slice(0, 10) === v;
/** Days added to a day, in UTC. */
export function dayPlus(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
/** Today (or a Date) as "YYYY-MM-DD" in local time: what today means to the person looking. */
export function todayDay(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;
const parts = (day: string) => day.split('-').map(Number) as [number, number, number];

/** Days in a month (month 1–12). */
export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** A real calendar day, or null ("31-02-2026" is not one). */
export function makeDay(year: number, month: number, day: number): string | null {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return null;
  if (
    year < 1900 ||
    year > 2200 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth(year, month)
  )
    return null;
  return ymd(year, month, day);
}

/** Monday = 0 … Sunday = 6. */
export function weekdayMon(day: string): number {
  return (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7;
}

/** The same day n months later, kept inside the month (31 Jan + 1 month = 28 Feb). */
export function addMonths(day: string, n: number): string {
  const [y, m, d] = parts(day);
  const idx = y * 12 + (m - 1) + n;
  const ny = Math.floor(idx / 12),
    nm = (idx % 12) + 1;
  return ymd(ny, nm, Math.min(d, daysInMonth(ny, nm)));
}

/** The Monday of the week a day is in. */
export const startOfWeek = (day: string) => dayPlus(day, -weekdayMon(day));

/** The first of the month a day is in. */
export const startOfMonth = (day: string) => `${day.slice(0, 7)}-01`;

/** One month as whole weeks, Monday first: 4 to 6 rows of 7 days; `out` marks days of the months around it. */
export function monthGrid(year: number, month: number): { day: string; out: boolean }[][] {
  const first = makeDay(year, month, 1);
  if (!first) return [];
  const last = ymd(year, month, daysInMonth(year, month));
  const rows: { day: string; out: boolean }[][] = [];
  for (let d = startOfWeek(first); d <= last;) {
    const row: { day: string; out: boolean }[] = [];
    for (let i = 0; i < 7; i++, d = dayPlus(d, 1))
      row.push({ day: d, out: d.slice(0, 7) !== first.slice(0, 7) });
    rows.push(row);
  }
  return rows;
}

/** Where the grid's focus goes for a key, or null when the key is not the grid's. */
export function keyStep(day: string, key: string, shift = false): string | null {
  switch (key) {
    case 'ArrowLeft':
      return dayPlus(day, -1);
    case 'ArrowRight':
      return dayPlus(day, 1);
    case 'ArrowUp':
      return dayPlus(day, -7);
    case 'ArrowDown':
      return dayPlus(day, 7);
    case 'PageUp':
      return addMonths(day, shift ? -12 : -1);
    case 'PageDown':
      return addMonths(day, shift ? 12 : 1);
    case 'Home':
      return startOfWeek(day);
    case 'End':
      return dayPlus(startOfWeek(day), 6);
    default:
      return null;
  }
}

/** Monday of next week: the "Next week" quick pick. */
export const nextWeek = (today: string) => dayPlus(startOfWeek(today), 7);

// --- parsing ------------------------------------------------------------------

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

/** Month names in English and Dutch (full); a typed name matches from its first three letters. */
const MONTHS: string[][] = [
  ['january', 'januari'],
  ['february', 'februari'],
  ['march', 'maart', 'mrt'],
  ['april'],
  ['may', 'mei'],
  ['june', 'juni'],
  ['july', 'juli'],
  ['august', 'augustus'],
  ['september', 'sept'],
  ['october', 'oktober'],
  ['november'],
  ['december'],
];
function monthOf(word: string): number | null {
  const w = word.replace(/\.$/, '');
  if (w.length < 3) return null;
  for (let i = 0; i < 12; i++) {
    if (MONTHS[i]!.some((n) => n === w || (n.length > 3 && n.startsWith(w)))) return i + 1;
  }
  return null;
}

/** Weekday names, Monday first, English and Dutch, with the usual short forms. */
const WEEKDAYS: string[][] = [
  ['monday', 'mon', 'maandag', 'ma'],
  ['tuesday', 'tue', 'tues', 'dinsdag', 'di'],
  ['wednesday', 'wed', 'woensdag', 'wo'],
  ['thursday', 'thu', 'thur', 'thurs', 'donderdag', 'do'],
  ['friday', 'fri', 'vrijdag', 'vr', 'vrij'],
  ['saturday', 'sat', 'zaterdag', 'za'],
  ['sunday', 'sun', 'zondag', 'zo'],
];
function weekdayOf(word: string): number | null {
  const w = word.replace(/\.$/, '');
  for (let i = 0; i < 7; i++) if (WEEKDAYS[i]!.includes(w)) return i;
  return null;
}

/** The first given weekday strictly after a day. */
function nextWeekday(today: string, wd: number): string {
  const diff = (wd - weekdayMon(today) + 7) % 7 || 7;
  return dayPlus(today, diff);
}

const year2 = (y: string) => (y.length <= 2 ? 2000 + Number(y) : Number(y));

/**
 * A typed date as an ISO day, or null when it can't be read. `today` is the
 * person's own today (isoDay()). A date without a year is in today's year.
 */
export function parseDay(text: string, today: string): string | null {
  const s = norm(text);
  if (!s) return null;
  const [ty] = parts(today);

  // Words for days around today.
  const rel: Record<string, number> = {
    today: 0,
    vandaag: 0,
    now: 0,
    nu: 0,
    tomorrow: 1,
    tmr: 1,
    tom: 1,
    morgen: 1,
    overmorgen: 2,
    yesterday: -1,
    gisteren: -1,
    eergisteren: -2,
  };
  if (s in rel) return dayPlus(today, rel[s]!);
  if (s === 'next week' || s === 'volgende week') return nextWeek(today);
  if (s === 'next month' || s === 'volgende maand') return startOfMonth(addMonths(today, 1));

  // "+3", "-2", "in 3 days", "over 3 dagen", "3 weeks", "in 2 weken".
  let m = s.match(
    /^(?:in |over )?([+-]?\d{1,3}) ?(d|days?|dag|dagen|w|wk|weeks?|weken|m|months?|maanden?)?$/,
  );
  if (m && (m[2] || /^[+-]/.test(m[1]!) || /^(in|over) /.test(s))) {
    const n = Number(m[1]),
      unit = m[2] ?? 'd';
    if (/^(w|wk|week|weeks|weken)$/.test(unit)) return dayPlus(today, n * 7);
    if (/^(m|month|months|maand|maanden)$/.test(unit)) return addMonths(today, n);
    return dayPlus(today, n);
  }

  // "friday", "next friday", "volgende vrijdag", "this friday", "deze vrijdag".
  m = s.match(/^(?:(next|volgende|this|deze|coming|komende) )?([a-z.]+)$/);
  if (m) {
    const wd = weekdayOf(m[2]!);
    if (wd != null) return nextWeekday(today, wd);
  }

  // ISO: 2026-11-12, 2026/11/12.
  m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (m) return makeDay(Number(m[1]), Number(m[2]), Number(m[3]));

  // Day first: 12-11-2026, 12/11/26, 12.11, 12-11.
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})(?:[-/.](\d{2}|\d{4}))?$/);
  if (m) return makeDay(m[3] ? year2(m[3]) : ty, Number(m[2]), Number(m[1]));

  // 12 nov, 12 november 2026, 12 nov. '26, 1st of december.
  m = s.match(/^(\d{1,2})(?:st|nd|rd|th|e)? (?:of )?([a-z.]+),? ?'?(\d{2}|\d{4})?$/);
  if (m) {
    const mo = monthOf(m[2]!);
    if (mo) return makeDay(m[3] ? year2(m[3]) : ty, mo, Number(m[1]));
  }

  // nov 12, november 12 2026, nov 12th, 2026.
  m = s.match(/^([a-z.]+) (\d{1,2})(?:st|nd|rd|th|e)?,? ?'?(\d{2}|\d{4})?$/);
  if (m) {
    const mo = monthOf(m[1]!);
    if (mo) return makeDay(m[3] ? year2(m[3]) : ty, mo, Number(m[2]));
  }

  // A day number alone: that day of this month.
  m = s.match(/^(\d{1,2})$/);
  if (m) return makeDay(ty, parts(today)[1], Number(m[1]));

  return null;
}
