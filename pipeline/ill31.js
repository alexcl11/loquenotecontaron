// ===== Kit de ilustración (31): tarifas de la luz — tarjeta de tarifa (regulada / libre / bono social), columna de monedas con cifra, lista de ofertas para la pantalla del móvil =====
// colores de cada tipo de tarifa
const TR_K={reg:{col:'#8b7cf6',t1:'TARIFA REGULADA',t2:'PVPC',ic:'⚖️'},libre:{col:'#3d7bff',t1:'MERCADO LIBRE',t2:'OFERTA',ic:'🏷️'},bono:{col:'#3ecf6e',t1:'BONO SOCIAL',t2:'DESCUENTO',ic:'💚'}};
// tarjeta de tarifa genérica (sin marca). (x,y) centro, 220×280 a escala 1. o: kind reg/libre/bono, hl 0–1 (borde que brilla), dim 0–1 (atenúa), t (para el brillo)
function tariffCard(x,y,s,rot,o={}){const K=TR_K[o.kind||'reg'];g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 if(o.dim)g.globalAlpha*=1-0.6*o.dim;
 if(o.hl>0){g.save();g.globalAlpha*=o.hl*(0.6+0.4*Math.sin((o.t||0)*6));g.strokeStyle=K.col;g.lineWidth=14;rr(-118,-148,236,296,22);g.stroke();g.restore();}
 g.fillStyle='rgba(0,0,0,0.25)';rr(-104,-134,216,278,16);g.fill();
 g.fillStyle='#f7f4ec';rr(-110,-140,220,280,16);g.fill();
 g.fillStyle=K.col;rr(-110,-140,220,78,[16,16,0,0]);g.fill();
 txt(K.t1,0,-114,K.t1.length>14?19:21,'#fff',900,'center',1,200);txt(K.t2,0,-82,26,'#fff',900);
 emoji(K.ic,0,-6,62);
 g.fillStyle='#d9d3c4';[150,120,160,100].forEach((w,i)=>{rr(-w/2,52+i*18,w,8,4);g.fill();});
 g.restore();}
// columna de monedas apiladas (base en yb, ancho w, alto h·p). o: col (color de la etiqueta), val (texto de la cifra, encima), lab (texto debajo), tag (pastilla de % encima de la cifra), tagCol, tk (0–1 aparición del tag), a (opacidad), crown (0–1 corona «la más barata»)
function coinCol(x,yb,w,h,p,t,o={}){const a=o.a??1;if(a<=0)return;g.save();g.globalAlpha*=a;const hh=h*ease(p);const n=Math.max(0,Math.floor(hh/18));
 g.fillStyle='rgba(20,29,48,0.75)';rr(x-w/2-14,yb-6,w+28,16,8);g.fill();
 for(let i=0;i<n;i++){const yy=yb-i*18-9;const wob=Math.sin(i*1.7+t*2)*1.5;
  g.fillStyle='#d9a52c';g.beginPath();g.ellipse(x+wob,yy+4,w/2,9,0,0,7);g.fill();g.fillStyle='#f2c14a';g.beginPath();g.ellipse(x+wob,yy,w/2,9,0,0,7);g.fill();}
 if(n>0){const yt=yb-n*18-9;g.fillStyle='#fff3c4';g.beginPath();g.ellipse(x,yt,w/2-10,5,0,0,7);g.fill();}
 const top=yb-hh-12;
 if(o.val&&p>0.15)txt(o.val,x,top-34,48,'#fff',900,'center',cl(p*3-0.4),w+90);
 if(o.tag&&o.tk>0)pillDraw(o.tag,x,top-100,o.tagCol||C.red,o.tagCol===C.green||o.tagCol===C.amber?'#05170b':'#fff',30,cl(o.tk*3),eob(o.tk));
 if(o.crown>0)emoji('👑',x,top-(o.tag?175:100)-Math.sin(t*3)*5,62*eob(o.crown));
 if(o.lab)o.lab.split('\n').forEach((l,i)=>txt(l,x,yb+40+i*32,28,o.col||'#c9d1e0',800,'center',1,w+110));
 g.restore();}
// lista de ofertas para pintar dentro de bigPhone (coordenadas locales x ±118, y ±248). p = filas que aparecen 0–1, sort = 0–1 se ordenan de barata a cara, hl = 0–1 resalta la primera
function offerList(t,o={}){const p=o.p??1,so=ease(o.sort||0);txt('COMPARADOR',0,-200,22,'#c9d1e0',900);txt('kWh/año ✓',0,-170,18,'#8e98ad',800);
 const V=[0.72,0.35,0.9,0.5,0.62,0.28];const ord=V.map((v,i)=>i).sort((a,b)=>V[a]-V[b]);
 V.forEach((v,i)=>{const k=cl(p*6-i);if(k<=0)return;const r0=i,r1=ord.indexOf(i);const yy=-120+lerp(r0,r1,so)*58;
  const best=r1===0&&so>0.9;g.save();g.globalAlpha*=k;g.fillStyle=best&&o.hl>0?mixc('#2a3550','#1f7a45',o.hl):'#2a3550';rr(-104,yy-22,208,44,12);g.fill();
  g.fillStyle=priceCol(v);rr(-90,yy-7,150*v,14,7);g.fill();txt('€',86,yy+1,22,'#fff',900);g.restore();});
 if(o.hl>0)txt('✓ LA MÁS BARATA PARA TI',0,232,17,C.green,900,'center',o.hl);}
// eslabón entre dos tarjetas (unión). (x1,y1)→(x2,y2), p 0–1
function linkChain(x1,y1,x2,y2,p,col){if(p<=0)return;const n=5;g.save();g.strokeStyle=col||C.green;g.lineWidth=10;
 for(let i=0;i<n;i++){const k=cl(p*n-i);if(k<=0)continue;const f=(i+0.5)/n;const cx=lerp(x1,x2,f),cy=lerp(y1,y2,f);g.globalAlpha=k;g.beginPath();g.ellipse(cx,cy,22,13,Math.atan2(y2-y1,x2-x1)+(i%2?Math.PI/2:0)*0.0,0,7);g.stroke();}
 g.restore();}
