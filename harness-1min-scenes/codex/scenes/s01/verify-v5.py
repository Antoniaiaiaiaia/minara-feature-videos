import json
import subprocess
from pathlib import Path

scene = Path(__file__).resolve().parent
video = scene.parents[1] / 'output/s01-introducing-minara-harness-v5.mp4'
streams = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(video)
]))['streams']
assert len(streams) == 1
v = streams[0]
assert (v['width'], v['height'], v['nb_frames'], v['r_frame_rate']) == (1920, 1080, '110', '30/1')

def subtitle_pixels(frame):
    raw = subprocess.check_output([
        'ffmpeg', '-v', 'error', '-i', str(video), '-vf',
        f'select=eq(n\\,{frame}),crop=1920:60:0:630,format=gray',
        '-frames:v', '1', '-f', 'rawvideo', '-'
    ])
    return sum(p < 100 for p in raw)

assert subtitle_pixels(38) == 0
assert subtitle_pixels(52) == 0
assert subtitle_pixels(70) > 1500
assert subtitle_pixels(109) > 1500
subprocess.run([
    'ffmpeg', '-v', 'error', '-y', '-i', str(video), '-vf',
    'select=' + '+'.join(f'eq(n\\,{f})' for f in [38, 52, 62, 75, 87, 109])
    + ',scale=800:450,tile=2x3', '-frames:v', '1', str(scene / 'verification-v5.jpg')
], check=True)
print('PASS: 110 silent 1080p/30fps frames; subtitle appears with the second card and remains through the ending.')
