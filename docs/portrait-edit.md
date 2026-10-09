# Portrait cutout

The supplied `JK.jpg` was edited with the built-in imagegen tool in background-extraction mode. The original photograph was not modified. The selected PNG output was encoded with cwebp at quality 90 and lossless alpha, without resizing or further visual edits.

The project asset is `public/media/jk-portrait.webp` (1173 × 1341, approximately 185 KiB). Its transparency matches the generated PNG. Home and About consume it through the shared `PortraitBadge` component. The full portrait fits within the card window, above subtle orbit lines, with a small JK corner mark.

## Final prompt

Use case: background-extraction. Asset type: transparent photographic portrait cutout for a personal portfolio ID card. Input image: the supplied JK.jpg is the edit target, not merely a visual reference. Remove ONLY the blurred background outside the person. Preserve this exact person's identity, face, facial proportions, eyes, skin tone, hair, glasses, beard, smile, teeth, pose, suit jacket, white shirt, and tie. Do not retouch, beautify, redraw, restyle, relight, or change the subject. Keep the original head-and-upper-torso framing and clothing boundaries, with no invented extensions of the shoulders or body. Maintain fine hair edges and glasses accurately with clean alpha edges. Output a genuinely transparent background, no background color, no halo, no shadows, no text, no graphics. Leave modest transparent space above the hair so it can fit cleanly into an ID-card portrait window.
