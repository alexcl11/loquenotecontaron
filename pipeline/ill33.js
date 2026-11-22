// ===== Kit de ilustración (33): luces de Navidad — árbol genérico, guirnalda LED / de bombillas antiguas, bombillas en primer plano, enchufe sobrecargado, etiquetas CE / IP44 =====
const XLED=['#ff5a6a','#ffd34a','#5ad1ff','#7dff8a','#ff9a3a','#c58bff'];
// una luz de guirnalda. kind 'led' = punto pequeño y nítido de color · 'old' = bombilla antigua en pera, amarilla, con halo grande y calor
function xLight(x,y,s,kind,on,t,i=0){const col=kind==='led'?XLED[i%XLED.length]:'#ffd27a';
 const tw=kind==='led'?0.75+0.25*Math.sin(t*4+i*1.7):0.92+0.08*Math.sin(t*9+i);const a=on*tw;
 if(a>0.02){const R=(kind==='led'?26:52)*s;const gr=g.createRadialGradient(x,y,1,x,y,R);gr.addColorStop(0,kind==='led'?hexA(col,0.55*a):`rgba(255,200,110,${0.6*a})`);gr.addColorStop(1,'rgba(255,200,110,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,R,0,7);g.fill();}
 if(kind==='led'){g.fillStyle='#2b3a2e';rr(x-4*s,y-11*s,8*s,7*s,2*s);g.fill();g.fillStyle=on>0.05?mixc('#5c667a',col.length===7?col:'#ffffff',cl(a)):'#5c667a';g.beginPath();g.ellipse(x,y,6*s,8*s,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.7)';g.beginPath();g.arc(x-2*s,y-3*s,2*s,0,7);g.fill();}
 else{g.fillStyle='#3b3f46';rr(x-6*s,y-16*s,12*s,9*s,2*s);g.fill();g.fillStyle=mixc('#8a8470','#ffe7a0',cl(a));g.beginPath();g.moveTo(x,y-9*s);g.bezierCurveTo(x+12*s,y-6*s,x+12*s,y+12*s,x,y+16*s);g.bezierCurveTo(x-12*s,y+12*s,x-12*s,y-6*s,x,y-9*s);g.fill();
  g.strokeStyle=`rgba(255,140,40,${0.8*cl(a)})`;g.lineWidth=2*s;g.beginPath();g.moveTo(x-3*s,y);g.lineTo(x,y+5*s);g.lineTo(x+3*s,y);g.stroke();}}
function hexA(h,a){const p=parseInt(h.slice(1),16);return `rgba(${p>>16},${(p>>8)&255},${p&255},${a})`;}
// guirnalda que cuelga entre dos puntos (catenaria simple). o: kind, on, n, s, p (0–1 = hasta dónde está colgada), sag
function garland(x0,y0,x1,y1,t,o={}){const n=o.n??9,s=o.s??1,p=o.p??1,sag=o.sag??40,kind=o.kind||'led';if(p<=0)return;
 const pt=k=>[lerp(x0,x1,k),lerp(y0,y1,k)+sag*4*k*(1-k)];
 g.save();g.strokeStyle='#1f3a2a';g.lineWidth=3.5*s;g.lineCap='round';g.beginPath();for(let j=0;j<=30;j++){const k=j/30*p;const [x,y]=pt(k);j?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();g.restore();
 for(let i=0;i<n;i++){const k=(i+0.5)/n;if(k>p)break;const [x,y]=pt(k);xLight(x,y+8*s,s,kind,o.on??1,t,i+(o.seed||0));}}
// árbol de Navidad genérico (base en yb). o: on (luces), kind, p (guirnaldas puestas 0–1), star
function xmasTree(x,yb,s,t,o={}){g.save();g.translate(x,yb);g.scale(s,s);
 g.fillStyle='#8b5a3c';rr(-60,-70,120,70,10);g.fill();g.fillStyle='#a66d4a';rr(-66,-78,132,18,8);g.fill();g.fillStyle='#5a3a26';g.fillRect(-14,-110,28,36);
 const tiers=[[-110,190,150],[-230,160,140],[-340,125,130],[-440,85,120]];
 tiers.forEach(([y,w,h],i)=>{g.fillStyle=i%2?'#2f7d54':'#2a6e4a';g.beginPath();g.moveTo(-w,y);g.quadraticCurveTo(0,y+26,w,y);g.lineTo(0,y-h);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,0.06)';g.beginPath();g.moveTo(0,y-h);g.lineTo(-w*0.55,y+4);g.lineTo(-w*0.2,y+10);g.closePath();g.fill();});
 // bolas de adorno
 [[-90,-150,'#e5484d'],[70,-170,'#3d7bff'],[-40,-280,'#f2a33a'],[60,-300,'#8b7cf6'],[-20,-400,'#e5484d']].forEach(([bx,by,c])=>{g.fillStyle=c;g.beginPath();g.arc(bx,by,14,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.5)';g.beginPath();g.arc(bx-4,by-4,4,0,7);g.fill();});
 // estrella genérica
 const st=o.star??1;g.save();g.translate(0,-575);g.rotate(Math.sin(t*1.5)*0.05);g.fillStyle=mixc('#8a7a4a','#ffd34a',st);g.beginPath();for(let k=0;k<10;k++){const r=k%2?16:38,a=-Math.PI/2+k*Math.PI/5;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();
 if(st>0.5){g.globalAlpha=0.35*st;const gr=g.createRadialGradient(0,0,4,0,0,90);gr.addColorStop(0,'rgba(255,220,120,1)');gr.addColorStop(1,'rgba(255,220,120,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,90,0,7);g.fill();}g.restore();
 // guirnaldas en diagonal (de arriba a abajo)
 const sw=[[-60,-470,70,-400],[85,-370,-110,-300],[-120,-250,140,-170],[150,-140,-170,-80]];
 const p=o.p??1;sw.forEach(([a,b,c2,d],i)=>{const k=cl(p*sw.length-i);if(k>0)garland(a,b,c2,d,t,{kind:o.kind||'led',on:o.on??1,n:o.kind==='old'?5:8,p:k,sag:22,seed:i*3,s:o.kind==='old'?1.15:1.1});});
 if(o.heat)heatWaves(0,-200,240,t,o.heat);
 g.restore();}
// bombilla grande en primer plano (para comparar). kind 'led' | 'old'; heat = ondas de calor; devuelve el centro
function bigXLight(x,y,s,kind,on,t,o={}){xLight(x,y,s,kind,on,t,o.i||1);if(o.heat)heatWaves(x,y-40*s,160*s/3,t,o.heat);return [x,y];}
// enchufe de pared con ladrón y varios enchufes conectados; heat 0–1 = se calienta (rojo + ondas); n = clavijas
function overloadSocket(x,y,s,t,o={}){const heat=o.heat||0,n=o.n??3;g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='#e9e4d8';rr(-48,-48,96,96,14);g.fill();g.fillStyle='#cfc8b8';g.beginPath();g.arc(0,0,30,0,7);g.fill();
 if(n>1){g.fillStyle=mixc('#f4f6fb','#ffb3a6',heat);rr(-70,-20,140,110,16);g.fill();}
 const pos=n>1?[[-38,60],[0,92],[38,60]].slice(0,n):[[0,0]];
 pos.forEach(([px,py],i)=>{g.fillStyle=mixc('#f4f6fb','#ffcfc4',heat);rr(px-18,py-20,36,40,8);g.fill();g.strokeStyle='#e0e3ea';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(px,py+20);g.quadraticCurveTo(px+(i-1)*40,py+120,px+(i-1)*90,py+200);g.stroke();});
 if(heat>0){g.save();g.globalAlpha=heat*(0.55+0.3*Math.sin(t*10));const gr=g.createRadialGradient(0,40,10,0,40,170);gr.addColorStop(0,'rgba(255,80,60,0.8)');gr.addColorStop(1,'rgba(255,80,60,0)');g.fillStyle=gr;g.beginPath();g.arc(0,40,170,0,7);g.fill();g.restore();heatWaves(0,-40,120,t,heat);}
 g.restore();}
// etiqueta de cartón que cuelga del cable (texto corto genérico: «CE», «IP44»)
function cableTag(x,y,s,label,p,col='#f4f1ea'){if(p<=0)return;g.save();g.translate(x,y);g.rotate(Math.sin(p*6)*0.12*(1-p)+0.05);g.scale(s*eob(p),s*eob(p));g.globalAlpha=cl(p*3);
 g.strokeStyle='#c9b28a';g.lineWidth=3;g.beginPath();g.moveTo(0,-36);g.lineTo(0,-6);g.stroke();
 g.fillStyle=col;rr(-56,-8,112,64,12);g.fill();g.fillStyle='#c9b28a';g.beginPath();g.arc(0,4,5,0,7);g.fill();txt(label,0,30,34,'#1a2742',900);g.restore();}
// caja de cartón (para guardar las luces viejas); open 0–1
function xBox(x,y,s,open=1){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#b98a5a';rr(-110,-90,220,120,8);g.fill();g.fillStyle='#a3784c';g.fillRect(-110,-90,220,14);
 g.fillStyle='#c99a68';g.save();g.translate(-110,-90);g.rotate(-1.9*open);rr(0,-6,110,12,4);g.fill();g.restore();g.save();g.translate(110,-90);g.rotate(1.9*open);rr(-110,-6,110,12,4);g.fill();g.restore();g.restore();}
