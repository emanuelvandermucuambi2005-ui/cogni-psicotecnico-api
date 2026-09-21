import type {Question} from "./types.js";
export function chooseAdaptiveQuestions(bank:Question[],category:string|undefined,level:number,count:number,exclude:string[]=[]){
 const pool=bank.filter(q=>(!category||q.category===category)&&!exclude.includes(q.id));
 const target=Math.min(10,Math.max(1,level));
 return [...pool].sort((a,b)=>Math.abs(a.difficulty-target)-Math.abs(b.difficulty-target)).slice(0,count);
}