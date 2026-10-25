// ===== Escenas: abrir el horno (2026-10-28) · kit en ill5.js =====
const HNP={x:560,y:1200,apron:false,shirt:'#3d7bff'};
function hnP(o){return Object.assign({},HNP,o);}
const cakeF=(cook,rise)=>(fx,fy)=>cakeMold(fx,fy,0.85,cook,rise);
// escena base: cocina + horno + personaje; devuelve geometría
function hnScene(t,o,ov,open,light){kitchen(t,{stove:false});const G=ovenBody(t,ov);if(o)person(o,t);counterFront();ovenDoor(t,ov,open,light);if(o)hands(o);return G;}
// abre y cierra el horno una y otra vez; la barra de energía baja con cada apertura
ILL.hn_abrir=(c,t)=>{const s=c._s;const P=1.7,t0=s+0.4;const u=t<t0?-1:((t-t0)%P)/P;const n=t<t0?0:Math.floor((t-t0)/P);
 const op=u<0?0:(u<0.3?ease(u/0.3):(u<0.65?1:1-ease((u-0.65)/0.35)));
 const en=Math.max(0.12,1-0.17*n-0.17*cl(u<0?0:u/0.65));
 g.save();camLerp(t,s,6,[1.3,700,1000],[1.42,730,1010]);
 const o=hnP({rh:ovenHandle({},op),lh:[470,1150],look:[0.9,op>0.3?0.5:0.2],mouth:op>0.3?'o':'smile'});
 hnScene(t,o,{heat:1,energy:en,food:cakeF(0.25,0.4)},op,0);
 heatOut(800,970,1000,t,op>0.4?op:0,240);
 g.restore();};
// "no es el único error": se rasca la cabeza mirando el horno
ILL.hn_errores=(c,t)=>{const s=c._s;g.save();camLerp(t,s,3,[1.15,640,1000],[1.25,660,1000]);
 const sc=Math.sin(t*8)*10;const o=hnP({lh:[520+sc,860],rh:[650,1150],look:[0.9,-0.3],mouth:'flat',brow:1});
 hnScene(t,o,{heat:1,energy:0.8,food:cakeF(0.3,0.5)},0,0);g.restore();
 [[300,760,0.3],[820,700,0.9],[560,640,1.5]].forEach(([x,y,d],i)=>{const p=E(t,s+d,0.4);if(p<=0)return;g.save();g.translate(x,y+Math.sin(t*3+i)*8);g.scale(eob(p),eob(p));emoji('❓',0,0,90);g.restore();});};
// "a ver si ya ha subido": mete la cara en el vapor
ILL.hn_cara=(c,t)=>{const s=c._s,M=c._m;const op=ease(E(t,(M.abr||s+0.3)-0.2,0.6));const lean=ease(E(t,(M.cara||s+1.5)-0.3,0.6));
 g.save();camLerp(t,s,4,[1.45,740,990],[1.75,760,990]);
 const o=hnP({x:560+30*lean,y:1200+25*lean,rh:ovenHandle({},op),lh:[470,1150],look:[1,0.4+0.4*lean],mouth:lean>0.5?'o':'smile',brow:lean>0.5?1:0});
 hnScene(t,o,{heat:1,energy:1-0.3*op,food:cakeF(0.3,0.45)},op,0);
 heatOut(790,980,990,t,op,260);steam(885,960,t,op);g.restore();};
// sale el aire caliente, entra el frío, el horno vuelve a calentar y lo pagas tú
ILL.hn_calor=(c,t)=>{const s=c._s,M=c._m;const cls=M.re?ease(E(t,M.re-0.3,0.6)):0;const op=1-cls;
 const hot=M.cal?E(t,M.cal-0.2,0.5):0,cold=M.fri?E(t,M.fri-0.2,0.5):0;const reh=M.re?E(t,M.re,1.2):0;
 g.save();cam(1.7,860,1020);kitchen(t,{stove:false});
 const en=lerp(lerp(0.9,0.35,ease(hot)),0.35,0)+0.5*reh*0;const pulse=cls>0.5?0.75+0.25*Math.sin(t*10):1;
 ovenBody(t,{heat:cls>0.5?pulse:0.9,glow:lerp(0.9,0.4,ease(Math.max(hot,cold)))*(1-cls)+cls*pulse,energy:cls>0.5?Math.min(1,0.3+reh*0.8):en,food:cakeF(0.3,0.45)});
 counterFront();ovenDoor(t,{},op,0.6);
 heatOut(780,990,990,t,hot*op,300);coldIn(800,1085,t,cold*op,1,240);
 labelTag('AIRE CALIENTE',885,800,hot*op,C.red);labelTag('AIRE FRÍO',650,1150,cold*op,C.blue);
 if(M.pag){for(let i=0;i<7;i++){const k=E(t,M.pag+i*0.12,1.1);if(k<=0||k>=1)continue;const [x,y]=arcPath(885,960,620+i*70,640,140,ease(k));coin(x,y,1,t*6+i);}}
 g.restore();};
