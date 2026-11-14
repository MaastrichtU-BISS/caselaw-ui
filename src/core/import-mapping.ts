/** Column-to-field matching for BissImportMapper. Pure and framework independent. */

/** One column of the imported file. */
export interface BissImportColumn {
  /** The header as written in the file; also the mapping key. */
  key: string;
  /** A few values from the first rows, shown to help recognise the column. */
  samples?: (string | number | boolean | null)[];
}

/** One field the import can fill. */
export interface BissImportField {
  key: string;
  label: string;
  required?: boolean;
  description?: string;
  /** Other headers that mean this field, for example `['PI', 'Lead']` for Principal investigator. */
  aliases?: string[];
}

/** Column key to field key; `null` leaves the column out of the import. */
export type BissImportMapping = Record<string, string | null>;

export interface BissImportValidation {
  /** Required fields that no column fills. */
  missing: BissImportField[];
  /** Fields that more than one column fills, with those columns. */
  conflicts: { field: BissImportField; columns: string[] }[];
  /** Columns that will be imported. */
  mapped: number;
  valid: boolean;
}

/** Lowercase, without accents, spaces or punctuation: `Début (€)` → `debut`. */
export function normalizeHeader(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function names(field: BissImportField): string[] {
  return [field.key, field.label, ...(field.aliases ?? [])].map(normalizeHeader).filter(Boolean);
}

/**
 * Suggest a field for every column that `existing` does not already decide.
 * Exact matches on key, label or alias win; then a header that contains a field
 * name (or the reverse), for names of three characters or more. A field is
 * suggested for one column only and fields already used in `existing` are skipped.
 */
export function autoMatch(
  columns: readonly BissImportColumn[],
  fields: readonly BissImportField[],
  existing: BissImportMapping = {},
): BissImportMapping {
  const result: BissImportMapping = {};
  const used = new Set(
    Object.entries(existing)
      .filter(([column, field]) => field && columns.some((c) => c.key === column))
      .map(([, field]) => field as string),
  );
  const open = columns.filter((c) => !(c.key in existing));
  const take = (column: BissImportColumn, test: (header: string, name: string) => boolean) => {
    if (column.key in result) return;
    const header = normalizeHeader(column.key);
    if (!header) return;
    const field = fields.find((f) => !used.has(f.key) && names(f).some((n) => test(header, n)));
    if (field) {
      result[column.key] = field.key;
      used.add(field.key);
    }
  };
  for (const column of open) take(column, (header, name) => header === name);
  for (const column of open)
    take(
      column,
      (header, name) =>
        name.length >= 3 && header.length >= 3 && (header.includes(name) || name.includes(header)),
    );
  for (const column of columns)
    result[column.key] = column.key in existing ? (existing[column.key] ?? null) : (result[column.key] ?? null);
  return result;
}

/** Assign a field to a column. A field fills one column, so it is taken away from any other. */
export function assignField(
  mapping: BissImportMapping,
  column: string,
  field: string | null,
): BissImportMapping {
  const next: BissImportMapping = {};
  for (const [key, value] of Object.entries(mapping))
    next[key] = field && value === field && key !== column ? null : value;
  next[column] = field || null;
  return next;
}

/** Report unmapped required fields and fields filled by more than one column. */
export function validateMapping(
  mapping: BissImportMapping,
  fields: readonly BissImportField[],
  columns?: readonly BissImportColumn[],
): BissImportValidation {
  const keys = columns ? columns.map((c) => c.key) : Object.keys(mapping);
  const byField = new Map<string, string[]>();
  for (const column of keys) {
    const field = mapping[column];
    if (!field || !fields.some((f) => f.key === field)) continue;
    byField.set(field, [...(byField.get(field) ?? []), column]);
  }
  const missing = fields.filter((f) => f.required && !byField.has(f.key));
  const conflicts = fields
    .filter((f) => (byField.get(f.key)?.length ?? 0) > 1)
    .map((field) => ({ field, columns: byField.get(field.key)! }));
  const mapped = [...byField.values()].reduce((sum, list) => sum + list.length, 0);
  return { missing, conflicts, mapped, valid: !missing.length && !conflicts.length };
}
