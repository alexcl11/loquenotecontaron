// ===== Escenas: si quitas el moho, ¿el resto se puede comer? (2026-11-03) · kit en ill11.js =====
function mhP(o){return Object.assign({x:470,y:1200,shirt:'#3d7bff'},o);}
function mhDim(a=0.62){g.fillStyle=`rgba(6,10,20,${a})`;g.fillRect(0,470,W,1150);}
// gancho: quita el trozo con moho de la rebanada y se come el resto; luego se ven los hilos que quedan dentro
ILL.mh_pan=(c,t)=>{const s=c._s,M=c._m;const SX=520,SY=1010,SS=1.15,CUT=18;
 const q=M.qui?E(t,M.qui-0.1,1.1):0;const grab=ease(cl(q/0.4)),move=ease(cl((q-0.4)/0.6));
 const bite=M.res?ease(E(t,M.res-0.1,0.5))*(1-ease(E(t,M.res+0.9,0.5))):0;const xr=M.pun?E(t,M.pun-0.2,1.2):0;
 g.save();camLerp(t,s,5,[1.35,560,1010],[1.45,560,1000]);kitchen(t);plate(790,1172,1.1);
 const sx=lerp(SX,SX-20,bite),sy=lerp(SY,SY-55,bite),sr=lerp(0,-0.25,bite);
 const gp=[SX+(CUT+38)*SS,SY-20];const pc=q>0?[lerp(gp[0],790,move),lerp(gp[1],1150,move)-60*Math.sin(move*Math.PI)]:gp;
 const rh=q<=0?[650,1150]:(q<0.4?[lerp(650,gp[0]+10,grab),lerp(1150,gp[1],grab)]:(move<1?[pc[0]+10,pc[1]]:[lerp(800,650,ease(E(t,M.qui+1.1,0.5))),lerp(1150,1150,1)]));
 const o=mhP({lh:[sx-55,sy+70],rh,look:bite>0.3?[0.3,0.4]:(q>0&&q<1?[0.8,0.4]:[0.4,0.6]),mouth:bite>0.4?'o':(xr>0.3?'worry':'smile'),brow:xr>0.3?1:0});
 person(o,t);
 if(q<0.4)breadSlice(sx,sy,SS,sr,{mold:ease(E(t,s+0.1,0.6))});
 else{breadSlice(sx,sy,SS,sr,{clip:CUT,side:'L',hyp:xr,hx:CUT-6,hyY:-56});
  g.save();g.translate(pc[0]-gp[0],pc[1]-gp[1]);breadSlice(SX,SY,SS,0,{clip:CUT,side:'R',mold:1});g.restore();}
 counterFront();hands(o);g.restore();
 if(M.pun)labelTag('LO QUE NO SE VE',540,1440,E(t,M.pun,0.4),C.red);};
// las "raíces" del moho bajo la lupa: hilos finos que bajan por debajo de la superficie del pan
ILL.mh_raices=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1.3,560,1000);kitchen(t);const o=mhP({lh:[465,1080],rh:[650,1150],look:[0.4,0.6]});person(o,t);breadSlice(520,1010,1.15,0,{mold:1});counterFront();hands(o);g.restore();mhDim(0.6);
 const LX=540,LY=1030,R=330,yS=LY-R*0.3;const hp=M.hil?ease(E(t,M.hil-0.3,1.3)):0;const dp=M.deb?ease(E(t,M.deb-0.3,1.4)):0;
 lens(LX,LY,R,E(t,s,0.5),()=>{foodSection(LX,LY,R,'pan',yS);moldSpot(LX,yS-8,70,1,t,21,MH.mold);
  g.save();g.shadowColor='rgba(140,255,120,0.8)';g.shadowBlur=8;hyphae(LX,yS+6,420,lerp(110,290,dp),hp,6,MH.hy,4);g.restore();
  if(dp>0){g.save();g.globalAlpha=cl(dp*2);g.setLineDash([12,10]);g.strokeStyle='rgba(255,255,255,0.75)';g.lineWidth=4;g.beginPath();g.moveTo(LX-R,yS+3);g.lineTo(LX+R,yS+3);g.stroke();g.restore();}});
 if(M.rai)labelTag('RAÍCES: HILOS QUE NO SE VEN',540,640,E(t,M.rai,0.4),C.amber);
 if(M.deb)labelTag('POR DEBAJO DE LA SUPERFICIE',540,1440,E(t,M.deb,0.4),C.red);};
