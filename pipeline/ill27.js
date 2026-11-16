// ===== Kit: etiqueta energética (2026-11-19) =====
// Etiqueta genérica (sin bandera ni logos reales): cabecera azul noche con rayo y «ENERGÍA», 7 barras de colores y flecha negra con la clase.
const EL_COLS=['#1f9d55','#3ecf6e','#a3d93a','#f2d43a','#f2a33a','#f07a2a','#e5484d'];
const EL_OLD=['A+++','A++','A+','A','B','C','D'],EL_NEW=['A','B','C','D','E','F','G'];
// código QR genérico (patrón fijo, no lleva a ninguna parte). (x,y) = esquina sup. izq.; sz = lado
function qrCode(x,y,sz,a=1){if(a<=0)return;g.save();g.globalAlpha*=a;g.fillStyle='#fff';rr(x-4,y-4,sz+8,sz+8,4);g.fill();const n=21,c=sz/n;g.fillStyle='#0c1220';
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){const f=(i<7&&j<7)||(i>=n-7&&j<7)||(i<7&&j>=n-7);if(f)continue;if(rnd(i*31+j*7+3)>0.52)g.fillRect(x+i*c,y+j*c,c+0.4,c+0.4);}
 [[0,0],[n-7,0],[0,n-7]].forEach(([i,j])=>{g.fillRect(x+i*c,y+j*c,7*c,7*c);g.fillStyle='#fff';g.fillRect(x+(i+1)*c,y+(j+1)*c,5*c,5*c);g.fillStyle='#0c1220';g.fillRect(x+(i+2)*c,y+(j+2)*c,3*c,3*c);});
 g.restore();}
// etiqueta energética centrada en (x,y), 260×380 a escala 1.
// o: mode 'old' (A+++…D) | 'new' (A…G, con QR); cls = fila de la flecha (0–6, admite decimales para deslizarla; null = sin flecha);
// p = barras que aparecen 0–1; plusX = 0–1 tacha los «+» (solo old); hl = pulso en la flecha; qr = 0–1 aparición del QR (new)
function energyLabel(x,y,s,rot,o={}){const mode=o.mode||'new',L=mode==='old'?EL_OLD:EL_NEW,p=o.p??1;
 g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-122,-180,256,380,16);g.fill();
 g.fillStyle='#f7f8fb';rr(-130,-190,260,380,16);g.fill();
 g.fillStyle='#1b2a52';rr(-130,-190,260,62,[16,16,0,0]);g.fill();
 txt('⚡',-102,-159,28,C.amber,900);txt('ENERGÍA',-74,-159,24,'#fff',900,'left');
 if(mode==='new')qrCode(68,-182,46,o.qr??1);
 const y0=-112,dy=36,bh=29;
 L.forEach((k,i)=>{const a=cl(p*7-i);if(a<=0)return;const w=(78+i*17)*ease(a);g.fillStyle=EL_COLS[i];
  g.beginPath();g.moveTo(-112,y0+i*dy);g.lineTo(-112+w,y0+i*dy);g.lineTo(-112+w+14,y0+i*dy+bh/2);g.lineTo(-112+w,y0+i*dy+bh);g.lineTo(-112,y0+i*dy+bh);g.closePath();g.fill();
  if(a>0.6){txt(k,-104,y0+i*dy+bh/2+1,k.length>2?19:21,'#fff',900,'left');
   if(mode==='old'&&(o.plusX||0)>0&&k.includes('+')){const tw=k.length*12+6;g.save();g.strokeStyle=C.red;g.lineWidth=4;g.lineCap='round';const e=cl(o.plusX*1.5-i*0.08);
    g.beginPath();g.moveTo(-104+12,y0+i*dy+bh/2+2);g.lineTo(-104+12+(tw-12)*e,y0+i*dy+bh/2-2);g.stroke();g.restore();}}});
 // líneas de texto genéricas abajo (sin cifras)
 g.fillStyle='#d6dbe6';[150,110,170].forEach((w,i)=>{rr(-112,140+i*13,w,7,3);g.fill();});
 // flecha negra con la clase
 if(o.cls!=null){const ci=cl(o.cls,0,6),k=L[Math.round(ci)],yy=y0+ci*dy+bh/2,pu=1+0.08*(o.hl||0);
  g.save();g.translate(112,yy);g.scale(pu,pu);g.fillStyle='#0c1220';g.beginPath();g.moveTo(-58,0);g.lineTo(-38,-21);g.lineTo(14,-21);g.lineTo(14,21);g.lineTo(-38,21);g.closePath();g.fill();
  txt(k,-14,1,k.length>2?18:28,'#fff',900);g.restore();}
 g.restore();}
// pegatina pequeña de etiqueta (para ponerla sobre un aparato): solo cabecera + 3 barras + letra
function miniLabel(x,y,s,cls,mode='new'){energyLabel(x,y,s,0,{mode,cls});}
// signo ≠ grande con aparición
function neqSign(x,y,r,a){if(a<=0)return;g.save();g.globalAlpha*=cl(a*2);g.translate(x,y);g.scale(eob(a),eob(a));g.fillStyle=C.red;g.beginPath();g.arc(0,0,r,0,7);g.fill();
 g.strokeStyle='#fff';g.lineWidth=r*0.16;g.lineCap='round';g.beginPath();g.moveTo(-r*0.45,-r*0.2);g.lineTo(r*0.45,-r*0.2);g.moveTo(-r*0.45,r*0.2);g.lineTo(r*0.45,r*0.2);g.moveTo(r*0.25,-r*0.55);g.lineTo(-r*0.25,r*0.55);g.stroke();g.restore();}
// haz de escaneo del móvil a un punto (x0,y0 → zona x1,y1 de ancho w)
function scanBeam(x0,y0,x1,y1,w,t,a){if(a<=0)return;g.save();g.globalAlpha*=a*0.55;const gr=g.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,'rgba(120,200,255,0.9)');gr.addColorStop(1,'rgba(120,200,255,0.15)');
 g.fillStyle=gr;g.beginPath();g.moveTo(x0-8,y0);g.lineTo(x1-w/2,y1);g.lineTo(x1+w/2,y1);g.lineTo(x0+8,y0);g.closePath();g.fill();
 const k=(Math.sin(t*5)+1)/2;g.globalAlpha=a;g.strokeStyle='#9fd3ff';g.lineWidth=4;g.beginPath();g.moveTo(x1-w/2,y1-w/2+k*w);g.lineTo(x1+w/2,y1-w/2+k*w);g.stroke();g.restore();}
