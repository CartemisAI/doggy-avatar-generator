// Authored anatomy and deterministic variation. No model or network calls.
import { MORE_BREEDS, BREED_NAMES_ZH } from './breeds-more.mjs';
import { EXTRA_BREEDS } from './breeds-extra.mjs';
export const VERSION = 'dog-studio-3';
export const COAT_PALETTES = {
  chestnut:['#87462f','#61362b','#c48658'], 'steel-tan':['#69737d','#a3774a','#dfbf88'],
  mahogany:['#8c483b','#66372f','#cb8264'], liver:['#8b6557','#634b43','#c8a28b'],
  taupe:['#b4a395','#81756a','#e3d5bf'], biscuit:['#dbc9a9','#b39b78','#f1e6d0'],
  charcoal:['#53595b','#3c4447','#9ca7a8'], copper:['#bc8255','#8e5d3c','#e3b98a'],
  lavender:['#b3a7c3','#827490','#e3d6eb'], peach:['#e9b8a1','#c28c78','#ffdfc5'],
  mint:['#aac4b6','#789a8b','#e1f0de'], sky:['#9cbbcf','#6b8fa9','#d6e8ee'],
  black: ['#424548','#36393d','#a7a8a3'], chocolate: ['#78503d','#593b31','#a98165'],
  yellow: ['#e7c58b','#c39b62','#f5dfb7'], gold: ['#dca452','#ba7b38','#f3d19a'],
  red: ['#bd713d','#94502d','#f0d5af'], fawn: ['#cfa776','#a47a53','#f4dfbf'],
  cream: ['#eee3ca','#d1bea0','#fff9eb'], white: ['#f4f1e8','#d8d4c9','#fffdf6'],
  silver: ['#969b9d','#626c71','#e7e6dc'], blue: ['#687580','#4b5660','#c9ccd0'],
  tri: ['#f1eadb','#a66b3c','#383b3b'], sable: ['#bc8b58','#56504a','#eee0c5'],
  skin: ['#d6a8a0','#b9807b','#f4e9d9'], apricot: ['#e5bb91','#bc8d62','#f8e4c8']
};
const P=COAT_PALETTES;
const base = {family:'round', w:56, top:62, bottom:199, eyeY:120, eyeGap:28, muzzleY:158, muzzleW:32, muzzleH:27, ear:'drop', earL:72, earW:30, earY:82, earX:.84, fur:0, palettes:['fawn'], pattern:'solid', nose:12, variation:1};
const b = (id,name,group,traits,cues)=>({...base,...traits,id,name,group,cues});
export const BREEDS = [
 b('labrador','Labrador Retriever','Retrievers',{w:62,earL:78,earW:33,muzzleW:35,palettes:['black','chocolate','yellow']},'Broad skull · soft hanging ears · substantial muzzle'),
 b('golden','Golden Retriever','Retrievers',{w:60,earL:88,earW:34,fur:2,palettes:['gold','cream'],muzzleW:32},'Feathered ears · flowing cheek fur · medium muzzle'),
 b('german-shepherd','German Shepherd','Pointed ears',{family:'wedge',w:57,ear:'point',earL:62,earW:27,muzzleY:170,muzzleW:28,muzzleH:29,eyeY:124,fur:1,palettes:['sable','fawn'],pattern:'shepherd'},'Tall upright ears · tapered face · dark muzzle'),
 b('husky','Siberian Husky','Pointed ears',{family:'wedge',w:63,ear:'point',earL:44,earW:29,muzzleY:163,muzzleW:31,fur:1,palettes:['silver','black','red'],pattern:'husky'},'Compact triangular ears · cheek ruff · facial mask'),
 b('shiba','Shiba Inu','Pointed ears',{family:'wedge',w:65,ear:'point',earL:37,earW:29,muzzleY:160,muzzleW:31,fur:1,palettes:['red','sable'],pattern:'urajiro'},'Small upright ears · full cheeks · pale lower face'),
 b('corgi','Pembroke Welsh Corgi','Pointed ears',{family:'wedge',w:59,ear:'roundpoint',earL:55,earW:39,muzzleW:30,fur:1,palettes:['red','fawn','tri'],pattern:'blaze'},'Oversized rounded ears · broad forehead · tapered muzzle'),
 b('beagle','Beagle','Hounds',{w:51,bottom:202,earL:89,earW:35,eyeY:119,muzzleY:169,muzzleW:29,palettes:['tri','fawn'],pattern:'blaze'},'Rounded hanging ears · white blaze · compact muzzle'),
 b('basset','Basset Hound','Hounds',{w:53,top:64,bottom:207,earY:91,earL:126,earW:41,eyeY:128,muzzleY:171,muzzleW:38,muzzleH:31,palettes:['tri','fawn'],pattern:'blaze',droop:1},'Very long low-set ears · heavy lips · drooping eyelids'),
 b('dachshund','Dachshund','Hounds',{family:'long',w:43,top:61,bottom:207,eyeY:120,muzzleY:180,muzzleW:25,muzzleH:25,earL:102,earW:32,palettes:['red','black','chocolate'],pattern:'points'},'Long narrow muzzle · rounded drop ears · slim head'),
 b('greyhound','Greyhound','Long faces',{family:'long',w:39,top:56,bottom:215,eyeY:117,eyeGap:21,muzzleY:186,muzzleW:20,muzzleH:25,ear:'rose',earL:32,earW:24,palettes:['blue','fawn','black'],pattern:'optional-blaze',nose:10},'Long fine muzzle · small folded ears · narrow skull'),
 b('great-dane','Great Dane','Long faces',{family:'square',w:53,top:51,bottom:216,eyeY:118,eyeGap:27,muzzleY:177,muzzleW:35,muzzleH:32,ear:'button',earL:64,earW:31,palettes:['fawn','blue','black'],pattern:'mask',droop:.5},'Rectangular head · long deep muzzle · natural folded ears'),
 b('boxer','Boxer','Broad faces',{family:'square',w:61,top:64,bottom:204,eyeY:119,muzzleY:157,muzzleW:40,muzzleH:32,ear:'button',earL:55,earW:31,palettes:['fawn','red'],pattern:'boxer',nose:15,droop:.4},'Broad short muzzle · dark mask · folded ears'),
 b('french-bulldog','French Bulldog','Short faces',{family:'square',w:59,top:74,bottom:200,eyeY:129,muzzleY:161,muzzleW:35,muzzleH:25,ear:'bat',earL:52,earW:31,earY:88,palettes:['cream','fawn','black'],pattern:'optional-blaze',nose:14,wrinkles:1},'Rounded bat ears · short square face · compact muzzle'),
 b('bulldog','Bulldog','Short faces',{family:'jowl',w:71,top:71,bottom:205,eyeY:126,eyeGap:35,muzzleY:156,muzzleW:43,muzzleH:31,ear:'rose',earL:36,earW:29,palettes:['fawn','red','white'],pattern:'patch',nose:16,wrinkles:2,droop:1},'Wide skull · loose cheeks · rose ears · forehead folds'),
 b('pug','Pug','Short faces',{family:'round',w:59,top:66,bottom:195,eyeY:123,eyeGap:32,muzzleY:155,muzzleW:31,muzzleH:24,ear:'button',earL:45,earW:25,palettes:['fawn','black'],pattern:'mask',nose:13,wrinkles:2},'Rounded head · small folded ears · short dark muzzle'),
 b('chihuahua','Chihuahua','Toy faces',{family:'apple',w:47,top:77,bottom:194,eyeY:132,eyeGap:26,muzzleY:166,muzzleW:23,muzzleH:20,ear:'point',earL:65,earW:44,earY:98,palettes:['fawn','cream','chocolate','black'],pattern:'optional-blaze',nose:10},'Domed skull · very large ears · small pointed muzzle'),
 b('bull-terrier','Bull Terrier','Distinctive heads',{family:'egg',w:48,top:45,bottom:209,eyeY:118,eyeGap:26,muzzleY:178,muzzleW:28,muzzleH:25,ear:'point',earL:43,earW:20,earY:70,palettes:['white','fawn'],pattern:'eye-patch',nose:14},'Continuous egg-shaped face · triangular eyes · small erect ears'),
 b('schnauzer','Miniature Schnauzer','Furnished coats',{family:'square',w:48,top:64,bottom:197,eyeY:122,eyeGap:25,muzzleY:162,muzzleW:31,muzzleH:26,ear:'button',earL:48,earW:28,fur:3,palettes:['silver','black'],pattern:'furnishings'},'Rectangular face · strong eyebrows · parted beard'),
 b('poodle','Poodle','Curly coats',{family:'curly',w:50,top:62,bottom:194,eyeY:123,eyeGap:25,muzzleY:164,muzzleW:25,muzzleH:25,earL:104,earW:32,fur:4,palettes:['apricot','white','black','chocolate']},'Curly topknot · long coated ears · fine muzzle'),
 b('bichon','Bichon Frise','Curly coats',{family:'cloud',w:67,top:58,bottom:205,eyeY:123,eyeGap:27,muzzleY:161,muzzleW:27,muzzleH:23,earL:60,earW:35,fur:4,palettes:['white'],nose:11},'Round cloudlike coat · dark eyes · small muzzle'),
 b('shih-tzu','Shih Tzu','Long coats',{family:'silky',w:64,top:63,bottom:205,eyeY:124,eyeGap:28,muzzleY:151,muzzleW:28,muzzleH:21,earL:113,earW:35,fur:5,palettes:['tri','fawn','silver'],pattern:'blaze',nose:11},'Wide face · very short muzzle · long parted facial hair'),
 b('afghan','Afghan Hound','Long coats',{family:'long',w:42,top:53,bottom:212,eyeY:113,eyeGap:22,muzzleY:183,muzzleW:23,muzzleH:26,earL:153,earW:40,earY:64,fur:6,palettes:['gold','cream','black'],pattern:'mask'},'Long refined face · silky hanging ear curtains · topknot'),
 b('komondor','Komondor','Distinctive coats',{family:'corded',w:64,top:60,bottom:209,eyeY:125,eyeGap:26,muzzleY:164,muzzleW:31,muzzleH:25,earL:109,earW:32,fur:7,palettes:['white'],nose:13},'Long separate cords · broad head · partly veiled eyes'),
 b('chinese-crested','Chinese Crested','Distinctive coats',{family:'long',w:43,top:76,bottom:204,eyeY:128,eyeGap:25,muzzleY:173,muzzleW:24,muzzleH:24,ear:'point',earL:62,earW:37,earY:95,fur:8,palettes:['skin'],pattern:'skin',nose:10},'Fine hairless face · large ears · flowing crest')
];