// abre la mermelada, ve una manchita y la quita con la cuchara (pero los hilos se quedan)
ILL.mh_mermelada=(c,t)=>{const s=c._s,M=c._m;const JX=600,JS=1.1;
 const ab=M.abr?E(t,M.abr-0.2,0.8):0;const mn=M.man?E(t,M.man-0.2,0.6):0;const qu=M.qui?E(t,M.qui-0.3,1.6):0;
 g.save();camLerp(t,s,5,[1.35,560,1010],[1.55,590,1020]);kitchen(t);
 const lidC=[JX,1178-170*JS];const lidUp=[720,885];const lp=ease(ab);const lid=[lerp(lidC[0],lidUp[0],lp),lerp(lidC[1],lidUp[1],lp)];
 const rh=ab>0?lid:[700,1150];
 const surf=[JX+10*JS,1178-120*JS];
 // cuchara: baja al tarro, recoge la mancha y sube
 let sh=[430,1120],srot=0.25;const dive=ease(cl(qu/0.45)),lift=ease(cl((qu-0.5)/0.5));
 if(qu>0){const top=[surf[0]-4,surf[1]-118];sh=qu<0.5?[lerp(430,top[0],dive),lerp(1120,top[1]+10,dive)]:[lerp(top[0],540,lift),lerp(top[1]+10,870,lift)];srot=lerp(0.25,0,dive)+lerp(0,0.35,lift);}
 const o=mhP({x:560,lh:sh,rh,look:qu>0.5?[0,-0.1]:[0.5,0.7],mouth:mn>0.5&&qu<0.5?'o':'smile',brow:mn>0.5&&qu<0.5?1:0});person(o,t);
 const onSpoon=qu>=0.45;
 jamJar(JX,1178,JS,{lid:ab<=0,mold:onSpoon?0:Math.max(0.35,mn)*(ab>0?1:0),mr:18});
 if(onSpoon){g.save();g.globalAlpha=0.55*cl((qu-0.45)*3);hyphae(surf[0],surf[1]+4,70,60,1,8,MH.hy,2.5);g.restore();}
 if(ab>0)jarLid(lid[0],lid[1],JS,lerp(0,-0.5,lp));
 spoon(sh[0],sh[1],srot,1,onSpoon?(x,y)=>moldSpot(x,y,13,1,t,5,MH.white):null);
 counterFront();hands(o);g.restore();
 if(M.man&&qu<0.5){/* resalta la manchita */}};
