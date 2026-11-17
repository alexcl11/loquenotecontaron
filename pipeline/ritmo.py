# -*- coding: utf-8 -*-
# Comprobador de ritmo visual (retención después del gancho).
# uso: python3 ritmo.py <video_id>      (después de `python3 build.py <id> timeline`)
#
# Lee out/<id>/timeline.json y cuenta los "pulsos": momentos en que cambia algo en pantalla
# (escena nueva, componente que aparece, acción de `marks` sincronizada con una palabra,
# elemento nuevo de una lista/barras). Mide el hueco más largo sin pulsos.
# Sale con código 1 si el vídeo es demasiado estático. No toca el motor ni el estilo.
import sys, os, json

ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ROOT)
from specs import V, FORMATOS, formato_de

vid = sys.argv[1]
fmt = formato_de(vid)
cfg = FORMATOS[fmt]
tl = json.load(open(f'{ROOT}/out/{vid}/timeline.json'))
T = tl['T']

beats = []
for sc in tl['scenes']:
    beats.append(sc['start'])
    for c in sc['comps']:
        if c.get('_t') is not None:
            beats.append(c['_t'])
        for t in (c.get('_m') or {}).values():
            if t is not None:
                beats.append(t)
        if c.get('_win') is not None:
            beats.append(c['_win'])
        for it in c.get('items', []):
            if it.get('_t') is not None:
                beats.append(it['_t'])
beats = sorted(set(round(b, 2) for b in beats if 0 <= b <= T))
pts = [0.0] + beats + [T - 1.3]  # el último segundo y pico es la cola de audio
gaps = [(pts[i + 1] - pts[i], pts[i]) for i in range(len(pts) - 1)]
worst, at = max(gaps)
early = [b for b in beats if 3.0 <= b <= 10.0]
dur_ok = cfg['dur'][0] <= T <= cfg['dur'][1]

print(f'{vid} formato {fmt} · duración {T:.1f} s (válido {cfg["dur"][0]}–{cfg["dur"][1]}) · {len(beats)} pulsos')
print(f'hueco más largo sin cambios: {worst:.1f} s (desde {at:.1f} s) · límite duro {cfg["gap_max"]} s, aviso {cfg["gap_aviso"]} s')
print(f'pulsos entre el segundo 3 y el 10 (justo después del gancho): {len(early)} · mínimo {cfg["tras_gancho_min"]}')
fallos = []
if not dur_ok:
    fallos.append(f'duración fuera de rango para el formato {fmt}')
if worst > cfg['gap_max']:
    fallos.append(f'hueco de {worst:.1f} s sin cambio visual ni dato nuevo (desde {at:.1f} s)')
if len(early) < cfg['tras_gancho_min']:
    fallos.append('pocos cambios justo después del gancho (3–10 s)')
if worst > cfg['gap_aviso'] and worst <= cfg['gap_max']:
    print('AVISO: hueco largo; si puedes, añade una marca (`marks`) o un componente con `at` ahí.')
if fallos:
    for f in fallos:
        print('FALLO:', f)
    sys.exit(1)
print('OK')
