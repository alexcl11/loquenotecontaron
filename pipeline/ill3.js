// ===== Escenas: standby, LED, fregar, fechas =====
const SOFA=[300,1160,420];
function salonDevices(t,on={}){router(770,1150,t,on.router??1);decoder(905,1150,t,on.deco??1);speaker(1010,1150,t,on.spk??1);
 shelf(20,905,240);stereo(140,905,t,on.ster??1);g.fillStyle='#5a3f30';rr(40,1180,200,24,6);g.fill();g.fillRect(60,1204,14,90);g.fillRect(206,1204,14,90);printer(140,1180,t,on.prn??1);}
function salonPerson(t,o){const p=Object.assign({x:510,y:1262,apron:false,shirt:'#e5484d'},o);person(p,t);hands(p);return p;}
function spotlight(x,y,r,a){g.save();g.fillStyle=`rgba(3,5,12,${a})`;g.beginPath();g.rect(-600,300,2300,1500);g.arc(x,y,r,0,Math.PI*2,true);g.fill('evenodd');const gr=g.createRadialGradient(x,y,r*0.6,x,y,r);gr.addColorStop(0,'rgba(3,5,12,0)');gr.addColorStop(1,`rgba(3,5,12,${a})`);g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.restore();}
function sepia(a){g.fillStyle=`rgba(140,100,50,${a})`;g.fillRect(-600,300,2300,1500);}
ILL.salon_fondo=(c,t)=>{g.save();cam(1,540,1050);salon(t,{lamp:1});salonDevices(t);sofa(...SOFA);g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);};
// ---------- standby ----------
ILL.sb_led=(c,t)=>{const s=c._s;g.save();camLerp(t,s,3.5,[1.0,540,1050],[2.2,900,960]);salon(t,{lamp:0,dark:0.55});salonDevices(t,{router:0.4,deco:0.4,spk:0.4,ster:0,prn:0});sofa(...SOFA);tvLed(1015,978,t,1,1.6);g.restore();};
ILL.sb_ladron=(c,t)=>{const s=c._s;g.save();cam(1.05,560,1060);salon(t,{lamp:0});salonDevices(t);sofa(...SOFA);g.restore();const k=E(t,s,2.6);const x=lerp(150,880,ease(k)),y=1080+Math.sin(k*6)*60;spotlight(x,y,170,0.88);};
ILL.sb_sofa=(c,t)=>{const s=c._s,M=c._m;const ap=M.apa?E(t,M.apa-0.5,0.6):0;g.save();cam(1.15,620,1040);salon(t,{lamp:0.6,tvOn:ap<0.8});salonDevices(t);
 const up=ease(ap);salonPerson(t,{y:1262-60*up,rh:[lerp(600,800,up),lerp(1150,950,up)],lh:[430,1180-30*up],look:[0.9,-0.1],mouth:up>0.5?'flat':'smile'});
 sofa(...SOFA);tvLed(1015,978,t,ap>0.8?1:0,1.2);g.restore();};
ILL.sb_tele=(c,t)=>{g.save();cam(2.3,900,930);salon(t,{lamp:0,dark:0.4});tvLed(1015,978,t,1,1.4);g.restore();};
ILL.sb_internet=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1.1,560,1050);salon(t,{lamp:0.2,dark:0.25});salonDevices(t);sofa(...SOFA);g.restore();
 if(M.int){const p=E(t,M.int,0.5);g.save();g.globalAlpha=cl(p*2)*0.9;g.strokeStyle=C.amber;g.lineWidth=6;g.setLineDash([14,10]);rr(lerp(540,700,ease(p)),1020,330,180,24);g.stroke();g.restore();}};
ILL.sb_aparatos=(c,t)=>{const M=c._m;g.save();cam(1.1,560,1050);salon(t,{lamp:0.3,dark:0.2});salonDevices(t);sofa(...SOFA);
 const tags=[['ROUTER · hasta 17,58 €/año',770,1030,M.rou,640,880],['DESCODIFICADOR',905,1080,M.des,840,1330],['IMPRESORA',140,1090,M.imp,230,1330],['ALTAVOZ',1010,1050,M.alt,850,960],['CADENA ANTIGUA',140,830,M.cad,260,780]];
 tags.forEach(([n,x,y,tm,lx,ly],i)=>{if(!tm)return;const p=E(t,tm,0.4);g.save();g.globalAlpha=cl(p*3);g.strokeStyle=i==0?C.amber:'#fff';g.lineWidth=5;g.beginPath();g.arc(x,y+70,62+6*Math.sin(t*5),0,7);g.stroke();g.restore();labelTag(n,lx,ly,p,i==0?C.amber:C.blue);});g.restore();};
