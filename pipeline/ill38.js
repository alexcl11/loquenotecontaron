// ===== Kit de ilustración (38): el cuarto que no usas — habitación vacía con cajas, piso en sección con temperatura por estancia, gotas de condensación en la pared, indicador de media sin cifras =====
// caja de cartón genérica (x,y = esquina sup. izq.)
function cardBox(x,y,w,h){g.fillStyle='#c79a62';rr(x,y,w,h,6);g.fill();g.fillStyle='rgba(0,0,0,0.12)';g.fillRect(x+w*0.62,y,w*0.38,h);
 g.fillStyle='#e8cf9e';g.fillRect(x+w*0.42,y,w*0.16,h*0.35);g.fillStyle='rgba(0,0,0,0.18)';g.fillRect(x,y+h*0.35,w,3);}
// bombilla desnuda colgando del techo (on 0–1)
function bareBulb(x,y,t,on=0){const sw=Math.sin(t*1.3)*0.04;g.save();g.translate(x,300);g.rotate(sw);g.strokeStyle='#1a1e2a';g.lineWidth=4;g.beginPath();g.moveTo(0,0);g.lineTo(0,y-300);g.stroke();
 g.fillStyle='#6b7280';rr(-10,y-300,20,22,4);g.fill();g.fillStyle=on>0.5?'#ffe3a0':'#9aa3b5';g.beginPath();g.arc(0,y-300+38,20,0,7);g.fill();g.restore();}
// gotas de condensación sobre una zona de pared (k 0–1 aparecen; algunas resbalan)
function wallDew(x,y,w,h,k,t){if(k<=0)return;g.save();for(let i=0;i<34;i++){const a=cl(k*1.6-rnd(i+3)*0.6);if(a<=0)continue;const px=x+rnd(i)*w;let py=y+rnd(i+11)*h;const slide=i%4===0?((t*0.25+rnd(i+5))%1)*60*k:0;py+=slide;
  const r=4+rnd(i+7)*6;g.globalAlpha=a*0.9;g.fillStyle='rgba(190,225,255,0.85)';g.beginPath();g.ellipse(px,py,r*0.8,r,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.9)';g.beginPath();g.arc(px-r*0.25,py-r*0.3,r*0.25,0,7);g.fill();
  if(slide>0){g.strokeStyle='rgba(190,225,255,0.45)';g.lineWidth=3;g.beginPath();g.moveTo(px,py-slide);g.lineTo(px,py-r);g.stroke();}}g.restore();}
// cuarto vacío: pared que se enfría (o.cold 0–1), ventana, radiador con válvula (o.heat, o.vk), cajas, bombilla, puerta a la derecha (o.door 0 abierta → 1 cerrada), gotas (o.dew) y moho (o.mold). Devuelve la posición de la válvula
const RV_RAD=[150,1110,220,150],RV_WIN=[110,600,300,300],RV_DOOR=[800,850,200,440];
function spareRoom(t,o={}){const cold=o.cold||0;
 const gr=g.createLinearGradient(0,400,0,1300);gr.addColorStop(0,mixc('#2b3358','#3a5f86',cold));gr.addColorStop(1,mixc('#1d2342','#22405f',cold));g.fillStyle=gr;g.fillRect(-600,300,2300,1100);
 g.fillStyle='#33302c';g.fillRect(-600,1290,2300,500);g.fillStyle='#3d3833';for(let i=-6;i<20;i++){g.fillRect(i*120,1290,4,500);}
 // ventana
 const [wx,wy,ww,wh]=RV_WIN;g.fillStyle='#3c2c26';rr(wx,wy,ww,wh,10);g.fill();const sk=g.createLinearGradient(0,wy,0,wy+wh);sk.addColorStop(0,'#0b1430');sk.addColorStop(1,'#1d2d5a');g.fillStyle=sk;rr(wx+12,wy+12,ww-24,wh-24,6);g.fill();
 g.save();g.beginPath();g.rect(wx+12,wy+12,ww-24,wh-24);g.clip();moonI(wx+ww-70,wy+60,24);for(let i=0;i<6;i++){g.fillStyle=`rgba(255,255,255,${0.35+0.35*Math.sin(t*2+i)})`;g.beginPath();g.arc(wx+20+rnd(i)*(ww-40),wy+20+rnd(i+9)*(wh-40),2,0,7);g.fill();}
 if(cold>0){g.fillStyle=`rgba(200,230,255,${0.35*cold})`;g.fillRect(wx,wy,ww,wh);}g.restore();g.fillStyle='#3c2c26';g.fillRect(wx+ww/2-4,wy+12,8,wh-24);
 if(o.dew)wallDew(wx-60,wy-60,ww+120,wh+130,o.dew,t);
 if(o.mold){cornerMold(wx-70,wy-50,o.mold,t);cornerMold(wx+ww+20,wy-30,o.mold*0.9,t);cornerMold(20,1210,o.mold*0.8,t);}
 // cajas y bombilla
 cardBox(470,1150,170,140);cardBox(640,1180,130,110);cardBox(500,1040,130,110);
 bareBulb(560,560,t,o.bulb||0);
 // radiador con válvula
 const vp=radiator(...RV_RAD,o.heat??0,t,{valve:true,vk:o.vk||0});
 // puerta
 if(o.door!=null){const [dx,dy,dw,dh]=RV_DOOR;roomDoor(dx,dy,dw,dh,o.door,t,{wall:false});}
 return vp;}
