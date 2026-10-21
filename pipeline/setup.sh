#!/bin/bash
# Descarga el motor de voz (sherpa-onnx) y la voz Kokoro (es, id 53) desde GitHub
set -e
D=/tmp/claude-0/sherpa; mkdir -p $D; cd $D
B=https://github.com/k2-fsa/sherpa-onnx/releases/download
[ -d sherpa-onnx-v1.12.15-linux-x64-shared ] || { curl -sSL $B/v1.12.15/sherpa-onnx-v1.12.15-linux-x64-shared.tar.bz2 | tar xj; }
[ -d kokoro-multi-lang-v1_0 ] || { curl -sSL $B/tts-models/kokoro-multi-lang-v1_0.tar.bz2 | tar xj; }
echo "setup ok"
