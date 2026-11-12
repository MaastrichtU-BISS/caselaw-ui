import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldControl } from '../src/core/field';
import { dataGridModel } from '../src/core/data-grid';
test('field composition keeps label/control IDs aligned and combines accessible descriptions', () => {
  const field = {
    id: 'project',
    describedBy: 'project-error',
    invalid: true,
    required: true,
    disabled: false,
  };
  assert.deepEqual(
    fieldControl(field, { 'aria-describedby': 'external project-error', id: 'custom' }),
    {
      id: 'project',
      'aria-describedby': 'external project-error',
      'aria-invalid': true,
      required: true,
      disabled: false,
    },
  );
  assert.equal(fieldControl(undefined).id, undefined);
  assert.equal(fieldControl(undefined,{id:'standalone'}).id,'standalone');
});
test('grid selection is tri-state, page-local changes preserve off-page selections', () => {
  const rows = [{ id: 'one' }, { id: 'two' }];
  const columns = [{ key: 'title', label: 'Title', visible: true }];
  const grid = dataGridModel({ rows, columns, selected: ['one', 'off-page'] });
  assert.equal(grid.someSelected, true);
  assert.equal(grid.allSelected, false);
  assert.deepEqual(grid.selectAll(false), ['off-page']);
  assert.deepEqual(grid.selectAll(true), ['one', 'off-page', 'two']);
  assert.deepEqual(grid.toggleRow('one'), ['off-page']);
});
test('grid pinned columns stay contiguous and offsets match clamped widths', () => {
  const columns = [
    { key: 'a', label: 'A', visible: true, width: 2 },
    { key: 'b', label: 'B', visible: true, pinned: true, width: 900 },
    { key: 'c', label: 'C', visible: true, pinned: true, width: 100 },
  ];
  const grid = dataGridModel({ rows: [], columns });
  assert.deepEqual(
    grid.visible.map((c) => c.key),
    ['b', 'c', 'a'],
  );
  assert.deepEqual(grid.geometry('c'), { width: 100, left: 844 });
  assert.equal(grid.geometry('a').width, 60);
  assert.equal(grid.resizeColumn('a', NaN)[0]?.width, 160);
  assert.equal(columns[0]?.width, 2);
});

test('grid fills remaining space without changing pinned offsets', () => {
  const grid = dataGridModel({
    rows: [],
    columns: [
      { key: 'a', label: 'A', visible: true, pinned: true, width: 200 },
      { key: 'b', label: 'B', visible: true, width: 100 },
    ],
    availableWidth: 700,
  });
  assert.equal(grid.width, 700);
  assert.deepEqual(grid.geometry('a'), { width: 200, left: 44 });
  assert.equal(grid.geometry('b').width, 456);
});