for(const [id,name,parent,overrides,cues] of [...EXTRA_BREEDS,...MORE_BREEDS]){
 const source=BREEDS.find(b=>b.id===parent);if(!source)throw new Error('Missing parent '+parent);
 BREEDS.push({...source,...overrides,id,name,cues});
}

for(const breed of BREEDS)breed.nameZh=BREED_NAMES_ZH[breed.id]??breed.name;

// FNV-1a over UTF-8 then an explicit 32-bit generator; all arithmetic is specified.
export function random(seed) {
 let a=2166136261;
 for(const v of new TextEncoder().encode(seed)) a=Math.imul(a^v,16777619)>>>0;
 return ()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
export function traits(breed,seed) {
 const r=random(`${VERSION}/${breed.id}/${seed}/anatomy`), c=random(`${VERSION}/${breed.id}/${seed}/coat`);
 const u=()=>r()*2-1;
 const skull=u(), length=u(), ear=u(), snout=u(), spacing=u(), tilt=u(), fullness=u();
 const palette=breed.palettes[Math.floor(c()*breed.palettes.length)];
 const coat=P[palette];
 const t={...breed,seed:String(seed),palette,coat,skull,length,earValue:ear,snout,spacing,tilt,fullness,
  w:breed.w*(1+skull*.13), top:breed.top-length*5, bottom:breed.bottom+length*6,
  eyeY:breed.eyeY+length*3,eyeGap:breed.eyeGap*(1+spacing*.16+skull*.06),
  muzzleY:breed.muzzleY+length*6,muzzleW:breed.muzzleW*(1+snout*.17+skull*.04),muzzleH:breed.muzzleH*(1+length*.09),
  earL:breed.earL*(1+ear*.14),earW:breed.earW*(1+fullness*.12),earTilt:tilt*9,
  eyeSize:5.3+r()*1.7, nose:breed.nose*(.9+r()*.2),
  blaze:9+c()*23,offset:(c()-.5)*18,patchSide:c()<.5?-1:1,patchSize:.75+c()*.5,
  whiteMuzzle:c()<.64,asymmetry:(r()-.5)*9,furScale:.8+r()*.4,
  patternSeed:Math.floor(c()*0xffffffff),eyeTone:(breed.id==='husky'||breed.lightEyes)&&c()<.65?'#6494a0':'#5d4838'};
 return t;
}

// A weighted complete distance graph: only structural / marking traits affect selection.
// The greedy farthest-point traversal is deterministic, and is a sampling heuristic,
// not a claim about human perception. Color and background contribute zero distance.
const TRAIT_WEIGHTS=[['skull',1.5],['length',1.5],['earValue',1.4],['snout',1.2],['spacing',.5],['tilt',.65],['fullness',.45]];
export function traitDistance(a,b) {
 let d=TRAIT_WEIGHTS.reduce((s,[k,w])=>s+w*(a[k]-b[k])**2,0);
 const blazeActive=t=>['blaze','boxer'].includes(t.pattern)||(t.pattern==='optional-blaze'&&t.whiteMuzzle);
 if(blazeActive(a)&&blazeActive(b))d+=.8*((a.blaze-b.blaze)/14)**2+.5*((a.offset-b.offset)/9)**2;
 if(blazeActive(a)!==blazeActive(b))d+=1;
 if(a.pattern==='husky')d+=.7*((a.blaze-b.blaze)/14)**2;
 if(['patch','eye-patch'].includes(a.pattern))d+=.9*(a.patchSide!==b.patchSide)+.5*((a.patchSize-b.patchSize)/.25)**2;
 return d;
}
export function sampleBreed(breed,count=16,candidates=256) {
 if(!Number.isInteger(count)||count<1||count>candidates)throw new RangeError('Sample count must fit candidate pool');
 const pool=Array.from({length:candidates},(_,i)=>traits(breed,`candidate-${i.toString().padStart(3,'0')}`));
 const chosen=[0],selected=new Uint8Array(candidates),nearest=pool.map(p=>traitDistance(p,pool[0]));selected[0]=1;
 while(chosen.length<count){let next=-1,best=-1;for(let i=0;i<pool.length;i++)if(!selected[i]&&nearest[i]>best){next=i;best=nearest[i];}chosen.push(next);selected[next]=1;for(let i=0;i<pool.length;i++)nearest[i]=Math.min(nearest[i],traitDistance(pool[i],pool[next]));}
 return chosen.map((i,n)=>({...pool[i],sample:n+1,candidateIndex:i}));
}

export function overviewSample(breed,samples){
 const preferred={labrador:'yellow',golden:'gold','german-shepherd':'sable',husky:'silver',shiba:'red',corgi:'red',beagle:'tri',basset:'tri',dachshund:'red',greyhound:'blue','great-dane':'fawn',boxer:'fawn','french-bulldog':'cream',bulldog:'fawn',pug:'fawn',chihuahua:'fawn','bull-terrier':'white',schnauzer:'silver',poodle:'apricot',bichon:'white','shih-tzu':'fawn',afghan:'gold',komondor:'white','chinese-crested':'skin'};
 return samples.filter(t=>t.id===breed.id).map(t=>({t,score:Math.abs(t.skull)+Math.abs(t.length)+Math.abs(t.snout)+Math.abs(t.tilt)+(t.palette===(preferred[breed.id]??breed.palettes[0])?0:8)})).sort((a,b)=>a.score-b.score)[0].t;
}
