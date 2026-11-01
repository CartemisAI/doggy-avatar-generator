import { VERSION, random, COAT_PALETTES } from './model.mjs';
import { personalStyle, bodyArt, headwearArt } from './style.mjs';
import { accessoryArt } from './wardrobe.mjs';
import { COLORWAYS } from './costumes.mjs';
import { resolveFraming } from './framing.mjs';
const INK='#30373b', PAPER='#f7f1e4';
const n=v=>Number(v.toFixed(2));
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const path=(d,fill,stroke=INK,width=4.8,extra='')=>`<path d="${d.replace(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g,v=>n(Number(v)))}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;
const ellipse=(x,y,rx,ry,fill,stroke='none',sw=0,extra='')=>`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
const line=(d,color=INK,width=3)=>path(d,'none',color,width);
function smooth(points){let d=`M${n((points.at(-1)[0]+points[0][0])/2)} ${n((points.at(-1)[1]+points[0][1])/2)}`;points.forEach((p,i)=>{const q=points[(i+1)%points.length];d+=`Q${n(p[0])} ${n(p[1])} ${n((p[0]+q[0])/2)} ${n((p[1]+q[1])/2)}`;});return d+'Z';}
function cloud(cx,cy,rx,ry,lobes=14,amount=.055){return smooth(Array.from({length:120},(_,i)=>{const a=i/120*Math.PI*2,r=1+amount*Math.cos(a*lobes);return[cx+Math.cos(a)*rx*r,cy+Math.sin(a)*ry*r];}));}

export function landmarks(t){return {leftEye:[128-t.eyeGap,t.eyeY],rightEye:[128+t.eyeGap,t.eyeY],nose:[128,t.muzzleY-4],earRoots:[[128-t.w*t.earX,t.earY],[128+t.w*t.earX,t.earY]],bounds:[128-t.w,t.top,128+t.w,t.bottom]};}
function headShape(t){const w=t.w,T=t.top,B=t.bottom,c=128;
 if(t.family==='egg')return `M${c} ${T} C${c+w*.9} ${T-1} ${c+w*1.12} ${T+52} ${c+w*.81} ${B-45} C${c+w*.6} ${B+3} ${c-w*.6} ${B+3} ${c-w*.81} ${B-45} C${c-w*1.12} ${T+52} ${c-w*.9} ${T-1} ${c} ${T}Z`;
 if(t.family==='cloud')return cloud(c,(T+B)/2,w,(B-T)/2,12,.035);
 if(t.family==='curly')return cloud(c,(T+B)/2,w,(B-T)/2,13,.035);
 if(t.family==='wedge')return `M128 ${T} C${128+w*.4} ${T-5} ${128+w*.8} ${T+10} ${128+w*.86} ${T+31} L${128+w} ${T+64} L${128+w*.9} ${T+62} L${128+w*1.07} ${T+80} L${128+w*.86} ${T+76} Q${128+w*.85} ${B-28} ${128+w*.35} ${B-6} Q128 ${B+5} ${128-w*.35} ${B-6} Q${128-w*.85} ${B-28} ${128-w*.86} ${T+76} L${128-w*1.07} ${T+80} L${128-w*.9} ${T+62} L${128-w} ${T+64} L${128-w*.86} ${T+31} C${128-w*.8} ${T+10} ${128-w*.4} ${T-5} 128 ${T}Z`;
 if(t.family==='long')return `M128 ${T} C${128+w*.7} ${T-2} ${128+w} ${T+19} ${128+w} ${T+44} C${128+w} ${T+76} ${128+w*.49} ${B-43} ${128+w*.52} ${B-18} Q${128+w*.45} ${B+5} 128 ${B} Q${128-w*.45} ${B+5} ${128-w*.52} ${B-18} C${128-w*.49} ${B-43} ${128-w} ${T+76} ${128-w} ${T+44} C${128-w} ${T+19} ${128-w*.7} ${T-2} 128 ${T}Z`;
 if(t.family==='square')return `M${128-w*.55} ${T} Q128 ${T-7} ${128+w*.55} ${T} Q${128+w} ${T} ${128+w} ${T+33} L${128+w*.95} ${B-51} Q${128+w} ${B-15} ${128+w*.5} ${B-4} Q128 ${B+4} ${128-w*.5} ${B-4} Q${128-w} ${B-15} ${128-w*.95} ${B-51} L${128-w} ${T+33} Q${128-w} ${T} ${128-w*.55} ${T}Z`;
 if(t.family==='jowl')return `M128 ${T} C${128+w*.6} ${T-8} ${128+w*1.04} ${T+16} ${128+w*.93} ${T+58} Q${128+w*1.15} ${B-18} ${128+w*.65} ${B-2} Q${128+w*.4} ${B+7} 128 ${B-3} Q${128-w*.4} ${B+7} ${128-w*.65} ${B-2} Q${128-w*1.15} ${B-18} ${128-w*.93} ${T+58} C${128-w*1.04} ${T+16} ${128-w*.6} ${T-8} 128 ${T}Z`;
 if(t.family==='silky'||t.family==='corded')return `M128 ${T} C${128+w*.7} ${T-8} ${128+w} ${T+21} ${128+w} ${T+59} L${128+w*1.05} ${B-9} Q${128+w*.6} ${B+7} 128 ${B} Q${128-w*.6} ${B+7} ${128-w*1.05} ${B-9} L${128-w} ${T+59} C${128-w} ${T+21} ${128-w*.7} ${T-8} 128 ${T}Z`;
 if(t.family==='apple')return `M128 ${T} C${128+w*.85} ${T-10} ${128+w*1.13} ${T+28} ${128+w} ${T+53} C${128+w*.86} ${T+81} ${128+w*.5} ${B-9} ${128+w*.25} ${B-3} Q128 ${B+4} ${128-w*.25} ${B-3} C${128-w*.5} ${B-9} ${128-w*.86} ${T+81} ${128-w} ${T+53} C${128-w*1.13} ${T+28} ${128-w*.85} ${T-10} 128 ${T}Z`;
 return `M128 ${T} C${128+w*.75} ${T-7} ${128+w} ${T+22} ${128+w} ${T+55} L${128+w*.9} ${B-41} Q${128+w*.75} ${B} 128 ${B} Q${128-w*.75} ${B} ${128-w*.9} ${B-41} L${128-w} ${T+55} C${128-w} ${T+22} ${128-w*.75} ${T-7} 128 ${T}Z`;
}

