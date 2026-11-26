// ===== Kit de ilustración (37): purgar radiadores — radiador con aire arriba, corte de un elemento con la bolsa de aire, purgador, soplo de aire, manómetro de caldera =====
// radiador con bolsa de aire: los elementos se calientan de abajo arriba (heat 0–1) salvo la franja de arriba (air 0–1 = fracción fría).
// o.bleed: dibuja el purgador arriba a la derecha (o.bk 0–1 = giro). o.waves (por defecto true): ondas de calor solo de la parte caliente.
// Devuelve {bleed:[x,y], coldY} (centro del purgador y límite entre la parte fría y la caliente)
function airRad(x,y,w,h,heat,air,t,o={}){const n=Math.max(4,Math.round(w/34)),fw=w/n,coldY=y+h*air;
 g.fillStyle='#8592a6';g.fillRect(x-30,y+h-26,w+60,10);
 const hot=mixc('#dfe4ec','#ffc28f',heat),cold='#bcd3f0';
 for(let i=0;i<n;i++){const ex=x+i*fw+3;const gr=g.createLinearGradient(0,y,0,y+h);const a=cl(air);
  gr.addColorStop(0,a>0.02?cold:hot);gr.addColorStop(Math.max(0.001,a*0.85),a>0.02?cold:hot);gr.addColorStop(Math.min(0.999,a+0.12),hot);gr.addColorStop(1,hot);
  g.fillStyle=gr;rr(ex,y,fw-6,h,12);g.fill();g.fillStyle='rgba(0,0,0,0.07)';rr(x+i*fw+fw*0.55,y+8,fw*0.25,h-16,6);g.fill();}
 g.fillStyle=air>0.05?'#aec4e2':mixc('#c9d1dc','#f0b088',heat);g.fillRect(x,y+14,w,8);g.fillStyle=mixc('#c9d1dc','#f0b088',heat);g.fillRect(x,y+h-22,w,8);
 if(air>0.05&&o.frost!==false){g.save();g.globalAlpha=0.55*cl(air*3);for(let i=0;i<n;i++)flake(x+i*fw+fw/2,y+h*air*0.45,7,t*0.4+i);g.restore();}
 if(o.waves!==false&&heat>0.05)heatWaves(x+w/2,y-10+h*air*0.6,w*0.8,t,heat*(1-0.85*air));
 const bx=x+w+8,by=y+20;if(o.bleed){g.fillStyle='#c9d1dc';g.fillRect(x+w-6,by-7,18,14);g.save();g.translate(bx+6,by);g.rotate((o.bk||0)*Math.PI*1.5);
  g.fillStyle='#e8ecf2';g.beginPath();for(let k=0;k<6;k++){const an=k*Math.PI/3;g.lineTo(Math.cos(an)*13,Math.sin(an)*13);}g.closePath();g.fill();g.fillStyle='#8592a6';g.fillRect(-9,-2.5,18,5);g.restore();}
 return {bleed:[bx+6,by],coldY};}
// corte grande de un elemento del radiador: agua caliente dentro, bolsa de aire arriba (air 0–1 de la altura), burbujas que suben desde la entrada (bub 0–1),
// flechas de agua caliente (flow 0–1) que suben y se dan la vuelta al llegar a la bolsa. o.cold = brillo azul de la bolsa (pulso). Devuelve la y del agua
function radCut(x,y,w,h,t,o={}){const air=o.air||0,yw=y+h*air;
 g.fillStyle='rgba(0,0,0,0.3)';rr(x-14,y-6,w+40,h+24,40);g.fill();
 g.fillStyle='#e8ecf2';rr(x-18,y-18,w+36,h+36,44);g.fill();
 g.save();rr(x,y,w,h,30);g.clip();
 const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#f2a33a');gr.addColorStop(1,'#e5484d');g.fillStyle=gr;g.fillRect(x,y,w,h);
 // ondas en el agua
 g.strokeStyle='rgba(255,255,255,0.14)';g.lineWidth=4;for(let k=0;k<6;k++){const yy=yw+40+k*((h-h*air-40)/6);g.beginPath();for(let j=0;j<=10;j++){const xx=x+j*w/10;const v=yy+Math.sin(j*0.9+t*3+k)*5;j?g.lineTo(xx,v):g.moveTo(xx,v);}g.stroke();}
 if(air>0){const ag=g.createLinearGradient(0,y,0,yw);ag.addColorStop(0,'#dbe9fb');ag.addColorStop(1,'#a9c6ee');g.fillStyle=ag;g.fillRect(x,y,w,yw-y);
  g.fillStyle='rgba(255,255,255,0.8)';g.beginPath();g.moveTo(x,yw);for(let j=0;j<=20;j++)g.lineTo(x+j*w/20,yw+Math.sin(j*0.8+t*4)*4);g.lineTo(x+w,yw+6);g.lineTo(x,yw+6);g.fill();
  if(o.cold){g.save();g.globalAlpha=0.35*o.cold*(0.6+0.4*Math.sin(t*5));g.fillStyle='#3d7bff';g.fillRect(x,y,w,yw-y);g.restore();}
  g.save();g.globalAlpha=0.6*cl(air*4);for(let i=0;i<4;i++)flake(x+w*(0.2+i*0.2),y+(yw-y)*0.5+Math.sin(i*2)*10,10,t*0.4+i);g.restore();}
 // burbujas que suben desde la entrada de abajo y se juntan arriba
 const bub=o.bub||0;if(bub>0){for(let i=0;i<14;i++){const ph=(t*0.45+rnd(i+3))%1;const by=lerp(y+h-30,yw+14,ph);const bx=x+w*(0.25+0.5*rnd(i+11))+Math.sin(t*3+i)*10;const r=7+rnd(i)*9;
  g.globalAlpha=bub*cl((1-ph)*4)*0.9;g.strokeStyle='#fff';g.lineWidth=3;g.fillStyle='rgba(220,235,255,0.55)';g.beginPath();g.arc(bx,by,r,0,7);g.fill();g.stroke();}g.globalAlpha=1;}
 // flechas de agua caliente: suben por el centro y se dan la vuelta bajo la bolsa
 const fl=o.flow||0;if(fl>0){g.save();g.globalAlpha=fl;g.strokeStyle='#fff3c4';g.lineWidth=9;g.lineCap='round';g.lineJoin='round';
  for(let k=0;k<2;k++){const sd=k?1:-1;const cx=x+w/2+sd*w*0.18;const top=yw+50;const ph=(t*0.8+k*0.5)%1;g.setLineDash([26,22]);g.lineDashOffset=-ph*48;
   g.beginPath();g.moveTo(cx,y+h-30);g.lineTo(cx,top);g.quadraticCurveTo(cx,top-30,cx+sd*40,top-24);g.lineTo(x+w/2+sd*(w/2-30),top+10);g.lineTo(x+w/2+sd*(w/2-30),y+h-40);g.stroke();}
  g.setLineDash([]);g.restore();}
 g.restore();
 // tubos de entrada y salida
 g.fillStyle='#c9d1dc';g.fillRect(x-70,y+h-60,70,30);g.fillRect(x+w,y+h-60,70,30);
 return yw;}
