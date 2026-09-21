import type {CategoryId,Question,TestDefinition} from "./types.js";

export const categories:{id:CategoryId,name:string,description:string}[]=[
 {id:"numerical",name:"Raciocínio Numérico",description:"Cálculos, proporções, percentagens e relações numéricas."},
 {id:"verbal",name:"Raciocínio Verbal",description:"Compreensão, analogias, vocabulário e relações entre palavras."},
 {id:"abstract",name:"Raciocínio Abstrato",description:"Padrões, relações e transformação de símbolos."},
 {id:"logic",name:"Lógica",description:"Dedução, regras, problemas e pensamento estruturado."},
 {id:"attention",name:"Atenção",description:"Atenção seletiva, comparação e identificação rápida."},
 {id:"spatial",name:"Orientação Espacial",description:"Direções, rotações e relações espaciais."},
 {id:"memory",name:"Memória",description:"Memorização e recuperação de informação."},
 {id:"speed",name:"Velocidade de Processamento",description:"Precisão sob pressão de tempo."},
 {id:"sequences",name:"Sequências",description:"Progressões numéricas, letras e padrões."},
 {id:"mixed",name:"Desafio Misto",description:"Combinação de várias competências."}
];

const q=(id:string,category:CategoryId,level:number,prompt:string,options:string[],answer:string,explanation:string,tags:string[]=[]):Question=>({
 id,category,level,difficulty:Math.min(10,Math.max(1,level)) as any,type:"multiple_choice",
 prompt,options,answer,explanation,timeLimitSec:level<=3?35:25,xp:10+level*5,tags
});

const questions:Question[]=[];
for(let level=1;level<=10;level++){
 const n=level*3+2;
 questions.push(
  q(`num-${level}`, "numerical", level, `Se ${n} aumenta 2 unidades, qual é o resultado?`, [String(n+1),String(n+2),String(n+3),String(n+4)], String(n+2), `Somamos 2 a ${n}: ${n+2}.`,["cálculo"]),
  q(`seq-${level}`, "sequences", level, `Qual é o próximo número: ${level}, ${level+2}, ${level+4}, ?`, [String(level+5),String(level+6),String(level+7),String(level+8)], String(level+6), "A sequência aumenta sempre 2 unidades.",["sequência"]),
  q(`logic-${level}`, "logic", level, `Todos os técnicos estudam. Ana é técnica. O que podemos concluir?`, ["Ana estuda","Ana não estuda","Todos estudam técnica","Nada"], "Ana estuda", "Se todos os técnicos estudam e Ana é técnica, Ana pertence ao grupo que estuda.",["dedução"]),
  q(`verbal-${level}`, "verbal", level, "Qual palavra tem significado mais próximo de 'rápido'?", ["lento","veloz","fraco","distante"], "veloz", "Veloz é sinónimo de rápido.",["vocabulário"]),
  q(`abstract-${level}`, "abstract", level, `Complete o padrão: A, B, A, B, ?`, ["A","B","C","D"], "A", "O padrão alterna A e B.",["padrões"]),
  q(`attention-${level}`, "attention", level, `Qual opção é exatamente igual a 7K4M9P?`, ["7K4M9P","7K4N9P","7K4M9B","7K9M4P"], "7K4M9P", "A comparação deve ser feita carácter por carácter.",["atenção"]),
  q(`spatial-${level}`, "spatial", level, "Se estás virado para Norte e giras 90° para a direita, para onde ficas virado?", ["Sul","Este","Oeste","Norte"], "Este", "Uma rotação de 90° para a direita a partir do Norte aponta para Este.",["direção"]),
  q(`memory-${level}`, "memory", level, `Memoriza: SOL, AZUL, 4, CÃO. Qual era o número?`, ["2","3","4","5"], "4", "O número apresentado na sequência era 4.",["memória"]),
  q(`speed-${level}`, "speed", level, `Qual símbolo é diferente? ★ ★ ★ ☆ ★`, ["1º","2º","3º","4º"], "4º", "O quarto símbolo é o único diferente.",["velocidade"])
 );
}
export const questionBank=questions;

export const tests:TestDefinition[]=[];
for(const category of categories.filter(c=>c.id!=="mixed")){
 for(let level=1;level<=10;level++){
  const qs=questions.filter(q=>q.category===category.id && q.level===level).map(q=>q.id);
  tests.push({id:`${category.id}-level-${level}`,title:`${category.name} • Nível ${level}`,category:category.id,level,durationSec:qs.length*30,questionCount:qs.length,questionIds:qs,mode:"practice"});
 }
}
for(let level=1;level<=10;level++){
 const qs=questions.filter(q=>q.level===level).map(q=>q.id);
 tests.push({id:`mixed-level-${level}`,title:`Desafio Misto • Nível ${level}`,category:"mixed",level,durationSec:qs.length*25,questionCount:qs.length,questionIds:qs,mode:"mixed" as any});
}