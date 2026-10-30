// ===== Kit de ilustración (10): factura de la luz y precio por horas — factura genérica, reloj de 24 h por periodos, gráfico horario, móvil con precios, cielo de día, tejado solar =====
// colores de los periodos de la luz (peajes 2.0TD): punta rojo, llano ámbar, valle verde
const PER={punta:'#e5484d',llano:'#f2a33a',valle:'#3ecf6e'};
// periodo de un día laborable a la hora h (0–23)
function perOf(h){h=((h%24)+24)%24;if(h<8)return 'valle';if(h<10||(h>=14&&h<18)||h>=22)return 'llano';return 'punta';}
// color de precio 0–1 (verde barato → ámbar → rojo caro)
function priceCol(v){v=cl(v);return v<0.5?mixc('#3ecf6e','#f2a33a',v*2):mixc('#f2a33a','#e5484d',(v-0.5)*2);}
// factura genérica (sin marca). (x,y) centro, 260×320 a escala 1. o: rows (filas visibles 0–3, admite fracción), hl (fila resaltada 0 único / 1 periodos / 2 PVPC), hk (0–1)
function billSheet(x,y,s,rot,o={}){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-122,-150,256,318,14);g.fill();
 g.fillStyle='#f7f4ec';rr(-130,-160,260,320,14);g.fill();g.fillStyle=C.amber;rr(-130,-160,260,54,[14,14,0,0]);g.fill();
 txt('⚡ FACTURA DE LA LUZ',0,-132,19,'#1a1206',900);
 g.fillStyle='#d9d3c4';[200,140,180].forEach((w,i)=>{rr(-106,-90+i*16,w,7,3);g.fill();});
 const rows=[['PRECIO ÚNICO',C.blue],['3 PERIODOS',C.green],['PVPC',C.purple]];const n=o.rows??3;
 rows.forEach(([lb,col],i)=>{const k=cl(n-i);if(k<=0)return;const yy=-12+i*56;const h=o.hl===i?(o.hk??1):0;g.save();g.globalAlpha*=k;
  g.fillStyle='#ebe6da';rr(-112,yy-22,224,44,10);g.fill();if(h>0){g.save();g.globalAlpha*=h;g.fillStyle=col;rr(-112,yy-22,224,44,10);g.fill();g.restore();}
  g.fillStyle=h>0.5?'#fff':col;g.beginPath();g.arc(-88,yy,9,0,7);g.fill();txt(lb,-68,yy+1,21,h>0.5?'#fff':'#2a3040',900,'left');g.restore();});
 g.fillStyle='#2a3040';for(let i=0;i<22;i++){const w=rnd(i+40)>0.5?4:2;g.fillRect(-100+i*9,128,w,20);}
 g.restore();}
// reloj de 24 h en anillo. mode: 'flat' (todo o.col), 'tramos' (punta/llano/valle de un laborable), 'finde' (todo valle), 'vals' (o.vals[0..23] 0–1 → priceCol)
// o: p (0–1, sectores que aparecen en orden), hand (hora de la aguja, null = sin aguja), hl ([a,b] horas resaltadas; el resto se atenúa con hk 0–1), labels (true)
function dayDial(x,y,r,mode,t,o={}){const p=o.p??1;g.save();
 g.fillStyle='rgba(20,29,48,0.92)';g.beginPath();g.arc(x,y,r+14,0,7);g.fill();
 for(let i=0;i<24;i++){const k=cl(p*24-i);if(k<=0)continue;const a0=-Math.PI/2+i/24*Math.PI*2+0.012,a1=a0+Math.PI*2/24*k-0.024;
  let col=mode==='flat'?(o.col||C.blue):mode==='finde'?PER.valle:mode==='vals'?priceCol(o.vals[i]):PER[perOf(i)];
  const dim=o.hl&&o.hk?((i>=o.hl[0]&&i<o.hl[1])?0:o.hk):0;g.globalAlpha=1-0.7*dim;
  g.strokeStyle=col;g.lineWidth=r*0.3;g.beginPath();g.arc(x,y,r*0.8,a0,a1);g.stroke();}
 g.globalAlpha=1;g.fillStyle='#10141c';g.beginPath();g.arc(x,y,r*0.62,0,7);g.fill();
 if(o.labels!==false){[[0,'0 h'],[6,'6'],[12,'12'],[18,'18']].forEach(([h,l])=>{const a=-Math.PI/2+h/24*Math.PI*2;txt(l,x+Math.cos(a)*r*0.45,y+Math.sin(a)*r*0.45,r*0.15,'#c9d1e0',800);});
  emoji('🌙',x,y-r*0.18,r*0.18);emoji('☀️',x,y+r*0.2,r*0.18);}
 if(o.hand!=null){const a=-Math.PI/2+o.hand/24*Math.PI*2;g.strokeStyle='#fff';g.lineWidth=r*0.05;g.lineCap='round';g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*r*0.95,y+Math.sin(a)*r*0.95);g.stroke();
  g.fillStyle='#fff';g.beginPath();g.arc(x,y,r*0.07,0,7);g.fill();}
 g.restore();}
