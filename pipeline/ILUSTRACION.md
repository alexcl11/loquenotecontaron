# Escenas ilustradas (estilo obligatorio desde el 22/10/2026)

Cada vídeo se cuenta con **escenas narrativas**: un personaje en una casa hace lo que dice la voz (lava el pollo, apaga la luz, tira el arroz…). Los gráficos (`stat`, `bars`, `versus`, `badge`…) van encima de la ilustración o sobre un fondo atenuado (`cocina_fondo`, `salon_fondo`). Como mínimo 6 de cada 10 escenas deben ser ilustradas con acción, no solo iconos.

## Cómo se usa en `specs.py`

```python
dict(type='illus', name='pollo_lavar', marks=dict(rep='repartiendo'))
```
- `name`: función en `ILL` (archivos `ill*.js`).
- `marks`: palabras de la escena cuyo instante llega a la función como `c._m.<clave>` (segundos). `c._s` = inicio de la escena. Así la acción ocurre justo cuando la voz lo dice.
- Encima se añaden componentes normales. Zona libre para textos sobre la ilustración: y≈600–700 (arriba) o y≈1380–1450 (abajo).

## Kit disponible

| Archivo | Contenido |
| --- | --- |
| ill.js | `kitchen`, `counterFront`, `sink`, `faucet`, `waterStream`, **`person(o,t)` + `hands(o)`** (cintura arriba, brazos por IK: `lh`/`rh` = [x,y] de cada mano; `look`, `mouth` smile/o/worry/flat, `brow`, `shirt`, `apron`), `chicken(cook 0–1)`, `germ`, `burst`, `board`, `bowl`, `lemon`, `bottle`, `pan(fire)`, `thermo`, `steam`, `bubbles`, `labelTag`, `cam`/`camLerp` (zoom y paneo) |
| ill2.js | `salon` (lamp, dark, tvOn), `tvLed`, `router`, `decoder`, `speaker`, `printer`, `stereo`, `shelf`, `sofa`, `powerStrip`, `coin`, `wallSwitch`, `tube` (fluorescente), `bulb`, `dishwasher(open, load)`, `tank`, `plate`, `spatula`, `fridge(open, frost)`, `flake`, `meatTray`, `packet` (arroz/pasta/legumbres/harina/galletas/conservas/aceite/miel), `bin`, `dateLabel`, `pantry` |
| ill3.js | Escenas de los vídeos de standby, LED, fregar y fechas (ejemplos a copiar) |

Truco del personaje: siempre detrás de algo (encimera, sofá, mesa) para no dibujar piernas. Después de `person(o,t)` se dibujan los objetos que sostiene y luego `hands(o)`.

## Si un tema necesita algo que no existe

**Créalo.** Añade la función de dibujo (objeto, mueble, habitación, efecto) a `ill2.js` (objetos) o un archivo nuevo `ill4.js`… (y añádelo en `engine.html`), siguiendo el estilo: formas planas, esquinas redondeadas, paleta azul noche + ámbar, luz cálida, sin contornos negros, sin logos ni marcas reales, sin personajes conocidos. Documenta la función en la tabla de arriba. Revisa siempre el resultado con `preview.sh` (y fotogramas sueltos con `node rec.js out/<id> preview <segundos>`).

## Voz

`build.py` genera la voz por trozos según la puntuación (pausas controladas, sin silencios a mitad de frase). Escribe `say` con buena puntuación: comas donde se respira, puntos al cerrar idea, "…" para suspense, "¿…?" para preguntas. Se puede forzar una pausa con ` | ` (corta) o ` || ` (larga).

## Siglas (pronunciación)

El motor de voz lee las mayúsculas letra a letra ("LED" → "ele e de"). Por eso `build.py` tiene un diccionario `PRON` que convierte cada sigla en cómo se dice en España antes de generar la voz:
- Las que se dicen como palabra van en minúsculas: LED → "led", IDAE → "idáe", OCU → "ocu", AESAN → "aesán".
- Las que se deletrean van con los nombres de las letras en español: CNMC → "ce ene eme ce", USDA → "u ese de a".

Si un `say` contiene unas siglas que no están en `PRON`, `build.py tts` se detiene con un error. Hay que decidir cómo se pronuncian en España (si se dicen como palabra o se deletrean) y añadirlas a `PRON` antes de seguir. En los subtítulos (`show`) las siglas se escriben normal, en mayúsculas.