// soplo de aire que sale del purgador (x,y) hacia la derecha/abajo (dir 1 = derecha). a 0–1
function airPuff(x,y,t,a=1,dir=1){if(a<=0)return;g.save();for(let i=0;i<6;i++){const ph=(t*1.6+i/6)%1;const px=x+dir*(10+ph*90),py=y-10+Math.sin(i*2.1)*14-ph*20;g.globalAlpha=a*(1-ph)*0.8;g.fillStyle='#eef4ff';g.beginPath();g.arc(px,py,8+ph*16,0,7);g.fill();}
 g.globalAlpha=a*0.9;g.strokeStyle='#ffffff';g.lineWidth=4;g.lineCap='round';for(let k=0;k<3;k++){const ph=(t*2.2+k/3)%1;g.beginPath();g.moveTo(x+dir*(14+ph*40),y-16+k*16);g.lineTo(x+dir*(34+ph*40),y-16+k*16);g.stroke();}g.restore();}
// manómetro de caldera (0–lo…hi bar) con franja verde (o.band=[1,1.5]) y aguja en val. o.hl = borde que pulsa; o.t tiempo
function pressGauge(x,y,r,val,o={}){const lo=o.lo??0,hi=o.hi??4,band=o.band||[1,1.5],t=o.t||0;const a0=Math.PI*0.75,a1=Math.PI*2.25,an=v=>a0+(a1-a0)*cl((v-lo)/(hi-lo));
 g.fillStyle='rgba(0,0,0,0.3)';g.beginPath();g.arc(x+6,y+8,r+16,0,7);g.fill();
 g.fillStyle='#c9d1dc';g.beginPath();g.arc(x,y,r+16,0,7);g.fill();g.fillStyle='#f7f5ef';g.beginPath();g.arc(x,y,r,0,7);g.fill();
 if(o.hl){g.save();g.globalAlpha=o.hl*(0.6+0.4*Math.sin(t*6));g.strokeStyle=C.amber;g.lineWidth=10;g.beginPath();g.arc(x,y,r+24,0,7);g.stroke();g.restore();}
 if(o.bandA!==0){g.save();g.globalAlpha=o.bandA??1;g.strokeStyle=C.green;g.lineWidth=r*0.16;g.beginPath();g.arc(x,y,r*0.78,an(band[0]),an(band[1]));g.stroke();g.restore();}
 g.strokeStyle='#3a4660';g.lineCap='round';for(let v=lo;v<=hi+1e-6;v+=0.5){const A=an(v),big=Math.abs(v-Math.round(v))<1e-6;g.lineWidth=big?6:3;g.beginPath();g.moveTo(x+Math.cos(A)*r*(big?0.62:0.68),y+Math.sin(A)*r*(big?0.62:0.68));g.lineTo(x+Math.cos(A)*r*0.88,y+Math.sin(A)*r*0.88);g.stroke();
  if(big)txt(String(v),x+Math.cos(A)*r*0.45,y+Math.sin(A)*r*0.45,r*0.17,'#1b1e26',900);}
 txt('bar',x,y+r*0.5,r*0.16,'#5c667a',800);
 const A=an(val);g.strokeStyle=C.red;g.lineWidth=r*0.06;g.beginPath();g.moveTo(x-Math.cos(A)*r*0.12,y-Math.sin(A)*r*0.12);g.lineTo(x+Math.cos(A)*r*0.8,y+Math.sin(A)*r*0.8);g.stroke();
 g.fillStyle='#1b1e26';g.beginPath();g.arc(x,y,r*0.08,0,7);g.fill();}
