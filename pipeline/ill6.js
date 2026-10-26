// ===== Kit de ilustración (6): calefacción — termostato de pared, radiador, termómetro grande, dormitorio, persiana, bufanda, jersey =====
// color del número según la temperatura (verde 19–21, ámbar 22–23, rojo ≥24, azul ≤17)
function tempCol(v){v=Math.round(v);return v>=24?C.red:(v>=22?C.amber:(v>=18?C.green:C.blue));}
// termostato de pared: caja crema, anillo de progreso y pantalla con la temperatura. o: off (muestra "OFF"), col (forzar color), glow
function wallThermostat(x,y,s,val,o={}){g.save();g.translate(x,y);g.scale(s,s);const col=o.col||tempCol(val);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-60,-56,124,124,26);g.fill();
 g.fillStyle='#f4f1ea';rr(-64,-64,128,128,26);g.fill();g.fillStyle='#ddd8cc';g.beginPath();g.arc(0,0,50,0,7);g.fill();
 const k=cl((val-10)/22);g.strokeStyle='#c9c2b3';g.lineWidth=8;g.lineCap='round';g.beginPath();g.arc(0,0,44,Math.PI*0.75,Math.PI*2.25);g.stroke();
 if(!o.off){g.strokeStyle=col;g.beginPath();g.arc(0,0,44,Math.PI*0.75,Math.PI*(0.75+1.5*k));g.stroke();}
 g.fillStyle='#10141c';g.beginPath();g.arc(0,0,34,0,7);g.fill();
 if(o.glow&&!o.off){g.save();g.globalAlpha=0.35*o.glow;g.fillStyle=col;g.beginPath();g.arc(0,0,40,0,7);g.fill();g.restore();g.fillStyle='#10141c';g.beginPath();g.arc(0,0,32,0,7);g.fill();}
 g.textAlign='center';g.textBaseline='middle';
 if(o.off){g.fillStyle='#8e98ad';g.font=`900 22px ${F}`;g.fillText('OFF',0,1);}
 else{g.fillStyle=col;g.font=`900 28px ${F}`;g.fillText(Math.round(val)+'°',2,2);}
 g.restore();}
// radiador de aluminio bajo la ventana. heat 0–1 (color cálido + ondas de calor). o.valve: válvula termostática a la izquierda (o.vk 0–1 = giro). Devuelve [x,y] de la válvula
function radiator(x,y,w,h,heat,t,o={}){const n=Math.max(4,Math.round(w/34)),fw=w/n;
 g.fillStyle='#8592a6';g.fillRect(x-30,y+h-26,w+60,10);
 for(let i=0;i<n;i++){g.fillStyle=mixc('#dfe4ec','#ffc9a0',heat);rr(x+i*fw+3,y,fw-6,h,12);g.fill();g.fillStyle='rgba(0,0,0,0.07)';rr(x+i*fw+fw*0.55,y+8,fw*0.25,h-16,6);g.fill();}
 g.fillStyle=mixc('#c9d1dc','#f0b088',heat);g.fillRect(x,y+14,w,8);g.fillRect(x,y+h-22,w,8);
 if(heat>0.05)heatWaves(x+w/2,y-10,w,t,heat);
 let vp=null;if(o.valve){const vx=x-34,vy=y+h-22;g.fillStyle='#c9d3e0';g.fillRect(vx-6,vy-4,40,10);g.save();g.translate(vx,vy-26);g.rotate((o.vk||0)*0.8);
  g.fillStyle='#f4f6fb';rr(-17,-30,34,56,10);g.fill();g.fillStyle='#c9ced8';for(let j=0;j<4;j++)g.fillRect(-17,-20+j*12,34,3);g.fillStyle=C.amber;rr(-6,-38,12,10,3);g.fill();g.restore();vp=[vx,vy-26];}
 return vp;}
// ondas de aire caliente que suben
function heatWaves(x,y,w,t,a=1){if(a<=0)return;g.save();g.lineCap='round';g.lineWidth=6;for(let k=0;k<4;k++){const xx=x-w/2+w*(k+0.5)/4;const ph=(t*0.7+k*0.27)%1;g.globalAlpha=a*0.55*Math.sin(ph*Math.PI);g.strokeStyle='#ffb070';g.beginPath();
 for(let j=0;j<=12;j++){const yy=y-ph*60-j*10;const xw=xx+Math.sin(j*0.6+t*3+k)*9;j?g.lineTo(xw,yy):g.moveTo(xw,yy);}g.stroke();}g.restore();}
