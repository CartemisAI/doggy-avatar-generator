const CI='#30373b',cn=v=>Number(v.toFixed(2));
const cp=(d,fill,stroke=CI,w=2.8)=>`<path d="${d.replace(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g,v=>cn(Number(v)))}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const cc=(x,y,r,fill,stroke=CI,w=2)=>`<circle cx="${cn(x)}" cy="${cn(y)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;
const star=(x,y,r,fill)=>cp(Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,rr=i%2?r*.43:r;return(i?'L':'M')+(x+Math.cos(a)*rr)+' '+(y+Math.sin(a)*rr);}).join('')+'Z',fill,CI,1.5);
const heart=(x,y,r,fill)=>cp(`M${x} ${y+r}C${x-r*2} ${y-r*.3} ${x-r} ${y-r*1.4} ${x} ${y-r*.45}C${x+r} ${y-r*1.4} ${x+r*2} ${y-r*.3} ${x} ${y+r}Z`,fill,CI,1.5);
export const COLORWAYS={
 lagoon:['#508f91','#c3e8db'],coral:['#d47970','#f8d3bc'],honey:['#d5a449','#fff0bb'],denim:['#688cb9','#dbe9f5'],lilac:['#a184bc','#ecdcf4'],forest:['#547958','#d3e1bb'],rose:['#c47c9a','#f8dce8'],ink:['#444c5e','#c8d0df'],ivory:['#e8dfc9','#8b7964'],snow:['#f1f1e9','#9eb5c1'],ruby:['#b9515f','#ffd5ba'],emerald:['#478875','#c9edc5'],sapphire:['#416dac','#c5e0f6'],amethyst:['#79599e','#e4c9ee'],tangerine:['#e49553','#ffe7ac'],lemon:['#e0c457','#fff6c0'],mint:['#91c6af','#ecf7d5'],peach:['#e4ac92','#fff0d8'],sky:['#89b9d4','#e8f5f5'],cocoa:['#88674e','#e4caa3'],mocha:['#a18d80','#f2e2cf'],wine:['#824854','#e2b9b6'],olive:['#89935b','#e4e6bc'],silver:['#9aa7af','#eef2ef'],gold:['#bd9553','#f4df98'],midnight:['#343d61','#b5bde4'],candy:['#db8eb6','#a9dbd8'],aurora:['#6c9baf','#c9b5e5'],sunset:['#d07e74','#e5c579'],neon:['#545673','#c8e678']
};
export const FABRICS=['plain','stripes','polka','checks','argyle','stars','hearts','flowers','scales','waves','confetti','clouds'];
export const CREATIVE_OUTFITS=['flower-dress','dragon-robe','mushroom-cape','cloud-coat','stargazer','robot-suit','mermaid','royal-robe','steampunk','bee-suit','ladybug','strawberry','watermelon','ramen-apron','tea-apron','pizza-jacket','penguin','reindeer','polar-parka','jellyfish'];
export const CREATIVE_HATS=['mushroom-hat','cloud-hat','rainbow','dragon-horns','bee-antennae','strawberry-leaf','pumpkin','teacup','ramen-bowl','saturn','star-halo','lotus','feather','cactus','croissant'];
export const CREATIVE_ACCESSORIES=['fairy-wings','bow-collar','pearls','crystal','compass','camera','pocket-watch','rocket-pin','bouquet','bubble-brooch','heart-glasses','star-glasses','flower-glasses','sleep-mask'];
export function fabricArt(style){const p=style.accent[1];let o='';
 if(style.fabric==='plain')return o;
 if(style.fabric==='stripes')for(let y=174;y<248;y+=15)o+=cp(`M50 ${y}H206`,'none',p,5);
 else if(style.fabric==='checks'){for(let x=58;x<210;x+=21)o+=cp(`M${x} 153V248`,'none',p,6);for(let y=169;y<249;y+=21)o+=cp(`M49 ${y}H207`,'none',p,6);}
 else for(let row=0;row<4;row++)for(let col=0;col<7;col++){const x=57+col*23+(row%2?9:0),y=174+row*22;
  if(style.fabric==='polka')o+=cc(x,y,3.5,p,'none');
  else if(style.fabric==='argyle')o+=cp(`M${x} ${y-9}l7 9l-7 9l-7-9Z`,p,'none');
  else if(style.fabric==='stars')o+=star(x,y,6,p);
  else if(style.fabric==='hearts')o+=heart(x,y,4,p);
  else if(style.fabric==='flowers'){for(const [dx,dy]of[[0,-3],[3,0],[0,3],[-3,0]])o+=cc(x+dx,y+dy,2.6,p,'none');}
  else if(style.fabric==='scales')o+=cp(`M${x-10} ${y}q10 15 20 0`,'none',p,2);
  else if(style.fabric==='waves')o+=cp(`M${x-11} ${y}q6-9 12 0q6 9 12 0`,'none',p,2);
  else if(style.fabric==='confetti')o+=cp(`M${x-3} ${y-4}l6 8M${x+5} ${y-4}l-4 2`,'none',p,2.3);
  else if(style.fabric==='clouds')o+=cp(`M${x-6} ${y+3}q-5-7 1-7q5-7 9 0q7 2 2 7Z`,p,'none');
 }
 return `<g opacity=".52">${o}</g>`;
}
export function costumeArt(style){const [a,p]=style.accent;let o='';const collar=cp('M99 151L128 176L157 151L166 170L146 190L128 177L110 190L90 170Z',p);
 switch(style.outfit){
 case 'flower-dress':for(let i=0;i<7;i++){const x=87+i*14;o+=cp(`M${x} 171q-13 7-3 22q14 8 17-5l-6-18Z`,p);}o+=cp('M62 229Q128 247 194 229','none',p,9)+cc(128,184,8,'#dfbd62');break;
 case 'dragon-robe':o=collar+cp('M118 181h20v64h-20Z',p);for(let y=189;y<242;y+=13)o+=cp(`M128 ${y}l-7 9h14Z`,a);for(const x of[82,174])o+=cp(`M${x} 199q-10 13 0 24q10-11 0-24Z`,p);break;
 case 'mushroom-cape':o=cp('M98 150Q128 170 158 150L197 225Q128 249 59 225Z',p)+[[-1,192],[1,206],[-1,227]].map(([s,y])=>cc(128+s*35,y,8,a)).join('')+cp('M120 173l8 19l8-19','none',a,5);break;
 case 'cloud-coat':o=collar;for(const y of[205,233])o+=cp(`M72 ${y}q-12-16 4-18q13-21 26-5q18-2 19 15q-19 16-49 8Z`,p);o+=cp('M128 182V247','none',p,3)+cc(143,199,3,p)+cc(143,221,3,p);break;
 case 'stargazer':o=collar+cp('M128 180V247','none',p,3)+star(161,211,15,p)+star(91,219,8,p)+cp('M77 239l12-10l17 6l4-18','none',p,2);break;
 case 'robot-suit':o=cp('M98 152h60v23H98Z',p)+cp('M88 188h80v47H88Z',p)+cc(107,206,7,a)+cc(129,206,7,a)+cp('M148 199v16M102 226h49','none',a,5)+cp('M68 185V238M188 185V238','none',p,7);break;
 case 'mermaid':o=cp('M99 157q8 33 29 22q21 11 29-22l-12 37h-34Z',p);for(let y=207;y<242;y+=14)for(let x=77;x<185;x+=23)o+=cp(`M${x} ${y}q11 15 22 0`,'none',p,2.5);break;
 case 'royal-robe':o=cp('M97 151L128 180L159 151L170 175L146 201L128 185L110 201L86 175Z',p)+cp('M128 187V247','none','#e1bc6a',5)+cc(128,191,6,p)+cp('M61 238H195','none',p,10);break;
 case 'steampunk':o=collar+cp('M105 179L128 194L151 179L149 247H107Z',p)+cp('M128 194V247','none',a,3)+cc(159,218,13,'#d4ad6c')+cc(159,218,6,a)+cp('M145 225q-19 23-30 2','none','#d4ad6c',3);break;
 case 'bee-suit':o=cp('M99 155Q128 177 157 155','none',p,10);for(const y of[194,217,239])o+=cp(`M56 ${y}H200`,'none',p,12);o+=heart(128,203,8,a);break;
 case 'ladybug':o=cp('M128 174V247','none',CI,4);for(const [x,y]of[[89,196],[166,201],[86,228],[167,232]])o+=cc(x,y,8,p);o+=collar;break;
 case 'strawberry':o=cp('M97 154l12 29l19-13l19 13l12-29l-31 10Z',p);for(const [x,y]of[[89,199],[128,207],[167,199],[100,232],[152,232]])o+=cp(`M${x} ${y-4}q-7 12 0 10q7 2 0-10Z`,p,'none');break;
 case 'watermelon':o=cp('M97 155Q128 180 159 155','none',p,9)+cp('M58 235Q128 252 198 235','none',p,12);for(const x of[88,113,143,169])o+=cp(`M${x} 203q-5 10 0 11q5-1 0-11Z`,CI,'none');break;
 case 'ramen-apron':o=collar+cp('M99 176v22h58v-22h8v71H91v-71Z',p)+cp('M108 215h40q-2 21-20 21q-18 0-20-21Z',a)+cp('M112 214q7-16 11 0q7-16 11 0q7-16 11 0M137 211l14-22M141 211l16-18','none',a,2.5);break;
 case 'tea-apron':o=collar+cp('M98 178v18h60v-18h7v69H91v-69Z',p)+cp('M115 207h26l-4 30h-18Z',a)+cp('M128 208l5-17','none',a,3)+[123,132].map(x=>cc(x,230,2.4,p,'none')).join('');break;
 case 'pizza-jacket':o=collar+cp('M128 180V247','none',p,3)+cp('M151 198l-13 34l34-17Z','#ebc879')+cc(153,214,4,a)+cp('M151 198l21 17','none',p,5);break;
 case 'penguin':o=cp('M110 164Q128 180 146 164L160 240Q128 252 96 240Z',p)+cp('M125 184l-17-8v15l17-4M131 184l17-8v15l-17-4',a)+cc(128,210,3,a)+cc(128,228,3,a);break;
 case 'reindeer':o=collar+cp('M112 214l16-13l16 13l-16 22Z',p)+cp('M121 207l-8-13M135 207l8-13M116 199h-7M140 199h7','none',p,3)+cc(128,227,4,a);break;
 case 'polar-parka':o=cp('M97 150Q128 164 159 150L174 176Q128 199 82 176Z',p)+cp('M128 184V247','none',p,4)+cp('M75 209h31v21H75ZM150 209h31v21H150Z',p);for(let x=91;x<170;x+=12)o+=cc(x,177,5,p,CI,1);break;
 case 'jellyfish':o=cp('M90 184Q90 159 128 166Q166 159 166 184Q128 198 90 184Z',p);for(let x=98;x<166;x+=15)o+=cp(`M${x} 188q-9 15 0 27q9 15-1 27`,'none',p,5);break;
 }
 return o;
}
export function creativeHat(t,style){const [a,p]=style.accent,y=Math.max(69,Math.round(t.top)+3);let o='';
 switch(style.headwear){
 case 'mushroom-hat':o=cp(`M116 ${y+10}V${y-10}H141V${y+10}Z`,p)+cp(`M88 ${y-3}Q94 ${y-42} 128 ${y-39}Q162 ${y-42} 170 ${y-3}Q128 ${y+9} 88 ${y-3}Z`,a)+cc(111,y-15,7,p)+cc(142,y-21,6,p);break;
 case 'cloud-hat':o=cp(`M100 ${y+8}Q81 ${y-4} 101 ${y-16}Q101 ${y-37} 124 ${y-26}Q144 ${y-44} 154 ${y-20}Q181 ${y-9} 157 ${y+8}Z`,p)+cp(`M111 ${y+1}l-3 15M143 ${y+1}l-3 15`,'none',a,3);break;
 case 'rainbow':o=cp(`M98 ${y+7}Q97 ${y-42} 128 ${y-41}Q159 ${y-42} 158 ${y+7}`,'none',a,9)+cp(`M108 ${y+7}Q106 ${y-27} 128 ${y-27}Q150 ${y-27} 148 ${y+7}`,'none',p,7);break;
 case 'dragon-horns':o=cp(`M108 ${y+9}Q83 ${y-9} 95 ${y-36}Q98 ${y-10} 120 ${y-1}M148 ${y+9}Q173 ${y-9} 161 ${y-36}Q158 ${y-10} 136 ${y-1}`,p)+cp(`M111 ${y+8}Q128 ${y-4} 145 ${y+8}`,'none',a,9);break;
 case 'bee-antennae':o=cp(`M114 ${y+8}Q91 ${y-15} 104 ${y-27}M142 ${y+8}Q165 ${y-15} 152 ${y-27}`,'none',CI,4)+cc(104,y-28,7,a)+cc(152,y-28,7,a);break;
 case 'strawberry-leaf':o=cp(`M99 ${y+8}L111 ${y-11}L104 ${y-21}L126 ${y-12}L135 ${y-34}L138 ${y-10}L159 ${y-20}L151 ${y-2}L161 ${y+9}L134 ${y+1}L120 ${y+16}L119 ${y+1}Z`,p);break;
 case 'pumpkin':o=cp(`M98 ${y-9}Q103 ${y-35} 128 ${y-23}Q153 ${y-35} 158 ${y-9}Q158 ${y+15} 128 ${y+8}Q98 ${y+15} 98 ${y-9}Z`,a)+cp(`M128 ${y-23}q-4-17 9-18M119 ${y-20}q-11 16 0 26M137 ${y-20}q11 16 0 26`,'none',p,3);break;
 case 'teacup':o=cp(`M102 ${y-21}H150L144 ${y+7}H108Z`,p)+cp(`M150 ${y-16}q24-5 12 14h-15M118 ${y-28}q-7-7 0-14M134 ${y-28}q-7-7 0-14`,'none',a,3)+cp(`M97 ${y+10}H157`,'none',a,4);break;
 case 'ramen-bowl':o=cp(`M94 ${y-12}H162Q157 ${y+12} 128 ${y+12}Q99 ${y+12} 94 ${y-12}Z`,a)+cp(`M102 ${y-14}q7-17 14 0q7-17 14 0q7-17 14 0q7-17 14 0M141 ${y-15}l15-26M147 ${y-15}l18-23`,'none',p,3);break;
 case 'saturn':o=cc(128,y-11,22,a)+cp(`M87 ${y+4}Q105 ${y-21} 169 ${y-23}Q163 ${y+4} 87 ${y+4}Z`,'none',p,6);break;
 case 'star-halo':o=cp(`M92 ${y+9}Q128 ${y-31} 164 ${y+9}`,'none',p,3);for(const [x,yy]of[[98,y+1],[113,y-12],[135,y-15],[157,y-1]])o+=star(x,yy,7,a);break;
 case 'lotus':o=cp(`M128 ${y+10}Q99 ${y+1} 102 ${y-20}Q124 ${y-16} 128 ${y+10}Q103 ${y-22} 128 ${y-39}Q153 ${y-22} 128 ${y+10}Q132 ${y-16} 154 ${y-20}Q157 ${y+1} 128 ${y+10}Z`,p);break;
 case 'feather':o=cp(`M120 ${y+9}Q101 ${y-21} 138 ${y-42}Q159 ${y-8} 120 ${y+9}Z`,a)+cp(`M117 ${y+15}L138 ${y-32}M130 ${y-16}l-13-5M127 ${y-8}l15-3`,'none',p,2.4);break;
 case 'cactus':o=cp(`M120 ${y+10}V${y-25}Q128 ${y-39} 136 ${y-25}V${y-11}Q148 ${y-9} 147 ${y-24}H158Q161 ${y+1} 136 ${y+1}V${y+10}Z`,p)+cp(`M120 ${y-4}Q98 ${y+4} 98 ${y-19}H108Q106 ${y-8} 120 ${y-14}`,p)+cc(132,y-29,5,a);break;
 case 'croissant':o=cp(`M92 ${y+6}Q98 ${y-25} 128 ${y-27}Q158 ${y-25} 164 ${y+6}L145 ${y}Q128 ${y-13} 111 ${y}Z`,'#d8ab66')+cp(`M116 ${y-24}l-5 23M139 ${y-24}l6 23M104 ${y-16}l-3 15M151 ${y-16}l3 15`,'none','#f7d899',3);break;
 }
 return o;
}
export function creativeAccessory(t,style,layer){const [a,p]=style.accent;let o='';
 if(layer==='back'&&style.accessory==='fairy-wings')for(const side of[-1,1])o+=cp(`M128 211Q${128+side*87} 140 ${128+side*86} 185Q${128+side*86} 212 ${128+side*51} 213Q${128+side*90} 216 ${128+side*74} 242Q${128+side*37} 250 128 211Z`,p);
 if(layer==='face'){
  const y=t.eyeY;
  for(const side of[-1,1]){const x=128+side*t.eyeGap;
   if(style.accessory==='heart-glasses')o+=heart(x,y,11,a);
   if(style.accessory==='star-glasses')o+=star(x,y,16,a);
   if(style.accessory==='flower-glasses'){for(let i=0;i<6;i++)o+=cc(x+Math.cos(i*Math.PI/3)*12,y+Math.sin(i*Math.PI/3)*12,5,p);o+=cc(x,y,10,'none',a,3);}
  }
  if(['heart-glasses','star-glasses','flower-glasses'].includes(style.accessory))o+=cp(`M${128-t.eyeGap+11} ${y}Q128 ${y-6} ${128+t.eyeGap-11} ${y}`,'none',a,3);
  if(style.accessory==='sleep-mask')o+=cp(`M${115-t.eyeGap} ${y-11}Q128 ${y-18} ${141+t.eyeGap} ${y-11}V${y+9}Q${128+t.eyeGap} ${y+20} 128 ${y+7}Q${128-t.eyeGap} ${y+20} ${115-t.eyeGap} ${y+9}Z`,a)+cp(`M${121-t.eyeGap} ${y}q7 8 14 0M${121+t.eyeGap} ${y}q7 8 14 0`,'none',p,2);
 }
 if(layer==='body')switch(style.accessory){
 case 'bow-collar':o=cp('M101 164Q128 176 155 164','none',p,7)+cp('M125 178l-18-9v22l18-9M131 178l18-9v22l-18-9',a)+cc(128,180,5,p);break;
 case 'pearls':for(let i=0;i<9;i++){const x=103+i*6.3,y=170+Math.sin(i/8*Math.PI)*22;o+=cc(x,y,3.6,p);}break;
 case 'crystal':o=cp('M105 166L128 206L151 166','none',p,3)+cp('M128 201l10 12l-10 18l-10-18Z',a)+cp('M128 202v27M119 213h18','none',p,1.8);break;
 case 'compass':o=cp('M108 167L128 205L148 167','none',p,3)+cc(128,215,13,p)+cp('M128 204l5 11l-5 11l-5-11Z',a);break;
 case 'camera':o=cp('M107 166L105 215M149 166L151 215','none',a,4)+cp('M103 209h50v29H103Z',p)+cc(128,224,10,a)+cc(128,224,5,p)+cp('M108 206h13v5h-13Z',a);break;
 case 'pocket-watch':o=cp('M100 199q18 39 50 14','none',p,3)+cc(158,216,11,p)+cp('M158 209v8h6','none',a,2)+cc(158,202,3,p);break;
 case 'rocket-pin':o=cp('M160 196q15 4 15 17l-9 9l-10-9q0-10 4-17Z',p)+cc(165,207,4,a)+cp('M159 221l-3 9l8-7','none',a,3);break;
 case 'bouquet':o=cp('M147 212l11 21l13-22Z',p);for(const [x,y]of[[150,204],[165,201],[172,209]])o+=cc(x,y,6,a)+cc(x,y,2,p);break;
 case 'bubble-brooch':o=cc(160,206,9,p)+cc(173,217,6,a)+cc(153,221,4,a)+cp('M156 201l4-2','none','#fff',2);break;
 }
 return o;
}
