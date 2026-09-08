import json
import subprocess
from pathlib import Path

video = Path(__file__).resolve().parents[2] / 'output/s01-introducing-minara-harness-v2.mp4'
info = json.loads(subprocess.check_output([
    'ffprobe', '-v', 'error', '-show_streams', '-of', 'json', str(video)
]))['streams']
assert len(info) == 1 and info[0]['codec_type'] == 'video'
assert (info[0]['width'], info[0]['height'], info[0]['nb_frames']) == (1920, 1080, '110')

def text_bounds(frame):
    pixels = subprocess.check_output([
        'ffmpeg', '-v', 'error', '-i', str(video), '-vf',
        f'select=eq(n\\,{frame}),crop=1920:150:0:460,format=gray',
        '-frames:v', '1', '-f', 'rawvideo', '-'
    ])
    columns = [i % 1920 for i, p in enumerate(pixels) if p < 40]
    return (min(columns), max(columns)) if columns else None

positions = [text_bounds(f) for f in range(84, 110)]
rest, leaving, end = positions[0], positions[17], positions[-1]
assert rest and leaving
right_edges = [bounds[1] if bounds else -1 for bounds in positions]
assert all(b <= a for a, b in zip(right_edges, right_edges[1:])), right_edges
assert leaving[1] < rest[1] - 400, (rest, leaving)
assert end is None, end
print('PASS: 110 silent 1080p frames; every exit frame moves only left; clear final frame.')
