import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { media, activeIntroReel, selectedIntroReel } from '../data/media';
import { rememberIntroPlayback, shouldAutoplayIntro } from '../lib/introPlayback';
import { useSite } from './SiteContext';

function browserStorage() {
  try { return window.localStorage; }
  catch { return null; }
}

export function IntroReel() {
  const { asset } = useSite();
  const videoRef = useRef<HTMLVideoElement>(null);
  const attemptedAutoplay = useRef(false);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (reducedMotion === null || attemptedAutoplay.current) return;
    attemptedAutoplay.current = true;
    if (shouldAutoplayIntro(browserStorage(), reducedMotion)) {
      videoRef.current?.play().catch(() => setMessage('Select Play introduction to start the introduction.'));
    }
  }, [reducedMotion]);

  const stop = () => {
    const video = videoRef.current;
    if (video) { video.pause(); video.currentTime = 0; }
    setPlaying(false);
  };
  const togglePlayback = async () => {
    if (playing) { stop(); return; }
    try { await videoRef.current?.play(); setMessage(''); }
    catch { setMessage('The video could not start. Please try Play introduction again.'); }
  };

  return <>
    <div className={`intro-art intro-art-${activeIntroReel}`} aria-hidden="true">
      {media.videoPoster && <img className="intro-poster" src={asset(media.videoPoster)} alt="" width="880" height="720" fetchPriority="high" />}
      {media.heroVideo && <video id="intro-video" ref={videoRef} hidden={failed} className="intro-video" src={asset(media.heroVideo)}
        poster={media.videoPoster ? asset(media.videoPoster) : undefined} muted={muted} playsInline preload="metadata" width="880" height="720"
        onPlay={() => { setPlaying(true); rememberIntroPlayback(browserStorage()); }} onPause={() => setPlaying(false)} onEnded={stop}
        onError={() => { setFailed(true); setPlaying(false); setMessage('The introduction is unavailable. Please explore my work below.'); }} />}
    </div>
    <div className="intro-controls">
      <div className="intro-control-label"><span className={playing ? 'intro-live-dot is-playing' : 'intro-live-dot'} /><span>A short introduction / {selectedIntroReel.durationLabel}</span></div>
      <div className="intro-control-buttons">
        <button className="intro-play" onClick={togglePlayback} disabled={failed} aria-controls="intro-video" aria-label={playing ? 'Stop introduction' : 'Play introduction'}>
          {playing ? <Square size={17} fill="currentColor" aria-hidden="true" /> : <Play size={19} fill="currentColor" aria-hidden="true" />}<span>{playing ? 'Stop introduction' : 'Play introduction'}</span>
        </button>
        <button className="intro-sound" onClick={() => setMuted(value => !value)} disabled={failed} aria-label={muted ? 'Turn sound on' : 'Mute introduction'} aria-pressed={!muted}>
          {muted ? <VolumeX size={19} aria-hidden="true" /> : <Volume2 size={19} aria-hidden="true" />}<span>{muted ? 'Sound off' : 'Sound on'}</span>
        </button>
      </div>
      <span className="intro-status" role="status">{message}</span>
    </div>
  </>;
}