function ears(t){let out='';const [base,shade]=t.coat;
 for(const side of [-1,1]){const stateTilt=t.ears==='alert'?-12:t.ears==='relaxed'?17:t.ears==='left-perked'&&side===-1?-22:t.ears==='right-perked'&&side===1?-22:0;const len=t.earL+(side===1?t.asymmetry:0),w=t.earW,angle=(side===1?t.earTilt+t.asymmetry*.45:t.earTilt)+stateTilt;let e='';
 const color=t.palette==='tri'?(side===t.patchSide?shade:'#494440'):t.pattern==='mask'&&t.id==='pug'?shade:t.fur===8?base:shade;
 if(['point','roundpoint','bat'].includes(t.ear)){
  const tipX=t.ear==='point'?w*.55:w*.35;
  let d=t.ear==='bat'?`M-15 36 Q-23 0 -10 ${-len+13} Q2 ${-len-11} 19 ${-len+3} Q${w+12} ${-len+22} ${w} 4 Q${w*.7} 29 -15 36Z`:
   t.ear==='roundpoint'?`M-16 34 Q-20 2 ${tipX-8} ${-len+7} Q${tipX+4} ${-len-9} ${tipX+15} ${-len+5} Q${w+14} ${-len*.4} ${w} 10 Q${w*.6} 32 -16 34Z`:
    `M-16 35 Q-18 4 ${tipX} ${-len} Q${w+13} ${-len*.55} ${w} 7 Q${w*.55} 29 -16 35Z`;
  e+=path(d,t.fur===8?base:t.coat[0]);
  const inner=t.fur===8?'#c78e88':t.palette==='black'?'#766a66':'#c89478';
  e+=path(`M-6 21 Q-7 -1 ${tipX+1} ${-len+18} Q${w} ${-len*.45} ${w-10} 8 Q${w*.35} 23 -6 21Z`,inner,'none',0);
  e+=line(`M-5 24 Q${w*.22} 8 ${w*.26} -7`,t.coat[1],2.7);
 }else if(t.ear==='rose'){
  e+=path(`M-14 6 Q12 -24 ${w+24} -4 L${w+8} 20 Q${w-9} 27 1 13 L-8 25Z`,color);
  e+=path(`M-3 5 Q15 -8 ${w+21} -4 Q${w-4} 2 ${w+8} 20 Q9 15 -3 5Z`,base,INK,3.3);
 }else if(t.ear==='button'){
  e+=path(`M-12 4 Q12 -18 ${w+11} 3 L${w+5} ${len*.71} Q${w} ${len} ${w-16} ${len*.7} L-12 4Z`,color);
  e+=line(`M-7 5 Q10 -2 ${w+9} 4 L${w-6} ${len*.52}`,INK,3.2);
 }else{
  const d=`M-12 3 Q12 -18 ${w+11} 8 C${w+22} 38 ${w+14} ${len-4} ${w*.5} ${len} C-3 ${len+5} -8 ${len-15} -5 ${len-32} L-12 3Z`;
  e+=path(d,color);
  e+=line(`M${w*.65} 19 Q${w+6} ${len*.5} ${w*.45} ${len-15}`,t.palette==='black'?'#5e6365':base,3);
  if(t.fur===2||t.fur===5||t.fur===6)for(let i=0;i<3;i++)e+=line(`M${6+i*9} ${18+i*5} Q${w+i*2} ${len*.55} ${10+i*7} ${len-7}`,base,2.2);
  if(t.fur===7)for(let i=0;i<4;i++){const x=3+i*8,d=`M${x} 20 Q${x+10} ${len*.6} ${x+3} ${len-9}`;e+=line(d,'#b3b2a9',9);e+=line(d,t.coat[2],5.5);}
  if(t.fur===4){e+=path(cloud(w*.46,len*.57,w*.75,len*.43,11,.08),base,INK,3.8);for(let i=0;i<5;i++)e+=line(`M${9+i%2*16} ${28+i*12}q-8 -8 -9 2q0 6 6 4`,shade,2.3);}
 }
 out+=`<g transform="translate(${n(128+side*t.w*t.earX)} ${t.earY}) scale(${side} 1) rotate(${n(angle)})">${e}</g>`;
 }return out;
}

