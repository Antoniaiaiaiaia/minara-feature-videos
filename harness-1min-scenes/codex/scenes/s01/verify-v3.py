import json
import subprocess
from pathlib import Path

scene = Path(__file__).resolve().parent
video = scene.parents[1] / 'output/s01-introducing-minara-harness-v3.mp4'
streams = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(video)
]))['streams']
assert len(streams) == 1
v = streams[0]
assert (v['codec_name'], v['width'], v['height'], v['nb_frames'], v['r_frame_rate']) == (
    'h264', 1920, 1080, '110', '30/1')
assert abs(float(v['duration']) - 110 / 30) < 0.001
# Keep the supplied animation body intact; only imports/font loading are adapted.
anchor = '/** How a card arrives, and how it leaves. */'
assert (scene / 'PunchLines-v3.tsx').read_text().split(anchor)[1] == (
    scene / 'punch-lines-supplied-v3.txt').read_text().split(anchor)[1]
subprocess.run([
    'ffmpeg', '-v', 'error', '-y', '-i', str(video), '-vf',
    'select=' + '+'.join(f'eq(n\\,{f})' for f in [0, 6, 18, 38, 47, 51, 52, 57, 63, 72, 90, 109])
    + ',scale=400:225,tile=4x3', '-frames:v', '1',
    str(scene / 'verification-v3.jpg')
], check=True)
print('PASS: supplied animation preserved; 110 silent 1080p/30fps frames; cut/entrance/end contact sheet extracted.')
