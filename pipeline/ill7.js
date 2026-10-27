// ===== Kit de ilustración (7): sobras — olla grande, tápers, cucharón, baño de agua fría con hielo, termómetro de zonas =====
// olla grande de guiso (base en y). o: lid 0–1 (tapa), steam 0–1, soup (color del guiso), fill 0–1 (nivel visible si no hay tapa)
function stockPot(x,y,s,t,o={}){const lid=o.lid??0,st=o.steam??0,soup=o.soup||'#d9822b';g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='#1e2128';rr(-150,-150,42,18,9);g.fill();rr(108,-150,42,18,9);g.fill(); // asas
 g.fillStyle='#c9d3e0';rr(-120,-180,240,180,22);g.fill();g.fillStyle='#b3bfcf';rr(-120,-60,240,60,22);g.fill();
 g.fillStyle='#e9eef5';rr(-104,-168,16,140,8);g.fill(); // brillo
 g.fillStyle='#8592a6';rr(-128,-188,256,16,8);g.fill(); // borde
 if(lid<1){g.fillStyle=soup;g.beginPath();g.ellipse(0,-182,118,14,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.25)';g.beginPath();g.ellipse(-30,-184,30,5,0,0,7);g.fill();}
 if(lid>0){const ly=lerp(-320,-190,ease(lid));g.globalAlpha=cl(lid*3);g.fillStyle='#aeb9c9';g.beginPath();g.ellipse(0,ly,128,22,0,Math.PI,0);g.fill();g.fillStyle='#1e2128';rr(-22,ly-38,44,18,9);g.fill();g.globalAlpha=1;}
 g.restore();if(st>0&&lid<1)steam(x,y-200*s,t,st*(1-lid));}
// táper poco hondo (base en y). fill 0–1 (comida dentro), lid 0–1 (tapa bajando), col = color de la tapa
function tupper(x,y,s,fill=1,lid=0,col='#3d7bff',soup='#d9822b'){g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(230,240,255,0.55)';rr(-70,-50,140,50,12);g.fill();
 if(fill>0){const h=40*fill;g.fillStyle=soup;rr(-62,-6-h,124,h,8);g.fill();g.fillStyle='rgba(255,255,255,0.22)';g.fillRect(-56,-6-h,40,5);}
 g.strokeStyle='rgba(255,255,255,0.7)';g.lineWidth=4;rr(-70,-50,140,50,12);g.stroke();
 if(lid>0){const ly=lerp(-150,-58,ease(lid));g.globalAlpha=cl(lid*3);g.fillStyle=col;rr(-76,ly,152,16,8);g.fill();g.fillStyle=mixc(col,'#ffffff',0.3);rr(-60,ly+3,40,5,3);g.fill();g.globalAlpha=1;}
 g.restore();}
// cucharón: (x,y) = mano; rot en radianes; full 0–1 (lleno de guiso)
function ladle(x,y,rot=0,full=0,soup='#d9822b'){g.save();g.translate(x,y);g.rotate(rot);g.strokeStyle='#c9d3e0';g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(0,-40);g.lineTo(0,110);g.stroke();
 g.fillStyle='#c9d3e0';g.beginPath();g.arc(0,128,34,0,Math.PI);g.fill();g.fillRect(-34,124,68,6);if(full>0){g.fillStyle=soup;g.beginPath();g.ellipse(0,128,30*full,7,0,0,7);g.fill();}g.restore();}
// gota de guiso que cae del cucharón
function drip(x,y,p,soup='#d9822b'){if(p<=0||p>=1)return;g.fillStyle=soup;g.beginPath();g.arc(x,y+p*p*90,7,0,7);g.fill();}
// cuenco grande de cristal con agua fría y cubitos (base en y). lvl 0–1, ice 0–1 (cubitos visibles). content(x,yAgua) dibuja lo que flota dentro (encima del agua, para que se vea)
function iceBath(x,y,w,t,lvl=0.7,ice=1,content){const h=w*0.42;g.save();
 g.fillStyle='rgba(200,225,255,0.18)';g.beginPath();g.moveTo(x-w/2,y-h);g.lineTo(x+w/2,y-h);g.quadraticCurveTo(x+w/2,y,x+w/2-40,y);g.lineTo(x-w/2+40,y);g.quadraticCurveTo(x-w/2,y,x-w/2,y-h);g.fill();
 const wy=y-h*lvl;
 g.fillStyle='rgba(110,180,255,0.42)';g.beginPath();g.moveTo(x-w/2+4,wy+Math.sin(t*3)*2);for(let i=0;i<=16;i++)g.lineTo(x-w/2+4+i*(w-8)/16,wy+Math.sin(i*0.8+t*3)*3);
 g.lineTo(x+w/2-6,y-30);g.quadraticCurveTo(x+w/2-10,y-4,x+w/2-44,y-4);g.lineTo(x-w/2+44,y-4);g.quadraticCurveTo(x-w/2+10,y-4,x-w/2+6,y-30);g.closePath();g.fill();
 if(ice>0){g.globalAlpha=cl(ice*2);for(let i=0;i<6;i++){const ix=x-w/2+44+(i<3?i*34:w-88-(i-3)*34),iy=wy+4+Math.sin(t*2+i)*4;g.save();g.translate(ix,iy);g.rotate(rnd(i)*0.8-0.4);g.fillStyle='rgba(235,248,255,0.92)';rr(-20,-20,40,40,9);g.fill();g.fillStyle='rgba(255,255,255,0.9)';rr(-12,-14,12,6,3);g.fill();g.restore();}g.globalAlpha=1;}
 if(content)content(x,wy);
 g.strokeStyle='rgba(255,255,255,0.65)';g.lineWidth=5;g.beginPath();g.moveTo(x-w/2,y-h);g.quadraticCurveTo(x-w/2,y,x-w/2+40,y);g.lineTo(x+w/2-40,y);g.quadraticCurveTo(x+w/2,y,x+w/2,y-h);g.stroke();
 g.restore();}
// termómetro de zonas para comida (0–80 °C): banda roja ≥60 (caliente, seguro), azul ≤5 (frío, seguro), ámbar en medio (las bacterias crecen).
// zh/zc/zm 0–1 = cuánto se ven las etiquetas de cada zona. Devuelve f(grados)->y
function zoneThermo(x,y,h,val,o={}){const lo=0,hi=80,top=y-h,yv=v=>y-cl((v-lo)/(hi-lo))*h;const zh=o.zh??1,zc=o.zc??1,zm=o.zm??1;
 g.fillStyle='#f4f6fb';rr(x-40,top-34,80,h+44,40);g.fill();g.beginPath();g.arc(x,y+46,70,0,7);g.fill();
 // bandas laterales de zona
 const band=(v0,v1,col,a)=>{if(a<=0)return;g.save();g.globalAlpha=a;g.fillStyle=col;rr(x+50,yv(v1),26,yv(v0)-yv(v1),10);g.fill();g.restore();};
 band(60,80,C.red,zh);band(5,60,C.amber,zm);band(0,5,'#5bb4ff',zc);
 g.fillStyle='#d9dfe8';rr(x-20,top-16,40,h+22,20);g.fill();
 const col=val>=60?C.red:(val<=5?'#5bb4ff':C.amber);g.fillStyle=col;g.beginPath();g.arc(x,y+46,52,0,7);g.fill();rr(x-20,yv(val),40,y+34-yv(val),20);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';rr(x-12,top-6,9,h,4);g.fill();
 g.strokeStyle='#8e98ad';g.lineWidth=4;[0,5,20,40,60,80].forEach(v=>{const yy=yv(v);g.beginPath();g.moveTo(x-44,yy);g.lineTo(x-(v===5?58:66),yy);g.stroke();if(v!==0)txt(v+'°',x-106,v===5?yy-8:yy,30,v===5?'#8fd0ff':'#dfe5f0',800);});
 return yv;}
// vibración de "trabajando" (líneas a los lados de un aparato de ancho w)
function workFx(x,y,w,h,t,a=1){if(a<=0)return;g.save();g.strokeStyle=`rgba(255,207,90,${0.85*a})`;g.lineWidth=6;g.lineCap='round';const j=Math.sin(t*30)*3;
 [-1,1].forEach(sd=>{for(let k=0;k<3;k++){const xx=x+sd*(w/2+20+k*18)+j;g.globalAlpha=a*(1-k*0.25);g.beginPath();g.moveTo(xx,y-h/2+k*12);g.lineTo(xx,y+h/2-k*12);g.stroke();}});g.restore();}
// calor que "templa" un objeto cercano (halo rojizo)
function warmHalo(x,y,r,a){if(a<=0)return;const gl=g.createRadialGradient(x,y,4,x,y,r);gl.addColorStop(0,`rgba(255,140,90,${0.45*a})`);gl.addColorStop(1,'rgba(255,140,90,0)');g.fillStyle=gl;g.fillRect(x-r,y-r,2*r,2*r);}