function markings(t){const [base,shade,light]=t.coat,w=t.w,T=t.top,B=t.bottom,my=t.muzzleY;
 const white=t.palette==='tri'?PAPER:light;let o='';
 if(t.pattern==='blaze'||t.pattern==='optional-blaze'&&t.whiteMuzzle||t.pattern==='boxer'){
  if(t.palette==='tri')o+=path(`M40 46H216V${my-12}Q128 ${my+30} 40 ${my-12}Z`,shade,'none');
  const cx=128+t.offset,b=t.blaze;
  o+=path(`M${cx-b*.3} ${T-5} Q${cx-b*.1} ${T+37} ${cx-b} ${my-16} Q${128-t.muzzleW*1.3} ${my-12} ${128-t.muzzleW*1.4} ${B+4}H${128+t.muzzleW*1.4}Q${128+t.muzzleW*1.2} ${my-16} ${cx+b*.65} ${my-16} Q${cx+b*.08} ${T+32} ${cx+b*.25} ${T-5}Z`,PAPER,'none');
  if(t.palette==='tri'){const x=128+t.patchSide*w*.52;o+=ellipse(x,t.eyeY,w*.34,27,'#3d3e3a','none',0,`transform="rotate(${t.patchSide*-15} ${x} ${t.eyeY})"`);}
 }
 if(t.pattern==='husky'){
  o+=path(`M128 ${T+16} Q${128-w*.24} ${T+26} ${128-w*.4} ${t.eyeY-15} Q${128-w*.8} ${t.eyeY-27} ${128-w*1.1} ${t.eyeY+15} L${128-w*.7} ${B+8}H${128+w*.7}L${128+w*1.1} ${t.eyeY+15}Q${128+w*.8} ${t.eyeY-27} ${128+w*.4} ${t.eyeY-15}Q${128+w*.24} ${T+26} 128 ${T+16}Z`,PAPER,'none');
  o+=path(`M${128-t.blaze*.35} ${T+5}Q128 ${t.eyeY-14} ${128-t.blaze*.6} ${my-11}Q128 ${my-2} ${128+t.blaze*.6} ${my-11}Q128 ${t.eyeY-14} ${128+t.blaze*.35} ${T+5}Z`,PAPER,'none');
 }
 if(t.pattern==='urajiro')o+=path(`M${128-w-5} ${t.eyeY+8} Q${128-w*.5} ${t.eyeY+21} 128 ${my-7}Q${128+w*.5} ${t.eyeY+21} ${128+w+5} ${t.eyeY+8}V240H20Z`,PAPER,'none');
 if(['shepherd','mask','boxer'].includes(t.pattern)){
  if(t.pattern==='shepherd'){o+=path(`M${128-w} ${T}H${128+w}L${128+w*.7} ${t.eyeY-7}Q128 ${t.eyeY-27} ${128-w*.7} ${t.eyeY-7}Z`,shade,'none');}
  const mw=t.muzzleW*(t.pattern==='boxer'?1.45:1.25);
  o+=path(`M128 ${my-35}C${128+mw} ${my-42} ${128+mw} ${my+8} ${128+mw*.8} ${my+20}Q128 ${my+44} ${128-mw*.8} ${my+20}C${128-mw} ${my+8} ${128-mw} ${my-42} 128 ${my-35}Z`,t.palette==='black'?'#303638':'#4b4744','none');
 }
 if(t.pattern==='points'&&t.palette!=='red'){
  for(const s of [-1,1])o+=ellipse(128+s*t.eyeGap,t.eyeY-14,10,5,'#bd8a54');
  o+=ellipse(128,my+5,t.muzzleW*1.25,t.muzzleH+13,'#bd8a54');
 }
 if(['patch','eye-patch'].includes(t.pattern)){
  if(t.pattern==='patch')o+=path(`M128 ${T-8}Q${128+t.offset} ${my-12} 128 ${B+10}H0V0Z`,PAPER,'none');
  const x=128+t.patchSide*t.eyeGap;o+=ellipse(x,t.eyeY-2,(t.pattern==='eye-patch'?19:26)*t.patchSize,29*t.patchSize,t.pattern==='eye-patch'?'#4b443e':shade,'none',0,`transform="rotate(${t.patchSide*16} ${x} ${t.eyeY})"`);
 }
 if(t.pattern==='bernese'){
  o+=path('M0 0H256V256H0Z','#393d40','none');
  o+=path(`M${128-t.blaze*.3} ${T-6}Q128 ${t.eyeY} ${128-t.blaze} ${my}L${128-t.muzzleW} ${B+4}H${128+t.muzzleW}L${128+t.blaze} ${my}Q128 ${t.eyeY} ${128+t.blaze*.3} ${T-6}Z`,PAPER,'none');
  for(const side of [-1,1])o+=ellipse(128+side*t.eyeGap,t.eyeY-15,11,6,'#bb7f4c');
 }
 if(['spots','merle','ticking','roan','brindle'].includes(t.pattern)){
  const rr=random(`${t.patternSeed}/markings`),count=t.pattern==='ticking'?45:t.pattern==='roan'?55:t.pattern==='spots'?15:23;
  if(t.pattern==='spots'||t.pattern==='ticking')o+=path(`M0 0H256V256H0Z`,PAPER,'none');
  for(let i=0;i<count;i++){const x=128+(rr()-.5)*w*2.2,yy=T+rr()*(B-T),r=t.pattern==='ticking'||t.pattern==='roan'?1.5+rr()*2.7:t.pattern==='spots'?4+rr()*6:5+rr()*12;
   if(t.pattern==='brindle')o+=path(`M${x-5} ${yy-13}q15 5 12 29l-5-5q3-15-7-24Z`,shade,'none');
   else o+=ellipse(x,yy,r,r*(.65+rr()*.5),t.pattern==='spots'?'#42454a':i%3===0?light:shade,'none',0,`opacity="${t.pattern==='roan'?.7:1}"`);
  }
 }
 if(t.pattern==='skin'){const r=random(String(t.patternSeed));for(let i=0;i<5;i++)o+=ellipse(128+(r()-.5)*w*1.8,T+20+r()*110,5+r()*9,7+r()*11,'#b3827f');}
 return o;
}

