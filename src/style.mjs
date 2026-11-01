import { VERSION, random } from './model.mjs';
import { EXTRA_OUTFITS, EXTRA_HATS, ACCESSORIES, POSES, EAR_STATES, extraOutfit, extraHat } from './wardrobe.mjs';
import { COLORWAYS, FABRICS, fabricArt } from './costumes.mjs';
const OINK='#30373b';
const opath=(d,fill,stroke=OINK,sw=3.7)=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
const ocircle=(x,y,r,fill,stroke=OINK,sw=2)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
export const EXPRESSIONS=['neutral','smile','tongue','wink','joy','curious','sleepy','surprised','grumpy','shy','laugh','smirk','kiss','worried','determined','dreamy','side-eye','blep','yawn','cheeky'];
export const HEADWEAR=['none','bow','cap','beanie','flower','crown','beret',...EXTRA_HATS];
export const OUTFITS=['bandana','tshirt','hoodie','raincoat','sweater','overalls','bowtie',...EXTRA_OUTFITS];
export function personalStyle(t,overrides={}){
 const choose=(items,tag)=>{const r=random(`${VERSION}/${t.id}/${t.seed}/${tag}`);return items[Math.floor(r()*items.length)];};

 let headwear=choose(HEADWEAR,'headwear');
 if(t.fur===8)headwear=choose(['none','bow','flower'],'crest-headwear');
 const resolved={garmentColor:choose(Object.keys(COLORWAYS),'garment-color'),headwearColor:choose(Object.keys(COLORWAYS),'headwear-color'),accessoryColor:choose(Object.keys(COLORWAYS),'accessory-color'),fabric:choose(['plain','plain','plain',...FABRICS],'fabric'),pose:choose(POSES,'pose'),ears:choose(EAR_STATES,'ears'),accessory:choose(ACCESSORIES,'accessory'),expression:choose(EXPRESSIONS,'expression'),headwear,outfit:choose(OUTFITS,'outfit'),...Object.fromEntries(Object.entries(overrides).filter(([,v])=>v&&v!=='seeded'))};
 resolved.accent=COLORWAYS[resolved.garmentColor]??COLORWAYS.lagoon;return resolved;
}

export function bodyArt(t,style,clipId='garment'){const [base,,light]=t.coat,[accent,pale]=style.accent;let o='';
 const chest='M106 145 Q128 153 150 145 L157 162 Q180 163 195 184 L204 235 Q205 246 194 247 H62 Q51 246 52 235 L61 184 Q76 163 99 162Z';
 o+=opath(chest,style.outfit==='bandana'?base:style.outfit==='bowtie'?pale:accent);
 const clothClip=style.outfit==='bandana'?'M99 153Q128 169 157 153L143 183L128 198L111 183Z':chest;

 if(style.outfit==='bandana'){
  o+=opath('M107 157 Q128 168 149 157 L144 200 Q128 214 112 200Z',light,'none');
  o+=opath('M99 153 Q128 169 157 153 L143 183 L128 198 L111 183Z',accent);
  o+=opath('M145 165l17 8l-5 17l-14-9',pale,OINK,2.8);
  o+=opath('M115 177l13 10l13-10','none',pale,2.8);
 }else if(style.outfit==='tshirt'){
  o+=opath('M99 151Q128 176 157 151L155 164Q128 185 101 164Z',pale,OINK,2.7);
  o+=opath('M64 182l23 8l-6 23l-25-7M192 182l-23 8l6 23l25-7','none',OINK,2.7);
  o+=ocircle(128,210,16,pale,'none',0);
  o+=opath('M122 213q6-12 12 0q0 6-6 6q-6 0-6-6',accent,'none');
  for(const [x,y]of[[119,205],[125,201],[132,201],[138,205]])o+=ocircle(x,y,2.5,accent,'none',0);
 }else if(style.outfit==='hoodie'){
  o+=opath('M99 150 Q79 153 86 179 L107 192 L128 173 L149 192 L170 179 Q177 153 157 150 Q128 165 99 150Z',pale);
  o+=opath('M108 182v27M148 182v27','none','#fff6e5',3.8);
  o+=ocircle(108,211,2,OINK,'none',0)+ocircle(148,211,2,OINK,'none',0);
  o+=opath('M105 220q23 9 46 0l6 20H99Z',accent,OINK,2.5);
 }else if(style.outfit==='raincoat'){
  o+=opath('M99 150L88 174L113 185L128 167L143 185L168 174L157 150Q128 164 99 150Z',pale);
  o+=opath('M128 177V247','none',OINK,2.5);
  for(const y of [190,211,232])o+=ocircle(137,y,3.2,pale);
  o+=opath('M77 207h31v21H77Z',accent,OINK,2.3);
 }else if(style.outfit==='sweater'){
  o+=opath('M101 150Q128 164 155 150L155 170Q128 185 101 170Z',pale);
  for(let x=107;x<154;x+=8)o+=opath(`M${x} 158v15`,'none',accent,2);
  for(const y of [198,220,240])o+=opath(`M${y===198?61:55} ${y}Q128 ${y+8} ${y===198?195:201} ${y}`,'none',pale,7);
 }else if(style.outfit==='overalls'){
  o+=opath('M100 149Q128 164 156 149L164 196H92Z',pale,OINK,2.8);
  o+=opath('M86 167H103L108 202H148L153 167H170L166 247H90Z',accent);
  o+=ocircle(100,203,4,'#e5bd66')+ocircle(156,203,4,'#e5bd66');
  o+=opath('M113 216h30v20q-15 10-30 0Z',accent,OINK,2.5);
 }else if(style.outfit==='bowtie'){
  o+=opath('M98 159L120 181L108 197L88 172M158 159L136 181L148 197L168 172','#fff9ec',OINK,2.7);
  o+=opath('M125 182Q106 167 103 176V193Q106 202 125 188M131 182Q150 167 153 176V193Q150 202 131 188',accent);
  o+=opath('M124 179h8v12h-8Z',pale,OINK,2.5);
  for(const y of[211,228])o+=ocircle(128,y,2.5,OINK,'none');
 }
 o+=extraOutfit(style);
 if(style.fabric!=='plain')o+=`<defs><clipPath id="${clipId}">${opath(clothClip,'white','none')}</clipPath></defs><g clip-path="url(#${clipId})">${fabricArt(style)}</g>`;
 return o;
}

