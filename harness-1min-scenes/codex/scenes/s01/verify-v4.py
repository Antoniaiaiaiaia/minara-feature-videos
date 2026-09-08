import json
import subprocess
from pathlib import Path

scene = Path(__file__).resolve().parent
def video(version):
    return scene.parents[1] / f'output/s01-introducing-minara-harness-v{version}.mp4'

streams = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(video(4))
]))['streams']
assert len(streams) == 1
v = streams[0]
assert (v['width'], v['height'], v['nb_frames'], v['r_frame_rate']) == (1920, 1080, '110', '30/1')

def pixels(version, frame):
    return subprocess.check_output([
        'ffmpeg', '-v', 'error', '-i', str(video(version)), '-vf',
        f'select=eq(n\\,{frame}),scale=960:540,format=gray',
        '-frames:v', '1', '-f', 'rawvideo', '-'
    ])

centers = []
for frame in (84, 87, 90):
    after = pixels(4, frame)
    # Interior gray glyph pixels, excluding black type, pale ground and edges.
    lit = [i % 960 for i in range(245 * 960, 290 * 960)
           if 60 < after[i] < 200 and all(abs(after[i] - after[i + d]) < 18
                                         for d in (-960, 960, -1, 1))]
    assert len(lit) > 100, (frame, len(lit))
    centers.append(sum(lit) / len(lit))
assert centers[0] < centers[1] < centers[2], centers
assert centers[2] - centers[0] > 400, centers
print('PASS: silent 1080p/30fps, 110 frames; encoded silver highlight crosses the title left to right.')
