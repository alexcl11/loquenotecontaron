#!/bin/bash
# uso: ./preview.sh <video_id>  -> out/<id>/sheet.jpg con un fotograma al final de cada escena (para revisar)
cd "$(dirname "$0")"; v=$1
ts=$(python3 -c "
import json
tl=json.load(open('out/$v/timeline.json'));s=[x['start'] for x in tl['scenes']]+[tl['T']]
print(' '.join(str(round(s[i+1]-0.4,2)) for i in range(len(s)-1)))")
rm -rf out/$v/prev; node rec.js out/$v preview $ts && ffmpeg -v error -y -pattern_type glob -i "out/$v/prev/*.jpg" -vf "scale=270:-1,tile=5x2:color=white" out/$v/sheet.jpg && echo out/$v/sheet.jpg