// pan, mermelada, yogur, sobras, queso blando y fruta blanda: enteros a la basura
ILL.mh_basura=(c,t)=>{const s=c._s,M=c._m;const ks=['pan','mer','yog','sob','que','fru'];const XS=[215,345,470,600,730,855];const BIN=[540,1430];
 const pops=ks.map(k=>M[k]?E(t,M[k]-0.15,0.45):E(t,s+0.3,0.4));const mo=M.mol?E(t,M.mol-0.2,0.6):0;const bs=M.bas||s+99;
 g.save();cam(1.15,540,1100);kitchen(t);const o=mhP({x:540,lh:[430,1150],rh:[650,1150],look:[0,0.8],mouth:t>bs?'flat':'smile'});person(o,t);hands(o);counterFront();
 bin(BIN[0],BIN[1],1.15,ease(E(t,bs-0.8,0.5)));
 const draw=[(x,y,sc,m)=>breadSlice(x,y-70*sc,0.85*sc,0,{mold:m,mx:30,my:-30,mr:20}),(x,y,sc,m)=>jamJar(x,y,0.8*sc,{mold:m,mr:18,mcol:MH.white}),(x,y,sc,m)=>yogurtCup(x,y,0.85*sc,m),
  (x,y,sc,m)=>{tupper(x,y,0.8*sc,1,0);moldSpot(x+10*sc,y-38*sc,16*sc,m,0,3,MH.soft);},(x,y,sc,m)=>softCheese(x,y,0.85*sc,m),(x,y,sc,m)=>peach(x,y,1.05*sc,m)];
 ks.forEach((k,i)=>{const p=pops[i];if(p<=0)return;const f=ease(E(t,bs-0.2+i*0.14,0.55));if(f>=1)return;
  const x=lerp(XS[i],BIN[0],f),y=lerp(1178,BIN[1]-110,f)-200*Math.sin(f*Math.PI)*(1-f*0.3);const sc=eob(p)*(1-0.55*f);
  draw[i](x,y,sc,Math.max(0.6,mo));});
 g.restore();
 if(M.bas)labelTag('ENTEROS A LA BASURA',540,640,E(t,M.bas,0.4),C.red);};
// blando y húmedo (los hilos llegan hondo) frente a duro y seco (se quedan en la superficie)
ILL.mh_versus=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);mhDim(0.25);const R=205,LY=1010;
 const pb=M.bla?ease(E(t,M.bla-0.2,1.8)):0,pd=M.dur?ease(E(t,M.dur-0.2,1.2)):0;
 const side=(x,kind,p,dep,seed)=>lens(x,LY,R,E(t,s+(x>500?0.25:0),0.5),()=>{const yS=LY-R*0.45;foodSection(x,LY,R,kind,yS);moldSpot(x,yS-6,48,1,t,seed,MH.mold);
  g.save();g.shadowColor='rgba(140,255,120,0.8)';g.shadowBlur=8;hyphae(x,yS+6,dep*1.1,dep,p,seed,MH.hy,4);g.restore();});
 side(290,'pan',pb,300,31);side(790,'queso',pd,48,37);
 if(M.bla)labelTag('BLANDO Y HÚMEDO: POR DENTRO',290,1290,E(t,M.bla,0.4),C.red);
 if(M.dur)labelTag('DURO Y SECO: LE CUESTA',790,1290,E(t,M.dur,0.4),C.green);};
// excepciones: queso duro y curado, zanahoria, pimiento
ILL.mh_excep=(c,t)=>{const s=c._s,M=c._m;const it=[[M.que,640,(x,y)=>cheeseWedge(x,y,0.9,1)],[M.zan,790,(x,y)=>carrot(x,y-24,0.85,0,1)],[M.pim,905,(x,y)=>bellPepper(x,y,0.95,1)]];
 let last=-1;it.forEach(([m,x],i)=>{if(m&&t>m-0.2)last=i;});const tx=last>=0?it[last][1]-40:650;
 g.save();camLerp(t,s,5,[1.3,580,1040],[1.36,600,1040]);kitchen(t);board(560,1160,420,'#c98b4e');
 const o=mhP({lh:[380,1150],rh:last>=0?[Math.min(tx,690),1090]:[640,1150],look:last>=0?[0.8,0.5]:[0.2,0.2],mouth:'smile'});person(o,t);counterFront();
 it.forEach(([m,x,f],i)=>{if(!m)return;const p=E(t,m-0.2,0.45);if(p<=0)return;g.save();g.translate(x,1160);g.scale(eob(p),eob(p));f(0,0);g.restore();check(x,990,26,E(t,m+0.2,0.4));});
 hands(o);g.restore();
 if(M.exc)labelTag('EXCEPCIONES',540,640,E(t,M.exc,0.4),C.amber);
 if(M.fir)labelTag('FRUTAS Y HORTALIZAS FIRMES',540,1440,E(t,M.fir,0.4),C.green);};
