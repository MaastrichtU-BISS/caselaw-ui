import { test } from 'node:test';
import assert from 'node:assert/strict';
import { countLabel, fillLabel } from '../src/core/blocks';

test('badge counts hide zero and invalid values and collapse large counts', () => {
  assert.equal(countLabel(0), '');
  assert.equal(countLabel(-3), '');
  assert.equal(countLabel(NaN), '');
  assert.equal(countLabel(Infinity), '');
  assert.equal(countLabel(3.7), '3');
  assert.equal(countLabel(99), '99');
  assert.equal(countLabel(100), '99+');
  assert.equal(countLabel(12, 9), '9+');
});

test('label templates replace known placeholders and keep unknown ones visible', () => {
  assert.equal(fillLabel('Notifications, {count} unread', { count: 4 }), 'Notifications, 4 unread');
  assert.equal(fillLabel('{a} of {b}', { a: 1 }), '1 of {b}');
  assert.equal(fillLabel('No placeholders', { count: 1 }), 'No placeholders');
});
