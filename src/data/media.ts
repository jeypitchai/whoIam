// Paths are relative to public/. Both reels are retained; only the selected one renders.
export const introReels = {
  original: {
    video: 'media/jk-introduction.mp4',
    poster: 'media/jk-introduction.webp',
    durationLabel: '29 sec',
    background: '#e95535',
  },
  orange: {
    video: 'media/jk-introduction-orange.mp4',
    poster: 'media/jk-introduction-orange.webp',
    durationLabel: '30 sec',
    background: '#db4b25',
  },
} as const;

// Change to 'original' to restore the previous reel and its matching poster.
export const activeIntroReel: keyof typeof introReels = 'orange';
export const selectedIntroReel = introReels[activeIntroReel];

export const media: { portrait: string | null; heroVideo: string | null; videoPoster: string | null } = {
  portrait: 'media/jk-portrait.webp',
  heroVideo: selectedIntroReel.video,
  videoPoster: selectedIntroReel.poster,
};
