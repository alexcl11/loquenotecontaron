// ===== Kit: apps del móvil, multitarea y ajustes de batería (2026-11-04) =====
// apps genéricas (sin marcas): color + nombre
const APPS={music:{c:'#8b7cf6',n:'Música'},map:{c:'#2fbf71',n:'Mapas'},chat:{c:'#2fa58f',n:'Mensajes'},photo:{c:'#f2a33a',n:'Fotos'},
 video:{c:'#3d7bff',n:'Vídeos'},mail:{c:'#5b8cff',n:'Correo'},game:{c:'#e5484d',n:'Juegos'},weather:{c:'#4fb3ff',n:'Tiempo'}};
// icono de app genérico (x,y centro; sz lado)
function appIcon(x,y,sz,kind,a=1){const ap=APPS[kind]||APPS.chat;const u=sz/100;g.save();g.globalAlpha*=a;g.translate(x,y);
 const gr=g.createLinearGradient(0,-50*u,0,50*u);gr.addColorStop(0,mixc(ap.c,'#ffffff',0.18));gr.addColorStop(1,ap.c);g.fillStyle=gr;rr(-50*u,-50*u,100*u,100*u,24*u);g.fill();
 g.fillStyle='#fff';g.strokeStyle='#fff';g.lineCap='round';g.lineJoin='round';
 if(kind==='music'){g.beginPath();g.ellipse(-12*u,20*u,13*u,10*u,-0.3,0,7);g.fill();g.lineWidth=7*u;g.beginPath();g.moveTo(-1*u,18*u);g.lineTo(-1*u,-28*u);g.lineTo(22*u,-20*u);g.stroke();}
 else if(kind==='map'){g.beginPath();g.arc(0,-8*u,22*u,Math.PI*0.85,Math.PI*2.15);g.lineTo(0,32*u);g.closePath();g.fill();g.fillStyle=ap.c;g.beginPath();g.arc(0,-8*u,9*u,0,7);g.fill();}
 else if(kind==='chat'){rr(-30*u,-26*u,60*u,44*u,16*u);g.fill();g.beginPath();g.moveTo(-14*u,14*u);g.lineTo(-22*u,32*u);g.lineTo(2*u,16*u);g.fill();}
 else if(kind==='photo'){g.beginPath();g.arc(16*u,-16*u,10*u,0,7);g.fill();g.beginPath();g.moveTo(-34*u,28*u);g.lineTo(-8*u,-6*u);g.lineTo(10*u,16*u);g.lineTo(20*u,6*u);g.lineTo(34*u,28*u);g.closePath();g.fill();}
 else if(kind==='video'){g.beginPath();g.moveTo(-14*u,-22*u);g.lineTo(24*u,0);g.lineTo(-14*u,22*u);g.closePath();g.fill();}
 else if(kind==='mail'){rr(-32*u,-22*u,64*u,44*u,8*u);g.fill();g.strokeStyle=ap.c;g.lineWidth=5*u;g.beginPath();g.moveTo(-28*u,-16*u);g.lineTo(0,6*u);g.lineTo(28*u,-16*u);g.stroke();}
 else if(kind==='game'){rr(-34*u,-16*u,68*u,34*u,17*u);g.fill();g.fillStyle=ap.c;g.fillRect(-24*u,-2*u,16*u,5*u);g.fillRect(-18.5*u,-8*u,5*u,16*u);g.beginPath();g.arc(14*u,-3*u,4*u,0,7);g.arc(23*u,4*u,4*u,0,7);g.fill();}
 else if(kind==='weather'){g.fillStyle='#ffd96a';g.beginPath();g.arc(-8*u,-8*u,16*u,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(4*u,14*u,14*u,0,7);g.arc(20*u,8*u,12*u,0,7);g.arc(-12*u,16*u,10*u,0,7);g.fill();g.fillRect(-12*u,14*u,34*u,12*u);}
 g.restore();}
// móvil grande en primer plano (260×520 a escala 1). draw(t) pinta la pantalla en coordenadas locales (pantalla: x −118…118, y −248…248).
// o: {lvl (batería de la barra de estado), chg, glare 0–1 (brillo), wall (color de fondo), dim}
function bigPhone(x,y,s,rot,draw,o={}){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-122,-246,260,520,38);g.fill();
 g.fillStyle='#1b1f2a';rr(-130,-260,260,520,38);g.fill();g.fillStyle='#2a3040';rr(-134,-140,5,50,2);g.fill();rr(129,-170,5,70,2);g.fill();
 g.save();rr(-118,-248,236,496,28);g.clip();
 const wg=g.createLinearGradient(0,-248,0,248);wg.addColorStop(0,o.wall||'#22336a');wg.addColorStop(1,'#3a2a66');g.fillStyle=wg;g.fillRect(-120,-250,240,500);
 if(draw)draw();
 if(o.dim){g.fillStyle=`rgba(0,0,0,${o.dim})`;g.fillRect(-120,-250,240,500);}
 if(o.lvl!=null){battIcon(84,-226,30,o.lvl,{bolt:o.chg});}
 if(o.glare){g.fillStyle=`rgba(255,255,255,${0.75*o.glare})`;g.fillRect(-120,-250,240,500);}
 g.restore();g.fillStyle='#0d1018';rr(-34,-242,68,18,9);g.fill();
 g.restore();}