function eyes(t){let o='';const ex=t.expression;
 for(const side of [-1,1]){const x=128+side*t.eyeGap,y=t.eyeY+(side===1?t.asymmetry*.12:0),sz=t.eyeSize,c=t.palette==='black'||t.palette==='charcoal'?'#bcc4bb':INK;
 const closed=['joy','laugh','dreamy','kiss','yawn'].includes(ex)||(ex==='wink'||ex==='cheeky')&&side===1;
 if(closed)o+=line(`M${x-8} ${y+2}Q${x} ${y+(['dreamy','yawn'].includes(ex)?8:-8)} ${x+8} ${y+2}`,c,3.2);
 else if(ex==='sleepy')o+=line(`M${x-8} ${y}Q${x} ${y+5} ${x+8} ${y}M${x-4} ${y+3}l-2 4M${x+4} ${y+3}l2 4`,c,2.8);
 else if(ex==='grumpy'||ex==='determined'){
  o+=ellipse(x,y+2,sz,sz,INK);o+=line(`M${x-9} ${y-side*4}L${x+9} ${y+side*4}`,c,3.4);o+=ellipse(x-2,y+1,1.5,1.5,PAPER);
 }else if(t.family==='egg'&&!['surprised','worried'].includes(ex))o+=path(`M${x-7} ${y-4}Q${x} ${y-5} ${x+7} ${y-1}L${x+side*1.5} ${y+5}Z`,INK,INK,1.5);
 else{
  const wide=['surprised','worried'].includes(ex),gaze=ex==='side-eye'?4:t.pose==='peek-left'?-3:t.pose==='peek-right'?3:0;
  if(wide||gaze)o+=ellipse(x,y,sz+5,sz+5,PAPER,INK,1.3);
  else o+=ellipse(x,y,sz+3,sz+3,t.palette==='black'||t.pattern==='bernese'?'#92988e':t.coat[1],'none',0,'opacity=".45"');
  o+=ellipse(x+gaze,y,wide?sz*.7:sz,wide?sz*.8:sz,t.id==='husky'||t.lightEyes?t.eyeTone:INK,INK,1.3);
  if(t.id==='husky'||t.lightEyes)o+=ellipse(x+gaze,y,2.5,3.2,INK);
  o+=ellipse(x+gaze-1.5,y-2,1.7,1.7,PAPER);
 }
 if(t.droop&&!closed)o+=line(`M${x-10} ${y-3}Q${x} ${y-9+t.droop*3} ${x+10} ${y-3}`,c,2.5);
 if(t.fur!==3){const raise=ex==='curious'&&side===-1?7:ex==='surprised'?5:0;
  o+=line(`M${x-8} ${y-15-raise+(ex==='worried'?side*4:0)}Q${x} ${y-19-raise} ${x+7} ${y-15-raise-(ex==='worried'?side*4:0)}`,t.palette==='black'?'#9da293':t.coat[1],2.8);
 }
 if(['shy','cheeky','dreamy'].includes(ex))o+=ellipse(x+side*6,y+15,9,4,'#d88c86','none',0,'opacity=".65"');
 }return o;
}

