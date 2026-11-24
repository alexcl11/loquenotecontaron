# Borrador 2026-11-27 · La olla exprés sí ahorra luz (y tiempo) (#67)

- Tema: "La olla exprés no ahorra energía" (bloque Cocina, Prio 2, invierno = legumbres y guisos + dinero). En los 6 anteriores de publicados.md (21/11–26/11) hay 2 de cocina (sobras, descongelar) → toca cocina. Entre los Cocina de Prio 2 (#65, #66, #67, #71) se elige #67 por ser el de dinero directo con cifras verificables (temporada de cuchara).
- Formato: B (el anterior, 2026-11-26 ventanas empañadas, fue A)
- Fecha de publicación: 2026-11-27 18:00 Europe/Madrid
- Estado: RENDER
- Vídeo: V['37_olla_expres']

## Veredicto (previsto → real)

MITO. La olla a presión cocina entre un 50 y un 70 % más rápido (OCU) y, al reducir el tiempo, baja el consumo de gas o electricidad. Para mantener el hervor, 150 W frente a 850 W de una olla abierta (datos IDAE citados por Selectra y OCU). Con garbanzos, una cacerola abierta 1 h 30 min ≈ 0,32 € de luz frente a ≈ 0,01 € en la olla (15 min): con un guiso a la semana, unos 16 € al año.

## Fuentes (abiertas en esta ejecución)

1. OCU, «Qué olla a presión comprar: claves para elegir la mejor» (09/04/2025): https://www.ocu.org/vivienda-y-energia/equipamiento-hogar/informe/ollas-presion
   - «los alimentos se cocinan entre un 50 % y un 70 % más rápido que en una olla convencional.»
   - «Al reducir el tiempo de cocción, también se disminuye el consumo de gas o electricidad»
2. Selectra, «¿Cuánta luz ahorra la olla a presión al cocer garbanzos en la placa frente a una cacerola con tapa?» (17/10/2026): https://selectra.es/energia/noticias/olla-presion-2026-legumbres-placa-tapa-consumo
   - «El IDAE da 850 W para el hervor en olla abierta, 150 W en olla a presión y hasta un 25 % menos con tapa»
   - «Con garbanzos que pidan 1 hora y media de cacerola, el ahorro sube a unos 1,24 kWh, unos 0,31 €.»
   - Tabla: olla abierta 1 h 30 min = 1,28 kWh / 0,32 €; olla a presión 15 min = 0,04 kWh / 0,01 € (24,82 c€/kWh, PVPC medio 1–15/10/2026)
   - «Con un guiso de legumbre a la semana, la diferencia puede estar entre 8 € y 16 € al año» (≈ 8 € lentejas, ≈ 16 € garbanzos, frente a cacerola abierta); «Frente a una cacerola tapada … al menos entre 6 € y 12 € al año.»
3. OCU Comunidad, «Ahorro de energía en la cocina y pequeños electrodomésticos» (act. 03/06/2025): https://www.ocu.org/comunidad/ahorrar-energia/eficiencia-energetica/conversacion/4714/ahorro-de-energia-en-la-cocina-y-pequenos-electrodomesticos
   - «para cocinar 1,5 litros de agua se necesitarían 850 W de potencia» «frente a los 150 W que requiere una olla a presión con un fondo grueso»; el IDAE recomienda primero microondas, luego olla a presión y por último el horno.
4. OCU, «Olla a presión: cocina rápida y sana» (2015): «puedes cocinar en la mitad de tiempo» (no se usa cifra; solo contexto).
5. Consumer (2018): «hasta un 50 % de energía» → NO se usa (sin fuente citada).
6. Comunidad de Madrid «Cómo ahorrar energía en la cocina…»: no menciona la olla → el 60 % que le atribuye Selectra NO se usa.

## Cifras que se usan (formato B, 3 datos)

- Dato clave: entre un 50 y un 70 % más rápido (OCU 2025).
- Apoyo 1: hervor 150 W en olla a presión frente a 850 W en olla abierta (IDAE, vía Selectra/OCU).
- Apoyo 2: garbanzos 1 h 30 min en cacerola ≈ 32 céntimos vs olla 15 min ≈ 1 céntimo; un guiso a la semana ≈ 16 € al año (Selectra, oct. 2026).
- Temperatura (OCU 2025): «el agua alcanza una temperatura de ebullición de hasta 120º».
- Uso: OCU 2025 «no sobrepases el nivel máximo de llenado (⅔ de su capacidad)», «espera a que la presión se libere completamente antes de abrir»; Selectra «Sube el fuego al máximo hasta que llegue la presión y pásalo luego a fuego mínimo»; «dejar bajar la válvula antes de abrir».
- Matiz: con tapa, la cazuela gasta «hasta un 25 % menos» (IDAE vía Selectra), «la olla sigue ganando».

## Guion

Ver pipeline/specs.py V['37_olla_expres'] (formato B, 10 segmentos, 73,8 s; pregunta temprana en el s 5,2). Sin siglas nuevas en PRON (OCU e IDAE ya estaban).

## Escenas

pipeline/ill_20261127.js (`op_*`) + kit nuevo pipeline/ill35.js (`expressPot`, `hobGlow`, `cutPot`, `barThermo`). 7 de 10 segmentos con escena ilustrada animada.
