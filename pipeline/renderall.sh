#!/bin/bash
cd /home/claude/canal
run(){ node rec.js out/$1 full && ffmpeg -v error -y -i out/$1/video.mp4 -i out/$1/mix.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=9 -c:a aac -b:a 192k -ar 44100 -ac 2 -shortest -movflags +faststart out/$1/final.mp4 && echo "DONE $1"; }
(run 01_standby; run 03_fregar; run 05_fechas) &
(run 02_led; run 04_pollo) &
wait; echo ALLDONE