// tarjeta de app en la vista multitarea (coordenadas locales de la pantalla). a = opacidad
function appCard(x,y,w,kind,a=1,o={}){const ap=APPS[kind]||APPS.chat;const h=w*1.9;g.save();g.globalAlpha*=a;
 if(!o.nolab){appIcon(x-w/2+14,y-h/2-22,26,kind);txt(ap.n,x-w/2+34,y-h/2-22,17,'#fff',800,'left');}
 g.fillStyle='rgba(0,0,0,0.25)';rr(x-w/2+4,y-h/2+6,w,h,16);g.fill();
 g.fillStyle='#f4f6fb';rr(x-w/2,y-h/2,w,h,16);g.fill();g.save();rr(x-w/2,y-h/2,w,h,16);g.clip();
 g.fillStyle=ap.c;g.fillRect(x-w/2,y-h/2,w,h*0.26);g.fillStyle='rgba(255,255,255,0.85)';rr(x-w/2+12,y-h/2+14,w*0.5,10,5);g.fill();
 if(kind==='photo'||kind==='video'||kind==='map'){g.fillStyle=mixc(ap.c,'#ffffff',0.6);rr(x-w/2+10,y-h/2+h*0.3,w-20,h*0.36,10);g.fill();if(kind==='map'){g.strokeStyle='#fff';g.lineWidth=5;g.beginPath();g.moveTo(x-w/2+14,y+h*0.1);g.lineTo(x,y-h*0.12);g.lineTo(x+w/2-14,y-h*0.05);g.stroke();}}
 if(kind==='music'){g.fillStyle=mixc(ap.c,'#ffffff',0.55);rr(x-w*0.3,y-h*0.2,w*0.6,w*0.6,12);g.fill();}
 g.fillStyle='#d5dbe5';for(let i=0;i<4;i++){rr(x-w/2+12,y+h*0.2+i*18,(w-24)*(i%2?0.65:0.9),9,4);g.fill();}
 g.restore();if(o.glow){g.strokeStyle=C.amber;g.lineWidth=5;g.globalAlpha=a*o.glow;rr(x-w/2-4,y-h/2-4,w+8,h+8,19);g.stroke();}
 g.restore();}
// vista multitarea: kinds = lista de apps (la última queda centrada y las anteriores asoman a la izquierda), rm = instantes en que cada una
// se desliza hacia arriba (o null; cerrar de la última a la primera), o: {w, gap, y, glow:{i:valor}, pause 0–1}
function switcher(t,kinds,rm,o={}){const w=o.w||150,gap=o.gap||170,y=o.y||10,N=kinds.length;let removed=0;
 const st=kinds.map((k,i)=>{const r=rm&&rm[i]!=null?rm[i]:1e9;removed+=ease(E(t,r+0.2,0.35));return {k,i,f:E(t,r,0.35)};});
 const n=N-removed;
 st.forEach(c=>{if(c.f>=1)return;const x=(c.i-(n-1))*gap;if(x<-300||x>300)return;const yy=y-560*ease(c.f);appCard(x,yy,w,c.k,1-c.f*0.8,{glow:o.glow&&o.glow[c.i],nolab:gap<100&&c.i!==N-1});
  if(o.pause>0&&!(o.glow&&o.glow[c.i]>0.3))pauseBadge(x,yy+20,28,o.pause);});return removed;}