// cortar al menos 2,5 cm alrededor y por debajo de la mancha, sin tocar el moho con el cuchillo
ILL.mh_cortar=(c,t)=>{const s=c._s,M=c._m;const BX=600,BY=1172,BS=1.4,CX=2,CY=-37;
 const W2=(lx,ly)=>[BX+lx*BS,BY+ly*BS];
 const t1=(M.alr||s+2)-0.6,t2=(M.deb||s+4)-0.3;const c1=ease(E(t,t1,1.0)),c2=ease(E(t,t2,1.1));const off=M.cuc?ease(E(t,M.cuc-0.1,0.8)):0;const dsh=M.cor?E(t,M.cor-0.2,0.6):0;
 g.save();cam(1.85,630,1060);kitchen(t);counterFront();board(380,1160,480,'#c98b4e');
 if(off<=0)cheeseBlock(BX,1160,BS,{mold:1});
 else{cheeseBlock(BX,1160,BS,{part:'main',cx:CX,cy:CY});g.save();g.translate(90*off,-70*off);cheeseBlock(BX,1160,BS,{part:'piece',cx:CX,cy:CY,mold:1});g.restore();}
 // líneas de corte discontinuas
 if(dsh>0&&off<1){g.save();g.globalAlpha=cl(dsh*2)*(1-off);g.setLineDash([10,8]);g.strokeStyle='#e5484d';g.lineWidth=4;const a=W2(CX,-175),b=W2(CX,CY),d=W2(150,CY);g.beginPath();g.moveTo(a[0],a[1]-0);g.lineTo(b[0],b[1]-12);g.lineTo(d[0],d[1]-12);g.stroke();g.restore();}
 // cotas de 2,5 cm
 const sp=W2(60,-95);const ga=M.alr?E(t,M.alr,0.4):0,gb=M.deb?E(t,M.deb,0.4):0;
 const cota=(x1,y1,x2,y2,p)=>{if(p<=0)return;g.save();g.globalAlpha=cl(p*2)*(1-off);g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.fillStyle='#fff';[[x1,y1],[x2,y2]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,4,0,7);g.fill();});g.restore();};
 const L1=W2(CX,-95),L2=W2(60,CY);cota(L1[0],L1[1]-12,sp[0]-22*BS,sp[1]-12,ga);cota(sp[0],sp[1]+22*BS-12,L2[0],L2[1]-12,gb);
 // cuchillo: primer corte vertical, luego horizontal por debajo
 let tip,rot;if(c2<=0){const a=W2(CX,-200),b=W2(CX,CY+4);tip=[a[0],lerp(a[1],b[1],c1)-12];rot=Math.PI/2;}else{const a=W2(170,CY),b=W2(CX+6,CY);rot=lerp(Math.PI/2,Math.PI,cl(c2*3));tip=[lerp(a[0],b[0],c2),a[1]-12];}
 if(off>0){const r=ease(off);tip=[tip[0]+60*r,tip[1]+20*r];}
 const ks=0.85,hx=tip[0]-Math.cos(rot)*190*ks,hy=tip[1]-Math.sin(rot)*190*ks;
 g.strokeStyle='#3d7bff';g.lineCap='round';g.lineWidth=46;g.beginPath();g.moveTo(1050,1330);g.lineTo(lerp(hx,1050,0.45),lerp(hy,1330,0.45));g.stroke();g.strokeStyle=IL.skin;g.lineWidth=32;g.beginPath();g.moveTo(lerp(hx,1050,0.45),lerp(hy,1330,0.45));g.lineTo(hx,hy);g.stroke();
 knife(hx,hy,rot,ks);g.fillStyle=IL.skin;g.beginPath();g.arc(hx,hy,20,0,7);g.fill();
 const LA=scr(L1[0]-6,L1[1]-60),LB=scr(L2[0]+70,(L2[1]+sp[1])/2);g.restore();
 labelTag('2,5 cm',LA[0],LA[1],ga*(1-off),C.amber);labelTag('2,5 cm',LB[0],LB[1],gb*(1-off),C.amber);
 if(M.cuc)labelTag('✓  EL CUCHILLO, LEJOS DEL MOHO',540,1440,E(t,M.cuc,0.4),C.green);};