function muzzle(t){const [base,shade,light]=t.coat,w=t.muzzleW,h=t.muzzleH,y=t.muzzleY;let fill=t.palette==='black'?'#555a5b':base;
 if(['blaze','husky','urajiro','patch','boxer','furnishings','bernese','spots','ticking'].includes(t.pattern)||['cloud','silky','corded'].includes(t.family))fill=PAPER;
 if(t.pattern==='points'&&t.palette!=='red')fill='#c2915d';
 if(t.palette==='yellow'||t.palette==='cream'||t.id==='golden')fill=light;
 if(t.pattern==='mask'||t.pattern==='shepherd')fill=t.palette==='black'?'#555a5b':'#59514a';
 if(t.id==='bull-terrier')fill=t.coat[0];
 let o='';
 if(t.family==='egg'||t.family==='long'){
  o+=path(`M128 ${y-16} C${128+w*.6} ${y-18} ${128+w} ${y-2} ${128+w} ${y+11}Q${128+w*.9} ${y+h} 128 ${y+h-3}Q${128-w*.9} ${y+h} ${128-w} ${y+11}C${128-w} ${y-2} ${128-w*.6} ${y-18} 128 ${y-16}Z`,fill,t.family==='egg'?shade:INK,t.family==='egg'?2.4:3.5);
 }else o+=path(`M128 ${y-8} C${128+w*.6} ${y-30} ${128+w*1.12} ${y-8} ${128+w} ${y+11} C${128+w*.9} ${y+h+4} ${128+w*.25} ${y+h+4} 128 ${y+h-6} C${128-w*.25} ${y+h+4} ${128-w*.9} ${y+h+4} ${128-w} ${y+11} C${128-w*1.12} ${y-8} ${128-w*.6} ${y-30} 128 ${y-8}Z`,fill,INK,3.8);
 const nw=t.nose;
 o+=path(`M128 ${y-9} C${128+nw*1.12} ${y-13} ${128+nw*1.24} ${y-5} ${128+nw*.8} ${y+1}L${128+4} ${y+8}Q128 ${y+11} ${128-4} ${y+8}L${128-nw*.8} ${y+1}C${128-nw*1.24} ${y-5} ${128-nw*1.12} ${y-13} 128 ${y-9}Z`,INK,INK,1.6);
 o+=line(`M${128-nw*.42} ${y-6}Q128 ${y-9} ${128+nw*.38} ${y-6}`,'#737a7c',2.2);
 const tongue=t.blueTongue?'#8982b5':'#df939c';
 if(['tongue','wink','joy','laugh','cheeky'].includes(t.expression)){
  const mw=Math.min(w*.5,18),ex=t.expression,depth=ex==='laugh'?36:ex==='joy'?31:25;
  o+=path(`M${128-mw} ${y+15}Q128 ${y+22} ${128+mw} ${y+15}Q${128+mw} ${y+depth} 128 ${y+depth}Q${128-mw} ${y+depth} ${128-mw} ${y+15}Z`,INK,INK,2.5);
  const tx=ex==='cheeky'?137:128,ty=y+(ex==='laugh'?29:24),len=ex==='tongue'?17:11;
  o+=path(`M${tx-7} ${ty}Q${tx} ${ty-3} ${tx+7} ${ty}V${ty+len}Q${tx} ${ty+len+8} ${tx-7} ${ty+len}Z`,tongue,INK,2.5)+line(`M${tx} ${ty+2}v7`,'#a96a83',1.7);
  if(ex==='laugh')o+=path(`M${128-mw+3} ${y+18}Q128 ${y+25} ${128+mw-3} ${y+18}L${128+mw-5} ${y+24}Q128 ${y+28} ${128-mw+5} ${y+24}Z`,PAPER,'none');
 }else if(t.expression==='surprised'||t.expression==='yawn')o+=ellipse(128,y+25,t.expression==='yawn'?12:7,t.expression==='yawn'?16:10,INK,INK,2)+ellipse(128,y+33,5,3,tongue);
 else if(t.expression==='blep')o+=line(`M113 ${y+20}Q128 ${y+23} 143 ${y+20}`,INK,2.7)+path(`M123 ${y+21}h10v9q-5 8-10 0Z`,tongue,INK,2.2);
 else if(t.expression==='kiss')o+=path(`M125 ${y+20}q12-6 8 0q7 6-5 6q-8-2-3-6Z`,tongue,INK,2);
 else if(['grumpy','worried','determined'].includes(t.expression))o+=line(`M${128-w*.45} ${y+24}Q128 ${y+(t.expression==='determined'?24:14)} ${128+w*.45} ${y+24}`,INK,3);
 else if(t.expression==='smirk'||t.expression==='side-eye')o+=line(`M114 ${y+22}Q132 ${y+29} 144 ${y+14}M141 ${y+14}h7`,INK,2.8);
 else if(['smile','dreamy','shy'].includes(t.expression))o+=line(`M128 ${y+8}V${y+19}M${128-w*.49} ${y+15}Q128 ${y+(t.expression==='shy'?28:36)} ${128+w*.49} ${y+15}`,INK,2.8);
 else o+=line(`M128 ${y+8}V${y+17}M${128-w*.48} ${y+18}Q${128-w*.16} ${y+24} 128 ${y+17}Q${128+w*.16} ${y+24} ${128+w*.48} ${y+18}`,INK,2.8);
 if(w>27)for(const s of [-1,1])for(const [dx,dy] of [[.57,4],[.72,10],[.46,12]])o+=ellipse(128+s*w*dx,y+dy,1.4,1.4,fill===PAPER?'#6e6b61':INK);
 return o;
}

