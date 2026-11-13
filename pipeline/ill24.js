// ===== Kit: escarcha del congelador (2026-11-16) =====
// capa de hielo que tapiza por dentro un hueco rectangular (x,y,w,h) con esquinas redondeadas.
// th = grosor en px (0 = sin hielo); t anima los brillos; o.hl 0–1 = resalta el hielo con un pulso; o.knit 0–1 = textura de «abrigo» (punto de lana) encima.
function iceLayer(x,y,w,h,th,t,o={}){if(th<=0.5)return;const a=o.a??1;g.save();g.globalAlpha*=a;
 const R=12,ri=Math.max(4,R-th*0.25);
 g.beginPath();g.roundRect(x,y,w,h,R);g.roundRect(x+th,y+th,w-2*th,h-2*th,ri);
 g.fillStyle='rgba(222,239,255,0.95)';g.fill('evenodd');
 // grumos en el borde interior
 g.save();g.beginPath();g.roundRect(x,y,w,h,R);g.clip();g.fillStyle='rgba(240,248,255,0.98)';
 const lump=(cx,cy,r)=>{g.beginPath();g.arc(cx,cy,r,0,7);g.fill();};
 const nx=Math.max(4,Math.round(w/34)),ny=Math.max(3,Math.round(h/34));
 for(let i=0;i<=nx;i++){const k=i/nx,px=x+th+k*(w-2*th),r=th*(0.28+0.22*rnd(i+3));lump(px,y+th,r);lump(px,y+h-th,th*(0.22+0.2*rnd(i+9)));}
 for(let i=0;i<=ny;i++){const k=i/ny,py=y+th+k*(h-2*th);lump(x+th,py,th*(0.25+0.2*rnd(i+17)));lump(x+w-th,py,th*(0.25+0.2*rnd(i+23)));}
 // carámbanos que cuelgan del techo
 g.fillStyle='rgba(232,245,255,0.95)';for(let i=0;i<Math.round(w/60);i++){const px=x+th+20+rnd(i+41)*(w-2*th-40),L=th*(0.6+0.9*rnd(i+43));g.beginPath();g.moveTo(px-th*0.22,y+th-1);g.lineTo(px+th*0.22,y+th-1);g.lineTo(px,y+th+L);g.closePath();g.fill();}
 // vetas y brillos
 g.strokeStyle='rgba(255,255,255,0.9)';g.lineWidth=Math.max(2,th*0.12);g.lineCap='round';
 for(let i=0;i<8;i++){const side=i%4;const k=0.15+0.7*rnd(i+61);let x0,y0,x1,y1;
  if(side===0){x0=x+k*w;y0=y+th*0.35;x1=x0+th*0.9;y1=y0;}else if(side===1){x0=x+k*w;y0=y+h-th*0.4;x1=x0+th*0.9;y1=y0;}
  else if(side===2){x0=x+th*0.35;y0=y+k*h;x1=x0;y1=y0+th*0.9;}else{x0=x+w-th*0.4;y0=y+k*h;x1=x0;y1=y0+th*0.9;}
  g.globalAlpha=a*(0.5+0.5*Math.sin(t*2+i));g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();}
 g.restore();
 if(o.knit>0){g.save();g.globalAlpha=a*o.knit*0.85;g.beginPath();g.roundRect(x,y,w,h,R);g.roundRect(x+th,y+th,w-2*th,h-2*th,ri);g.clip('evenodd');
  g.fillStyle='rgba(242,163,58,0.55)';g.fillRect(x,y,w,h);g.strokeStyle='rgba(255,236,200,0.9)';g.lineWidth=3;
  const st=Math.max(10,th*0.45);for(let yy=y;yy<y+h+st;yy+=st){g.beginPath();for(let xx=x;xx<=x+w+st;xx+=st){g.lineTo(xx,yy+((xx-x)/st%2<1?0:st*0.5));}g.stroke();}
  g.restore();}
 if(o.hl>0){g.save();g.globalAlpha=a*o.hl*(0.55+0.45*Math.sin(t*6));g.strokeStyle='#7fd0ff';g.lineWidth=6;g.beginPath();g.roundRect(x+th,y+th,w-2*th,h-2*th,ri);g.stroke();g.restore();}
 g.restore();}