// embutido curado: basta con raspar la superficie
ILL.mh_raspar=(c,t)=>{const s=c._s,M=c._m;const SX=630,SY=1135;const pr=M.ras?E(t,M.ras-0.1,2.4):0;
 g.save();camLerp(t,s,5,[1.45,600,1040],[1.55,610,1050]);kitchen(t);board(430,1160,440,'#c98b4e');
 const bx=lerp(-150,155,pr);const wig=pr>0&&pr<1?Math.sin(t*16)*26:0;const tipL=pr>0?cl(bx+wig,-140,140):150;const tip=[SX+tipL,SY-30];
 const rot=Math.PI+0.35,ks=0.75;const hx=tip[0]-Math.cos(rot)*190*ks,hy=tip[1]-Math.sin(rot)*190*ks;
 const o=mhP({x:560,lh:[SX-140,SY+6],rh:pr>0?[hx,hy]:[760,1150],look:[0.6,0.7],mouth:'smile'});person(o,t);
 curedSausage(SX,SY,1,0,{bloom:1,bx:pr>0?bx:-160});if(pr>0)knife(hx,hy,rot,ks);counterFront();
 if(pr>0&&pr<1){g.fillStyle='rgba(236,239,230,0.8)';for(let i=0;i<6;i++){const ph=(t*2.5+i/6)%1;g.beginPath();g.arc(tip[0]-10+rnd(i)*30,tip[1]+ph*70,3,0,7);g.fill();}}
 hands(o);g.restore();
 if(M.emb)labelTag('EMBUTIDO Y JAMÓN CURADOS',540,640,E(t,M.emb,0.4),C.amber);
 if(M.ras)labelTag('✓  RASPAR LA SUPERFICIE',540,1440,E(t,M.ras,0.4),C.green);};
// consejo: no olerlo de cerca; ante la duda, a la basura
ILL.mh_consejo=(c,t)=>{const s=c._s,M=c._m;const hu=M.hue||s+1.5,du=M.dud||s+4;const BIN=[790,1178-100*0.75];
 const up=ease(E(t,s+0.1,Math.max(0.4,hu-s-0.5)));const back=ease(E(t,hu+0.1,0.5));const th=ease(E(t,du-0.1,0.9));
 g.save();camLerp(t,s,5,[1.4,560,1000],[1.45,580,1010]);kitchen(t);
 const near=[540,930],rest=[650,1060];let sl=th>0?null:[lerp(rest[0],near[0],up*(1-back*0.7)),lerp(rest[1],near[1],up*(1-back*0.7))];
 const fl=th>0?[lerp(640,BIN[0],th),lerp(1000,BIN[1]-90,th)-170*Math.sin(th*Math.PI)]:null;
 const o=mhP({rh:sl?[sl[0]+40,sl[1]+60]:[lerp(640,700,th),lerp(1060,1150,th)],lh:[380,1150],look:sl?[0.7,0.3]:[0.9,0.5],mouth:back>0.3?'worry':'flat',brow:back>0.3?1:0});
 person(o,t);if(sl)breadSlice(sl[0],sl[1],0.95,-0.15,{mold:1});counterFront();bin(BIN[0],BIN[1],0.75,ease(E(t,du-0.6,0.4)));
 if(fl&&th<1)breadSlice(fl[0],fl[1],0.95*(1-0.5*th),th*4,{mold:1});
 hands(o);
 if(t>hu-0.2&&th<=0){const p=E(t,hu-0.2,0.4);xMark(505,920,46,p);}
 g.restore();
 labelTag('✕  NO LO HUELAS DE CERCA',540,640,E(t,hu,0.4),C.red);
 if(M.dud)labelTag('ANTE LA DUDA, A LA BASURA',540,1440,E(t,M.dud,0.4),C.amber);};