// termómetro grande (escala lo..hi). o: goal (línea de meta), goalTxt, col, marks (lista de grados con etiqueta). Devuelve f(v)->y
function bigThermo(x,y,h,val,o={}){const lo=o.lo??14,hi=o.hi??30;const top=y-h,yv=v=>y-(cl((v-lo)/(hi-lo)))*h;
 g.fillStyle='#f4f6fb';rr(x-34,top-30,68,h+40,34);g.fill();g.beginPath();g.arc(x,y+40,62,0,7);g.fill();
 g.fillStyle='#d9dfe8';rr(x-18,top-14,36,h+20,18);g.fill();
 const col=o.col||tempCol(val);g.fillStyle=col;g.beginPath();g.arc(x,y+40,46,0,7);g.fill();rr(x-18,yv(val),36,y+30-yv(val),18);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';rr(x-10,top-4,8,h,4);g.fill();
 g.strokeStyle='#8e98ad';g.lineWidth=4;for(let v=lo;v<=hi;v++){const yy=yv(v);const big=v%5===0;g.beginPath();g.moveTo(x+38,yy);g.lineTo(x+(big?66:52),yy);g.stroke();if(big)txt(v+'°',x+104,yy,30,'#dfe5f0',800);}
 if(o.goal!=null){const yy=yv(o.goal);g.save();g.setLineDash([12,10]);g.strokeStyle=C.green;g.lineWidth=5;g.beginPath();g.moveTo(x-110,yy);g.lineTo(x+40,yy);g.stroke();g.restore();if(o.goalTxt)labelTag(o.goalTxt,x-190,yy,1,C.green);}
 return yv;}
// bufanda sobre el personaje (después de person, antes de hands)
function scarf(o,t,col='#e5484d'){const x=o.x,s=o.s||1,bob=Math.sin(t*2.2)*3*s,hy=o.y-310*s+bob;g.fillStyle=col;rr(x-60*s,hy+64*s,120*s,34*s,16*s);g.fill();
 g.save();g.translate(x+30*s,hy+86*s);g.rotate(0.12+Math.sin(t*3)*0.05);rr(-16*s,0,32*s,110*s,8*s);g.fill();g.fillStyle='rgba(255,255,255,0.35)';for(let i=0;i<3;i++)g.fillRect(-16*s,20*s+i*26*s,32*s,6*s);g.restore();
 g.fillStyle='rgba(255,255,255,0.35)';for(let i=0;i<4;i++)g.fillRect(x-48*s+i*30*s,hy+66*s,8*s,30*s);}
// cuello vuelto de jersey (después de person)
function jerseyCollar(o,t,col){const x=o.x,s=o.s||1,bob=Math.sin(t*2.2)*3*s,hy=o.y-310*s+bob;g.fillStyle=col||mixc(o.shirt||IL.shirt,'#000000',0.18);rr(x-54*s,hy+66*s,108*s,30*s,14*s);g.fill();
 g.strokeStyle='rgba(255,255,255,0.18)';g.lineWidth=4*s;for(let i=0;i<6;i++){g.beginPath();g.moveTo(x-42*s+i*17*s,hy+70*s);g.lineTo(x-42*s+i*17*s,hy+92*s);g.stroke();}}