// insignia de pausa (app quieta)
function pauseBadge(x,y,r,a){if(a<=0)return;g.save();g.globalAlpha*=a;g.fillStyle='rgba(20,28,48,0.82)';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#fff';rr(x-r*0.36,y-r*0.42,r*0.24,r*0.84,r*0.08);g.fill();rr(x+r*0.12,y-r*0.42,r*0.24,r*0.84,r*0.08);g.fill();g.restore();}
// energía que sale de la batería hacia algo (puntos ámbar que avanzan)
function drainFx(x1,y1,x2,y2,t,a=1,col='#f2a33a',n=6){if(a<=0)return;g.save();for(let i=0;i<n;i++){const ph=(t*1.1+i/n)%1;const x=lerp(x1,x2,ph),y=lerp(y1,y2,ph)-Math.sin(ph*Math.PI)*30;g.globalAlpha=a*Math.sin(ph*Math.PI);g.fillStyle=col;g.beginPath();g.arc(x,y,7,0,7);g.fill();}g.restore();}
// deslizador de brillo (tipo centro de control): val 0–1; o: {auto}
function brightSlider(x,y,h,val,o={}){const w=h*0.4;g.save();g.fillStyle='rgba(30,38,60,0.9)';rr(x-w/2,y-h/2,w,h,w*0.38);g.fill();g.save();rr(x-w/2,y-h/2,w,h,w*0.38);g.clip();g.fillStyle='#f4f6fb';g.fillRect(x-w/2,y+h/2-h*cl(val),w,h*cl(val));g.restore();
 const sy=y+h/2-w*0.55,col=val>0.18?'#7a6a2a':'#ffd96a';g.fillStyle=col;g.strokeStyle=col;g.lineWidth=w*0.05;g.lineCap='round';g.beginPath();g.arc(x,sy,w*0.13,0,7);g.fill();
 for(let k=0;k<8;k++){const an=k/8*Math.PI*2;g.beginPath();g.moveTo(x+Math.cos(an)*w*0.2,sy+Math.sin(an)*w*0.2);g.lineTo(x+Math.cos(an)*w*0.28,sy+Math.sin(an)*w*0.28);g.stroke();}
 if(o.auto)txt('A',x,y-h/2+w*0.4,w*0.32,val>0.85?'#1a1206':'#fff',900,'center',o.auto);g.restore();}
// barras de cobertura (lvl 0–4) y símbolo wifi (lvl 0–3)
function sigBars(x,y,s,lvl,col='#fff'){for(let i=0;i<4;i++){g.fillStyle=i<lvl?col:'rgba(255,255,255,0.18)';rr(x+(i-2)*26*s,y-(i+1)*22*s,18*s,(i+1)*22*s,5*s);g.fill();}}
function wifiSym(x,y,s,lvl,col='#fff'){g.save();g.lineCap='round';g.lineWidth=12*s;for(let k=1;k<=3;k++){g.strokeStyle=k<=lvl?col:'rgba(255,255,255,0.18)';g.beginPath();g.arc(x,y,k*26*s,-Math.PI*0.75,-Math.PI*0.25);g.stroke();}g.fillStyle=lvl>0?col:'rgba(255,255,255,0.18)';g.beginPath();g.arc(x,y,9*s,0,7);g.fill();g.restore();}
// interruptor tipo ajustes (on 0–1)
function toggleSw(x,y,s,on){const w=64*s,h=36*s;g.fillStyle=mixc('#4a5570','#3ecf6e',cl(on));rr(x-w/2,y-h/2,w,h,h/2);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(lerp(x-w/2+h/2,x+w/2-h/2,ease(on)),y,h*0.42,0,7);g.fill();}
// velocímetro de rendimiento (val 0–1)
function speedGauge(x,y,r,val,col=C.green){g.save();g.lineCap='round';g.lineWidth=r*0.18;g.strokeStyle='rgba(255,255,255,0.14)';g.beginPath();g.arc(x,y,r,Math.PI,0);g.stroke();g.strokeStyle=col;g.beginPath();g.arc(x,y,r,Math.PI,Math.PI+Math.PI*cl(val));g.stroke();
 const an=Math.PI+Math.PI*cl(val);g.strokeStyle='#fff';g.lineWidth=r*0.07;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(an)*r*0.8,y+Math.sin(an)*r*0.8);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(x,y,r*0.1,0,7);g.fill();g.restore();}
