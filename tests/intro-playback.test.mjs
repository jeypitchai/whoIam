import test from 'node:test';
import assert from 'node:assert/strict';
import { introVisitKey, shouldAutoplayIntro, rememberIntroPlayback } from '../src/lib/introPlayback.ts';

test('introduction autoplays only before the first playback and respects motion/storage preferences', () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  assert.equal(shouldAutoplayIntro(storage, false), true);
  assert.equal(shouldAutoplayIntro(storage, true), false);
  rememberIntroPlayback(storage);
  assert.equal(values.get(introVisitKey), '1');
  assert.equal(shouldAutoplayIntro(storage, false), false);
  assert.equal(shouldAutoplayIntro(null, false), false);
  const blocked = { getItem() { throw new Error('Storage unavailable'); }, setItem() { throw new Error('Storage unavailable'); } };
  assert.equal(shouldAutoplayIntro(blocked, false), false);
  assert.doesNotThrow(() => rememberIntroPlayback(blocked));
});
