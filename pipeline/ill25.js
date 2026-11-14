// ===== Kit de ilustración (25): pasta y aceite — botella de aceite genérica, manchas de aceite en el agua, espaguetis en la olla (sueltos o pegados), cuchara de palo, manojo de espaguetis secos, plato de pasta con salsa que se agarra o resbala =====
const OIL='rgba(226,181,58,0.92)',PASTA='#f2d48a',PASTA_D='#d9b45e';
// botella de aceite genérica sin marca (cristal + aceite dorado + tapón verde, etiqueta «ACEITE»). (x,y) = centro (para la mano); rot>0 inclina el pico a la derecha (≈1,9 = vertiendo). Devuelve el pico [x,y] para pourStream
function oilBottle(x,y,s=1,rot=0,fill=0.8){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.fillStyle='rgba(225,236,250,0.28)';rr(-36,-80,72,190,22);g.fill();rr(-14,-132,28,60,8);g.fill();
 g.save();rr(-32,-76,64,182,18);g.clip();g.fillStyle=OIL;g.fillRect(-40,106-182*fill,80,182*fill+4);g.restore();
 g.fillStyle='#3a6b2a';rr(-17,-152,34,26,7);g.fill();
 g.fillStyle='#f4efe0';rr(-30,-6,60,66,8);g.fill();
 g.fillStyle='#5f8f3a';g.beginPath();g.ellipse(0,12,9,15,0.5,0,7);g.fill();
 g.fillStyle='#5a4a2a';g.font=`800 13px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText('ACEITE',0,42);
 g.fillStyle='rgba(255,255,255,0.45)';rr(-26,-70,7,160,4);g.fill();
 g.restore();const c=Math.cos(rot),sn=Math.sin(rot);const lx=0,ly=-152*s;return [x+lx*c-ly*sn,y+lx*sn+ly*c];}
// manchas de aceite que flotan en la superficie de una olla vista de frente (elipse de centro cx,cy y semiejes rx,ry); a = cantidad 0–1
function oilSpots(cx,cy,rx,ry,t,a=1,n=9){if(a<=0)return;g.save();for(let i=0;i<n;i++){if(rnd(i+70)>a*1.05)continue;
  const ang=rnd(i+3)*6.28+t*0.15,rr2=Math.sqrt(rnd(i+9))*0.8;const px=cx+Math.cos(ang)*rx*rr2,py=cy+Math.sin(ang)*ry*rr2;const r=(8+rnd(i+5)*12)*Math.min(1,a*1.5);
  g.fillStyle=OIL;g.beginPath();g.ellipse(px,py,r,r*ry/rx*1.6+2,0,0,7);g.fill();g.fillStyle='rgba(255,240,180,0.7)';g.beginPath();g.ellipse(px-r*0.3,py-1,r*0.3,1.5,0,0,7);g.fill();}g.restore();}
// capa de aceite flotando sobre el agua en una olla en corte (potCut): de x0 a x1, a la altura wy
function oilFilm(x0,x1,wy,t,a=1){if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.fillStyle=OIL;const n=9;
 for(let i=0;i<n;i++){const k=(i+0.5)/n;const w=(x1-x0)/n*0.8*(0.6+rnd(i+2)*0.5);const bx=lerp(x0+20,x1-20,k)+Math.sin(t*1.5+i)*6;const by=wy+Math.sin(i*1.1+t*8)*4-2;
  g.beginPath();g.ellipse(bx,by,w/2,9,0,0,7);g.fill();}
 g.fillStyle='rgba(255,240,180,0.6)';for(let i=0;i<n;i+=2){g.beginPath();g.ellipse(lerp(x0+20,x1-20,(i+0.5)/n)-8,wy-4,10,2.5,0,0,7);g.fill();}g.restore();}
// espaguetis dentro de una olla en corte: x = centro, wy = superficie, yB = fondo, w = ancho útil. clump 0–1 = se pegan en un nudo; st = se mueven (removiendo)
function pastaIn(x,wy,yB,w,t,o={}){const cp=o.clump||0,st=o.st??0.3,a=o.a??1;if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.lineCap='round';
 const cx=x,cy=lerp(wy,yB,0.62);const n=14;
 for(let i=0;i<n;i++){g.strokeStyle=i%3?PASTA:PASTA_D;g.lineWidth=7;g.beginPath();
  const ph=rnd(i+1)*6.28,x0=x-w/2+30+rnd(i+11)*(w-60);
  for(let j=0;j<=14;j++){const k=j/14;let px=x0+Math.sin(k*5+ph+t*st*3)*(26+20*rnd(i+4)),py=lerp(yB-16,wy+24,k);
   const pull=cp*(0.85-0.3*Math.abs(k-0.5));px=lerp(px,cx+(px-x0)*0.35+Math.sin(k*9+i)*14,pull);py=lerp(py,cy+(k-0.5)*70+Math.cos(k*7+i)*10,pull);
   j?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();}
 if(cp>0.3){g.globalAlpha=a*cl((cp-0.3)*1.6);g.fillStyle=PASTA_D;g.beginPath();g.ellipse(cx,cy,60+30*cp,34+14*cp,0.2,0,7);g.fill();
  g.strokeStyle=PASTA;g.lineWidth=6;for(let i=0;i<6;i++){g.beginPath();g.ellipse(cx+(rnd(i)-0.5)*40,cy+(rnd(i+3)-0.5)*20,40+rnd(i+5)*30,14+rnd(i+6)*12,rnd(i+8)*3,0,5);g.stroke();}}
 g.restore();}
// cuchara de palo: (x,y) = agarre (para la mano); el mango baja según rot (0 = vertical hacia abajo); long = largo del mango
function woodSpoon(x,y,s=1,rot=0,long=230){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.fillStyle='#b9824a';rr(-9,-20,18,long+20,9);g.fill();g.fillStyle='#d39a5c';rr(-5,-16,6,long,3);g.fill();
 g.fillStyle='#b9824a';g.beginPath();g.ellipse(0,long+40,28,46,0,0,7);g.fill();g.fillStyle='#9c6a38';g.beginPath();g.ellipse(0,long+44,18,32,0,0,7);g.fill();g.restore();}
// manojo de espaguetis secos tumbado (centro x,y), con cinta de papel
function spaghettiBundle(x,y,s=1,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.lineCap='round';
 for(let i=0;i<16;i++){const dy=(i-7.5)*3.2,dx=(rnd(i+2)-0.5)*16;g.strokeStyle=i%4?'#f0c96a':'#d9ac48';g.lineWidth=5;g.beginPath();g.moveTo(-150+dx,dy);g.lineTo(150+dx,dy*1.4);g.stroke();}
 g.fillStyle='#f4efe0';rr(-24,-34,48,68,8);g.fill();g.fillStyle='#c0392b';g.fillRect(-24,-6,48,12);g.restore();}
// plato hondo de espaguetis con tomate (base aprox. en y). slip 0–1 = la salsa resbala y se queda en el fondo del plato (pasta brillante de aceite)
function pastaPlate(x,y,s=1,t=0,o={}){const sl=o.slip||0;g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='#d5dbe5';g.beginPath();g.ellipse(0,8,190,56,0,0,7);g.fill();g.fillStyle='#f0f3f8';g.beginPath();g.ellipse(0,0,180,50,0,0,7);g.fill();
 g.fillStyle='#dfe5ee';g.beginPath();g.ellipse(0,4,120,30,0,0,7);g.fill();
 if(sl>0){g.fillStyle='#c8432f';g.beginPath();g.ellipse(0,10,lerp(40,150,sl),lerp(10,36,sl),0,0,7);g.fill();g.fillStyle='rgba(255,150,120,0.35)';g.beginPath();g.ellipse(-40*sl,4,40*sl,6*sl,0,0,7);g.fill();}
 // nido de pasta
 g.lineCap='round';for(let i=0;i<9;i++){g.strokeStyle=i%3?PASTA:PASTA_D;g.lineWidth=7;g.beginPath();g.ellipse((rnd(i)-0.5)*50,-30-rnd(i+4)*40,90-i*4,28+rnd(i+1)*14,(rnd(i+7)-0.5)*0.8,0,6.28);g.stroke();}
 if(sl>0.2){g.strokeStyle=`rgba(255,250,220,${0.8*sl})`;g.lineWidth=3;for(let i=0;i<6;i++){g.beginPath();g.arc(-60+i*24,-46-rnd(i)*30,10,3.6,4.6);g.stroke();}}
 // salsa encima: con slip baja por los lados
 const top=1-sl;if(top>0.02){g.fillStyle='#d94a33';g.beginPath();g.ellipse(0,lerp(-70,-40,sl),70*Math.sqrt(top),26*Math.sqrt(top),0,0,7);g.fill();
  g.fillStyle='#f06a4e';g.beginPath();g.ellipse(-16,lerp(-78,-44,sl),22*top,7*top,0,0,7);g.fill();
  g.fillStyle='#4f9a3a';g.beginPath();g.ellipse(18,lerp(-76,-44,sl),12*top,7*top,0.6,0,7);g.fill();}
 if(sl>0.05&&sl<0.95){g.fillStyle='#d94a33';for(let i=0;i<5;i++){const k=(t*0.8+rnd(i))%1;const ang=-0.4+i*0.6;g.beginPath();g.ellipse(Math.cos(ang)*lerp(50,110,k)*(i%2?1:-1),lerp(-50,0,k),9,13,0,0,7);g.fill();}}
 g.restore();}
