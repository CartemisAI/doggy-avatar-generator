import { BREEDS, VERSION, sampleBreed } from './model.mjs';
import { EXPRESSIONS, personalStyle } from './style.mjs';
export const DOGS_PER_BREED=32;
export const LOOKS_PER_DOG=20;
export const COLLECTION_COUNT=BREEDS.length*DOGS_PER_BREED*LOOKS_PER_DOG;
const poolCache=new Map();
export function breedPool(id){
 if(!poolCache.has(id)){
  const breed=BREEDS.find(b=>b.id===id);if(!breed)throw new RangeError('Unknown breed');
  poolCache.set(id,sampleBreed(breed,DOGS_PER_BREED,256));
 }
 return poolCache.get(id);
}
export function collectionEntry(index){
 if(!Number.isInteger(index)||index<0||index>=COLLECTION_COUNT)throw new RangeError('Portrait index out of range');
 const breed=BREEDS[Math.floor(index/(DOGS_PER_BREED*LOOKS_PER_DOG))],within=index%(DOGS_PER_BREED*LOOKS_PER_DOG),individual=Math.floor(within/LOOKS_PER_DOG),look=within%LOOKS_PER_DOG;
 const dog=breedPool(breed.id)[individual],style=personalStyle({...dog,seed:`${dog.seed}/look-${look}`});
 style.expression=EXPRESSIONS[look];
 return {id:`dog-${String(index+1).padStart(5,'0')}`,index,version:VERSION,dog,style,look:look+1,individual:individual+1};
}
export function entryOptions(entry,overrides={}){
 return {...entry.style,dressed:true,...Object.fromEntries(Object.entries(overrides).filter(([,v])=>v!==undefined&&v!=='seeded'))};
}
