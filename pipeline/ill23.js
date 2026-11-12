// ===== Kit: cargador del móvil y medidor de consumo (2026-11-15) =====
// cargador USB genérico (blanco, sin marca ni logo) visto de frente. (x,y) = centro; s = escala (1 ≈ 64×76);
// rot = giro; o.pins = patillas metálicas asomando por arriba (cuando está fuera del enchufe).
// Devuelve el punto de salida del cable (abajo, en coordenadas de mundo) para cable()/cableTip().
function chargerBrick(x,y,s=1,rot=0,o={}){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 if(o.pins){g.fillStyle='#c3cad6';rr(-17,-62,10,28,4);g.fill();rr(7,-62,10,28,4);g.fill();g.fillStyle='#9aa3b2';rr(-17,-62,10,6,3);g.fill();rr(7,-62,10,6,3);g.fill();}
 g.fillStyle='rgba(0,0,0,0.22)';rr(-28,-33,64,76,14);g.fill();
 g.fillStyle='#f4f6fb';rr(-32,-38,64,76,14);g.fill();g.fillStyle='#dde3ec';rr(-32,20,64,18,[0,0,14,14]);g.fill();
 g.fillStyle='rgba(255,255,255,0.75)';rr(-24,-30,9,38,5);g.fill();
 g.fillStyle='#2a3040';rr(-10,29,20,6,3);g.fill();
 g.restore();const c=Math.cos(rot),sn=Math.sin(rot);return [x-sn*40*s,y+c*40*s];}
// punta del cable USB-C (suelta, sin móvil). (x,y) = extremo; rot = dirección del cable
function cableTip(x,y,rot=0,s=1){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.fillStyle='#e9eef5';rr(-9,-26,18,30,6);g.fill();g.fillStyle='#b9c0cc';rr(-6,2,12,12,3);g.fill();g.restore();}
// cable que cuelga del cargador hasta un punto (x2,y2) y termina en la punta USB-C
function chargerCable(p,x2,y2,sag=60){cable(p[0],p[1],x2,y2,sag);cableTip(x2,y2+8,0);}
// medidor de consumo enchufable genérico (sin marca): cuerpo blanco con pantalla LCD verde arriba y enchufe hembra abajo.
// (x,y) = centro; s = escala (1 ≈ 120×190); val = texto de la pantalla ('0,1 W'); o.glow 0–1 = la pantalla se ilumina.
// Devuelve el centro del enchufe hembra (donde se pinta lo que va enchufado).
function plugMeter(x,y,s=1,val='',o={}){g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-56,-90,120,190,24);g.fill();
 g.fillStyle='#eef1f6';rr(-60,-95,120,190,24);g.fill();g.fillStyle='#d6dce6';rr(-60,60,120,35,[0,0,24,24]);g.fill();
 const gl=o.glow??1;g.fillStyle='#1d2a22';rr(-46,-78,92,52,10);g.fill();
 if(gl>0){g.save();g.globalAlpha=gl;g.fillStyle='#2f5a3c';rr(-42,-74,84,44,8);g.fill();const gr=g.createRadialGradient(0,-52,4,0,-52,60);gr.addColorStop(0,'rgba(120,255,160,0.35)');gr.addColorStop(1,'rgba(120,255,160,0)');g.fillStyle=gr;g.fillRect(-60,-110,120,110);g.restore();
  if(val)txt(val,0,-51,26,'#b6ffcb',900,'center',gl,80);}
 g.fillStyle='#c9cfd9';rr(-30,-16,60,10,5);g.fill();
 g.fillStyle='#d9dee7';g.beginPath();g.arc(0,40,32,0,7);g.fill();g.fillStyle='#4a4436';g.beginPath();g.arc(-11,40,4.5,0,7);g.arc(11,40,4.5,0,7);g.fill();
 g.restore();return [x,y+40*s];}
