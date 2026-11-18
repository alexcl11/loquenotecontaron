// ===== Kit de ilustración (29): sobras de Navidad — bandeja de asado, calendario de días, táper con fecha, rotulador, olor, barra de riesgo =====
const SN_FOOD='#b8652e'; // color del asado/guiso de las sobras
// bandeja de horno con pollo/pavo asado y patatas (base en y). o.left 0–1 = lo que queda (1 entera), o.steam 0–1
function roastTray(x,y,s,t,o={}){const lf=o.left??1;g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.22)';g.beginPath();g.ellipse(0,4,170,16,0,0,7);g.fill();
 g.fillStyle='#8592a6';rr(-176,-46,24,14,6);g.fill();rr(152,-46,24,14,6);g.fill(); // asas
 g.fillStyle='#c9d3e0';g.beginPath();g.moveTo(-160,-48);g.lineTo(160,-48);g.lineTo(144,0);g.lineTo(-144,0);g.closePath();g.fill();
 g.fillStyle='#e9eef5';g.fillRect(-150,-44,300,6);
 if(lf>0){g.save();g.beginPath();g.rect(-150,-260,300*Math.max(0.25,lf)+0,260);g.clip();
  chicken(-10,-92,0.95*(0.75+0.25*lf),0,1,t);
  const P=[[-120,-56],[-92,-60],[96,-58],[124,-54],[70,-62]];P.forEach((q,i)=>{if(i/P.length>lf+0.05)return;g.fillStyle='#e0a83a';g.beginPath();g.ellipse(q[0],q[1],20,14,rnd(i)*1.5,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.3)';g.beginPath();g.ellipse(q[0]-5,q[1]-5,7,3,0,0,7);g.fill();});
  g.restore();}
 g.restore();if((o.steam??0)>0)steam(x,y-170*s,t,o.steam);}
// fila de casillas de días (calendario simplificado). days = [{n, sub?}], st(i) → {fill 0–1, col, x 0–1 (tachado), star 0–1, a 0–1}
function dayCells(x,y,cw,ch,cols,days,st){days.forEach((d,i)=>{const r=Math.floor(i/cols),c=i%cols;const cx=x+c*(cw+14),cy=y+r*(ch+14);const S=st(i)||{};const a=S.a??1;if(a<=0)return;
 g.save();g.globalAlpha*=a;const k=eob(cl(a));g.translate(cx+cw/2,cy+ch/2);g.scale(k,k);
 g.fillStyle='#f4f1ea';rr(-cw/2,-ch/2,cw,ch,16);g.fill();g.fillStyle='#c9b28a';rr(-cw/2,-ch/2,cw,ch*0.2,[16,16,0,0]);g.fill();
 if((S.fill||0)>0){g.globalAlpha*=cl(S.fill);g.fillStyle=S.col||C.green;rr(-cw/2,-ch/2,cw,ch,16);g.fill();g.globalAlpha=a;}
 const dark=(S.fill||0)>0.5;txt(String(d.n),0,ch*0.08,ch*0.42,dark?'#fff':'#1a1f2b',900);if(d.sub)txt(d.sub,0,-ch*0.4,ch*0.13,dark?'#fff':'#5a4a3a',800);
 if((S.star||0)>0){g.save();g.globalAlpha*=cl(S.star);g.fillStyle=C.amber;g.beginPath();for(let j=0;j<10;j++){const rr2=j%2?14:32,an=j/10*Math.PI*2-Math.PI/2;g.lineTo(cw*0.3+Math.cos(an)*rr2,ch*0.3+Math.sin(an)*rr2);}g.closePath();g.fill();g.restore();}
 if((S.x||0)>0){const p=cl(S.x);g.strokeStyle='#fff';g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(-cw*0.28,-ch*0.2);g.lineTo(lerp(-cw*0.28,cw*0.28,cl(p*2)),lerp(-ch*0.2,ch*0.36,cl(p*2)));if(p>0.5){g.moveTo(cw*0.28,-ch*0.2);g.lineTo(lerp(cw*0.28,-cw*0.28,cl(p*2-1)),lerp(-ch*0.2,ch*0.36,cl(p*2-1)));}g.stroke();}
 g.restore();});}
// pegatina de fecha sobre el frontal de un táper de `tupper` (ill7.js) en (x,y)=base, escala s. p 0–1 = cuánto está escrita
function dateSticker(x,y,s,label,p=1){if(p<=0)return;g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#fffbe8';rr(-42,-40,84,28,5);g.fill();
 g.save();g.beginPath();g.rect(-40,-40,80*cl(p),28);g.clip();g.fillStyle='#1b1e26';g.font=`900 19px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(label,0,-25);g.restore();g.restore();}
// rotulador (x,y = punta), rot en radianes
function markerPen(x,y,rot=-0.6){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle='#1b1e26';rr(-5,-14,10,16,4);g.fill();g.fillStyle='#f4f6fb';rr(-11,-110,22,98,8);g.fill();g.fillStyle=C.blue;rr(-12,-132,24,30,8);g.fill();g.fillStyle=C.blue;g.fillRect(-11,-60,22,10);g.restore();}
// ondas de olor que suben de (x0,y0) hacia (x1,y1)
function smellWaves(x0,y0,x1,y1,t,a=1){if(a<=0)return;g.save();g.lineCap='round';for(let k=0;k<3;k++){const ph=(t*0.8+k/3)%1;g.globalAlpha=a*Math.sin(ph*Math.PI)*0.8;g.strokeStyle=k===1?'#ffd98a':'#fff';g.lineWidth=6;g.beginPath();
 for(let j=0;j<=14;j++){const u=j/14*ph;const xx=lerp(x0,x1,u)+Math.sin(u*14+t*4+k*2)*12+(k-1)*16,yy=lerp(y0,y1,u);j?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}g.restore();}
// barra horizontal de riesgo verde→ámbar→rojo, p 0–1 = nivel; a = opacidad
function riskBar(x,y,w,p,a=1){if(a<=0)return;g.save();g.globalAlpha*=a;g.fillStyle='rgba(20,29,48,0.88)';rr(x-w/2-16,y-30,w+32,60,30);g.fill();
 const gr=g.createLinearGradient(x-w/2,0,x+w/2,0);gr.addColorStop(0,C.green);gr.addColorStop(0.5,C.amber);gr.addColorStop(1,C.red);g.fillStyle='#2a3550';rr(x-w/2,y-14,w,28,14);g.fill();
 g.save();g.beginPath();rr(x-w/2,y-14,Math.max(28,w*cl(p)),28,14);g.clip();g.fillStyle=gr;g.fillRect(x-w/2,y-14,w,28);g.restore();g.restore();}
