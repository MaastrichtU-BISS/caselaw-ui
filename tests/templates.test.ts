import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterTemplates,
  templateCategories,
  gridStep,
  wrapIndex,
  BISS_ALL_TEMPLATES,
  type BissTemplate,
} from '../src/core/templates';

const templates: BissTemplate[] = [
  { id: 'grant', name: 'Grant application', description: 'Track calls and deadlines', category: 'funding', tags: ['horizon', 'erc'] },
  { id: 'study', name: 'Research study', description: 'Méthodes and ethics', category: 'research' },
  { id: 'meeting', name: 'Team meeting', description: 'Agenda and decisions', category: 'meetings' },
  { id: 'loose', name: 'Blank board' },
];

test('filters by category and every query word, ignoring case and accents, keeping order', () => {
  assert.deepEqual(filterTemplates(templates).map((t) => t.id), ['grant', 'study', 'meeting', 'loose']);
  assert.deepEqual(filterTemplates(templates, { category: 'research' }).map((t) => t.id), ['study']);
  assert.deepEqual(filterTemplates(templates, { query: 'METHODES' }).map((t) => t.id), ['study']);
  assert.deepEqual(filterTemplates(templates, { query: 'horizon grant' }).map((t) => t.id), ['grant']);
  assert.deepEqual(filterTemplates(templates, { query: 'grant ethics' }), []);
  assert.deepEqual(filterTemplates(templates, { query: '   ' }).length, 4);
  assert.deepEqual(filterTemplates(templates, { category: 'funding', query: 'agenda' }), []);
  assert.deepEqual(filterTemplates([], { query: 'x' }), []);
});

test('categories start with All, follow the given order, drop empty ones and count templates', () => {
  const cats = templateCategories(templates, [
    { value: 'meetings', label: 'Meetings' },
    { value: 'unused', label: 'Unused' },
    { value: 'funding', label: 'Funding' },
  ]);
  assert.deepEqual(
    cats.map((c) => [c.value, c.count]),
    [[BISS_ALL_TEMPLATES, 4], ['meetings', 1], ['funding', 1]],
  );
  assert.deepEqual(
    templateCategories(templates, undefined, 'Alle').map((c) => c.label),
    ['Alle', 'funding', 'research', 'meetings'],
  );
});

test('grid steps stay inside the grid and move by rows', () => {
  assert.equal(gridStep(0, 7, 'ArrowRight', 3), 1);
  assert.equal(gridStep(6, 7, 'ArrowRight', 3), 6);
  assert.equal(gridStep(0, 7, 'ArrowLeft', 3), 0);
  assert.equal(gridStep(1, 7, 'ArrowDown', 3), 4);
  assert.equal(gridStep(5, 7, 'ArrowDown', 3), 5);
  assert.equal(gridStep(4, 7, 'ArrowUp', 3), 1);
  assert.equal(gridStep(4, 7, 'End', 3), 6);
  assert.equal(gridStep(4, 7, 'Home', 3), 0);
  assert.equal(gridStep(-3, 7, 'Enter', 0), 0);
  assert.equal(gridStep(2, 0, 'ArrowRight'), -1);
});

test('wrapped indexes cycle in both directions and survive invalid input', () => {
  assert.equal(wrapIndex(5, 5), 0);
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(12, 5), 2);
  assert.equal(wrapIndex(NaN, 5), 0);
  assert.equal(wrapIndex(3, 0), 0);
});