// de menos a más gasto: microondas, olla a presión, placa, horno
ILL.hn_ranking=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);kitchen(t,{stove:false});counterFront();
 const mic=M.mic?E(t,M.mic-0.1,0.6):0,oll=M.oll?E(t,M.oll-0.1,0.6):0,pla=M.pla?E(t,M.pla-0.1,0.6):0,hor=M.hor?E(t,M.hor-0.1,0.8):0;
 microwave(180,1178,0.85,t,mic>0?1:0);pressureCooker(425,1178,0.8,t,oll);hobPan(660,1178,0.9,t,pla);
 if(hor>0){const gl=g.createRadialGradient(905,1070,20,905,1070,260);gl.addColorStop(0,`rgba(229,72,77,${0.35*hor})`);gl.addColorStop(1,'rgba(229,72,77,0)');g.fillStyle=gl;g.fillRect(640,800,520,480);}
 const ov={x:790,y:960,w:230,h:218,column:false,heat:hor>0?1:0.2,food:cakeF(0.5,0.6)};ovenBody(t,ov);ovenDoor(t,ov,0,0);
 costMeter(180,930,70,mic,C.green);costMeter(425,930,120,oll,C.green);costMeter(660,930,170,pla,C.amber);costMeter(905,930,250,hor,C.red);
 labelTag('MICROONDAS',180,1262,mic,C.green);labelTag('OLLA',425,1262,oll,C.green);labelTag('PLACA',660,1262,pla,C.amber);labelTag('HORNO',905,1262,hor,C.red);
 g.restore();};
// precalentar: el horno vacío calienta mientras el reloj corre
ILL.hn_precalentar=(c,t)=>{const s=c._s,M=c._m;const ex=M.exc?E(t,M.exc,0.5):0;const ho=M.hor?E(t,M.hor-0.3,0.5):0;
 g.save();cam(1.15,640,1010);const o=hnP({lh:[470,1150],rh:[650,1150],look:ho>0.5?[0.9,0.3]:[0.1,-1],mouth:ho>0.5?'smile':'flat'});
 kitchen(t,{stove:false});wallClock(560,690,58,t,ho>0.5?0.15:0.8);
 const G=ovenBody(t,{heat:1,energy:Math.min(1,0.2+(t-s)*0.25),food:ho>0.3?cakeF(0,0.1):null});person(o,t);counterFront();ovenDoor(t,{},0,0);hands(o);
 if(ex>0&&ho<1){g.save();g.globalAlpha=1-ho;xMark(G.cx,G.y+G.h*0.55,70,ex);g.restore();}
 if(ho>0)check(G.cx,G.y+G.h*0.55,60,ho);labelTag('+1 HORA',560,800,ho,C.green);
 g.restore();};
// apaga el horno antes y el calor residual termina el bizcocho
ILL.hn_apagar=(c,t)=>{const s=c._s,M=c._m;const off=M.apa?ease(E(t,M.apa-0.2,0.5)):0;const res=M.cal?E(t,M.cal,2):0;
 g.save();camLerp(t,s,5,[1.35,700,1000],[1.5,760,1000]);const G0=ovGeo({});
 const o=hnP({rh:[G0.x+30,G0.y+26],lh:[470,1150],look:[0.9,0],mouth:'smile'});
 const ck=lerp(0.45,1,ease(E(t,s+0.5,(c._e||s+6)-s-0.5)));
 hnScene(t,o,{heat:1-off,glow:lerp(1,0.6,off),energy:1-off,knob:lerp(1.6,0,off),food:cakeF(ck,0.8)},0,0.7);
 steam(G0.cx,G0.y+150,t,0.6*res);labelTag('−10 MIN',G0.cx,G0.y-40,off,C.green);
 g.restore();};
// enciende la luz, mira por el cristal y abre solo al final
ILL.hn_luz=(c,t)=>{const s=c._s,M=c._m;const lu=M.luz?E(t,M.luz,0.3):0;const cr=M.cri?ease(E(t,M.cri-0.3,0.6)):0;const ab=M.abr?ease(E(t,M.abr-0.2,0.7)):0;const G0=ovGeo({});
 g.save();camLerp(t,s,4,[1.35,700,1000],[1.45,730,1000]);
 const press=M.luz?ease(E(t,M.luz-0.6,0.5))*(1-ease(E(t,M.luz+0.4,0.5))):0;
 const rh=ab>0?ovenHandle({},ab):[lerp(660,G0.x+62,press),lerp(1150,G0.y+26,press)];
 const o=hnP({x:560+20*cr*(1-ab),rh,lh:[470,1150],look:[1,0.5],mouth:'smile'});
 hnScene(t,o,{heat:1,light:lu,energy:1,food:cakeF(1,0.85)},ab,lu);
 if(ab>0.6)check(G0.cx,G0.y-50,46,E(t,M.abr+0.4,0.5));
 g.restore();};