// congelador abierto en primer plano (corte frontal) — (x,y) esquina sup. izq., w×h del mueble.
// o.ice = grosor de la capa de hielo (px); o.block 0–1 = el hielo frena el frío; o.cold 0–1 = partículas de frío que salen del evaporador (techo) hacia la comida;
// o.knit, o.hl → iceLayer; o.warm 0–1 = la comida se templa (halo); o.food=false para vaciarlo. Devuelve {ix,iy,iw,ih} = hueco interior.
function freezerCut(x,y,w,h,t,o={}){const ice=o.ice??0,bl=o.block??0,cold=o.cold??0;
 g.fillStyle='rgba(0,0,0,0.25)';rr(x+10,y+14,w,h,30);g.fill();
 g.fillStyle='#e6ebf2';rr(x,y,w,h,30);g.fill();g.fillStyle='#cfd6e2';rr(x,y+h-46,w,46,[0,0,30,30]);g.fill();
 const ix=x+34,iy=y+34,iw=w-68,ih=h-110;
 const gr=g.createLinearGradient(0,iy,0,iy+ih);gr.addColorStop(0,'#2c4f7c');gr.addColorStop(1,'#1a3456');g.fillStyle=gr;rr(ix,iy,iw,ih,12);g.fill();
 // evaporador (serpentín) en el techo
 g.strokeStyle='#9fb3cc';g.lineWidth=8;g.lineCap='round';g.beginPath();const ny=iy+26;for(let k=0;k<=8;k++){const px=ix+30+k*(iw-60)/8;g.lineTo(px,k%2?ny+22:ny);}g.stroke();
 // estante
 g.fillStyle='rgba(220,235,255,0.35)';g.fillRect(ix+8,iy+ih*0.58,iw-16,8);
 const fx=ix+iw/2,fy=iy+ih*0.58;
 if(o.food!==false){
  if(o.warm>0)warmHalo(fx,fy-40,iw*0.42,o.warm);
  frozenPack(fx-iw*0.2,fy-46,0.95,-0.05,{ice:0.8,t});tupper(fx+iw*0.22,fy-2,1.0,0.8,1,'#3d7bff','#c9433f');
  frozenPack(fx-iw*0.05,iy+ih-56,1.05,0.04,{ice:0.8,t});}
 // frío que baja del evaporador hacia la comida
 if(cold>0){const top=iy+50,bot=fy-70;const stop=iy+ice+8;g.save();
  for(let k=0;k<12;k++){const ph=(t*0.55+rnd(k+5))%1;const px=ix+60+(k+0.5)*(iw-120)/12;const stuck=rnd(k+77)<bl*0.8;
   let py,al;if(stuck){py=lerp(top,Math.max(top+10,stop+16),Math.min(1,ph*2.5));al=ph<0.4?1:cl(1-(ph-0.4)/0.4);}
   else{py=lerp(top,bot,ph);al=Math.sin(ph*Math.PI);}
   if(!stuck&&ice>0&&py<stop+14&&py>top)al*=1-0.6*bl;
   g.globalAlpha=cold*al;flake(px,py,13,t+k);}
  g.restore();}
 iceLayer(ix,iy,iw,ih,ice,t,{knit:o.knit||0,hl:o.hl||0});
 g.fillStyle='rgba(255,255,255,0.10)';rr(ix,iy,iw,24,[12,12,0,0]);g.fill();
 return {ix,iy,iw,ih};}
// compresor (motor del frigorífico) genérico, base en (x,y); run 0–1 = trabaja (vibra y se calienta un poco)
function compressor(x,y,s,t,run=0){const j=run>0?Math.sin(t*38)*2.5*run:0;g.save();g.translate(x+j,y);g.scale(s,s);
 g.fillStyle='#2a3040';rr(-80,-14,160,14,6);g.fill();
 g.fillStyle=mixc('#3b4458','#6a4a3a',run*0.6);g.beginPath();g.moveTo(-62,-14);g.lineTo(-62,-70);g.quadraticCurveTo(-62,-120,0,-120);g.quadraticCurveTo(62,-120,62,-70);g.lineTo(62,-14);g.closePath();g.fill();
 g.fillStyle='rgba(255,255,255,0.14)';rr(-48,-104,18,70,9);g.fill();
 g.strokeStyle='#c9d3e0';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(40,-100);g.quadraticCurveTo(70,-150,40,-190);g.moveTo(-30,-118);g.lineTo(-30,-190);g.stroke();
 g.restore();workFx(x,y-60*s,124*s,90*s,t,run);}
// regla milimetrada vertical (amarilla), (x,y) = arriba; px = píxeles por mm; n = mm que se ven; hl = mm resaltado (0 = ninguno), a = opacidad
function mmRuler(x,y,px,n,hl,a=1){if(a<=0)return;g.save();g.globalAlpha*=a;const H=px*n;
 g.fillStyle='#f2c14a';rr(x,y-10,70,H+20,8);g.fill();g.strokeStyle='#5a4210';g.lineCap='butt';
 for(let i=0;i<=n;i++){const yy=y+i*px;g.lineWidth=3;g.beginPath();g.moveTo(x,yy);g.lineTo(x+(i%5===0?40:26),yy);g.stroke();
  g.fillStyle='#5a4210';g.font=`800 22px ${F}`;g.textAlign='left';g.textBaseline='middle';if(i>0)g.fillText(String(i),x+44,yy);}
 if(hl>0){g.strokeStyle=C.red;g.lineWidth=6;g.beginPath();g.moveTo(x-30,y+hl*px);g.lineTo(x+80,y+hl*px);g.stroke();}
 g.restore();}
