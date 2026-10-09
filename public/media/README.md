# Portfolio media

- `jk-portrait.webp`: transparent portrait used by About's ID card.
- `jk-introduction-orange.mp4`: active reel with the supplied orange background, cropped to exclude the watermark, 880 × 720 at 25 fps, 30.42 seconds, H.264/AAC with fast-start metadata.
- `jk-introduction-orange.webp`: matching opening-frame poster.
- `jk-introduction.mp4`: retained previous introduction, composited onto #e95535, 880 × 720 at 25 fps, 29.16 seconds. Inactive and not rendered on any page.
- `jk-introduction.webp`: retained previous opening-frame poster.

Change `activeIntroReel` in `src/data/media.ts` to `'orange'` or `'original'` and rebuild to swap the video, poster, duration label, and hero tint together. Home's `IntroReel` plays once on a first visit when motion is allowed and browser autoplay is available. It starts muted. Successful playback records `jeypitchai:introduction-seen:v1` in localStorage. Returning visitors use Play/Stop; Stop and completion reset to the opening frame. Sound is an independent toggle. Blocked autoplay or unavailable storage leaves playback manual. Failed video loading retains the poster and reports an error.

Rebuild after replacing files. See `docs/intro-video.md` for the preparation workflow. Everything in `public/` is included in the site build.
