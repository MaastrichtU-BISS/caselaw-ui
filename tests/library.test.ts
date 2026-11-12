import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dayPlus, addMonths, monthGrid, keyStep, parseDay, isPickDay } from '../src/date-pick';
import { timelineSpan, toggleValue } from '../src/portable';
import { groupedLayout, lineLayout } from '../src/chart-layout';
const today = '2026-11-12';
test('date parser ports relative, English and Dutch dates and rejects impossible days', () => {
  for (const [typed, expected] of [
    ['today', today],
    ['tomorrow', '2026-11-13'],
    ['morgen', '2026-11-13'],
    ['12 nov 2027', '2027-11-12'],
    ['3 maart 2027', '2027-03-03'],
    ['12/11/2026', today],
    ['in 3 days', '2026-11-15'],
    ['31-02-2026', null],
    ['2026-02-30', null],
    ['not a date', null],
  ] as const)
    assert.equal(parseDay(typed, today), expected, typed);
  assert.equal(isPickDay('2026-02-30'), false);
  assert.equal(isPickDay('2024-02-29'), true);
});
test('date math clamps month ends, survives DST, and produces full keyboard navigable weeks', () => {
  assert.equal(addMonths('2026-01-31', 1), '2026-02-28');
  assert.equal(dayPlus('2026-03-29', 1), '2026-03-30');
  assert.equal(keyStep(today, 'PageDown', true), '2027-11-12');
  assert.equal(keyStep(today, 'Home'), '2026-11-09');
  assert.equal(keyStep(today, 'End'), '2026-11-15');
  assert.deepEqual(monthGrid(2026, 13), []);
  assert.deepEqual(monthGrid(NaN, 11), []);
  const grid = monthGrid(2026, 11);
  assert.equal(grid.length, 6);
  assert.equal(grid[0]![0]!.day, '2026-10-26');
  assert.ok(grid.every((row) => row.length === 7));
});
test('timeline clips outside and overlapping inclusive spans without negative or invalid CSS geometry', () => {
  assert.deepEqual(timelineSpan('2026-11-01', '2026-11-30', '2026-10-01', '2026-12-31'), {
    left: 0,
    width: 100,
  });
  assert.deepEqual(timelineSpan('2026-11-01', '2026-11-30', '2026-10-01', '2026-10-20'), {
    left: 0,
    width: 0,
  });
  assert.deepEqual(timelineSpan('bad', '2026-11-30', '2026-11-01', '2026-11-20'), {
    left: 0,
    width: 0,
  });
  const oneDay = timelineSpan('2026-11-01', '2026-11-30', '2026-11-16', '2026-11-16');
  assert.equal(oneDay.left, 50);
  assert.ok(Math.abs(oneDay.width - 100 / 30) < 1e-10);
});
test('grouped charts handle zero, negative, missing and nonfinite values', () => {
  const chart = groupedLayout(
    ['A', 'B', 'C', 'D'],
    [{ key: 'cost', label: 'Cost', color: 'red', values: [-10, 0, 20, NaN] }],
  );
  assert.ok(chart.zero > 16 && chart.zero < 210);
  for (const b of chart.groups.flatMap((g) => g.bars)) {
    assert.ok(Number.isFinite(b.x) && Number.isFinite(b.y) && b.height >= 0);
  }
  assert.equal(chart.groups[3]!.bars[0]!.value, 0);
  assert.equal(groupedLayout([], []).groups.length, 0);
  assert.ok(
    lineLayout([NaN, Infinity, -2, 0]).every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)),
  );
});
test('filter toggling leaves caller-owned values unchanged', () => {
  const values = ['one'];
  assert.deepEqual(toggleValue(values, 'two'), ['one', 'two']);
  assert.deepEqual(toggleValue(values, 'one'), []);
  assert.deepEqual(values, ['one']);
});