function furnishings(t,front){const w=t.w,T=t.top,y=t.muzzleY,[base,shade,light]=t.coat;let o='';const r=random(String(t.patternSeed));
 if(!front){
  if(t.fur===2){o+=path(`M${128-w*.86} ${t.bottom-48}L${128-w*1.06} ${t.bottom-10}L${128-w*.84} ${t.bottom-18}L${128-w*.82} ${t.bottom+5}L${128-w*.48} ${t.bottom-1}L${128-w*.28} ${t.bottom+12}L128 ${t.bottom+5}L${128+w*.28} ${t.bottom+12}L${128+w*.48} ${t.bottom-1}L${128+w*.82} ${t.bottom+5}L${128+w*.84} ${t.bottom-18}L${128+w*1.06} ${t.bottom-10}L${128+w*.86} ${t.bottom-48}Z`,base,INK,4);}

  if(t.fur===3)o+=path(`M${128-w*.65} ${y-3}L${128-w*.95} ${y+19}L${128-w*.68} ${y+13}L${128-w*.6} ${t.bottom+12}L${128-w*.27} ${t.bottom+4}L128 ${t.bottom+19}L${128+w*.27} ${t.bottom+4}L${128+w*.6} ${t.bottom+12}L${128+w*.68} ${y+13}L${128+w*.95} ${y+19}L${128+w*.65} ${y-3}Z`,light,INK,4);
  return o;
 }
 if(t.fur===3){for(const s of [-1,1]){const x=128+s*t.eyeGap;o+=path(`M${x-14} ${t.eyeY-8}Q${x-2} ${t.eyeY-31} ${x+16} ${t.eyeY-15}L${x+12} ${t.eyeY-6}Q${x} ${t.eyeY-14} ${x-14} ${t.eyeY-8}Z`,light,INK,2.7);}o+=line(`M113 ${y+35}l-2 20M128 ${y+34}v26M143 ${y+35}l2 20`,shade,2.2);}
 if(t.fur===4){
  if(t.id==='poodle')o+=path(cloud(128,T+12,w*.85,30*t.furScale,11,.09),base,INK,4.5);
  for(let i=0;i<(t.id==='bichon'?10:7);i++){const a=Math.PI+(i/(t.id==='bichon'?9:6))*Math.PI,x=128+Math.cos(a)*w*.78,yy=T+38+Math.sin(a)*28;o+=line(`M${x-5} ${yy+4}q-4 -8 3 -9q8 0 5 7`,shade,2.4);}
 }
 if(t.fur===5){
  for(const s of [-1,1]){o+=path(`M${128+s*4} ${y-15}Q${128+s*31} ${y-15} ${128+s*w*.82} ${t.bottom-15}L${128+s*w*.64} ${t.bottom-20}L${128+s*w*.58} ${t.bottom-3}Q${128+s*19} ${t.bottom+1} 128 ${y+27}Z`,PAPER,INK,3);o+=line(`M${128+s*14} ${y+12}Q${128+s*23} ${y+30} ${128+s*30} ${t.bottom-13}`,t.coat[1],2);}
  o+=line(`M128 ${T+4}q-16 7 -23 28 M130 ${T+5}q14 8 20 27`,shade,3);
 }
 if(t.fur===6){o+=path(`M${128-w*.9} ${T+32}Q${128-w*1.05} ${T-10} 128 ${T-7}Q${128+w*.95} ${T-11} ${128+w*.9} ${T+32}Q${128+w*.4} ${T+16} 128 ${T+16}Q${128-w*.3} ${T+16} ${128-w*.9} ${T+32}Z`,base,INK,3.8);for(const s of [-1,1])o+=line(`M${128+s*12} ${T}Q${128+s*30} ${T+4} ${128+s*31} ${T+17}`,shade,2.5);}
 if(t.fur===7){
  for(let i=0;i<13;i++){const x=128-w*.94+i*w*1.88/12,edge=Math.abs(i-6)/6,start=T+7+edge*14,end=edge>.48?t.bottom-3+r()*8:t.eyeY-3+r()*20,bend=(r()-.5)*16;const d=`M${x} ${start}C${x+bend-9} ${start+28} ${x+bend+7} ${end-28} ${x+bend} ${end}`;o+=line(d,'#a9a48f',11);o+=line(d,light,7.2);o+=line(d,base,2.1);}
 }
 if(t.fur===8){o+=path(`M${128-w} ${T+31}Q${128-w*.9} ${T-11} ${128-10} ${T-16}L${128-18} ${T-36}Q128 ${T-31} ${128+7} ${T-13}Q${128+20} ${T-38} ${128+34} ${T-38}L${128+24} ${T-15}Q${128+w*.9} ${T-15} ${128+w} ${T+29}Q${128+21} ${T+11} ${128+11} ${T+12}Q${128-3} ${T+42} ${128-20} ${T+38}L${128-12} ${T+10}Z`,light,INK,3.7);o+=line(`M127 ${T-10}Q115 ${T+9} 112 ${T+24}M139 ${T-12}Q150 ${T} 158 ${T+12}`,shade,2.2);}
 return o;
}

