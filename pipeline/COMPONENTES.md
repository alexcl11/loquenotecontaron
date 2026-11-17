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
| illus | name, marks:{clave: palabra} — escena ilustrada animada (ver ILUSTRACION.md) |
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

## Reglas comunes a los dos formatos (desde el 17/11/2026)

**Gancho = creencia equivocada + su coste (0–3 s).** Abre diciendo lo que la gente cree y lo que le cuesta creerlo, no con una pregunta suelta ni con una afirmación neutra. Modelo: el vídeo de ventilar (4.207 visualizaciones en Instagram): «¿En invierno no abres las ventanas para que no se escape el calor? Pues el problema no es ventilar… es cómo.»
- Forma: «Si haces X para [lo que crees que ganas]… [lo que de verdad pierdes / pagas / arriesgas].» Va con `stamp` o `pill` y una escena `illus` que ya muestra el coste.
- El coste solo lleva cifra si esa cifra está en una fuente que hayas abierto (regla de verificación de siempre). Sin cifra verificada, el coste se dice sin número («lo pagas tú», «se llena de hongos»). Nunca una cifra decorativa.
- Si el veredicto es «depende», el gancho dice de qué depende, y no promete un falso/verdadero.

**Ritmo después del gancho: algo cambia en pantalla cada pocos segundos.** El informe del 2/11 y el diagnóstico del 17/11 apuntan a que la audiencia se pierde después del gancho, no en él. Un «pulso» es un cambio visual o un dato nuevo: escena nueva, componente que aparece (`at`), acción de `marks` ligada a una palabra, elemento nuevo de `list`/`bars`/`grid`, número que entra (`stat`).
- Como máximo **4,5 s seguidos sin pulso** (aviso a partir de 3,5 s). Entre el segundo 3 y el 10 (justo después del gancho) hacen falta al menos 2 pulsos en A y 3 en B: ahí es donde se pierde la gente.
- Cada segmento de escena ilustrada lleva al menos 2 `marks` (la acción que cuenta la voz) además de la escena en sí. Si un segmento dura más de 5 s, añade un componente con `at` a mitad (`pill`, `stat`, `xmark`, `checkmark`).
- Un dato nuevo = una cifra, un ejemplo concreto o un contraste (`versus`), no una frase de relleno. En A hay un solo dato con fuente: el ritmo sale de la ilustración, no de más cifras.
- Se comprueba con `python3 ritmo.py <id>` (después de `build.py <id> timeline`; lee out/<id>/timeline.json). Si falla, se añaden pulsos y se vuelve a renderizar. `render.sh` no lo ejecuta solo: es un paso aparte.

## Prueba A/B de formato (en curso desde el 17/11/2026)

Los dos formatos comparten gancho y reglas de ritmo. Cambian la duración y la cantidad de datos. Cada vídeo declara el suyo en specs.py (`FMT['NN_tema']='A'|'B'`, debajo de su `V[...]`) y en la columna Formato de `contenido/publicados.md`.

| | A · corto (actual) | B · largo |
| --- | --- | --- |
| Duración | 35–45 s (válido 30–50) | 60–75 s (válido 55–80) |
| Segmentos | 6–7 | 9–11 |
| Datos con fuente | 1 | hasta 3 (el principal + 1–2 de apoyo, todos verificados) |
| Pregunta temprana a comentarios | segundo 4–6 | segundo 4–6 |

**Estructura A (35–45 s, 6–7 segmentos):**
1. Gancho: creencia + coste (0–3 s) con `stamp`/`pill` + `illus`.
2. Pregunta temprana a comentarios (hacia el segundo 4–6), corta y de respuesta fácil: `pill` o `quote` encima de la escena.
3. Fuente oficial + el dato clave (`badge` + `stat`), en una sola escena.
4–5. El mecanismo, un solo dato, una idea visual por segmento (ilustrada).
6. Qué hacer en su lugar.
7. Cierre corto que repite la pregunta (`bubble`), 3–4 s como mucho.
Nada de escena «reconocible» larga ni datos secundarios: si no cabe en 45 s, es otro vídeo.

**Estructura B (60–75 s, 9–11 segmentos):**
1. Gancho: creencia + coste (0–3 s), igual que en A.
2. Pregunta temprana a comentarios (segundo 4–6).
3. Fuente oficial + dato clave (`badge` + `stat`).
4–5. El mecanismo en dos pasos, con una escena ilustrada por paso.
6. Dato de apoyo con su fuente (otra cifra o contraste con `versus`/`bars`).
7. El cálculo en euros, tiempo o riesgo, con una cifra verificada o un ejemplo hecho con cifras verificadas (se enseña la cuenta).
8. Qué hacer en su lugar (con pasos concretos).
9. Matiz o excepción: cuándo la creencia sí es cierta, o el error vecino más común.
10. Cierre corto que repite la pregunta (`bubble`), 3–4 s como mucho.
En B no se añade relleno para llegar a 60 s: si falta material verificado, el vídeo se queda en A.

**Reglas de la prueba:**
- Se alterna siempre: el formato de un vídeo nuevo es el contrario al del vídeo anterior de `publicados.md`. El tema se elige primero (por prioridad del banco) y el formato después, para que el formato no condicione el tema.
- Lectura: cuando haya 5–6 vídeos de cada tipo (en torno al 5–8/12), se compara la mediana de visualizaciones de cada formato en cada red, y guardados/compartidos y % visto cuando haya dato. Solo se decide si un formato tiene al menos 1,5 veces la mediana del otro en 2 de las 3 redes; si no, el resultado es «inconcluso» y se sigue hasta 8 de cada tipo. (Ese 1,5 es un criterio práctico, no una prueba estadística; con tan pocos vídeos el ruido entre redes es grande.)
- No se cambian a la vez otras cosas (mascota, voz) mientras dure la lectura.

## Resto de reglas de escena

Las escenas deben ser ilustradas: ver ILUSTRACION.md. Comprobar con `./preview.sh <id>` (hoja de fotogramas) antes de renderizar y con `python3 ritmo.py <id>`. Revisar que no se solapen elementos y que el texto se lea.
