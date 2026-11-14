import { test } from 'node:test';
import assert from 'node:assert/strict';
import { funnelLayout, ringLayout } from '../src/core/charts';

const stage = (key: string, value: number) => ({ key, label: key, value });

test('funnel stages narrow, join and report conversion against the previous stage', () => {
  const f = funnelLayout([stage('ideas', 40), stage('drafts', 20), stage('submitted', 10), stage('awarded', 4)]);
  assert.equal(f.max, 40);
  assert.equal(f.empty, false);
  assert.equal(f.overall, 0.1);
  assert.deepEqual(
    f.stages.map((s) => s.width),
    [100, 50, 25, 10],
  );
  assert.deepEqual(
    f.stages.map((s) => s.conversion),
    [null, 0.5, 0.5, 0.4],
  );
  assert.equal(f.stages[0]!.points, '0,0 100,0 75,1 25,1');
  // The last segment keeps its own width rather than collapsing to a point.
  assert.equal(f.stages[3]!.points, '45,0 55,0 55,1 45,1');
});

test('funnel treats zero, negative and non-finite values as zero without NaN geometry', () => {
  const f = funnelLayout([stage('a', 10), stage('b', -5), stage('c', NaN), stage('d', Infinity)]);
  for (const s of f.stages) {
    assert.ok(Number.isFinite(s.width));
    assert.ok(!s.points.includes('NaN'));
  }
  assert.deepEqual(
    f.stages.map((s) => s.value),
    [10, 0, 0, 0],
  );
  assert.equal(f.stages[2]!.conversion, null, 'no conversion from an empty stage');
  assert.equal(funnelLayout([]).empty, true);
  assert.equal(funnelLayout([]).overall, null);
  const zero = funnelLayout([stage('a', 0), stage('b', 0)]);
  assert.equal(zero.empty, true);
  assert.equal(zero.overall, null);
  assert.equal(zero.stages[1]!.conversion, null);
});

test('funnel keeps very small stages visible with a minimum width', () => {
  const f = funnelLayout([stage('a', 1000), stage('b', 1)]);
  assert.equal(f.stages[1]!.width, 2);
  assert.equal(funnelLayout([stage('a', 1000), stage('b', 1)], 0).stages[1]!.width, 0.1);
});

test('ring gauge clamps the arc but keeps the true ratio for labels', () => {
  const r = ringLayout(0.62, 1, { size: 120, thickness: 10 });
  assert.equal(r.fraction, 0.62);
  assert.equal(r.ratio, 0.62);
  assert.equal(r.over, false);
  const [arc, total] = r.dash.split(' ').map(Number);
  assert.ok(Math.abs(arc! / total! - 0.62) < 1e-9);
  const over = ringLayout(56, 50);
  assert.equal(over.fraction, 1);
  assert.ok(Math.abs(over.ratio! - 1.12) < 1e-9);
  assert.equal(over.over, true);
});

test('ring gauge handles missing, invalid and negative values', () => {
  for (const value of [null, undefined, NaN, Infinity]) {
    const r = ringLayout(value as number);
    assert.equal(r.ratio, null);
    assert.equal(r.fraction, 0);
  }
  assert.equal(ringLayout(5, 0).ratio, null, 'zero maximum');
  assert.equal(ringLayout(-3, 10).ratio, 0);
  const tiny = ringLayout(0.5, 1, { size: 4, thickness: 40 });
  assert.ok(tiny.size >= 16 && tiny.radius > 0);
});

test('ring gauge places the target tick on the circle, starting at the top', () => {
  const r = ringLayout(0.3, 1, { size: 100, thickness: 10, target: 0 });
  assert.ok(Math.abs(r.target!.x1 - 50) < 1e-9, 'target at 0 sits at twelve o’clock');
  assert.ok(r.target!.y1 > r.target!.y2);
  const quarter = ringLayout(0.3, 1, { size: 100, thickness: 10, target: 0.25 })!.target!;
  assert.ok(Math.abs(quarter.y1 - 50) < 1e-9 && quarter.x2 > quarter.x1);
  assert.equal(ringLayout(0.3, 1, { target: 4 }).target!.fraction, 1);
  assert.equal(ringLayout(0.3, 1, { target: NaN }).target, null);
});
