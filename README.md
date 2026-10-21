# Lo que no te contaron

Mitos del hogar y el ahorro, en vídeos verticales de ~60 s.

- TikTok / Instagram: @loquenotecontaron.es
- YouTube: @loquenotecontarones (pendiente)

## Estructura

- `videos/` — vídeos finales, nombrados `AAAA-MM-DD_tema.mp4` (fecha de publicación). Metricool los descarga desde la URL raw de GitHub.
- `pipeline/` — plantilla de animación y scripts:
  - `setup.sh` descarga el motor de voz (sherpa-onnx + Kokoro, voz española id 53).
  - `specs.py` guion, palabras clave y escenas de cada vídeo.
  - `build.py <id> tts|timeline` genera la voz, los tiempos y la mezcla de audio.
  - `engine.html` + `rec.js` renderizan los fotogramas (Playwright) a MP4.
- `contenido/` — banco de ideas con su estado y registro de publicaciones.
- `logo/` — foto de perfil, logo horizontal y portada de YouTube.

## Reglas editoriales

1. Cada dato se verifica en una fuente oficial (IDAE, OCU, AESAN, CNMC…) antes de guionizar.
2. Gancho de corrección en los primeros 3 s, pregunta a comentarios al final.
3. Duración 60–70 s. Publicación diaria a las 18:00 (Europe/Madrid).
4. Se declara como contenido con IA (voz sintética).