// piso en sección (casa de una planta con 3 estancias). o.heat = [salón, dormitorio, cuarto] 0–1 (frío azul → cálido ámbar), o.hl = índice resaltado, o.a = alfa. Devuelve los centros
function flatCut(x,y,w,h,t,o={}){const hs=o.heat||[0.8,0.8,0.8];const a=o.a??1;if(a<=0)return [];g.save();g.globalAlpha*=a;
 const rw=w/3,cs=[];
 // tejado
 g.fillStyle='#f4f1ea';g.beginPath();g.moveTo(x-30,y);g.lineTo(x+w/2,y-h*0.32);g.lineTo(x+w+30,y);g.closePath();g.fill();g.fillStyle='#2c3c6b';g.beginPath();g.moveTo(x+10,y-6);g.lineTo(x+w/2,y-h*0.32+22);g.lineTo(x+w-10,y-6);g.closePath();g.fill();
 const names=['SALÓN','DORMITORIO','CUARTO VACÍO'];
 for(let i=0;i<3;i++){const rx=x+i*rw,hk=cl(hs[i]);const col=mixc('#2b5a9a','#d9822b',hk);
  g.fillStyle=col;g.fillRect(rx,y,rw,h);
  // brillo del calor
  const gl=g.createRadialGradient(rx+rw/2,y+h*0.8,10,rx+rw/2,y+h*0.6,rw*0.8);gl.addColorStop(0,`rgba(255,200,120,${0.45*hk})`);gl.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=gl;g.fillRect(rx,y,rw,h);
  // radiador pequeño
  const rx0=rx+rw*0.12,ry0=y+h-80;g.fillStyle=mixc('#dfe4ec','#ffc9a0',hk);for(let k=0;k<5;k++){rr(rx0+k*16,ry0,12,50,5);g.fill();}
  if(hk>0.15){g.save();g.scale(1,1);heatWaves(rx0+40,ry0-6,80,t,hk*0.9);g.restore();}
  // muebles mínimos
  if(i===0){g.fillStyle='#7b5cc9';rr(rx+rw*0.45,y+h-90,rw*0.45,60,16);g.fill();rr(rx+rw*0.45,y+h-120,rw*0.12,90,10);g.fill();}
  if(i===1){g.fillStyle='#f4f1ea';rr(rx+rw*0.42,y+h-70,rw*0.5,40,10);g.fill();g.fillStyle='#3d7bff';rr(rx+rw*0.55,y+h-74,rw*0.37,44,10);g.fill();g.fillStyle='#5a3f30';rr(rx+rw*0.38,y+h-120,18,90,6);g.fill();}
  if(i===2){cardBox(rx+rw*0.5,y+h-100,rw*0.3,70);cardBox(rx+rw*0.56,y+h-150,rw*0.22,50);}
  // icono de temperatura (sin cifras)
  const ic=hk>0.6?'🔥':(hk>0.35?'🌤':'❄');txt(ic,rx+rw/2,y+52,44,'#fff',900);
  txt(names[i],rx+rw/2,y+h+40,26,'#dfe5f0',900);
  if(o.hl===i){g.strokeStyle=C.amber;g.lineWidth=8;rr(rx+5,y+5,rw-10,h-10,8);g.stroke();}
  cs.push([rx+rw/2,y+h/2]);}
 // muros
 g.strokeStyle='#f4f1ea';g.lineWidth=12;g.strokeRect(x,y,w,h);g.lineWidth=8;[1,2].forEach(i=>{g.beginPath();g.moveTo(x+i*rw,y);g.lineTo(x+i*rw,y+h*0.55);g.stroke();});
 g.fillStyle='#3a2a22';g.fillRect(x-20,y+h,w+40,12);
 g.restore();return cs;}
// indicador horizontal de la media de la casa, sin cifras: lvl 0–1 (de frío a cálido), a = alfa, mark = marca de la posición anterior
function avgBar(x,y,w,lvl,a,mark){if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.fillStyle='rgba(20,29,48,0.9)';rr(x-20,y-34,w+40,68,34);g.fill();
 const gr=g.createLinearGradient(x,0,x+w,0);gr.addColorStop(0,'#3d7bff');gr.addColorStop(0.55,C.green);gr.addColorStop(1,C.red);g.fillStyle=gr;rr(x,y-12,w,24,12);g.fill();
 if(mark!=null){g.fillStyle='rgba(255,255,255,0.45)';g.beginPath();g.arc(x+w*mark,y,16,0,7);g.fill();}
 g.fillStyle='#fff';g.beginPath();g.arc(x+w*lvl,y,22,0,7);g.fill();g.fillStyle=C.amber;g.beginPath();g.arc(x+w*lvl,y,12,0,7);g.fill();g.restore();}
