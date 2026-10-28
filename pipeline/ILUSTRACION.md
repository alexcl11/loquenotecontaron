# Escenas ilustradas (estilo obligatorio desde el 22/10/2026)

Cada vídeo se cuenta con **escenas narrativas**: un personaje en una casa hace lo que dice la voz (lava el pollo, apaga la luz, tira el arroz…). Los gráficos (`stat`, `bars`, `versus`, `badge`…) van encima de la ilustración o sobre un fondo atenuado (`cocina_fondo`, `salon_fondo`, `bano_fondo`). Como mínimo 6 de cada 10 escenas deben ser ilustradas con acción, no solo iconos.

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
| ill4.js | **Baño**: `bathroom(t,{open})` (azulejos, espejo, toallero, ventana que se abre 0–1 con brisa), `vanityFront` (encimera del lavabo, delante del personaje), `basin(x)`. **Limpieza**: `cleanBottle(x,y,s,rot,kind)` (kind `lejia`/`amoniaco`/`salfuman`/`vinagre`, genéricas sin marca; devuelve la boca para verter), `pourStream`, `bucket(x,y,s,lvl,col)` (cubo de fregar), `gasCloud(x,y,r,t,a,col)` (nube tóxica), `hazeOverlay`, `tears`, `coughFx`, `glassCup`, `cloth`, `sparkle`. **Otros**: `smartphone(x,y,s,rot,ring,t)`, `headset(o)` (cascos de teleoperador sobre `person`), `houseFront(x,y,w,t,gas)` (fachada con ventana; `gas` la llena de nube). Fondo atenuado `bano_fondo` |
| ill_20261027.js | Escenas del vídeo de la lejía (`lj_*`): verter dos productos, baño con gas, centralita de llamadas, casas, botellas con %, cloramina en la cara, receta segura, ventana + teléfono |
| ill5.js | **Horno**: `ovenBody(t,{x,y,w,h,heat,glow,energy,light,knob,knob2,column,food})` (horno en columna sobre la encimera, a la derecha del personaje en x≈560; panel con mandos, barra de energía de 6 segmentos sin cifras y botón de luz; `glow` = calor residual de la cavidad; `food(x,y)` dibuja lo de dentro), `ovenDoor(t,o,open,light)` (puerta abatible; se dibuja después de `counterFront`), `ovenHandle(o,open)` (posición del tirador para la mano), `ovGeo`, `knob`, `cakeMold(x,y,s,cook,rise)` (bizcocho en molde), `heatOut` (aire caliente que sale), `coldIn` (flechas de aire frío que entra). **Cocina**: `microwave(x,y,s,t,on)`, `pressureCooker(x,y,s,t,steam)`, `hobPan(x,y,s,t,fire)` (placa + sartén), `wallClock(x,y,r,t,spin)`, `costMeter(x,y,h,p,col)` (barra de gasto sin cifras para comparar aparatos) |
| ill_20261028.js | Escenas del vídeo del horno (`hn_*`): abrir y cerrar con la barra de energía bajando, dudas, cara en el vapor, aire caliente/frío + monedas, ranking de gasto de aparatos, precalentar con reloj, apagar antes con calor residual, luz + mirar por el cristal |
| ill6.js | **Calefacción**: `wallThermostat(x,y,s,val,{off,glow,col})` (termostato de pared con anillo y número; color por temperatura con `tempCol`: azul ≤17, verde 18–21, ámbar 22–23, rojo ≥24), `radiator(x,y,w,h,heat,t,{valve,vk})` (radiador de elementos; `valve` dibuja válvula termostática y devuelve su posición), `heatWaves` (ondas de aire caliente), `bigThermo(x,y,h,val,{lo,hi,goal,goalTxt,col})` (termómetro grande con escala; devuelve f(grados)→y), `scarf(o,t,col)` (bufanda) y `jerseyCollar(o,t)` (cuello de jersey) sobre `person`, `shiverFx` (tiritona), `blind(x,y,w,h,down)` (persiana), `bedroom(t,{temp,off,lamp,blind,dark})` (dormitorio con ventana, cabecero, almohada, mesilla y termostato), `duvet(t)` (edredón delante del personaje sentado en la cama), `zzz`, `energyHouse(x,y,w,fill,t)` (casa que se llena de calor, sin cifras) |
| ill_20261029.js | Escenas del vídeo de la calefacción (`cf_*`): subir un grado, llegar helado y ponerlo a tope, dos termómetros a la misma velocidad (límite, no acelerador), monedas por grado, casa a medio llenar, sofá con jersey a 19–21 °C, dormitorio de noche, ventilar/persianas/válvulas. Incluye `scr(x,y)` para pasar de coordenadas de mundo a pantalla y poner etiquetas fuera del zoom |
| ill7.js | **Sobras**: `stockPot(x,y,s,t,{lid,steam,soup})` (olla grande de guiso, base en y), `tupper(x,y,s,fill,lid,col,soup)` (táper poco hondo con tapa que baja), `ladle(x,y,rot,full)` (cucharón en la mano), `drip`, `iceBath(x,y,w,t,lvl,ice,content)` (cuenco de cristal con agua fría y cubitos; `content(x,yAgua)` dibuja lo que flota), `zoneThermo(x,y,h,val,{zh,zc,zm})` (termómetro de comida 0–80 °C con bandas: roja ≥60, ámbar en medio, azul ≤5; devuelve f(grados)→y), `workFx(x,y,w,h,t,a)` (vibración de aparato trabajando), `warmHalo` (calor que templa lo de alrededor). En `person` se puede pasar `bend:[izq,der]` (1 o −1) para que el codo vaya hacia abajo cuando la mano cruza el cuerpo |
| ill_20261030.js | Escenas del vídeo de las sobras (`sb_*`): olla en el fuego toda la tarde con reloj y bacterias, termómetro de zonas 60/5 °C, nevera que trabaja y templa, repartir en tápers con cucharón, baño de agua fría con hielo y tapa, guardar en la nevera, recalentar a 70 °C |
| ill8.js | **Móvil y batería**: `mobile(x,y,s,rot,{lvl,chg,off,t,pct})` (móvil genérico 120×240 a escala 1, con icono de batería y % en pantalla; `chg` = rayo de carga, `off` = pantalla apagada; parpadea en rojo por debajo del 6 %), `battIcon(x,y,w,lvl,{bolt,blink,t,col,lost})` (batería grande; color por nivel con `battCol`; `lost` = capacidad perdida en gris rayado, para el efecto memoria), `cable(x1,y1,x2,y2,sag)` (cable de carga), `wallSocket(x,y,plug)` (enchufe de pared con cargador; devuelve la salida del cable), `brickPhone(x,y,s,rot)` (móvil antiguo tipo ladrillo, genérico), `cycleRing(x,y,r,a,b,{done,txt,sub})` (anillo de ciclo de carga: tramo ámbar + azul, verde al completar), `calendarPad(x,y,s,day,flip)` (taco de calendario que pasa hojas), `cobweb(x,y,r,a,dir)` y `dust(x,y,w,h,a)` (telaraña y polvo: "mucho tiempo sin tocar"). Accesorios de `person`: `glasses(o,t)` (después de person) y `bun(o,t)` (moño, antes de person) para un familiar mayor con `hair:'#c9ccd6'` |
| ill_20261031.js | Escenas del vídeo de la batería (`bt_*`): esperar a que el móvil se apague en el sofá, el consejo de la abuela, níquel-cadmio vs iones de litio, móvil olvidado a 0 % con calendario y polvo, ciclo 75 % + 25 % = 1 ciclo con día/noche, carga nocturna en la mesilla con carga optimizada, termómetro 16–22 °C / 35 °C, sacar el móvil de debajo de la almohada a la mesilla |

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

Nota: `preview.sh` monta la hoja en 5×2; con 11 escenas falla al escribir la hoja (los fotogramas en `out/<id>/prev/` sí se generan). Montarla a mano con `tile=6x2` y `-frames:v 1`.
