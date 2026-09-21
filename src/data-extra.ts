import {questionBank} from "./data.js";
const templates=[
["A sequência 2, 4, 8, 16, ?","24","32","30","20","32"],
["Se 3 máquinas produzem 30 peças, mantendo o ritmo, 6 máquinas produzem?","45","60","90","120","60"],
["Qual não pertence ao grupo: triângulo, quadrado, círculo, azul?","triângulo","quadrado","círculo","azul","azul"],
["Se hoje é terça-feira, que dia será daqui a 10 dias?","quinta","sexta","sábado","domingo","sexta"],
["Complete: C, F, I, L, ?","M","N","O","P","O"]
] as const;
let added=0;
for(let level=1;level<=10;level++) for(let i=0;i<templates.length;i++){
 const [prompt,a,b,c,d,answer]=templates[i];
 questionBank.push({id:`extra-${level}-${i+1}`,category:["numerical","sequences","abstract","logic","verbal"][i] as any,level,difficulty:Math.min(10,level) as any,type:"multiple_choice",prompt,options:[a,b,c,d],answer,explanation:"A resposta resulta da regra apresentada no enunciado.",timeLimitSec:Math.max(15,35-level),xp:15+level*5,tags:["extra","treino"]});
 added++;
}
export const extraQuestionsAdded=added;