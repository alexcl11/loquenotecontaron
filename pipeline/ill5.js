// ===== Kit de ilustración (5): horno en columna, bizcocho, flujo de aire, microondas, olla a presión, placa, reloj =====
// Horno por defecto: x=740, y=880, w=290, h=270 (encima de la encimera, a la derecha del personaje en x≈560).
const OVD={x:740,y:880,w:290,h:270};
function ovGeo(o){const x=o.x??OVD.x,y=o.y??OVD.y,w=o.w??OVD.w,h=o.h??OVD.h;return {x,y,w,h,hinge:y+h-6,top:y+48,cx:x+w/2};}
function knob(x,y,a,s=1){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#c9d3e0';g.beginPath();g.arc(0,0,15,0,7);g.fill();g.fillStyle='#8592a6';g.beginPath();g.arc(0,0,9,0,7);g.fill();
 g.rotate(a);g.strokeStyle='#1b1e26';g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(0,-13);g.stroke();g.restore();}
// cuerpo del horno: mueble-columna, panel (mandos, barra de energía sin cifras, botón de luz) y cavidad
// o: heat 0–1 (resistencia), glow 0–1 (brillo de la cavidad, por defecto = heat; calor residual), energy 0–1 (barra del panel), light 0–1, knob/knob2 (ángulos), column (mueble alto, por defecto sí), food(g) callback que dibuja lo de dentro
function ovenBody(t,o={}){const G=ovGeo(o),{x,y,w,h}=G;const heat=o.heat??0,light=o.light??0,en=o.energy??heat,glow=o.glow??heat;
 if(o.column!==false){g.fillStyle=IL.cab;rr(x-26,y-320,w+52,h+340,10);g.fill();g.fillStyle=IL.cabD;rr(x-12,y-306,w+24,272,8);g.fill();g.fillStyle='#c9b28a';rr(x+w/2-30,y-58,60,12,6);g.fill();}
 g.fillStyle='#2b2f38';rr(x,y,w,h,12);g.fill();
 g.fillStyle='#1b1e26';rr(x+8,y+8,w-16,36,8);g.fill();
 knob(x+30,y+26,o.knob??0,0.85);knob(x+w-30,y+26,o.knob2??0,0.85);
 // barra de energía (6 segmentos, sin números)
 const bx=x+w/2-58,by=y+17;g.fillStyle='#0b0e14';rr(bx-6,by-4,128,26,5);g.fill();
 for(let i=0;i<6;i++){const on=en*6>i+0.01;g.fillStyle=on?(i<2?'#e5484d':(i<4?'#f2a33a':'#3ecf6e')):'#252a35';rr(bx+i*20,by,16,18,3);g.fill();}
 // botón de luz
 g.fillStyle=light>0.5?'#ffe9a8':'#3a3f4b';g.beginPath();g.arc(x+62,y+26,8,0,7);g.fill();if(light>0.5){g.save();g.globalAlpha=0.4;g.beginPath();g.arc(x+62,y+26,16,0,7);g.fill();g.restore();}
 // cavidad
 const cx0=x+16,cy0=y+52,cw=w-32,ch=h-66;
 const col=light>0?mixc('#15181f','#c98a4a',Math.max(light*0.75,glow*0.6)):mixc('#15181f','#7a3414',glow*0.8);
 g.fillStyle=col;rr(cx0,cy0,cw,ch,8);g.fill();
 if(glow>0||light>0){const lg=g.createRadialGradient(x+w/2,y+h*0.55,10,x+w/2,y+h*0.55,w*0.6);lg.addColorStop(0,`rgba(255,170,80,${0.45*Math.max(glow,light)})`);lg.addColorStop(1,'rgba(255,170,80,0)');g.fillStyle=lg;rr(cx0,cy0,cw,ch,8);g.fill();}
 // resistencia superior (zigzag)
 g.strokeStyle=mixc('#4a4f5c','#ff5a2a',heat);g.lineWidth=5;g.lineJoin='round';g.beginPath();for(let i=0;i<=10;i++){const xx=cx0+14+i*(cw-28)/10;const yy=cy0+12+(i%2?8:0);i?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();
 if(heat>0.2){g.save();g.globalAlpha=heat*0.5;g.strokeStyle='#ffb070';g.lineWidth=12;g.stroke();g.restore();}
 // rejilla
 g.strokeStyle='rgba(201,211,224,0.5)';g.lineWidth=3;g.beginPath();g.moveTo(cx0+6,cy0+ch*0.72);g.lineTo(cx0+cw-6,cy0+ch*0.72);g.stroke();
 if(o.food){g.save();g.beginPath();g.rect(cx0,cy0,cw,ch);g.clip();o.food(cx0+cw/2,cy0+ch*0.72);g.restore();}
 return G;}
// puerta abatible hacia abajo. open 0–1. Se dibuja DESPUÉS de counterFront (sobresale hacia el espectador). Devuelve [x,y] del tirador.
function ovenDoor(t,o={},open=0,light=0){const G=ovGeo(o),{x,y,w,h,hinge,top}=G;const th=ease(open)*Math.PI/2*0.96;const dh=hinge-top;
 const ty=hinge-dh*Math.cos(th)+80*Math.sin(th);const sp=16*Math.sin(th);
 const outer=ty<hinge-4;
 const k=(hinge-ty)/dh,wy0=ty+16*k,wy1=hinge-22*k,win=outer&&k>0.25;
 g.fillStyle=outer?'#343945':'#4a505e';g.beginPath();g.moveTo(x,hinge);g.lineTo(x+w,hinge);g.lineTo(x+w+sp,ty);g.lineTo(x-sp,ty);g.closePath();
 if(win)g.roundRect(x+30,wy0+14*k,w-60,Math.max(2,wy1-wy0-14*k),10*k);g.fill('evenodd');
 if(outer){if(win){const ga=lerp(0.55,0.12,light);g.fillStyle=`rgba(8,10,16,${ga})`;rr(x+30,wy0+14*k,w-60,Math.max(2,wy1-wy0-14*k),10*k);g.fill();
   g.fillStyle='rgba(255,255,255,0.07)';g.beginPath();g.moveTo(x+40,wy0+14*k);g.lineTo(x+110,wy0+14*k);g.lineTo(x+40,wy1);g.closePath();g.fill();}}
 else{g.fillStyle='#2a2e38';g.beginPath();g.moveTo(x+26,hinge+4);g.lineTo(x+w-26,hinge+4);g.lineTo(x+w-20+sp,ty-6);g.lineTo(x+20-sp,ty-6);g.closePath();g.fill();}
 // tirador
 const hy=outer?ty+10:ty+4;g.fillStyle='#c9d3e0';rr(x+44-sp,hy-6,w-88+2*sp,12,6);g.fill();g.fillStyle='#8592a6';rr(x+52-sp,hy+4,10,8,3);g.fill();rr(x+w-62+sp,hy+4,10,8,3);g.fill();
 return [x+w/2,hy];}
function ovenHandle(o,open=0){const G=ovGeo(o),{x,w,hinge,top}=G;const th=ease(open)*Math.PI/2*0.96;const ty=hinge-(hinge-top)*Math.cos(th)+80*Math.sin(th);return [x+70,ty<hinge-4?ty+10:ty+4];}
// bizcocho en molde: cook 0–1 (crudo→dorado), rise 0–1
function cakeMold(x,y,s,cook=0,rise=0){g.save();g.translate(x,y);g.scale(s,s);const hh=18+34*rise;
 g.fillStyle=mixc('#f4e2a8','#c98432',cook);g.beginPath();g.moveTo(-66,-30);g.quadraticCurveTo(-64,-30-hh,0,-34-hh);g.quadraticCurveTo(64,-30-hh,66,-30);g.closePath();g.fill();
 if(cook>0.4){g.fillStyle=`rgba(140,80,20,${(cook-0.4)*0.5})`;g.beginPath();g.ellipse(0,-30-hh*0.7,40,8,0,0,7);g.fill();}
 g.fillStyle='#9aa6b8';g.beginPath();g.moveTo(-74,-34);g.lineTo(74,-34);g.lineTo(64,0);g.lineTo(-64,0);g.closePath();g.fill();g.fillStyle='#c9d3e0';g.fillRect(-76,-38,152,8);g.restore();}
// aire caliente que sale (arriba) y frío que entra (abajo) por la puerta abierta
function heatOut(x0,x1,y,t,a=1,len=260){if(a<=0)return;g.save();g.lineCap='round';for(let k=0;k<5;k++){const ph=(t*0.9+k/5)%1;const xx=lerp(x0,x1,(k+0.5)/5);g.globalAlpha=a*(1-ph)*0.9;g.strokeStyle=k%2?'#ff8a3a':'#ffb35a';g.lineWidth=12;g.beginPath();
  for(let j=0;j<=14;j++){const yy=y-ph*len*0.5-j*len/28;const sx=xx+Math.sin(j*0.6+t*5+k)*14;j?g.lineTo(sx,yy):g.moveTo(sx,yy);}g.stroke();}g.restore();}
function coldIn(x,y,t,a=1,dir=1,len=200){if(a<=0)return;g.save();for(let k=0;k<6;k++){const ph=(t*1.1+k/6)%1;const yy=y+(k%3)*22;const xx=x-dir*len*(1-ph);g.globalAlpha=a*Math.sin(ph*Math.PI)*0.95;
  g.strokeStyle='#8fd0ff';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(xx-dir*46,yy);g.lineTo(xx,yy);g.stroke();g.fillStyle='#8fd0ff';g.beginPath();g.moveTo(xx+dir*14,yy);g.lineTo(xx-dir*4,yy-12);g.lineTo(xx-dir*4,yy+12);g.closePath();g.fill();}g.restore();}
// microondas sobre encimera (base en y)
function microwave(x,y,s,t,on=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#e8ecf2';rr(-110,-130,220,130,14);g.fill();g.fillStyle=on?'#f6d27a':'#2a2f3a';rr(-96,-116,140,102,8);g.fill();
 if(on){g.fillStyle='rgba(255,255,255,0.25)';g.beginPath();g.ellipse(-26,-40,40+4*Math.sin(t*4),8,0,0,7);g.fill();}
 g.fillStyle='#c9ced8';rr(56,-116,42,102,6);g.fill();g.fillStyle='#10141c';rr(62,-108,30,16,3);g.fill();g.fillStyle='#3ecf6e';g.font=`800 11px ${F}`;g.textAlign='center';g.textBaseline='middle';if(on)g.fillText('0:30',77,-100);
 g.fillStyle='#8592a6';for(let i=0;i<3;i++){g.beginPath();g.arc(77,-72+i*22,6,0,7);g.fill();}g.restore();}
// olla a presión (base en y)
function pressureCooker(x,y,s,t,st=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#b9c4d4';rr(-80,-90,160,90,16);g.fill();g.fillStyle='#d5dde8';rr(-88,-104,176,20,10);g.fill();
 g.fillStyle='#1e2128';rr(-150,-102,64,14,7);g.fill();rr(86,-102,64,14,7);g.fill();g.fillStyle='#8592a6';rr(-12,-124,24,22,6);g.fill();g.fillStyle='#e5484d';g.beginPath();g.arc(0,-128,6,0,7);g.fill();g.restore();
 if(st>0)steam(x,y-130*s,t,st);}
// placa con sartén y llama (base en y)
function hobPan(x,y,s,t,fire=0){g.fillStyle='#151b28';rr(x-130*s,y-14,260*s,14,4);g.fill();pan(x,y-30*s,s*0.8,t,fire);}
// reloj de pared; spin = vueltas por segundo del minutero
function wallClock(x,y,r,t,spin=0){g.fillStyle='#f4f1ea';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#c9b28a';g.lineWidth=r*0.12;g.stroke();
 g.fillStyle='#5a6478';for(let i=0;i<12;i++){const a=i/12*Math.PI*2;g.beginPath();g.arc(x+Math.cos(a)*r*0.78,y+Math.sin(a)*r*0.78,r*0.05,0,7);g.fill();}
 const am=t*spin*Math.PI*2-Math.PI/2,ah=am/12-Math.PI/3;g.strokeStyle='#1b1e26';g.lineCap='round';g.lineWidth=r*0.09;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(ah)*r*0.45,y+Math.sin(ah)*r*0.45);g.stroke();
 g.lineWidth=r*0.06;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(am)*r*0.68,y+Math.sin(am)*r*0.68);g.stroke();g.fillStyle='#e5484d';g.beginPath();g.arc(x,y,r*0.08,0,7);g.fill();}
// barra vertical de "gasto" (sin cifras) para comparar aparatos
function costMeter(x,y,hgt,p,col){if(p<=0)return;const hh=hgt*ease(p);g.fillStyle='rgba(20,29,48,0.85)';rr(x-26,y-hgt-10,52,hgt+20,14);g.fill();g.fillStyle=col;rr(x-18,y-hh,36,Math.max(2,hh),10);g.fill();}
