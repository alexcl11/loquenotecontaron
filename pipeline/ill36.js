// ===== Kit de ilustración (36): punto del pollo/pavo asado — termómetro de pincho, tenedor de trinchar, gota de jugo, pollo en corte =====
// termómetro de cocina de pincho (genérico, sin marca). (x,y) = punta de la sonda; rot = inclinación (0 = sonda vertical, cuerpo arriba).
// val = lectura (número o texto); o.goal = grados objetivo (verde si val ≥ goal, ámbar si no); o.s escala; o.ins 0–1 = parte de la sonda escondida (pinchada)
// devuelve [x,y] del cuerpo (para la mano)
function probeThermo(x,y,rot,val,o={}){const s=o.s||1,goal=o.goal??74;const L=170;g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 const ins=o.ins??0;
 g.strokeStyle='#c9d3e0';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(0,-L*ins);g.lineTo(0,-L);g.stroke();
 g.strokeStyle='rgba(255,255,255,0.6)';g.lineWidth=2.5;g.beginPath();g.moveTo(-2,-L*ins-2);g.lineTo(-2,-L+6);g.stroke();
 // cuerpo
 g.fillStyle='#f4f6fb';rr(-62,-L-118,124,124,26);g.fill();g.fillStyle=C.amber;rr(-62,-L-26,124,20,[0,0,26,26]);g.fill();
 g.fillStyle='#10141c';rr(-48,-L-104,96,58,12);g.fill();
 const num=typeof val==='number';const ok=num&&val>=goal-0.01;const col=num?(ok?'#3ecf6e':'#ffcf5a'):'#8e98ad';
 g.fillStyle=col;g.font=`900 40px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(num?Math.round(val)+'°':String(val),0,-L-75);
 g.fillStyle='#c9d3e0';g.beginPath();g.arc(0,-L-30,7,0,7);g.fill();
 if(ok&&o.glow!==false){g.save();g.globalAlpha=0.35+0.25*Math.sin((o.t||0)*6);g.strokeStyle='#3ecf6e';g.lineWidth=6;rr(-68,-L-124,136,136,30);g.stroke();g.restore();}
 g.restore();const c=Math.cos(rot||0),sn=Math.sin(rot||0);const by=-(L+60)*s;return [x-sn*by,y+c*by];}
// tenedor de trinchar de dos púas. (x,y) = agarre; rot = ángulo de la línea mango→púas (0 = hacia la derecha). devuelve la punta
function carvingFork(x,y,rot=0,s=1){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.fillStyle='#4a3424';rr(-40,-11,80,22,10);g.fill();g.fillStyle='#c9b28a';g.beginPath();g.arc(-20,0,3,0,7);g.arc(18,0,3,0,7);g.fill();
 g.fillStyle='#c9d3e0';rr(38,-6,50,12,5);g.fill();
 g.strokeStyle='#c9d3e0';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(86,-8);g.lineTo(150,-11);g.moveTo(86,8);g.lineTo(150,11);g.stroke();
 g.restore();const c=Math.cos(rot),sn=Math.sin(rot);return [x+c*150*s,y+sn*150*s];}
// gota de jugo que cae desde (x,y): p 0–1 = recorrido; clear = jugo transparente (true) o rosado (false); s = escala
function juiceDrop(x,y,p,clear=true,s=1,fall=110){if(p<=0||p>=1)return;g.save();const yy=y+ease(p)*fall*s;g.globalAlpha*=Math.sin(p*Math.PI)*0.95+0.05;
 g.translate(x,yy);g.scale(s,s);g.fillStyle=clear?'rgba(255,236,190,0.85)':'rgba(240,130,130,0.9)';g.beginPath();g.moveTo(0,-26);g.quadraticCurveTo(16,0,14,8);g.arc(0,8,14,0,Math.PI);g.quadraticCurveTo(-16,0,0,-26);g.fill();
 g.fillStyle='rgba(255,255,255,0.75)';g.beginPath();g.ellipse(-5,4,4,7,-0.3,0,7);g.fill();g.restore();}
// gota grande quieta (icono) para tachar: centro (x,y), tamaño s
function bigDrop(x,y,s,clear=true){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=clear?'rgba(255,236,190,0.92)':'rgba(240,130,130,0.92)';g.beginPath();g.moveTo(0,-60);g.quadraticCurveTo(40,-6,36,16);g.arc(0,16,36,0,Math.PI);g.quadraticCurveTo(-40,-6,0,-60);g.fill();
 g.fillStyle='rgba(255,255,255,0.8)';g.beginPath();g.ellipse(-13,8,9,16,-0.3,0,7);g.fill();g.restore();}
// pollo asado en corte, centrado en (x,y), ancho w (alto ≈ 0,6·w). core 0–1 = tamaño del centro aún crudo (rosado); o.t; o.pulse = borde rojo que late en el centro
// devuelve {c:[x,y] del centro, r:[rx,ry] del centro crudo, skin:[x,y] borde superior de la piel}
function chickenCut(x,y,w,core,o={}){const t=o.t||0;const h=w*0.6;g.save();g.translate(x,y);
 g.fillStyle='rgba(0,0,0,0.28)';g.beginPath();g.ellipse(0,h*0.5,w*0.52,h*0.12,0,0,7);g.fill();
 // muslo a la derecha (detrás)
 g.save();g.translate(w*0.38,h*0.16);g.rotate(0.5);g.fillStyle=IL.cookedS;g.beginPath();g.ellipse(0,0,w*0.13,h*0.3,0,0,7);g.fill();g.fillStyle='#f6ead7';g.beginPath();g.arc(0,h*0.3,w*0.035,0,7);g.arc(-w*0.025,h*0.34,w*0.026,0,7);g.arc(w*0.025,h*0.34,w*0.026,0,7);g.fill();g.restore();
 // piel
 g.fillStyle=IL.cooked;g.beginPath();g.ellipse(0,0,w/2,h/2,0,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,0.22)';g.beginPath();g.ellipse(-w*0.15,-h*0.36,w*0.2,h*0.06,-0.15,0,7);g.fill();
 // carne cocinada
 g.fillStyle='#f1dcc0';g.beginPath();g.ellipse(0,h*0.04,w*0.44,h*0.4,0,0,7);g.fill();
 g.strokeStyle='rgba(200,160,120,0.35)';g.lineWidth=3;for(let i=0;i<7;i++){g.beginPath();g.ellipse(0,h*0.04,w*(0.1+i*0.05),h*(0.08+i*0.045),0,3.6,5.8);g.stroke();}
 // hueso
 g.fillStyle='#f6ead7';rr(w*0.08,h*0.02,w*0.28,h*0.07,h*0.035);g.fill();g.beginPath();g.arc(w*0.36,h*0.02,h*0.05,0,7);g.arc(w*0.36,h*0.1,h*0.05,0,7);g.fill();
 // centro crudo
 const k=cl(core);const rx=w*0.22*k,ry=h*0.2*k;
 if(k>0.02){const gr=g.createRadialGradient(-w*0.08,h*0.06,2,-w*0.08,h*0.06,Math.max(rx,ry));gr.addColorStop(0,'#f08a8a');gr.addColorStop(0.7,'#f3a3a0');gr.addColorStop(1,'rgba(243,190,170,0)');
  g.fillStyle=gr;g.beginPath();g.ellipse(-w*0.08,h*0.06,rx*1.25,ry*1.25,0,0,7);g.fill();
  if(o.pulse){g.strokeStyle=C.red;g.lineWidth=5;g.setLineDash([12,8]);g.globalAlpha=0.6+0.4*Math.sin(t*6);g.beginPath();g.ellipse(-w*0.08,h*0.06,rx*1.3+10,ry*1.3+10,0,0,7);g.stroke();g.setLineDash([]);g.globalAlpha=1;}}
 g.restore();return {c:[x-w*0.08,y+h*0.06],r:[rx,ry],skin:[x+w*0.1,y-h/2]};}