// gráfico de barras horario (24 barras, sin cifras). (x,y) = esquina inf. izq. del eje; vals 0–1; p crecimiento 0–1
// o: hl lista de [a,b,col] (horas a resaltar con ese color), dim 0–1 (atenúa lo no resaltado), axis (etiquetas 0/6/12/18/24), col (color fijo)
function hourChart(x,y,w,h,vals,p,o={}){const bw=w/24;g.save();
 for(let i=0;i<24;i++){const q=ease(cl(p*1.6-i/24));if(q<=0)continue;const v=vals[i]*h*q;let col=o.col||priceCol(vals[i]);let a=1;
  if(o.hl){const m=o.hl.find(r=>i>=r[0]&&i<r[1]);if(m)col=m[2]||col;else a=1-0.7*(o.dim||0);}
  g.globalAlpha=a;g.fillStyle=col;rr(x+i*bw+bw*0.14,y-v,bw*0.72,Math.max(2,v),Math.min(8,bw*0.3));g.fill();}
 g.globalAlpha=1;g.fillStyle='#5c667a';g.fillRect(x-6,y,w+12,4);
 if(o.axis!==false){[0,6,12,18,24].forEach(hh=>txt(hh===24?'24 h':''+hh,x+hh*bw,y+30,Math.max(18,bw*0.75),'#8e98ad',800));}
 g.restore();return i=>x+(i+0.5)*bw;}
// móvil en la mano con el gráfico de precios por horas en pantalla. (x,y) centro, 120×220 a escala 1
function pricePhone(x,y,s,rot,vals,p){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle='#1b1f2a';rr(-60,-110,120,220,20);g.fill();g.fillStyle='#101b36';rr(-52,-100,104,200,14);g.fill();
 txt('€/kWh',0,-80,13,'#8e98ad',800);hourChart(-44,40,88,90,vals,p,{axis:false});
 g.fillStyle='#2a3550';rr(-36,62,72,8,4);g.fill();g.restore();}
// cielo de día que tapa la ventana de kitchen() (k 0–1), con sol
function kitchenDay(k,t){if(k<=0)return;g.save();g.globalAlpha=k;const sk=g.createLinearGradient(0,612,0,888);sk.addColorStop(0,'#5fa8ff');sk.addColorStop(1,'#bfe0ff');g.fillStyle=sk;rr(84,614,242,272,6);g.fill();
 g.save();g.beginPath();g.rect(84,614,242,272);g.clip();sunDisk(150,690,30,t,1);g.fillStyle='rgba(255,255,255,0.85)';[[250,820,26],[280,812,20],[226,816,18]].forEach(([a,b,c])=>{g.beginPath();g.arc(a,b,c,0,7);g.fill();});g.restore();
 g.fillStyle='#4a3424';g.fillRect(200,614,10,272);g.fillRect(84,745,242,10);
 const lg=g.createRadialGradient(205,750,30,205,750,700);lg.addColorStop(0,'rgba(255,240,200,0.18)');lg.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=lg;g.fillRect(-600,300,2300,1400);g.restore();}
