# Cómo escribir un vídeo nuevo en `specs.py`

Cada vídeo es `V['<NN>_<tema>'] = [segmento, ...]`. Cada segmento:

- `say`: lo que lee la voz. Números y siglas escritos como se pronuncian ("sesenta litros", "tu gud tu góu").
- `show` (opcional): lo que se ve en subtítulos, con cifras ("60 litros"). Mismas palabras que `say` en el mismo orden.
- `kw`: palabras de `show` que se resaltan (2–3 por segmento; se comparan sin puntuación ni mayúsculas).
- `scene`: lista de componentes. Si se omite, sigue la escena anterior.
- `pause` (opcional): segundos extra de silencio después.

Cada componente admite `at`: una palabra (o su inicio) de la escena en la que aparece. Sin `at` aparece al empezar la escena.
Lienzo 1080×1920; los subtítulos ocupan y≈250–420; la zona útil de la escena es y≈650–1450. Iconos = emojis.

| type | parámetros |
| --- | --- |
| tile | icon, x?, y, size?, glow? (red/green/amber/blue), dot? (piloto rojo), border?, xAt? (tacha el icono) |
| stamp | text, y, size?, color? (por defecto red) — sello con flash, para el gancho ("✕ FALSO") |
| pill | text, y, color? (amber/green/red/blue/purple/gray), size? |
| text | text, y, size?, color? (gray/…) |
| stat | value, label?, y, color?, size? — cifra grande |
| badge | name, full, flag?, y — tarjeta de fuente oficial (solo texto, nunca logos reales) |
| bars | y, h?, title?, items:[{label, v, text, color, at?}], max? |
| grid | cols, y, size?, items:[{icon, label?, value?, hl?, at?}] |
| list | y, gap?, items:[{icon, text, ok: true/false/None, at?}] |
| versus | y, a:{icon,title,sub?,color?}, b:{…}, win? ('a'/'b'), winAt?, vs? |
| bubble | q, y — pregunta final a comentarios |
| quote | text, y — bocadillo con una frase típica |
| donut | pct, label, y, x? |
| progress | label, y, color? |
| germs | y, x?, n? — bacterias que salpican |
| checkmark / xmark | x?, y, r? |
| arrow | x1, y1, x2, y2 |

Estructura que funciona (55–70 s, 9–11 segmentos):
1. Gancho de corrección: "Si haces X… [no consigues Y]" + `tile` + `stamp`.
2. Bucle abierto: "Y lo que sí funciona…".
3. Fuente oficial: `badge` + `stat`.
4. Escena reconocible ("Seguro que…").
5–8. Mecanismo, con una idea visual por segmento (`bars`, `versus`, `grid`, `list`).
9. Qué hacer en su lugar (`list`).
10. Pregunta a comentarios: `bubble` + pill "TE LEO EN COMENTARIOS 👇".

Comprobar con `./preview.sh <id>` (hoja de fotogramas) antes de renderizar. Revisar que no se solapen elementos y que el texto se lea.
