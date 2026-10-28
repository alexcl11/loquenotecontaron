// ===== Kit: móvil y batería (2026-10-31) =====
// color de batería por nivel (0–1): rojo <20 %, ámbar <50 %, verde
function battCol(l){return l<0.2?C.red:(l<0.5?C.amber:C.green);}
// icono de batería grande (x,y centro; w ancho). o: {bolt, blink, t, col, lost (0–1: capacidad "perdida" en gris a la derecha)}
function battIcon(x,y,w,lv,o={}){const h=w*0.52;const a=o.blink?0.45+0.55*Math.abs(Math.sin((o.t||0)*5)):1;g.save();g.globalAlpha*=a;
 const bw=w*0.9,x0=x-w/2;g.strokeStyle='#e9eef5';g.lineWidth=w*0.07;rr(x0,y-h/2,bw,h,h*0.22);g.stroke();g.fillStyle='#e9eef5';rr(x0+bw+w*0.02,y-h*0.2,w*0.08,h*0.4,w*0.03);g.fill();
 const pad=w*0.08,iw=bw-2*pad,ih=h-2*pad;const lost=cl(o.lost||0);
 if(lost>0){g.save();g.fillStyle='#5c667a';rr(x0+pad+iw*(1-lost),y-h/2+pad,iw*lost,ih,h*0.1);g.fill();g.strokeStyle='rgba(255,255,255,0.18)';g.lineWidth=w*0.02;g.beginPath();g.rect(x0+pad+iw*(1-lost),y-h/2+pad,iw*lost,ih);g.clip();for(let k=-6;k<12;k++){g.beginPath();g.moveTo(x0+pad+iw*(1-lost)+k*w*0.06,y+h/2);g.lineTo(x0+pad+iw*(1-lost)+k*w*0.06+h,y-h/2);g.stroke();}g.restore();}
 const f=cl(lv)*(1-lost);if(f>0.005){g.fillStyle=o.col||battCol(lv);rr(x0+pad,y-h/2+pad,Math.max(iw*f,h*0.12),ih,h*0.1);g.fill();}
 if(o.bolt){g.fillStyle='#fff';g.strokeStyle='#1b1f2a';g.lineWidth=w*0.03;g.beginPath();const bx=x-w*0.04,s=h*0.42;g.moveTo(bx+s*0.25,y-s);g.lineTo(bx-s*0.45,y+s*0.12);g.lineTo(bx-s*0.02,y+s*0.12);g.lineTo(bx-s*0.25,y+s);g.lineTo(bx+s*0.45,y-s*0.12);g.lineTo(bx+s*0.02,y-s*0.12);g.closePath();g.stroke();g.fill();}
 g.restore();}
// móvil moderno genérico (120×240 a escala 1) con la batería en pantalla. o: {lvl 0–1, chg (cargando), off (pantalla apagada), t, pct (mostrar %; por defecto sí)}
function mobile(x,y,s,rot,o={}){const lv=o.lvl??1;g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle='#1b1f2a';rr(-60,-120,120,240,22);g.fill();g.fillStyle='#2a3040';rr(-62,-60,4,36,2);g.fill();
 g.fillStyle=o.off?'#05070c':'#101b36';rr(-52,-110,104,220,16);g.fill();
 if(!o.off){const gl=g.createRadialGradient(0,-10,4,0,-10,110);gl.addColorStop(0,'rgba(91,140,255,0.35)');gl.addColorStop(1,'rgba(91,140,255,0)');g.fillStyle=gl;rr(-52,-110,104,220,16);g.fill();
  battIcon(0,-18,70,lv,{bolt:o.chg,blink:lv<0.06&&!o.chg,t:o.t});if(o.pct!==false)txt(Math.round(cl(lv)*100)+' %',0,40,30,lv<0.2?'#ff8a8a':'#fff',900);
  g.fillStyle='rgba(255,255,255,0.08)';g.beginPath();g.moveTo(-52,-110);g.lineTo(10,-110);g.lineTo(-52,10);g.closePath();g.fill();}
 g.fillStyle='#1b1f2a';rr(-14,-106,28,8,4);g.fill();g.restore();}
// cable de carga (curva) y enchufe de pared con cargador; wallSocket devuelve el punto de salida del cable
function cable(x1,y1,x2,y2,sag=60){g.save();g.strokeStyle='#e9eef5';g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.quadraticCurveTo((x1+x2)/2,Math.max(y1,y2)+sag,x2,y2);g.stroke();g.restore();}
function wallSocket(x,y,plug=1){g.fillStyle='#e9e4d8';rr(x-38,y-38,76,76,12);g.fill();g.fillStyle='#cfc8b8';g.beginPath();g.arc(x,y,24,0,7);g.fill();
 if(plug){g.fillStyle='#f4f6fb';rr(x-24,y-26,48,52,10);g.fill();g.fillStyle='#d5dbe5';rr(x-24,y+16,48,10,[0,0,10,10]);g.fill();return [x,y+26];}
 g.fillStyle='#4a4436';g.beginPath();g.arc(x-9,y,4,0,7);g.arc(x+9,y,4,0,7);g.fill();return [x,y];}
