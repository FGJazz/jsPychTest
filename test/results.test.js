import test from 'node:test';
import assert from 'node:assert/strict';
import '../src/results.js';

const { summarizeTrials } = globalThis;

test('summarizes accuracy and reaction time for correct trials only', () => {
  assert.deepEqual(summarizeTrials([
    { correct: true, rt: 200 },
    { correct: false, rt: 50 },
    { correct: true, rt: 301 },
  ]), { total: 3, correct: 2, meanReactionTime: 251 });
});

test('does not report a mean when no responses were correct', () => {
  assert.deepEqual(summarizeTrials([{ correct: false, rt: 200 }]), {
    total: 1, correct: 0, meanReactionTime: null,
  });
  assert.deepEqual(summarizeTrials([]), {
    total: 0, correct: 0, meanReactionTime: null,
  });
});
