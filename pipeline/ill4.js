// ===== Kit de ilustración (4): baño, productos de limpieza, cubo, nube de gas, móvil, casas =====
// ---------- baño ----------
function bathroom(t,o={}){const op=o.open||0;
 const gr=g.createLinearGradient(0,400,0,1200);gr.addColorStop(0,'#24405e');gr.addColorStop(1,'#172a42');g.fillStyle=gr;g.fillRect(-600,300,2300,1400);
 // azulejos (media pared)
 g.fillStyle='#2b4b6b';g.fillRect(-600,930,2300,260);g.save();g.globalAlpha=0.12;g.strokeStyle='#fff';g.lineWidth=2;for(let x=-600;x<1700;x+=70){g.beginPath();g.moveTo(x,930);g.lineTo(x,1180);g.stroke();}for(let y=930;y<1180;y+=70){g.beginPath();g.moveTo(-600,y);g.lineTo(1700,y);g.stroke();}g.restore();
 g.fillStyle='#35587a';g.fillRect(-600,922,2300,10);
 // luz cálida sobre el espejo
 const lg=g.createRadialGradient(840,600,30,700,800,650);lg.addColorStop(0,'rgba(255,214,150,0.22)');lg.addColorStop(1,'rgba(255,214,150,0)');g.fillStyle=lg;g.fillRect(-600,300,2300,1400);
 // ventana (se puede abrir: o.open 0–1)
 g.fillStyle='#c9d3e0';rr(70,600,270,300,10);g.fill();const sk=g.createLinearGradient(0,612,0,888);sk.addColorStop(0,'#0b1430');sk.addColorStop(1,'#1d2d5a');g.fillStyle=sk;rr(84,614,242,272,6);g.fill();
 g.save();g.beginPath();g.rect(84,614,242,272);g.clip();moonI(270,670,28);for(let i=0;i<8;i++){g.fillStyle=`rgba(255,255,255,${0.35+0.35*Math.sin(t*2+i)})`;g.beginPath();g.arc(100+rnd(i)*210,630+rnd(i+9)*200,2.2,0,7);g.fill();}g.restore();
 // hojas de la ventana: cerradas = cristal translúcido; abiertas = se pliegan hacia los lados
 const pw=121*(1-0.82*ease(op));g.fillStyle='rgba(190,215,240,0.22)';g.fillRect(84,614,pw,272);g.fillRect(326-pw,614,pw,272);
 g.fillStyle='#c9d3e0';g.fillRect(84+pw-6,614,8,272);g.fillRect(326-pw-2,614,8,272);
 if(op>0){g.save();g.globalAlpha=0.5*op;g.strokeStyle='#bfe8ff';g.lineWidth=6;g.lineCap='round';for(let k=0;k<4;k++){g.beginPath();for(let j=0;j<=24;j++){const xx=240+j*18;const yy=680+k*55+Math.sin(j*0.5-t*4+k)*10;j?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}g.restore();}
 // espejo y aplique
 g.fillStyle='#c9d3e0';rr(720,575,250,310,22);g.fill();const mg=g.createLinearGradient(730,585,960,875);mg.addColorStop(0,'#8fb0d1');mg.addColorStop(1,'#4e6e93');g.fillStyle=mg;rr(732,587,226,286,16);g.fill();
 g.save();g.globalAlpha=0.25;g.fillStyle='#fff';g.beginPath();g.moveTo(760,600);g.lineTo(800,600);g.lineTo(745,700);g.lineTo(745,640);g.fill();g.beginPath();g.moveTo(830,600);g.lineTo(850,600);g.lineTo(760,780);g.lineTo(750,780);g.fill();g.restore();
 g.fillStyle='#fff3c4';rr(760,548,170,14,7);g.fill();
 // toallero
 g.fillStyle='#c9d3e0';g.fillRect(1000,760,8,30);g.fillStyle='#f2a33a';rr(985,785,40,150,10);g.fill();
}
function vanityFront(){ // encimera del lavabo y mueble (delante del personaje)
 g.fillStyle='#eef2f7';g.fillRect(-600,1178,2300,34);g.fillStyle='#ffffff';g.fillRect(-600,1178,2300,6);g.fillStyle='#cdd5e0';g.fillRect(-600,1206,2300,6);
 g.fillStyle=IL.cab;g.fillRect(-600,1212,2300,500);for(let i=-3;i<9;i++){const x=i*180+20;g.fillStyle=IL.cabD;rr(x,1232,160,330,10);g.fill();g.fillStyle='#c9d3e0';rr(x+70,1250,20,8,4);g.fill();}
}
function basin(x){g.fillStyle=IL.metalD;rr(x,1170,220,14,6);g.fill();g.fillStyle='#ffffff';rr(x,1166,220,8,4);g.fill();
 g.strokeStyle=IL.metal;g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(x+180,1172);g.lineTo(x+180,1100);g.quadraticCurveTo(x+180,1080,x+150,1080);g.stroke();}
// ---------- productos de limpieza (genéricos, sin marcas) ----------
// kind: 'lejia' | 'amoniaco' | 'salfuman' | 'vinagre'. Devuelve [x,y] de la boca de la botella.
function cleanBottle(x,y,s,rot,kind){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 const K={lejia:['#f4f6fa','#3d7bff','#ffd75a','LEJÍA','#1a2742'],amoniaco:['rgba(190,228,255,0.92)','#3ecf6e','#ffffff','AMONIACO','#1a2742'],salfuman:['#f4f6fa','#e5484d','#e5484d','SALFUMÁN','#ffffff'],vinagre:['rgba(236,226,190,0.92)','#b9c4d4','#e8e0c8','VINAGRE','#5a4a3a']};const k=K[kind]||K.lejia;
 if(kind==='lejia'){g.fillStyle=k[0];rr(-42,-60,84,130,18);g.fill();g.strokeStyle=k[0];g.lineWidth=12;g.beginPath();g.moveTo(14,-58);g.quadraticCurveTo(46,-62,40,-20);g.stroke();}
 else{g.fillStyle=k[0];rr(-32,-62,64,132,16);g.fill();}
 g.fillStyle=k[0];rr(-13,-80,26,24,6);g.fill();g.fillStyle=k[1];rr(-15,-94,30,18,6);g.fill();
 g.fillStyle=k[2];rr(kind==='lejia'?-36:-28,-16,kind==='lejia'?72:56,58,8);g.fill();
 g.fillStyle=k[4];g.font=`900 ${kind==='lejia'?17:12}px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(k[3],0,6,kind==='lejia'?66:52);
 if(kind==='salfuman'){g.save();g.translate(0,30);g.rotate(Math.PI/4);g.fillStyle='#ffb020';g.fillRect(-7,-7,14,14);g.restore();}
 g.fillStyle='rgba(255,255,255,0.25)';rr(kind==='lejia'?-36:-26,-52,10,40,5);g.fill();g.restore();
 return [x+Math.sin(rot||0)*90*s,y-Math.cos(rot||0)*90*s];}
function pourStream(x0,y0,x1,y1,t,col='rgba(240,240,200,0.85)',on=1){if(on<=0)return;g.save();g.globalAlpha=on;g.strokeStyle=col;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(x0,y0);
 for(let j=1;j<=12;j++){const k=j/12;g.lineTo(lerp(x0,x1,k)+Math.sin(k*9-t*20)*2,lerp(y0,y1,k*k*0.6+k*0.4));}g.stroke();
 g.fillStyle=col;for(let i=0;i<4;i++){const ph=(t*3+i/4)%1;g.globalAlpha=on*(1-ph);g.beginPath();g.arc(x1+(rnd(i)-0.5)*40*ph,y1-ph*18,4,0,7);g.fill();}g.restore();}
// cubo de fregar (x = centro, y = base), lvl 0–1
function bucket(x,y,s,lvl=0.6,col='rgba(200,230,255,0.85)'){g.save();g.translate(x,y);g.scale(s,s);
 g.strokeStyle='#cfd6e2';g.lineWidth=5;g.beginPath();g.arc(0,-118,72,Math.PI*1.05,Math.PI*1.95);g.stroke();
 g.fillStyle='#2bb3a3';g.beginPath();g.moveTo(-80,-120);g.lineTo(80,-120);g.lineTo(62,0);g.lineTo(-62,0);g.closePath();g.fill();
 g.fillStyle='rgba(0,0,0,0.12)';g.fillRect(-70,-60,140,10);
 if(lvl>0){g.fillStyle=col;g.beginPath();g.ellipse(0,-120+4,76,12,0,0,7);g.fill();}
 g.fillStyle='#3fd0bf';rr(-86,-128,172,14,7);g.fill();g.restore();}
// nube de gas tóxico (verde amarillenta); a = opacidad, r = radio
function gasCloud(x,y,r,t,a=1,col='200,226,90'){if(a<=0||r<=1)return;g.save();
 for(let i=0;i<9;i++){const ang=i/9*Math.PI*2+t*0.3;const d=r*0.55*(0.6+0.4*rnd(i));const px=x+Math.cos(ang)*d+Math.sin(t*1.3+i)*r*0.06,py=y+Math.sin(ang)*d*0.7+Math.cos(t*1.1+i)*r*0.05;
  const rr2=r*(0.42+0.2*rnd(i+4));const gg=g.createRadialGradient(px,py,rr2*0.1,px,py,rr2);gg.addColorStop(0,`rgba(${col},${0.55*a})`);gg.addColorStop(1,`rgba(${col},0)`);g.fillStyle=gg;g.beginPath();g.arc(px,py,rr2,0,7);g.fill();}
 g.strokeStyle=`rgba(${col},${0.6*a})`;g.lineWidth=5;g.lineCap='round';for(let k=0;k<3;k++){g.beginPath();for(let j=0;j<=14;j++){const yy=y-r*0.3-j*r*0.06;const xx=x+(k-1)*r*0.4+Math.sin(j*0.5+t*3+k*2)*r*0.08;j?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}
 g.restore();}
function hazeOverlay(a,col='170,200,70'){if(a<=0)return;g.fillStyle=`rgba(${col},${a})`;g.fillRect(-600,300,2300,1500);}
function tears(x,y,t,a=1){if(a<=0)return;g.save();g.fillStyle=`rgba(150,210,255,${0.9*a})`;[-24,24].forEach((dx,i)=>{const ph=(t*1.2+i*0.5)%1;g.beginPath();g.ellipse(x+dx,y+14+ph*40,5,8,0,0,7);g.fill();});g.restore();}
function coughFx(x,y,t,a=1){if(a<=0)return;g.save();g.strokeStyle=`rgba(255,255,255,${0.8*a})`;g.lineWidth=5;g.lineCap='round';const ph=(t*2.5)%1;[-0.5,0,0.5].forEach(an=>{const r0=20+ph*30;g.beginPath();g.moveTo(x+Math.cos(an)*r0,y+Math.sin(an)*r0);g.lineTo(x+Math.cos(an)*(r0+22),y+Math.sin(an)*(r0+22));g.stroke();});g.restore();}
// vaso de cristal con líquido (x,y = base)
function glassCup(x,y,s,rot,fill=1,col='rgba(255,236,150,0.9)'){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 if(fill>0){g.fillStyle=col;g.beginPath();const h=90*fill;g.moveTo(-30,0);g.lineTo(30,0);g.lineTo(30+8*fill,-h);g.lineTo(-30-8*fill,-h);g.closePath();g.fill();}
 g.strokeStyle='rgba(230,240,255,0.9)';g.lineWidth=5;g.beginPath();g.moveTo(-40,-100);g.lineTo(-30,0);g.lineTo(30,0);g.lineTo(40,-100);g.stroke();g.restore();}
// móvil (ring 0–1 dibuja ondas)
function smartphone(x,y,s,rot,ring,t){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);g.fillStyle='#1b1f2a';rr(-32,-58,64,116,12);g.fill();g.fillStyle='#5b8cff';rr(-26,-50,52,96,6);g.fill();
 g.fillStyle='#3ecf6e';g.beginPath();g.arc(0,28,10,0,7);g.fill();g.restore();
 if(ring>0){g.save();g.strokeStyle=`rgba(242,163,58,${0.8*ring})`;g.lineWidth=5;for(let k=0;k<3;k++){const r=30+k*20+((t*40)%20);g.globalAlpha=ring*(1-r/110);g.beginPath();g.arc(x,y,r*s,-0.8,0.8);g.stroke();g.beginPath();g.arc(x,y,r*s,Math.PI-0.8,Math.PI+0.8);g.stroke();}g.restore();}}
// fachada de casa con ventana (gas 0–1 la llena de nube)
function houseFront(x,y,w,t,gas=0,lit=1){const h=w*0.9;g.fillStyle='#2e3f66';rr(x-w/2,y-h,w,h,10);g.fill();g.fillStyle='#4a3424';g.beginPath();g.moveTo(x-w/2-20,y-h+4);g.lineTo(x,y-h-w*0.5);g.lineTo(x+w/2+20,y-h+4);g.closePath();g.fill();
 const ww=w*0.46,wx=x-ww/2,wy=y-h*0.78;g.fillStyle=gas>0?mixc('#ffd27a','#b8d94a',gas):`rgba(255,210,122,${0.4+0.6*lit})`;rr(wx,wy,ww,ww,8);g.fill();g.fillStyle='#24335a';g.fillRect(x-3,wy,6,ww);g.fillRect(wx,wy+ww/2-3,ww,6);
 g.fillStyle='#24335a';rr(x-w*0.14,y-h*0.32,w*0.28,h*0.32,[8,8,0,0]);g.fill();
 if(gas>0)gasCloud(x,wy-10-gas*30,w*0.45*gas,t,gas);}
function sparkle(x,y,r,a){if(a<=0)return;g.save();g.globalAlpha=a;g.fillStyle='#fff';g.beginPath();g.moveTo(x,y-r);g.quadraticCurveTo(x,y,x+r,y);g.quadraticCurveTo(x,y,x,y+r);g.quadraticCurveTo(x,y,x-r,y);g.quadraticCurveTo(x,y,x,y-r);g.fill();g.restore();}
function cloth(x,y,col='#f2a33a'){g.fillStyle=col;rr(x-34,y-16,68,32,10);g.fill();g.fillStyle='rgba(255,255,255,0.25)';g.fillRect(x-30,y-6,60,4);}
function headset(o){const x=o.x,s=o.s||1,hy=o.y-310*s;g.save();g.strokeStyle='#1b1f2a';g.lineWidth=10*s;g.beginPath();g.arc(x,hy-6*s,74*s,Math.PI*1.08,Math.PI*1.92);g.stroke();g.fillStyle='#1b1f2a';rr(x-84*s,hy-14*s,22*s,40*s,8*s);g.fill();rr(x+62*s,hy-14*s,22*s,40*s,8*s);g.fill();
 g.lineWidth=6*s;g.beginPath();g.moveTo(x+70*s,hy+20*s);g.quadraticCurveTo(x+60*s,hy+52*s,x+24*s,hy+50*s);g.stroke();g.fillStyle='#3d7bff';g.beginPath();g.arc(x+22*s,hy+50*s,7*s,0,7);g.fill();g.restore();}
ILL.bano_fondo=(c,t)=>{g.save();cam(1,540,1050);bathroom(t);vanityFront();basin(760);g.restore();g.fillStyle='rgba(6,10,20,0.6)';g.fillRect(0,470,W,1150);};
