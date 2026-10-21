#!/bin/bash
# uso: ./render.sh <video_id> [<video_id> ...]  -> genera voz, tiempos, render y out/<id>/final.mp4
set -e
cd "$(dirname "$0")"
for v in "$@"; do python3 build.py $v tts; python3 build.py $v timeline; done
run(){ node rec.js out/$1 full && ffmpeg -v error -y -i out/$1/video.mp4 -i out/$1/mix.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=9 -c:a aac -b:a 192k -ar 44100 -ac 2 -shortest -movflags +faststart out/$1/final.mp4 && echo "DONE $1"; }
ids=("$@"); for ((i=0;i<${#ids[@]};i+=2)); do run ${ids[i]} & [ -n "${ids[i+1]}" ] && run ${ids[i+1]} & wait; done
