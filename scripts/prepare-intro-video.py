"""Composite the supplied introduction onto the portfolio's orange hero.
Requires imageio-ffmpeg, numpy, onnxruntime and the official RVM MobileNetV3
FP32 model. The model runs offline; neither it nor these tools ship to visitors.
Usage: python prepare-intro-video.py SOURCE MODEL OUTPUT
Model/inference: https://github.com/PeterL1n/RobustVideoMatting
"""
import subprocess
import sys
from pathlib import Path
import imageio_ffmpeg
import numpy as np
import onnxruntime as ort

source, model, output = sys.argv[1:4]
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
options = ort.SessionOptions()
options.intra_op_num_threads = 2
session = ort.InferenceSession(model, sess_options=options, providers=['CPUExecutionProvider'])
width, height, rate = 1280, 720, 25
crop_left, crop_right = 160, 1040
background = np.array([233, 85, 53], dtype=np.float32).reshape(1, 1, 3) / 255
states = [np.zeros([1, 1, 1, 1], dtype=np.float32) for _ in range(4)]
reader = subprocess.Popen([ffmpeg, '-v', 'error', '-i', source, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
writer = subprocess.Popen([ffmpeg, '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{crop_right-crop_left}x{height}', '-r', str(rate), '-i', '-', '-i', source, '-map', '0:v:0', '-map', '1:a:0?', '-vf', 'scale=out_color_matrix=bt709', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'iec61966-2-1', '-color_range', 'tv', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-threads', '2', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-shortest', output], stdin=subprocess.PIPE)
index = 0
try:
    while True:
        frame = reader.stdout.read(width * height * 3)
        if not frame:
            break
        if len(frame) != width * height * 3:
            raise RuntimeError('Incomplete source frame')
        rgb = np.frombuffer(frame, dtype=np.uint8).reshape(height, width, 3)
        src = rgb.astype(np.float32).transpose(2, 0, 1)[None] / 255
        foreground, alpha, *states = session.run(None, {
            'src': src, 'r1i': states[0], 'r2i': states[1], 'r3i': states[2], 'r4i': states[3],
            'downsample_ratio': np.array([0.375], dtype=np.float32),
        })
        alpha = np.clip((alpha[0].transpose(1, 2, 0) - 0.025) / 0.95, 0, 1)
        # Remove the stage's saturated blue floor visible through moving arms.
        blue_floor = (src[0, 2] > src[0, 0] * 1.4) & (src[0, 2] > src[0, 1] * 1.4) & (src[0, 2] > 0.18)
        blue_floor[:560] = False
        alpha[blue_floor] = 0
        result = foreground[0].transpose(1, 2, 0) * alpha + background * (1 - alpha)
        result = np.clip(result[:, crop_left:crop_right] * 255, 0, 255).astype(np.uint8)
        writer.stdin.write(result.tobytes())
        if index % 100 == 0:
            print(f'Composited {index} frames', flush=True)
        index += 1
finally:
    reader.stdout.close()
    writer.stdin.close()
if reader.wait() != 0 or writer.wait() != 0:
    raise RuntimeError('Video conversion failed')
poster = str(Path(output).with_suffix('.webp'))
subprocess.run([ffmpeg, '-v', 'error', '-i', output, '-frames:v', '1', '-vf', 'format=rgb24', '-c:v', 'libwebp', '-lossless', '1', '-y', poster], check=True)
print(f'Prepared {index} frames: {output} and {poster}', flush=True)