export function headwearArt(t,style){const [accent,pale]=style.accent,T=Math.round(t.top),y=['beanie','beret'].includes(style.headwear)?Math.max(T+2,54):T+2;let o='';
 if(style.headwear==='bow'){
  const x=128+Math.min(t.w*.55,31);o+=opath(`M${x-3} ${y}Q${x-29} ${y-22} ${x-28} ${y-5}Q${x-33} ${y+17} ${x-3} ${y+6}M${x+3} ${y}Q${x+29} ${y-22} ${x+28} ${y-5}Q${x+33} ${y+17} ${x+3} ${y+6}`,accent);
  o+=ocircle(x,y+3,6,pale);o+=opath(`M${x-8} ${y+2}l-11-3M${x+8} ${y+2}l11-3`,'none',pale,2);
 }else if(style.headwear==='cap'){
  o+=opath(`M98 ${y+3}Q100 ${y-29} 128 ${y-29}Q154 ${y-27} 158 ${y+3}Z`,accent);
  o+=opath(`M96 ${y+3}Q127 ${y-5} 163 ${y+2}L174 ${y+9}Q140 ${y+15} 96 ${y+10}Z`,pale);
  o+=opath(`M128 ${y-25}Q137 ${y-12} 134 ${y+1}`,'none',pale,2.5);
 }else if(style.headwear==='beanie'){
  o+=opath(`M98 ${y+5}Q94 ${y-33} 128 ${y-32}Q162 ${y-33} 158 ${y+5}Z`,accent);
  o+=ocircle(128,y-36,8,pale,OINK,3);
  o+=opath(`M96 ${y-3}Q128 ${y-9} 160 ${y-3}V${y+12}Q128 ${y+7} 96 ${y+12}Z`,pale);
  for(let x=105;x<160;x+=9)o+=opath(`M${x} ${y-1}v9`,'none',accent,2);
 }else if(style.headwear==='flower'){
  const x=128+Math.min(t.w*.62,38),yy=y+7;
  o+=opath(`M${x-1} ${yy+5}q14 3 14 18q-16-1-14-18`, '#7f9e67',OINK,2.8);
  for(const [dx,dy]of[[0,-11],[10,-4],[7,9],[-7,9],[-10,-4]])o+=ocircle(x+dx,yy+dy,8,pale,OINK,2.6);
  o+=ocircle(x,yy,6,'#dda84c',OINK,2.7);
 }else if(style.headwear==='crown'){
  o+=opath(`M99 ${y+4}L94 ${y-24}L114 ${y-12}L128 ${y-32}L142 ${y-12}L162 ${y-24}L157 ${y+4}Z`,'#e6ba5c');
  o+=opath(`M101 ${y-2}H155V${y+8}H101Z`,'#f5da92',OINK,2.8);
  o+=ocircle(128,y-8,4,accent,OINK,2);
 }else if(style.headwear==='beret'){
  o+=opath(`M98 ${y+1}Q81 ${y-7} 99 ${y-23}Q128 ${y-37} 159 ${y-20}Q174 ${y-10} 155 ${y+5}Z`,accent);
  o+=opath(`M107 ${y+2}Q132 ${y+9} 153 ${y+2}`,'none',OINK,5);
  o+=opath(`M130 ${y-27}q-3-11 4-12`,'none',OINK,4);
 }
 return o+extraHat(t,style);
}