export function renderSVG(t,options={}){
 const framing=resolveFraming(options.size??256,options.framing??(options.dressed?'auto':'head'));
 const bust=framing==='bust';
 options={...options,dressed:framing!=='head'};
 const style=personalStyle(t,{expression:options.expression,headwear:options.headwear,outfit:options.outfit,pose:options.pose,ears:options.ears,accessory:options.accessory,garmentColor:options.garmentColor,headwearColor:options.headwearColor,accessoryColor:options.accessoryColor,fabric:options.fabric});
 t={...t,pose:options.dressed?style.pose:'upright',ears:options.dressed?style.ears:'natural',...(COAT_PALETTES[options.coat]?{palette:options.coat,coat:COAT_PALETTES[options.coat]}:{}),...(options.pattern&&options.pattern!=='breed'?{pattern:options.pattern}:{}),expression:options.dressed?style.expression:options.expression&&options.expression!=='seeded'?options.expression:'neutral'};
 const size=options.size??256,clip=`c_${(options.prefix??`${t.id}_${t.seed}`).replace(/[^a-zA-Z0-9_-]/g,'_')}`;
 const head=headShape(t),[base,shade]=t.coat;
 let s=ears(t)+(t.fur===2?furnishings(t,false):'')+path(head,base,'none',0);
 s+=`<g clip-path="url(#${clip})">${markings(t)}</g>`+path(head,'none');
 s+=(t.fur===2?'':furnishings(t,false))+eyes(t);
 if(t.wrinkles){const yy=t.eyeY-19;s+=line(`M${128-19} ${yy}Q128 ${yy-12} ${128+19} ${yy}`,shade,3);if(t.wrinkles>1)s+=line(`M${128-14} ${yy-12}Q128 ${yy-21} ${128+14} ${yy-12}`,shade,2.8);s+=line(`M${128-13} ${t.muzzleY-22}Q128 ${t.muzzleY-32} ${128+13} ${t.muzzleY-22}`,shade,2.5);}
 s+=t.fur===5?furnishings(t,true)+muzzle(t):muzzle(t)+furnishings(t,true);
 if(options.dressed){
  const pose={upright:[0,0,0,1], 'tilt-left':[-9,0,0,1], 'tilt-right':[9,0,0,1], 'lean-left':[-5,-5,0,.95], 'lean-right':[5,5,0,.95], 'chin-up':[0,0,-5,1], 'chin-down':[0,0,6,1], 'peek-left':[-4,-8,2,.9], 'peek-right':[4,8,2,.9],proud:[0,0,-2,1.08],cozy:[4,0,7,.91],stretch:[0,0,-9,.88]}[style.pose]??[0,0,0,1];
  const hatStyle={...style,accent:COLORWAYS[style.headwearColor]??style.accent},accessoryStyle={...style,accent:COLORWAYS[style.accessoryColor]??style.accent};
  const body=accessoryArt(t,accessoryStyle,'back')+bodyArt(t,style,clip+'_cloth')+accessoryArt(t,accessoryStyle,'body');
  const face=s+headwearArt(t,hatStyle)+accessoryArt(t,accessoryStyle,'face');
  if(bust){
   // Keep the head almost at its standalone size; the viewport crops the lower torso.
   s=`<g transform="translate(${n(128-128*pose[3])} 42) scale(${pose[3]} 1)">${body}</g><g transform="translate(${n(2.56+pose[1])} ${pose[2]}) scale(.98)"><g transform="rotate(${pose[0]} 128 155)">${face}</g></g>`;
   s=`<g transform="translate(5.12 5.12) scale(.96)">${s}</g>`;
  }else{
   s=`<g transform="translate(${n(128-128*pose[3])} 0) scale(${pose[3]} 1)">${body}</g><g transform="translate(${n(35.84+pose[1])} ${12+pose[2]}) scale(.72)"><g transform="rotate(${pose[0]} 128 155)">${face}</g></g>`;
   s=`<g transform="translate(10.24 10.24) scale(.92)">${s}</g>`;
  }
 }

 const bg=options.background?`<rect width="256" height="256" fill="${esc(options.background)}"/>`:'';
 const silhouette=options.silhouette?'<style>.dog-art [fill]:not([fill="none"]){fill:#30373b}.dog-art [stroke]:not([stroke="none"]){stroke:#30373b}</style>':'';
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256" role="img" aria-label="${esc(t.name)}"><title>${esc(t.name)} — ${esc(t.seed)}</title><metadata>${esc(JSON.stringify({version:VERSION,breed:t.id,seed:t.seed,framing,...(options.dressed?{style}:{} )}))}</metadata><defs><clipPath id="${clip}">${path(head,'white','none',0)}</clipPath></defs>${silhouette}${bg}<g class="dog-art">${s}</g></svg>`;
}
