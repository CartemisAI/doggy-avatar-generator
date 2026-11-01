import { CREATIVE_OUTFITS, CREATIVE_HATS, CREATIVE_ACCESSORIES, costumeArt, creativeHat, creativeAccessory } from './costumes.mjs';
const wn=v=>Number(v.toFixed(2));
const WI='#30373b';
const wp=(d,fill,stroke=WI,sw=3)=>`<path d="${d.replace(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g,v=>wn(Number(v)))}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
const wc=(x,y,r,fill,stroke=WI,sw=2)=>`<circle cx="${wn(x)}" cy="${wn(y)}" r="${wn(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
export const EXTRA_OUTFITS=['sailor','chef','astronaut','detective','wizard','knight','gardener','denim','varsity','pajamas','kimono','hanfu','festival','tuxedo','puffer','fleece','rugby','pirate','scout','artist','poncho',...CREATIVE_OUTFITS];
export const EXTRA_HATS=['chef-hat','witch-hat','cowboy','straw','sailor-cap','party-hat','top-hat','detective-hat','pilot','winter-earflap','flower-wreath','leaf','sprout','ribbon','tiara','space-cap','knight-helmet','sun-visor',...CREATIVE_HATS];
export const ACCESSORIES=['none','round-glasses','square-glasses','sunglasses','monocle','goggles','scarf','medal','flower-pin','necklace','lanyard','backpack','satchel','headphones','scout-badge','cape',...CREATIVE_ACCESSORIES];
export const POSES=['upright','tilt-left','tilt-right','lean-left','lean-right','chin-up','chin-down','peek-left','peek-right','proud','cozy','stretch'];
export const EAR_STATES=['natural','alert','relaxed','left-perked','right-perked'];
export function extraOutfit(style){const [a,p]=style.accent;let o='';
 const collar=()=>wp('M99 153L128 174L157 153L164 174L144 192L128 176L112 192L92 174Z',p);
 const buttons=(x=128)=>[197,216,235].map(y=>wc(x,y,2.6,p)).join('');
 const pocket=(x=78,y=205)=>wp(`M${x} ${y}h25v22q-12 6-25 0Z`,p,WI,2.2);
 const stripes=()=>[199,219,239].map(y=>wp(`M58 ${y}H198`,'none',p,7)).join('');
 switch(style.outfit){
 case 'sailor':o=wp('M97 152L87 175L111 192L128 175L145 192L169 175L159 152L145 167H111Z',p)+wp('M128 175l-8 27l8 13l8-13Z',a)+wp('M96 172l15 13l17-14l17 14l15-13','none',a,2.3);break;
 case 'chef':o=collar()+wp('M114 177V245','none',p,3)+[192,212,232].map(y=>wc(124,y,3,p)+wc(145,y,3,p)).join('')+pocket(76,211);break;
 case 'astronaut':o=wp('M96 151Q128 166 160 151L168 171Q128 192 88 171Z',p)+wp('M99 192h58v37H99Z',p)+wc(110,205,4,a)+wc(124,205,4,'#dda85d')+wp('M140 201h9v18h-9Z',a)+wp('M105 219h24','none',a,3)+wp('M71 188v45M185 188v45','none',p,8);break;
 case 'detective':o=wp('M98 151L81 176L109 191L120 213L128 173L136 213L147 191L175 176L158 151',p)+wp('M61 229H196','none',p,9)+wp('M119 224h19v10h-19Z',a)+buttons(142);break;
 case 'wizard':o=wp('M98 150L86 185L118 201L128 169L138 201L170 185L158 150',p)+wp('M128 177V246','none',p,4)+wp('M157 216l4 7l8 1l-6 6l1 8l-7-4l-7 4l2-8l-6-6l8-1Z','#efd281')+wc(91,217,9,p)+wc(95,213,8,a,'none');break;
 case 'knight':o=wp('M96 152Q128 172 160 152L166 177H90Z',p)+wp('M86 179L128 188L170 179L162 230L128 245L94 230Z',p)+wp('M128 190V238','none',a,4)+wp('M112 207h32v19l-16 10l-16-10Z',a)+wp('M128 210v18M120 218h16','none',p,3);break;
 case 'gardener':o=collar()+wp('M96 171h12v26h40v-26h12v76H96Z',p)+pocket(112,213)+wp('M125 230v-18q-12-13-12-1q1 7 12 7q12-17 14-6q-2 7-14 7','none',a,3);break;
 case 'denim':o=collar()+wp('M128 181V247','none',p,2.8)+pocket(79,198)+pocket(151,198)+buttons()+wp('M65 238H191','none',p,2);break;
 case 'varsity':o=wp('M99 152Q128 173 157 152L154 169Q128 184 102 169Z',p)+wp('M128 178V247','none',p,4)+wp('M57 232H199','none',p,10)+wp('M89 193h10v25h14v9H89Z',p)+buttons(137);break;
 case 'pajamas':o=collar()+wp('M128 180V247','none',p,2)+buttons()+[[-1,205],[1,218],[-1,237]].map(([s,y])=>wc(128+s*38,y,7,p)+wc(131+s*38,y-3,6,a,'none')).join('');break;
 case 'kimono':o=wp('M96 151L128 182L160 151L171 176L128 209L87 176Z',p)+wp('M102 159L145 195M154 160L112 194','none',a,4)+wp('M58 218H198V239H58Z',p)+wp('M110 218h36v21h-36Z',a)+wc(171,204,5,p);break;
 case 'hanfu':o=wp('M96 150L142 201L164 162L155 151L130 183L106 151Z',p)+wp('M62 220H195V233H62Z',p)+wp('M134 224q18-19 25-7q1 9-23 9q17 8 13 18M134 227l-6 19','none',a,4);break;
 case 'festival':o=collar()+wp('M128 178V246','none','#e7bd67',4)+[196,217,238].map(y=>wp(`M119 ${y}q9-5 18 0M119 ${y}q9 5 18 0`,'none','#e7bd67',3)).join('')+wp('M84 209l8 8l-8 8l-8-8Z',p);break;
 case 'tuxedo':o=wp('M100 153L128 180L156 153L144 247H112Z','#f4f0e5')+wp('M98 152L84 178L107 190L97 200L119 246L120 181M158 152L172 178L149 190L159 200L137 246L136 181',p)+wp('M126 180l-15-6v15l15-4M130 180l15-6v15l-15-4',a)+buttons();break;
 case 'puffer':o=wp('M95 151L90 178L128 184L166 178L161 151Q128 167 95 151Z',p)+[194,211,228,243].map(y=>wp(`M59 ${y}Q128 ${y+7} 197 ${y}`,'none',p,3)).join('')+wp('M128 181V247','none',WI,3);break;
 case 'fleece':o=collar()+wp('M128 179v36','none',p,5)+pocket(144,204)+[76,87,98,109,147,158,169,180].map(x=>wc(x,237,3,p,'none')).join('');break;
 case 'rugby':o=stripes()+collar()+wp('M119 177h18v20h-18Z',p)+wp('M157 199h12v22h-12Z',a);break;
 case 'pirate':o=stripes()+wp('M94 159L108 179L98 247H63L71 185ZM162 159L148 179L158 247H193L185 185Z',p)+wp('M117 164l11 18l11-18l-5 26l-6-7l-6 7Z','#e4b461')+wp('M63 231H193','none',WI,9);break;
 case 'scout':o=collar()+wp('M103 166L128 197L153 166L137 198L128 218L119 198Z',p)+wp('M169 178L104 247','none',p,15)+[195,213,231].map((y,i)=>wc(154-i*17,y,4,a)).join('');break;
 case 'artist':o=collar()+wp('M104 175v22h48v-22h8v72H96v-72Z',p)+wp('M114 213h30v23h-30Z',a)+wp('M119 217v-17M129 217l-3-21M138 217l4-21','none',WI,3)+wc(173,227,5,p)+wc(83,209,4,p);break;
 case 'poncho':o=wp('M99 151L128 174L157 151L198 230L128 247L58 230Z',p)+wp('M80 205L128 222L176 205M72 219L128 237L184 219','none',a,6)+[84,106,128,150,172].map(x=>wp(`M${x} 234v10`,'none',WI,2)).join('');break;
 }
 return o+costumeArt(style);
}
export function extraHat(t,style){const [a,p]=style.accent,y=Math.max(Math.round(t.top)+2,64);let o='';
 switch(style.headwear){
 case 'chef-hat':o=wp(`M103 ${y+8}V${y-12}Q81 ${y-25} 104 ${y-37}Q112 ${y-56} 131 ${y-41}Q156 ${y-52} 161 ${y-30}Q176 ${y-18} 153 ${y-10}V${y+8}Z`,p)+wp(`M103 ${y-2}H153`,'none',a,3);break;
 case 'witch-hat':o=wp(`M101 ${y-2}L125 ${y-53}L147 ${y-46}L134 ${y-42}L156 ${y-2}Z`,a)+wp(`M87 ${y+1}Q128 ${y-10} 172 ${y+3}Q133 ${y+17} 87 ${y+1}Z`,p);break;
 case 'cowboy':o=wp(`M101 ${y+1}L105 ${y-30}Q117 ${y-39} 128 ${y-26}Q143 ${y-40} 152 ${y-29}L156 ${y+1}Z`,a)+wp(`M80 ${y-7}Q89 ${y+15} 128 ${y+7}Q168 ${y+16} 176 ${y-7}Q158 ${y+1} 128 ${y-1}Q99 ${y+1} 80 ${y-7}Z`,p);break;
 case 'straw':o=wp(`M101 ${y}Q98 ${y-35} 128 ${y-32}Q158 ${y-35} 155 ${y}Z`,'#e6c78d')+wp(`M82 ${y+3}Q128 ${y-9} 175 ${y+3}Q128 ${y+18} 82 ${y+3}Z`,'#f2dba7')+wp(`M103 ${y-4}Q128 ${y-11} 153 ${y-4}`,'none',a,7);break;
 case 'sailor-cap':o=wp(`M98 ${y+7}L94 ${y-14}Q128 ${y-28} 162 ${y-14}L158 ${y+7}Z`,p)+wp(`M99 ${y}Q128 ${y-6} 157 ${y}`,'none',a,5)+wp(`M128 ${y-16}v11M123 ${y-9}q5 8 10 0`,'none',a,2);break;
 case 'party-hat':o=wp(`M105 ${y+7}L128 ${y-43}L153 ${y+7}Z`,a)+wp(`M116 ${y-17}L144 ${y-10}M108 ${y}L149 ${y+5}`,'none',p,6)+wc(128,y-43,6,p);break;
 case 'top-hat':o=wp(`M104 ${y+1}L101 ${y-38}H155L152 ${y+1}Z`,a)+wp(`M90 ${y+2}H168V${y+10}H90Z`,p)+wp(`M104 ${y-8}H152`,'none',p,7);break;
 case 'detective-hat':o=wp(`M97 ${y+2}Q100 ${y-32} 128 ${y-31}Q156 ${y-32} 159 ${y+2}Z`,a)+wp(`M88 ${y+8}L100 ${y-2}H156L170 ${y+8}Z`,p)+wp(`M128 ${y-29}V${y-3}`,'none',p,3);break;
 case 'pilot':o=wp(`M96 ${y+8}L95 ${y-11}Q128 ${y-34} 161 ${y-11}L160 ${y+8}Z`,a)+wp(`M101 ${y+4}Q128 ${y-3} 155 ${y+4}L151 ${y+14}H105Z`,p)+wp(`M117 ${y-11}l11 7l11-7M128 ${y-17}v13`,'none','#e6c177',3);break;
 case 'winter-earflap':o=wp(`M94 ${y+20}V${y-3}Q94 ${y-33} 128 ${y-32}Q162 ${y-33} 162 ${y-3}V${y+20}H149V${y+5}H107V${y+20}Z`,a)+wp(`M101 ${y-5}Q128 ${y-16} 155 ${y-5}V${y+7}H101Z`,p);break;
 case 'flower-wreath':o=wp(`M91 ${y+9}Q128 ${y-13} 165 ${y+9}`,'none','#799a6c',6);for(let i=0;i<5;i++){const x=98+i*15,yy=y+4-Math.sin(i/4*Math.PI)*8;for(const [dx,dy]of[[0,-5],[5,0],[0,5],[-5,0]])o+=wc(x+dx,yy+dy,4,p,WI,1.3);o+=wc(x,yy,3,'#e3b25a',WI,1);}break;
 case 'leaf':o=wp(`M123 ${y+7}Q98 ${y-30} 150 ${y-30}Q161 ${y+1} 123 ${y+7}Z`,'#91af72')+wp(`M120 ${y+13}L144 ${y-21}`,'none',WI,2);break;
 case 'sprout':o=wp(`M128 ${y+10}V${y-18}Q103 ${y-44} 105 ${y-20}Q109 ${y-9} 128 ${y-15}Q148 ${y-42} 153 ${y-22}Q150 ${y-7} 128 ${y-15}`,'#91af72');break;
 case 'ribbon':o=wp(`M102 ${y+7}Q93 ${y-23} 123 ${y-7}L130 ${y-7}Q158 ${y-27} 154 ${y+7}L133 ${y+3}L149 ${y+27}L134 ${y+23}L126 ${y+6}L115 ${y+23}L101 ${y+27}L118 ${y+3}Z`,a)+wc(128,y,6,p);break;
 case 'tiara':o=wp(`M99 ${y+8}L103 ${y-11}L116 ${y+1}L128 ${y-24}L140 ${y+1}L153 ${y-11}L157 ${y+8}Z`,p)+[103,128,153].map((x,i)=>wc(x,y-(i===1?24:11),4,a)).join('');break;
 case 'space-cap':o=wp(`M96 ${y+10}Q89 ${y-35} 128 ${y-37}Q167 ${y-35} 160 ${y+10}L149 ${y+5}Q151 ${y-20} 128 ${y-22}Q105 ${y-20} 107 ${y+5}Z`,p)+wp(`M119 ${y-30}h18`,'none',a,5)+wc(96,y+4,7,a)+wc(160,y+4,7,a);break;
 case 'knight-helmet':o=wp(`M98 ${y+8}V${y-12}Q128 ${y-40} 158 ${y-12}V${y+8}Z`,p)+wp(`M128 ${y-28}V${y+8}M101 ${y-2}H155`,'none',a,3)+wp(`M126 ${y-29}q-9-20 11-22l-3 22Z`,a);break;
 case 'sun-visor':o=wp(`M98 ${y-2}Q128 ${y-12} 158 ${y-2}V${y+7}Q128 ${y-1} 98 ${y+7}Z`,a)+wp(`M99 ${y+6}Q137 ${y-1} 168 ${y+7}L174 ${y+15}Q129 ${y+17} 99 ${y+6}Z`,p);break;
 }
 return o+creativeHat(t,style);
}
export function accessoryArt(t,style,layer){const [a,p]=style.accent;let o='';const y=t.eyeY;
 if(layer==='face'){
 const x1=128-t.eyeGap,x2=128+t.eyeGap,r=12;
 if(['round-glasses','sunglasses','goggles'].includes(style.accessory)){
 const fill=style.accessory==='sunglasses'?'#596b78':style.accessory==='goggles'?'#bad9df88':'none';
 o=wc(x1,y,r,fill,WI,3)+wc(x2,y,r,fill,WI,3)+wp(`M${x1+r} ${y}Q128 ${y-7} ${x2-r} ${y}M${x1-r} ${y}h-9M${x2+r} ${y}h9`,'none',WI,3);
 }else if(style.accessory==='square-glasses')o=wp(`M${x1-13} ${y-10}h26v20h-26ZM${x2-13} ${y-10}h26v20h-26ZM${x1+13} ${y}H${x2-13}`,'none',WI,3);
 else if(style.accessory==='monocle')o=wc(x2,y,13,'none','#b6924d',3)+wp(`M${x2+11} ${y+7}q10 29-2 48`,'none','#b6924d',2);
 else if(style.accessory==='headphones')o=wp(`M${128-t.w-4} ${y-3}Q${128-t.w-9} ${t.top-16} 128 ${t.top-17}Q${128+t.w+9} ${t.top-16} ${128+t.w+4} ${y-3}`,'none',WI,7)+wp(`M${128-t.w-10} ${y-10}h16v29h-16ZM${128+t.w-6} ${y-10}h16v29h-16Z`,a);
 }else if(layer==='body'){
 if(style.accessory==='scarf')o=wp('M99 159Q128 174 157 159L155 178Q128 192 101 178Z',p)+wp('M144 176h16v45l-8-5l-8 5Z',p)+wp('M147 206h10','none',a,4);
 else if(style.accessory==='medal')o=wp('M104 166l24 45l24-45','none',p,7)+wc(128,215,11,'#deb65e')+wp('M128 208v14M122 215h12','none',p,2);
 else if(style.accessory==='necklace')o=wp('M99 166Q128 217 157 166','none','#e1bd75',3)+wp('M128 197l7 8l-7 10l-7-10Z',p);
 else if(style.accessory==='lanyard')o=wp('M107 165l21 47l21-47','none',p,4)+wp('M116 209h24v27h-24Z','#f5f1e7')+wc(123,218,3,a)+wp('M121 228h14','none',a,2);
 else if(style.accessory==='satchel')o=wp('M160 166L88 235','none',p,9)+wp('M77 215h40v31H77Z',p)+wp('M77 215l20 15l20-15','none',a,2.4);
 else if(style.accessory==='backpack')o=wp('M83 174Q74 203 81 239M173 174Q182 203 175 239','none',p,10)+wp('M80 211H176','none',p,4);
 else if(style.accessory==='flower-pin'){for(const [dx,dy]of[[0,-5],[5,0],[0,5],[-5,0]])o+=wc(165+dx,206+dy,4,p,WI,1.5);o+=wc(165,206,3,'#dab557');}
 else if(style.accessory==='scout-badge')o=wp('M154 199h22v22l-11 6l-11-6Z',p)+wp('M165 204l6 12h-12Z',a);
 }else if(layer==='back'&&style.accessory==='cape')o=wp('M99 151Q72 166 46 238L80 230L98 244L128 211L158 244L176 230L210 238Q184 166 157 151Z',p);
 return o+creativeAccessory(t,style,layer);
}
