import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  assignField,
  autoMatch,
  normalizeHeader,
  validateMapping,
  type BissImportField,
} from '../src/core/import-mapping';

const fields: BissImportField[] = [
  { key: 'title', label: 'Project title', required: true, aliases: ['Name'] },
  { key: 'lead', label: 'Principal investigator', aliases: ['PI'] },
  { key: 'budget', label: 'Budget', required: true },
  { key: 'start', label: 'Start date' },
];
const columns = ['Name', 'PI', 'Total budget (€)', 'Début', 'Notes'].map((key) => ({ key }));

test('headers normalise accents, case, spaces and punctuation', () => {
  assert.equal(normalizeHeader(' Début (€) '), 'debut');
  assert.equal(normalizeHeader('Start-Date'), 'startdate');
  assert.equal(normalizeHeader('***'), '');
});

test('auto-match prefers exact aliases, then containment, and uses each field once', () => {
  const mapping = autoMatch(columns, fields);
  assert.deepEqual(mapping, {
    Name: 'title',
    PI: 'lead',
    'Total budget (€)': 'budget',
    Début: null,
    Notes: null,
  });
  const twice = autoMatch([{ key: 'Budget' }, { key: 'Budget 2026' }], fields);
  assert.equal(twice.Budget, 'budget');
  assert.equal(twice['Budget 2026'], null);
});

test('auto-match keeps decisions already made and skips their fields', () => {
  const mapping = autoMatch(columns, fields, { Name: null, Notes: 'title' });
  assert.equal(mapping.Name, null);
  assert.equal(mapping.Notes, 'title');
  assert.equal(mapping.PI, 'lead');
});

test('assigning a field moves it from the column that had it, without mutating', () => {
  const before = { Name: 'title', PI: 'lead' };
  const after = assignField(before, 'PI', 'title');
  assert.deepEqual(after, { Name: null, PI: 'title' });
  assert.deepEqual(before, { Name: 'title', PI: 'lead' });
  assert.deepEqual(assignField(after, 'PI', null), { Name: null, PI: null });
});

test('validation lists missing required fields and conflicting columns', () => {
  const result = validateMapping({ Name: 'title', PI: 'title', Other: 'unknown' }, fields);
  assert.deepEqual(
    result.missing.map((f) => f.key),
    ['budget'],
  );
  assert.deepEqual(result.conflicts.map((c) => [c.field.key, c.columns]), [
    ['title', ['Name', 'PI']],
  ]);
  assert.equal(result.mapped, 2);
  assert.equal(result.valid, false);
  assert.equal(validateMapping({ a: 'title', b: 'budget' }, fields).valid, true);
});