// tiritona: líneas de frío alrededor de un punto
function shiverFx(x,y,t,a=1){if(a<=0)return;g.save();g.strokeStyle=`rgba(160,210,255,${0.85*a})`;g.lineWidth=5;g.lineCap='round';[-1,1].forEach(sd=>{for(let k=0;k<3;k++){const xx=x+sd*(95+k*16),yy=y-20+k*24;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx+sd*6+Math.sin(t*30+k)*5,yy+14);g.lineTo(xx,yy+28);g.stroke();}});g.restore();}
// persiana sobre una ventana (x,y,w,h). down 0–1
function blind(x,y,w,h,down){if(down<=0)return;const hh=h*down;g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle='#d8cdb5';g.fillRect(x,y,w,hh);g.fillStyle='rgba(0,0,0,0.12)';for(let yy=y+12;yy<y+hh;yy+=16)g.fillRect(x,yy,w,4);g.fillStyle='#b9a98a';g.fillRect(x,y+hh-10,w,10);g.restore();}
// dormitorio: pared, ventana con persiana (o.blind), cabecero, mesilla con lámpara (o.lamp), termostato (o.temp, o.off), o.dark
function bedroom(t,o={}){const dark=o.dark||0;const gr=g.createLinearGradient(0,400,0,1300);gr.addColorStop(0,'#2d2a52');gr.addColorStop(1,'#1d1b3a');g.fillStyle=gr;g.fillRect(-600,300,2300,1300);
 g.fillStyle='#3c2c26';rr(90,600,250,290,10);g.fill();const sk=g.createLinearGradient(0,612,0,878);sk.addColorStop(0,'#0b1430');sk.addColorStop(1,'#1d2d5a');g.fillStyle=sk;rr(102,612,226,266,6);g.fill();
 g.save();g.beginPath();g.rect(102,612,226,266);g.clip();moonI(260,680,28);for(let i=0;i<7;i++){g.fillStyle=`rgba(255,255,255,${0.35+0.35*Math.sin(t*2+i)})`;g.beginPath();g.arc(115+rnd(i)*200,630+rnd(i+9)*220,2,0,7);g.fill();}g.restore();
 g.fillStyle='#3c2c26';g.fillRect(210,612,8,266);blind(102,612,226,266,o.blind||0);
 // cabecero y almohada
 g.fillStyle='#5a3f30';rr(330,880,520,320,30);g.fill();g.fillStyle='#4a3326';rr(352,902,476,276,22);g.fill();
 g.fillStyle='#f4f1ea';rr(400,1010,380,110,40);g.fill();
 // mesilla + lámpara
 g.fillStyle='#5a3f30';rr(880,1090,150,170,10);g.fill();g.fillStyle='#4a3326';rr(892,1120,126,54,6);g.fill();
 const lamp=o.lamp??1;g.fillStyle='#c9b28a';g.fillRect(950,990,10,100);g.fillStyle=lamp>0.5?'#ffe3a0':'#8a8470';g.beginPath();g.moveTo(910,1000);g.lineTo(1000,1000);g.lineTo(980,940);g.lineTo(930,940);g.closePath();g.fill();
 if(lamp>0){const lg=g.createRadialGradient(955,980,10,955,1000,520);lg.addColorStop(0,`rgba(255,220,140,${0.32*lamp})`);lg.addColorStop(1,'rgba(255,220,140,0)');g.fillStyle=lg;g.fillRect(-600,500,2300,1000);}
 if(o.temp!=null)wallThermostat(960,760,0.9,o.temp,{off:o.off});
 g.fillStyle='#2a2236';g.fillRect(-600,1280,2300,500);
 if(dark>0){g.fillStyle=`rgba(4,6,14,${dark})`;g.fillRect(-600,300,2300,1500);}}
// edredón (delante del personaje sentado en la cama)
function duvet(t,col='#3d7bff'){g.fillStyle=col;g.beginPath();g.moveTo(300,1150);g.quadraticCurveTo(590,1110,880,1150);g.lineTo(900,1300);g.lineTo(280,1300);g.closePath();g.fill();
 g.fillStyle='rgba(255,255,255,0.14)';g.beginPath();g.moveTo(300,1150);g.quadraticCurveTo(590,1110,880,1150);g.lineTo(880,1170);g.quadraticCurveTo(590,1132,300,1170);g.closePath();g.fill();
 g.fillStyle='#2a3a6a';g.fillRect(280,1280,620,40);}
// zetas de sueño
function zzz(x,y,t,a=1){if(a<=0)return;for(let i=0;i<3;i++){const ph=(t*0.5+i/3)%1;txt('z',x+ph*60+i*6,y-ph*110,30+i*10,`rgba(220,230,255,${a*(1-ph)})`,900);}}
// casa en sección con relleno de "energía" desde abajo (fill 0–1), sin cifras
function energyHouse(x,y,w,fill,t){const h=w*0.75;g.save();g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x-w/2,y-h);g.lineTo(x,y-h-w*0.42);g.lineTo(x+w/2,y-h);g.lineTo(x+w/2,y);g.closePath();
 g.fillStyle='#24335a';g.fill();g.clip();const fy=y-(h+w*0.42)*fill;const gr=g.createLinearGradient(0,fy,0,y);gr.addColorStop(0,'#f2a33a');gr.addColorStop(1,'#e5484d');g.fillStyle=gr;g.beginPath();g.moveTo(x-w/2,y);
 for(let i=0;i<=20;i++)g.lineTo(x-w/2+i*w/20,fy+Math.sin(i*0.9+t*4)*6);g.lineTo(x+w/2,y);g.closePath();g.fill();g.restore();
 g.strokeStyle='#f4f1ea';g.lineWidth=12;g.lineJoin='round';g.beginPath();g.moveTo(x-w/2,y);g.lineTo(x-w/2,y-h);g.lineTo(x,y-h-w*0.42);g.lineTo(x+w/2,y-h);g.lineTo(x+w/2,y);g.closePath();g.stroke();}
