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
  - `ritmo.py <id>` comprueba el ritmo visual y la duración del formato (después de `build.py <id> timeline`).
- `contenido/` — banco de ideas con su estado y prioridad (columna Prio) y registro de publicaciones con su formato.
- `pipeline/ILUSTRACION.md` — kit de escenas animadas y cómo ampliarlo.
- `logo/` — foto de perfil, logo horizontal y portada de YouTube.

## Reglas editoriales

1. Cada dato se verifica en una fuente oficial (IDAE, OCU, AESAN, CNMC…) antes de guionizar.
2. Gancho de creencia equivocada + su coste en los primeros 3 s, pregunta temprana a comentarios (segundo 4–6) y otra al final. Algo cambia en pantalla cada pocos segundos (`pipeline/ritmo.py` lo comprueba).
3. Prueba A/B de formato (desde el 17/11/2026): A = 35–45 s con un dato, B = 60–75 s con hasta tres datos; se alternan y se anota el formato en `contenido/publicados.md` y en `FMT` de `pipeline/specs.py`. Publicación diaria a las 18:00 (Europe/Madrid).
4. Se declara como contenido con IA (voz sintética).
