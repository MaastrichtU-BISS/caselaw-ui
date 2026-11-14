import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clampPage,
  pageCount,
  pageRange,
  paginationRange,
  type BissPageItem,
} from '../src/core/pagination';
import {
  clampNumber,
  formatNumber,
  numberSeparators,
  parseNumber,
  snapNumber,
  stepNumber,
} from '../src/core/number';

const show = (items: BissPageItem[]) =>
  items.map((item) => (item.type === 'page' ? item.page : '…')).join(' ');

test('page counts and clamping survive empty, partial and invalid input', () => {
  assert.equal(pageCount(0, 25), 1);
  assert.equal(pageCount(72, 25), 3);
  assert.equal(pageCount(75, 25), 3);
  assert.equal(pageCount(10, 0), 10);
  assert.equal(pageCount(NaN, 25), 1);
  assert.equal(clampPage(0, 3), 1);
  assert.equal(clampPage(9, 3), 3);
  assert.equal(clampPage(NaN, 3), 1);
  assert.equal(clampPage(2.6, 5), 3);
  assert.deepEqual(pageRange(2, 25, 72), { start: 26, end: 50, total: 72 });
  assert.deepEqual(pageRange(9, 25, 72), { start: 51, end: 72, total: 72 });
  assert.deepEqual(pageRange(1, 25, 0), { start: 0, end: 0, total: 0 });
});

test('page ranges show every page when they fit and ellipses when they do not', () => {
  assert.equal(show(paginationRange(1, 1)), '1');
  assert.equal(show(paginationRange(4, 7)), '1 2 3 4 5 6 7');
  assert.equal(show(paginationRange(1, 10)), '1 2 3 4 5 … 10');
  assert.equal(show(paginationRange(4, 10)), '1 2 3 4 5 … 10');
  assert.equal(show(paginationRange(5, 10)), '1 … 4 5 6 … 10');
  assert.equal(show(paginationRange(7, 10)), '1 … 6 7 8 9 10');
  assert.equal(show(paginationRange(10, 10)), '1 … 6 7 8 9 10');
  assert.equal(
    show(paginationRange(50, 100, { siblings: 2, boundaries: 2 })),
    '1 2 … 48 49 50 51 52 … 99 100',
  );
  assert.equal(show(paginationRange(5, 10, { siblings: 0, boundaries: 0 })), '… 5 …');
  assert.equal(show(paginationRange(99, 10)), '1 … 6 7 8 9 10');
});

test('page ranges keep a constant length while paging so buttons do not jump', () => {
  const lengths = new Set<number>();
  for (let page = 1; page <= 40; page += 1) lengths.add(paginationRange(page, 40).length);
  assert.deepEqual([...lengths], [7]);
  const ellipses = paginationRange(20, 40).filter((item) => item.type === 'ellipsis');
  assert.deepEqual(
    ellipses.map((item) => (item.type === 'ellipsis' ? item.key : '')),
    ['start', 'end'],
  );
});

test('numbers parse and format with the locale’s separators', () => {
  assert.deepEqual(numberSeparators('nl-NL'), { group: '.', decimal: ',' });
  assert.equal(parseNumber('1.234,5', { locale: 'nl-NL' }), 1234.5);
  assert.equal(parseNumber('1,234.5', { locale: 'en-US' }), 1234.5);
  assert.equal(parseNumber('€ 1.250', { locale: 'nl-NL' }), 1250);
  assert.equal(parseNumber('−12', { locale: 'en-US' }), -12);
  assert.equal(parseNumber('40%', { locale: 'en-US', options: { style: 'percent' } }), 0.4);
  assert.equal(parseNumber('1 234,5', { locale: 'fr-FR' }), 1234.5);
  assert.equal(parseNumber('', {}), null);
  assert.equal(parseNumber('abc', {}), null);
  assert.equal(parseNumber('1.2.3', { locale: 'en-US' }), null);
  assert.equal(formatNumber(null), '');
  assert.equal(formatNumber(NaN), '');
  assert.equal(formatNumber(1234.5, { locale: 'nl-NL' }), '1.234,5');
  assert.equal(
    formatNumber(1250, { locale: 'en-US', options: { style: 'currency', currency: 'EUR' } }),
    '€1,250.00',
  );
});

test('stepping snaps to the step grid, clamps and avoids floating point drift', () => {
  assert.equal(snapNumber(0.30000000000000004, 0.1), 0.3);
  assert.equal(stepNumber(0.2, 1, { step: 0.1 }), 0.3);
  assert.equal(stepNumber(9, 1, { step: 1, max: 10 }), 10);
  assert.equal(stepNumber(10, 1, { step: 1, max: 10 }), 10);
  assert.equal(stepNumber(1, -1, { step: 5, min: 0 }), 0);
  assert.equal(stepNumber(null, 1, { min: 3 }), 3);
  assert.equal(stepNumber(null, 1), 0);
  // A large step moves ten steps but keeps the ordinary step grid.
  assert.equal(stepNumber(1300, -1, { step: 500, grid: 50, min: 0 }), 800);
  assert.equal(snapNumber(7, 5, 1), 6);
  assert.equal(snapNumber(12, 5, 0, 10), 10);
  assert.equal(clampNumber(5, undefined, 3), 3);
  assert.equal(clampNumber(-1, 0), 0);
});
