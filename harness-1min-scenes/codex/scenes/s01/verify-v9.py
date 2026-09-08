import json
import subprocess
from pathlib import Path

scene = Path(__file__).resolve().parent
video = scene.parents[1] / 'output2/s01-introducing-minara-harness-v9.mp4'
streams = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(video)
]))['streams']
assert len(streams) == 1
v = streams[0]
assert (v['width'], v['height'], v['nb_frames'], v['r_frame_rate']) == (1920, 1080, '180', '30/1')
assert float(v['duration']) == 6.0

def ink(frame):
    raw = subprocess.check_output([
        'ffmpeg', '-v', 'error', '-i', str(video), '-vf',
        f'select=eq(n\\,{frame}),scale=480:270,format=gray',
        '-frames:v', '1', '-f', 'rawvideo', '-'
    ])
    return sum(p < 45 for p in raw)

# Hard cuts replace the outgoing title with the next card's small word entry.
assert ink(30) < ink(29) / 3
assert ink(75) < ink(74) / 3
assert ink(179) > 1000
subprocess.run([
    'ffmpeg', '-v', 'error', '-y', '-i', str(video), '-vf',
    'select=' + '+'.join(f'eq(n\\,{f})' for f in [0, 29, 30, 50, 59, 74, 75, 104, 179])
    + ',scale=533:300,tile=3x3', '-frames:v', '1', str(scene.parents[1] / 'output2/s01-verification-v9.jpg')
], check=True)
print('PASS: 180 silent 1080p/30fps frames; exactly six seconds; separate cards cut at 1s and 2.5s.')