ILL.sb_euros=(c,t)=>{const s=c._s;g.save();cam(1.1,560,1050);salon(t,{lamp:0.3,dark:0.35});salonDevices(t);sofa(...SOFA);
 const src=[[770,1120],[905,1120],[1010,1080],[140,1130],[140,870]];for(let i=0;i<22;i++){const sr=src[i%5];const ph=((t-s)*0.55+rnd(i))%1;if(t<s)continue;coin(sr[0]+(rnd(i+3)-0.5)*80+ph*(540-sr[0])*0.4,sr[1]-ph*420,1.3,t*4+i);}g.restore();};
ILL.sb_regleta=(c,t)=>{const s=c._s,M=c._m;const off=M.reg?E(t,M.reg+0.2,0.3)>0.5:false;const rt=M.rou?E(t,M.rou,0.4):0;g.save();cam(1.35,780,1160);salon(t,{lamp:0.3,dark:0.2});
 router(770,1150,t,1);decoder(905,1150,t,off?0:1);speaker(1010,1150,t,off?0:1);sofa(...SOFA);powerStrip(880,1360,t,off?0:1);
 g.strokeStyle='#e0e3ea';g.lineWidth=5;[[905,1160],[1010,1160]].forEach(([x,y])=>{g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x,1300,x-80+(x>950?40:0),1345);g.stroke();});
 g.strokeStyle='#cfd6e2';g.beginPath();g.moveTo(770,1160);g.quadraticCurveTo(700,1280,640,1400);g.stroke();
 if(M.reg)labelTag(off?'APAGADA':'REGLETA',880,1440,E(t,M.reg,0.4),off?C.green:C.amber);
 if(rt>0){g.save();g.globalAlpha=cl(rt*3);g.strokeStyle=C.amber;g.lineWidth=6;g.beginPath();g.arc(770,1130,80+5*Math.sin(t*6),0,7);g.stroke();g.restore();labelTag('SIEMPRE ENCENDIDO',770,1010,rt,C.amber);}
 g.restore();};
// ---------- LED ----------
ILL.led_sofa=(c,t)=>{g.save();cam(1.15,520,1040);salon(t,{lamp:1});salonDevices(t,{});const pp=salonPerson(t,{rh:[575,1105],lh:[455,1110],look:[0.25,1],mouth:'smile'});g.fillStyle='#1b1f2a';rr(480,1035,80,110,10);g.fill();g.fillStyle='#5b8cff';rr(487,1043,66,94,6);g.fill();hands(pp);sofa(...SOFA);g.restore();};
ILL.led_origen=(c,t)=>{const s=c._s;g.save();cam(1.1,520,1040);salon(t,{lamp:0});tube(470,560,300,t,1);sofa(...SOFA);g.restore();sepia(0.35*E(t,s,0.6));txt('HACE AÑOS…',540,1440,40,'rgba(255,240,210,0.85)',900,'center',E(t,s+0.3,0.5));};
ILL.led_quote=(c,t)=>{g.save();cam(1.2,520,1000);salon(t,{lamp:0});tube(470,560,300,t,1);salonPerson(t,{shirt:'#8b7cf6',rh:[640,860+Math.sin(t*6)*12],lh:[430,1180],mouth:'o',look:[0.2,-0.2]});sofa(...SOFA);g.restore();sepia(0.35);};
ILL.led_tubo=(c,t)=>{const s=c._s,M=c._m;const gr=g.createLinearGradient(0,470,0,1600);gr.addColorStop(0,'#2a2418');gr.addColorStop(1,'#141009');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 const a=M.arr||s+1;const lv=t<a?0.1:ease(E(t,a+0.4,2.2));tube(540,820,640,t,lv,t>a&&t<a+1.2?1:0,M.des?E(t,M.des,0.8):0);};
ILL.led_tubo_viejo=(c,t)=>{const gr=g.createLinearGradient(0,470,0,1600);gr.addColorStop(0,'#2a2418');gr.addColorStop(1,'#141009');g.fillStyle=gr;g.fillRect(0,470,W,1150);tube(540,820,640,t,0.85,0,0.6);};
ILL.led_switch=(c,t)=>{const s=c._s,M=c._m;const pr=M.apa?E(t,M.apa-0.35,0.3):0;const on=pr<0.6;
 const gr=g.createLinearGradient(0,470,0,1600);gr.addColorStop(0,'#3a3f66');gr.addColorStop(1,'#272b4a');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 g.fillStyle='#4a3424';rr(90,640,300,960,8);g.fill();g.fillStyle='#120d0a';rr(110,660,260,940,6);g.fill();g.fillStyle='#d9b16a';g.beginPath();g.arc(340,1150,10,0,7);g.fill();
 g.save();g.translate(720,1020);g.scale(1.5,1.5);wallSwitch(0,0,on);g.restore();
 const reach=ease(E(t,s+0.3,0.8));const fx=lerp(1150,735,reach),fy=lerp(1300,on?950:1060,reach);g.strokeStyle='#e5484d';g.lineCap='round';g.lineWidth=70;g.beginPath();g.moveTo(1250,1500);g.lineTo(fx+90,fy+120);g.stroke();
 g.strokeStyle=IL.skin;g.lineWidth=48;g.beginPath();g.moveTo(fx+90,fy+120);g.lineTo(fx+20,fy+30);g.stroke();g.lineWidth=22;g.beginPath();g.moveTo(fx+20,fy+30);g.lineTo(fx,fy);g.stroke();
 if(!on){g.fillStyle=`rgba(3,5,12,${0.55*E(t,M.apa,0.3)})`;g.fillRect(0,470,W,1150);}};
