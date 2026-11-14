import { test } from 'node:test';
import assert from 'node:assert/strict';
import { centerAnchor, clampStep, findTarget, needsScroll, spotlightRect } from '../src/core/tour';

const viewport = { width: 1000, height: 800 };

test('step indexes stay inside the tour', () => {
  assert.equal(clampStep(2, 5), 2);
  assert.equal(clampStep(-1, 5), 0);
  assert.equal(clampStep(9, 5), 4);
  assert.equal(clampStep(1.7, 5), 1);
  assert.equal(clampStep(NaN, 5), 0);
  assert.equal(clampStep(0, 0), -1);
});

test('spotlight grows by its padding and is clipped to the viewport', () => {
  assert.deepEqual(spotlightRect({ top: 100, left: 200, width: 50, height: 20 }, 6, viewport), {
    top: 94,
    left: 194,
    width: 62,
    height: 32,
  });
  assert.deepEqual(spotlightRect({ top: -10, left: 980, width: 50, height: 30 }, 4, viewport), {
    top: 0,
    left: 976,
    width: 24,
    height: 24,
  });
  assert.equal(spotlightRect({ top: 900, left: 10, width: 10, height: 10 }, 4, viewport), null);
  assert.deepEqual(spotlightRect({ top: 10, left: 10, width: 10, height: 10 }, NaN, viewport), {
    top: 10,
    left: 10,
    width: 10,
    height: 10,
  });
});

test('targets near or past the edges need scrolling; centered anchors are zero-size', () => {
  assert.equal(needsScroll({ top: 300, left: 10, width: 100, height: 40 }, viewport), false);
  assert.equal(needsScroll({ top: 790, left: 10, width: 100, height: 40 }, viewport), true);
  assert.equal(needsScroll({ top: -50, left: 10, width: 100, height: 40 }, viewport), true);
  assert.deepEqual(centerAnchor(viewport), { top: 240, left: 500, width: 0, height: 0 });
});

test('target lookup is safe without a document and with invalid selectors', () => {
  assert.equal(findTarget('#anything', undefined), null);
  assert.equal(findTarget(null), null);
  const root = {
    querySelectorAll() {
      throw new Error('bad selector');
    },
  } as unknown as Document;
  assert.equal(findTarget('[[', root), null);
  const hidden = { getBoundingClientRect: () => ({ width: 0, height: 0 }) };
  const shown = { getBoundingClientRect: () => ({ width: 10, height: 10 }) };
  const page = { querySelectorAll: () => [hidden, shown] } as unknown as Document;
  assert.equal(findTarget('.x', page), shown);
});