// móvil antiguo genérico tipo "ladrillo" (antena, pantalla verde, teclado)
function brickPhone(x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);g.fillStyle='#2b2f38';rr(18,-190,16,80,7);g.fill();
 g.fillStyle='#3a3f4a';rr(-50,-130,100,260,20);g.fill();g.fillStyle='#4a505d';rr(-50,-130,100,16,[20,20,0,0]);g.fill();
 g.fillStyle='#22262e';rr(-38,-104,76,64,8);g.fill();g.fillStyle='#a9c98a';rr(-32,-98,64,52,5);g.fill();g.fillStyle='#5f7d4a';for(let i=0;i<4;i++)g.fillRect(-24,-90+i*11,i==0?22:44-i*6,5);
 for(let j=0;j<4;j++)for(let i=0;i<3;i++){g.fillStyle=j==0&&i!=1?'#d98a4a':'#cfd5df';rr(-34+i*25,-20+j*30,18,16,6);g.fill();}g.restore();}
// anillo de "ciclo de carga": a (ámbar) + b (azul) en fracciones 0–1; o: {done 0–1 (verde), txt, sub}
function cycleRing(x,y,r,a,b,o={}){g.save();g.lineCap='round';g.lineWidth=r*0.22;g.strokeStyle='rgba(255,255,255,0.12)';g.beginPath();g.arc(x,y,r,0,7);g.stroke();const st=-Math.PI/2;
 if(a>0.002){g.strokeStyle=C.amber;g.beginPath();g.arc(x,y,r,st,st+Math.PI*2*a);g.stroke();}
 if(b>0.002){g.strokeStyle=C.blue;g.beginPath();g.arc(x,y,r,st+Math.PI*2*a,st+Math.PI*2*(a+b));g.stroke();}
 if(o.done>0){g.globalAlpha=cl(o.done);g.strokeStyle=C.green;g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.globalAlpha=1;}
 g.restore();if(o.txt)txt(o.txt,x,y-(o.sub?r*0.12:0),r*0.36,'#fff',900,'center',1,r*1.5);if(o.sub)txt(o.sub,x,y+r*0.3,r*0.16,'#c9d1e0',800,'center',1,r*1.5);}
// taco de calendario de pared; flip 0–1 = la hoja anterior sale hacia arriba
function calendarPad(x,y,s,day,flip=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#f4f1ea';rr(-70,-80,140,160,12);g.fill();g.fillStyle=C.red;rr(-70,-80,140,44,[12,12,0,0]);g.fill();
 g.fillStyle='#2a1d17';g.beginPath();g.arc(-35,-80,6,0,7);g.arc(35,-80,6,0,7);g.fill();txt(String(day),0,22,70,'#1a1f2b',900);
 if(flip>0&&flip<1){g.save();g.globalAlpha=1-flip;g.translate(0,-36-flip*60);g.rotate(-0.3*flip);g.fillStyle='#f4f1ea';rr(-70,0,140,116,10);g.fill();txt(String(Math.max(1,day-1)),0,58,70,'#1a1f2b',900);g.restore();}
 g.restore();}
// telaraña (rincón) y polvo para "mucho tiempo sin tocar"
function cobweb(x,y,r,a,dir=1){if(a<=0)return;g.save();g.globalAlpha=0.5*a;g.strokeStyle='#dfe5f0';g.lineWidth=2;for(let k=0;k<5;k++){const an=k/4*Math.PI/2;g.beginPath();g.moveTo(x,y);g.lineTo(x+dir*Math.cos(an)*r,y+Math.sin(an)*r);g.stroke();}
 for(let j=1;j<=3;j++){g.beginPath();for(let k=0;k<=4;k++){const an=k/4*Math.PI/2;const rr2=r*j/3.4;const px=x+dir*Math.cos(an)*rr2,py=y+Math.sin(an)*rr2;k?g.quadraticCurveTo(x+dir*Math.cos(an-0.2)*rr2*0.9,y+Math.sin(an-0.2)*rr2*0.9,px,py):g.moveTo(px,py);}g.stroke();}g.restore();}
function dust(x,y,w,h,a,n=18){if(a<=0)return;g.save();g.fillStyle='rgba(200,205,215,0.55)';for(let i=0;i<n;i++){if(rnd(i+70)>a)continue;g.beginPath();g.arc(x-w/2+rnd(i+3)*w,y-h/2+rnd(i+33)*h,2+rnd(i)*3,0,7);g.fill();}g.restore();}
// accesorios para person(): gafas (después de person) y moño (antes de person). Útil para un familiar mayor (hair '#c9ccd6')
function glasses(o,t){const s=o.s||1,x=o.x,hy=o.y-310*s+Math.sin(t*2.2)*3*s;g.save();g.strokeStyle='#2a1d17';g.lineWidth=4*s;[-24,24].forEach(dx=>{g.beginPath();g.arc(x+dx*s,hy+5*s,17*s,0,7);g.stroke();});g.beginPath();g.moveTo(x-7*s,hy+3*s);g.quadraticCurveTo(x,hy-2*s,x+7*s,hy+3*s);g.stroke();g.restore();}
function bun(o,t){const s=o.s||1,x=o.x,hy=o.y-310*s+Math.sin(t*2.2)*3*s;g.fillStyle=o.hair||IL.hair;g.beginPath();g.arc(x,hy-74*s,30*s,0,7);g.fill();}