// ---------- fregar ----------
function sinkScene(t,o){kitchen(t);const rinse=o.rinse||0;const pl=o.plateDirty??1;const ps={x:470,y:1200,lh:[560,1100],rh:[640,1095+Math.sin(t*8)*10],look:[0.6,0.8],mouth:o.mouth||'smile'};person(ps,t);
 plate(600,1100,1.1,pl);waterStream(t,605,980,1080,o.water??1);sink();faucet();hands(ps);counterFront();if(o.dw){dishwasher(770,1212,t,1,o.load||0);}
 if(o.meter!=null){g.fillStyle='#10141c';rr(420,620,240,96,16);g.fill();g.fillStyle='#4fb3ff';g.font=`900 52px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(Math.round(o.meter)+' L',540,670);txt('💧',395,668,40,'#fff');}}
ILL.fr_mano=(c,t)=>{const s=c._s;g.save();camLerp(t,s,5,[1.35,560,1010],[1.45,580,1010]);sinkScene(t,{plateDirty:1-E(t,s,4),meter:lerp(0,60,E(t,s+0.3,3.5))});g.restore();};
ILL.fr_lavavajillas=(c,t)=>{g.save();cam(1.15,640,1080);sinkScene(t,{dw:1,plateDirty:0.8});g.restore();};
ILL.fr_tanques=(c,t)=>{const M=c._m;g.save();cam(1,540,1050);kitchen(t);counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.6)';g.fillRect(0,470,W,1150);
 tank(170,830,300,420,M.a?ease(E(t,M.a-0.4,1.2)):0,'A mano','#4fb3ff',t);tank(610,830,300,420,M.b?0.2*ease(E(t,M.b-0.3,1)):0,'Lavavajillas','#3ecf6e',t);
 if(M.a&&t>M.a)txt('60 L',320,800,54,'#fff',900,'center',E(t,M.a+0.6,0.4));if(M.b&&t>M.b)txt('10–15 L',760,800,54,'#fff',900,'center',E(t,M.b+0.5,0.4));};
ILL.fr_aclarar=(c,t)=>{const s=c._s;g.save();cam(1.3,620,1060);sinkScene(t,{dw:1,plateDirty:0.5,mouth:'flat'});g.restore();};
ILL.fr_tips=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1.45,860,1220);kitchen(t);counterFront();const ld=M.lle?E(t,M.lle,2):0;dishwasher(770,1212,t,1,ld);
 if(M.res&&(!M.lle||t<M.lle)){const k=E(t,M.res,1.2);plate(760,1150,1.1,1-k);spatula(740+Math.sin(t*10)*25,1120,0.6);}
 if(M.eco){const p=E(t,M.eco,0.4);g.save();g.globalAlpha=cl(p*3);g.fillStyle='#3ecf6e';rr(905,1226,60,18,6);g.fill();g.fillStyle='#05170b';g.font=`900 14px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText('ECO',935,1236);g.restore();}
 g.restore();labelTag('1 · QUITA LOS RESTOS EN SECO',540,600,M.res?E(t,M.res,0.4):0,C.green);labelTag('2 · LLÉNALO DEL TODO',540,680,M.lle?E(t,M.lle,0.4):0,C.green);labelTag('3 · PROGRAMA ECO',540,760,M.eco?E(t,M.eco,0.4):0,C.green);};