// pantalla de Ajustes > Batería (dentro de bigPhone): rows = [{kind, v (0–1, barra sin cifras), p (aparición 0–1)}]
function battScreen(t,rows,o={}){g.fillStyle='#f2f3f7';g.fillRect(-120,-250,240,500);txt('‹ Ajustes',-100,-196,17,'#3d7bff',700,'left');txt('Batería',-100,-160,30,'#111827',900,'left');
 g.fillStyle='#fff';rr(-104,-128,208,70,14);g.fill();battIcon(-60,-93,52,o.lvl??0.62,{});txt('Modo ahorro',-14,-102,15,'#111827',800,'left');toggleSw(70,-80,0.62,o.saver||0);
 txt('USO DE APPS · HOY',-100,-30,13,'#6b7280',800,'left');g.fillStyle='#fff';rr(-104,-14,208,62*rows.length+14,14);g.fill();
 rows.forEach((r,i)=>{const p=r.p??1;if(p<=0)return;const yy=20+i*62;g.save();g.globalAlpha*=cl(p*2);appIcon(-78,yy,36,r.kind);txt(APPS[r.kind].n,-52,yy-10,15,'#111827',800,'left');
  g.fillStyle='#e5e7eb';rr(-52,yy+8,140,10,5);g.fill();g.fillStyle=i===0?C.amber:'#9aa4b5';rr(-52,yy+8,140*r.v*ease(p),10,5);g.fill();g.restore();});}
// pulgar/mano que sujeta el móvil por abajo a la derecha (x,y = yema del pulgar)
function thumbHand(x,y,s,sleeve='#2fa58f'){g.save();g.strokeStyle=sleeve;g.lineCap='round';g.lineWidth=90*s;g.beginPath();g.moveTo(x+260*s,y+520*s);g.lineTo(x+170*s,y+300*s);g.stroke();
 g.strokeStyle=IL.skin;g.lineWidth=72*s;g.beginPath();g.moveTo(x+170*s,y+300*s);g.lineTo(x+90*s,y+150*s);g.stroke();g.lineWidth=34*s;g.beginPath();g.moveTo(x+90*s,y+150*s);g.lineTo(x,y);g.stroke();
 g.fillStyle='#f6d6bd';g.beginPath();g.ellipse(x+2*s,y+4*s,11*s,14*s,-0.5,0,7);g.fill();g.restore();}
// destellos de pantalla deslumbrante
function glareRays(x,y,r,t,a){if(a<=0)return;g.save();g.globalAlpha=a;const gr=g.createRadialGradient(x,y,r*0.1,x,y,r);gr.addColorStop(0,'rgba(255,255,240,0.8)');gr.addColorStop(1,'rgba(255,255,240,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill();
 g.strokeStyle='rgba(255,250,220,0.7)';g.lineWidth=5;g.lineCap='round';for(let k=0;k<10;k++){const an=k/10*Math.PI*2+t*0.4;g.beginPath();g.moveTo(x+Math.cos(an)*r*0.55,y+Math.sin(an)*r*0.55);g.lineTo(x+Math.cos(an)*r*(0.8+0.1*Math.sin(t*5+k)),y+Math.sin(an)*r*(0.8+0.1*Math.sin(t*5+k)));g.stroke();}g.restore();}
// notas musicales flotando
function musicNotes(x,y,t,a=1){if(a<=0)return;g.save();for(let i=0;i<4;i++){const ph=(t*0.5+i/4)%1;const nx=x+Math.sin(ph*6+i)*30+i*14,ny=y-ph*170;g.globalAlpha=a*Math.sin(ph*Math.PI);g.fillStyle=i%2?'#c9b8ff':'#8b7cf6';g.strokeStyle=g.fillStyle;g.lineWidth=5;g.beginPath();g.ellipse(nx,ny,11,8,-0.3,0,7);g.fill();g.beginPath();g.moveTo(nx+9,ny-2);g.lineTo(nx+9,ny-36);g.lineTo(nx+24,ny-30);g.stroke();}g.restore();}
