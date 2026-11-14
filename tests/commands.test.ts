import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  commandScore,
  filterCommands,
  flattenGroups,
  groupCommands,
  initialActive,
  moveActive,
  workspaceCommands,
} from '../src/core/commands';

const items = [
  { key: 'h', label: 'Heading', group: 'Text', keywords: ['title'] },
  { key: 't', label: 'Table', group: 'Data', description: 'Rows and columns' },
  { key: 'd', label: 'Data table', group: 'Data' },
  { key: 'q', label: 'Quote', group: 'Text', disabled: true },
  { key: 'c', label: 'Café notes', group: 'Text' },
];

test('commands rank label prefix, then word, then substring, keywords and description', () => {
  assert.equal(commandScore(items[1]!, 'tab'), 0);
  assert.equal(commandScore(items[2]!, 'tab'), 1);
  assert.equal(commandScore(items[0]!, 'title'), 3);
  assert.equal(commandScore(items[1]!, 'columns'), 4);
  assert.equal(commandScore(items[0]!, 'zzz'), -1);
  assert.deepEqual(
    filterCommands(items, 'tab').map((i) => i.key),
    ['t', 'd'],
  );
  assert.deepEqual(
    filterCommands(items, '  ').map((i) => i.key),
    items.map((i) => i.key),
  );
  assert.deepEqual(
    filterCommands(items, 'cafe').map((i) => i.key),
    ['c'],
    'accents fold',
  );
  assert.deepEqual(filterCommands(items, 'ROWS').map((i) => i.key), ['t']);
});

test('grouping keeps first-appearance order and flat indexes match render order', () => {
  const groups = groupCommands(items);
  assert.deepEqual(
    groups.map((g) => g.name),
    ['Text', 'Data'],
  );
  assert.deepEqual(
    flattenGroups(groups).map((i) => i.key),
    ['h', 'q', 'c', 't', 'd'],
  );
  assert.deepEqual(
    groups.flatMap((g) => g.items.map((e) => e.index)),
    [0, 1, 2, 3, 4],
  );
  const flat = groupCommands(items, true);
  assert.equal(flat.length, 1);
  assert.equal(flat[0]!.name, '');
  assert.deepEqual(groupCommands([]), []);
});

test('keyboard movement wraps and skips disabled commands', () => {
  const list = [{ disabled: true }, {}, { disabled: true }, {}];
  assert.equal(moveActive(list, -1, 1), 1);
  assert.equal(moveActive(list, 1, 1), 3);
  assert.equal(moveActive(list, 3, 1), 1);
  assert.equal(moveActive(list, 1, -1), 3);
  assert.equal(moveActive(list, -1, -1), 3);
  assert.equal(moveActive(list, 2, 'first'), 1);
  assert.equal(moveActive(list, 0, 'last'), 3);
  assert.equal(moveActive([{ disabled: true }], 0, 1), -1);
  assert.equal(moveActive([], 0, 'first'), -1);
});

test('workspaces become checked commands without leaking empty details', () => {
  const commands = workspaceCommands(
    [
      { id: 'a', name: 'Law faculty', detail: 'Admin' },
      { id: 'b', name: 'BISS' },
    ],
    'b',
  );
  assert.deepEqual(commands, [
    { key: 'a', label: 'Law faculty', description: 'Admin', checked: false },
    { key: 'b', label: 'BISS', checked: true },
  ]);
});

test('the keyboard starts on the checked command, else the first enabled one', () => {
  assert.equal(initialActive([{ disabled: true }, {}, { checked: true }]), 2);
  assert.equal(initialActive([{ disabled: true }, {}]), 1);
  assert.equal(initialActive([{ checked: true, disabled: true }, {}]), 1);
  assert.equal(initialActive([]), -1);
});
