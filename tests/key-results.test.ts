import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  expectedProgress,
  formatKeyResultValue,
  keyResultProgress,
  parseKeyResultValue,
  suggestConfidence,
} from '../src/core/key-results';
import { linkHost, toggleReaction } from '../src/core/feed';

test('progress runs from start to target, clamps, and handles decreasing targets', () => {
  assert.equal(keyResultProgress(0, 6, 12), 0.5);
  assert.equal(keyResultProgress(0, 20, 12), 1);
  assert.equal(keyResultProgress(10, 5, 20), 0);
  assert.equal(keyResultProgress(40, 25, 10), 0.5);
  assert.equal(keyResultProgress(5, 5, 5), 1);
  assert.equal(keyResultProgress(5, 4, 5), 0);
  assert.equal(keyResultProgress(0, NaN, 10), null);
});

test('expected pace follows the period and rejects invalid periods', () => {
  assert.equal(expectedProgress('2026-01-01', '2026-01-11', '2026-01-06'), 0.5);
  assert.equal(expectedProgress('2026-01-01', '2026-01-11', '2027-01-01'), 1);
  assert.equal(expectedProgress('2026-01-11', '2026-01-01', '2026-01-06'), undefined);
  assert.equal(expectedProgress('bad', '2026-01-01', '2026-01-06'), undefined);
});

test('confidence compares progress with the expected pace', () => {
  assert.equal(suggestConfidence(0.5, 0.55), 'on-track');
  assert.equal(suggestConfidence(0.4, 0.6), 'at-risk');
  assert.equal(suggestConfidence(0.1, 0.6), 'off-track');
  assert.equal(suggestConfidence(null, 0.6), undefined);
  assert.equal(suggestConfidence(0.4, undefined), undefined);
});

test('values format and parse in common written forms', () => {
  assert.equal(formatKeyResultValue(12, { unit: 'papers', locale: 'en' }), '12 papers');
  assert.equal(formatKeyResultValue(62.5, { format: 'percent', locale: 'en' }), '62.5%');
  assert.equal(formatKeyResultValue(40000, { format: 'currency', locale: 'en' }), '€40,000');
  assert.equal(formatKeyResultValue(NaN), '–');
  assert.equal(parseKeyResultValue('1,5'), 1.5);
  assert.equal(parseKeyResultValue('€ 40.000'), 40000);
  assert.equal(parseKeyResultValue('1,200.5'), 1200.5);
  assert.equal(parseKeyResultValue('12%'), 12);
  assert.equal(parseKeyResultValue('twelve'), null);
  assert.equal(parseKeyResultValue(''), null);
});

test('feed reactions toggle without mutation and links show their host', () => {
  const reactions = [{ emoji: '👍', count: 1, reacted: true }];
  assert.deepEqual(toggleReaction(reactions, '👍'), []);
  assert.deepEqual(toggleReaction(reactions, '🎉'), [
    { emoji: '👍', count: 1, reacted: true },
    { emoji: '🎉', count: 1, reacted: true },
  ]);
  assert.deepEqual(toggleReaction([{ emoji: '👍', count: 2 }], '👍'), [
    { emoji: '👍', count: 3, reacted: true },
  ]);
  assert.equal(reactions.length, 1);
  assert.equal(linkHost('https://www.nwo.nl/en/calls'), 'nwo.nl');
  assert.equal(linkHost('not a url'), 'not a url');
});