// ---------- fechas ----------
ILL.fe_tirar=(c,t)=>{const s=c._s,M=c._m;const dr=M.tir?E(t,M.tir,0.7):0;g.save();cam(1.3,600,1080);kitchen(t);
 const ps={x:470,y:1200,lh:[430,1170],rh:[760,1040],look:[0.9,0.5],mouth:'flat'};person(ps,t);counterFront();bin(830,1420,1.3,dr>0?Math.min(1,dr*3):0);
 if(dr<1)packet(780,lerp(1000,1380,dr*dr),0.75,'arroz',t);hands(ps);g.restore();};
ILL.fe_etiquetas=(c,t)=>{const M=c._m;g.save();cam(1,540,1050);kitchen(t);counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.55)';g.fillRect(0,470,W,1150);
 packet(300,1000,1.4,'arroz',t);meatTray(780,1020,1.6);dateLabel(300,1260,'CONSUMIR PREFERENTEMENTE','03/2027',C.amber,M.a?E(t,M.a,0.4):1);dateLabel(780,1260,'FECHA DE CADUCIDAD','24/10',C.red,M.b?E(t,M.b,0.4):1);};
ILL.fe_nevera=(c,t)=>{const s=c._s,M=c._m;const fz=M.con?ease(E(t,M.con,0.9)):0;g.save();cam(1.15,540,960);kitchen(t);counterFront();fridge(390,560,t,1,fz);
 meatTray(540,lerp(880,700,fz),lerp(1.2,0.9,fz));meatTray(540,lerp(1000,720,fz)+(fz>0?30:0),lerp(1.2,0.9,fz),true);
 if(M.cad)dateLabel(770,800,'CADUCIDAD','24/10',C.red,E(t,M.cad,0.4));if(M.no&&fz<0.5){g.save();g.globalAlpha=1-fz*2;xMark(540,950,110,E(t,M.no,0.4));g.restore();}g.restore();};
ILL.fe_despensa1=(c,t)=>{const M=c._m;g.save();cam(1,540,1050);pantry(t);packet(540,990,2.2,'galletas',t);
 if(M.cru){const p=E(t,M.cru,0.5);for(let i=0;i<8;i++){g.fillStyle='#c98b4e';g.beginPath();g.arc(470+rnd(i)*140,1170+p*rnd(i+2)*40,5,0,7);g.fill();}}g.restore();
 dateLabel(540,700,'CONSUMO PREFERENTE','03/2026',C.amber,M.pre?E(t,M.pre,0.4):0);if(M.seg)check(760,1000,46,E(t,M.seg,0.4));};
ILL.fe_despensa2=(c,t)=>{const M=c._m;g.save();cam(1,540,1050);pantry(t);
 const it=[['arroz',220,770],['pasta',420,770],['legumbres',640,770],['harina',860,770],['galletas',240,1070],['conservas',460,1080],['aceite',680,1070],['miel',880,1080]];
 it.forEach(([k,x,y])=>{const tm=M[k];const p=tm?E(t,tm,0.4):0;g.save();g.globalAlpha=0.35+0.65*cl(p*2);packet(x,y,1.05+0.15*eob(p)*(1-cl((t-tm-0.6)/0.4)),k,t);g.restore();if(p>0)labelTag(k.toUpperCase(),x,y+120,p,C.amber);});g.restore();};
ILL.fe_sentidos=(c,t)=>{const M=c._m;const st=t>=(M.pru||1e9)?3:t>=(M.hue||1e9)?2:t>=(M.mir||1e9)?1:0;g.save();cam(1.9,500,960);kitchen(t);
 const rh=st==1?[600,1030]:st==2?[540,920]:st==3?[560,960]:[640,1110];const ps={x:470,y:1200,lh:[400,1150],rh,look:st==1?[0.7,0.6]:[0.2,0.3],mouth:st==3?'o':'smile'};person(ps,t);counterFront();packet(rh[0]+10,rh[1]-20,0.6,'galletas',t);hands(ps);g.restore();
 const lb=[['👀  MÍRALO',M.mir],['👃  HUÉLELO',M.hue],['👅  PRUÉBALO',M.pru]];lb.forEach(([n,tm],i)=>labelTag(n,540,620+i*80,tm?E(t,tm,0.4):0,C.green));};
