export const introVisitKey = 'jeypitchai:introduction-seen:v1';

export function shouldAutoplayIntro(storage: Pick<Storage, 'getItem'> | null, reducedMotion: boolean) {
  if (reducedMotion || !storage) return false;
  try { return storage.getItem(introVisitKey) !== '1'; }
  catch { return false; }
}

export function rememberIntroPlayback(storage: Pick<Storage, 'setItem'> | null) {
  try { storage?.setItem(introVisitKey, '1'); }
  catch { /* Manual playback still works when browser storage is unavailable. */ }
}