// sol con rayos que giran. a = opacidad
function sunDisk(x,y,r,t,a=1){if(a<=0)return;g.save();g.globalAlpha*=a;const gl=g.createRadialGradient(x,y,r*0.5,x,y,r*2.6);gl.addColorStop(0,'rgba(255,214,90,0.55)');gl.addColorStop(1,'rgba(255,214,90,0)');g.fillStyle=gl;g.beginPath();g.arc(x,y,r*2.6,0,7);g.fill();
 g.strokeStyle='#ffd65a';g.lineWidth=r*0.16;g.lineCap='round';for(let i=0;i<10;i++){const b=i/10*Math.PI*2+t*0.4;g.beginPath();g.moveTo(x+Math.cos(b)*r*1.3,y+Math.sin(b)*r*1.3);g.lineTo(x+Math.cos(b)*r*1.7,y+Math.sin(b)*r*1.7);g.stroke();}
 g.fillStyle='#ffd65a';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#fff0b0';g.beginPath();g.arc(x-r*0.25,y-r*0.25,r*0.45,0,7);g.fill();g.restore();}
// cielo exterior de noche (k=0) a día (k=1), ocupa (x,y,w,h)
function skyBand(x,y,w,h,k){const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,mixc('#0b1430','#4f9cff',k));gr.addColorStop(1,mixc('#1d2d5a','#cde7ff',k));g.fillStyle=gr;g.fillRect(x,y,w,h);}
// casa con placas solares en el tejado (base en y, ancho w). sun 0–1 = brillo de las placas
function solarRoof(x,y,w,t,sun=1){const h=w*0.55,rh=w*0.36;
 g.fillStyle='#3a5a3a';g.fillRect(-600,y,2300,60);
 g.fillStyle='#f4f1ea';g.fillRect(x-w/2,y-h,w,h);g.fillStyle='#c9564a';g.beginPath();g.moveTo(x-w/2-30,y-h);g.lineTo(x,y-h-rh);g.lineTo(x+w/2+30,y-h);g.closePath();g.fill();
 // placas (en el faldón izquierdo)
 for(let i=0;i<3;i++){const k0=0.18+i*0.25,k1=k0+0.2;const p=(k)=>[lerp(x-w/2-30,x,k),lerp(y-h,y-h-rh,k)];const a=p(k0),b=p(k1);
  g.fillStyle='#1d3b78';g.beginPath();g.moveTo(a[0],a[1]-4);g.lineTo(b[0],b[1]-4);g.lineTo(b[0]+40,b[1]+18);g.lineTo(a[0]+40,a[1]+18);g.closePath();g.fill();
  g.strokeStyle='rgba(160,200,255,0.5)';g.lineWidth=2;g.beginPath();g.moveTo((a[0]+b[0])/2,(a[1]+b[1])/2-4);g.lineTo((a[0]+b[0])/2+40,(a[1]+b[1])/2+18);g.stroke();
  if(sun>0){g.save();g.globalAlpha=sun*(0.35+0.35*Math.sin(t*3+i));g.fillStyle='#fff6c8';g.beginPath();g.moveTo(a[0]+8,a[1]);g.lineTo(a[0]+22,a[1]-6);g.lineTo(a[0]+36,a[1]+14);g.lineTo(a[0]+22,a[1]+20);g.closePath();g.fill();g.restore();}}
 g.fillStyle='#5a3f30';rr(x+w*0.12,y-h*0.62,w*0.22,h*0.62,6);g.fill();
 g.fillStyle='#ffe3a0';rr(x-w*0.36,y-h*0.72,w*0.3,h*0.32,6);g.fill();g.fillStyle='#4a3424';g.fillRect(x-w*0.21-2,y-h*0.72,4,h*0.32);}
// semana L–D: los días de valle (sábado y domingo) se ponen verdes con k 0–1. p = aparición
function weekStrip(x,y,w,p,k){const d=['L','M','X','J','V','S','D'];const bw=w/7;
 d.forEach((l,i)=>{const q=cl(p*7-i);if(q<=0)return;const vk=i>=5?k:0;g.save();g.globalAlpha=cl(q*2);const cx=x+i*bw+bw/2;const sc=eob(q);g.translate(cx,y);g.scale(sc,sc);
  g.fillStyle=vk>0?mixc('#2a3550','#3ecf6e',vk):'#2a3550';rr(-bw*0.42,-50,bw*0.84,100,18);g.fill();txt(l,0,2,44,vk>0.5?'#05170b':'#fff',900);g.restore();});}
