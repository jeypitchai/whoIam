# Home introduction reel

## Active orange-background version

The current source is `Jeyakrishnan Pitchaikani _ Portfolio Introduction_720p (1).mp4` (1280 × 720, 25 fps, 30.42 seconds, stereo AAC). `scripts/prepare-orange-intro.py` crops the outer background to x=160 through x=1040, producing the same 880 × 720 avatar framing. The watermark lies outside this crop. The supplied orange background and avatar are retained without matting or background replacement. H.264/AAC encoding uses fast-start metadata, and an opening-frame WebP accompanies the video.

```sh
python scripts/prepare-orange-intro.py SOURCE.mp4 public/media/jk-introduction-orange.mp4
```

Switch versions by changing `activeIntroReel` in `src/data/media.ts` from `'orange'` to `'original'`, then rebuilding. The registry selects video, matching poster, duration label, and hero background tint together. The active orange version uses #db4b25 to match its footage, with a CSS feather on the outer background edges. Only the active version renders on Home. The previous `jk-introduction.mp4` and `.webp` files are retained unchanged and remain unreferenced by page markup. Playback behavior is shared between versions; changing videos does not reset a visitor's first-play record.

## Retained original version

The user supplied `Jeyakrishnan Pitchaikani _ Portfolio Introduction_720p.mp4` (1280 × 720, 25 fps, 29.16 seconds, stereo AAC). The original file is unchanged.

`scripts/prepare-intro-video.py` uses the official [Robust Video Matting MobileNetV3 model and inference interface](https://github.com/PeterL1n/RobustVideoMatting/blob/master/documentation/inference.md). Processing is local. Recurrent states are retained between frames to stabilize the avatar's hair, clothing, and hand gestures.

The foreground is composited onto the site's #e95535 accent, with the stage's blue floor removed from gaps around the lower arms. The framing crops only outer background (x=160 through x=1040), excluding the lower-right watermark while retaining the avatar and visible gestures. Output is H.264/AAC MP4 with fast-start metadata, explicit BT.709 matrix/primaries and sRGB transfer. The poster is extracted through RGB into lossless WebP to avoid video/still colour-matrix differences.

Requirements for regeneration: numpy, onnxruntime, imageio-ffmpeg and the official `rvm_mobilenetv3_fp32.onnx` model. These are preparation tools; the static website ships only the prepared media.

```sh
python scripts/prepare-intro-video.py SOURCE.mp4 MODEL.onnx public/media/jk-introduction.mp4
```

`HomeHero`, `IntroReel`, `introPlayback.ts`, and `intro-reel.css` own presentation and playback. The reel replaces Home's portrait badge; About keeps the original photograph. There is no loop or unconditional HTML autoplay. Playback starts muted once per browser after hydration, respects reduced motion, and degrades to manual playback when storage/autoplay is unavailable. Play/Stop, sound, completion, and repeat-visit behavior were checked in the browser. The first-visit policy is also covered by an automated test.
