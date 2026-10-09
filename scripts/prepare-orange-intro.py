"""Prepare the supplied orange-background reel without replacing its background.
Requires imageio-ffmpeg. Usage: python prepare-orange-intro.py SOURCE OUTPUT
The outer background crop excludes the watermark and retains the avatar frame.
"""
import subprocess
import sys
from pathlib import Path
import imageio_ffmpeg

source, output = sys.argv[1:3]
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([
    ffmpeg, '-v', 'error', '-y', '-i', source,
    '-map', '0:v:0', '-map', '0:a:0?',
    '-vf', 'crop=880:720:160:0,scale=in_color_matrix=bt601:out_color_matrix=bt709',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'iec61966-2-1',
    '-color_range', 'tv', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium',
    '-threads', '2', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
    '-movflags', '+faststart', output,
], check=True)
poster = str(Path(output).with_suffix('.webp'))
subprocess.run([
    ffmpeg, '-v', 'error', '-i', output, '-frames:v', '1', '-vf', 'format=rgb24',
    '-c:v', 'libwebp', '-lossless', '1', '-y', poster,
], check=True)
print(f'Prepared {output} and {poster}', flush=True)
