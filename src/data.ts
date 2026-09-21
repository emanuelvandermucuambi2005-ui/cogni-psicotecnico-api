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

// Banco adicional parametrizado: amplia a variedade sem depender de perguntas duplicadas.
for(let level=1;level<=10;level++){
 const a=level*4+6;
 questions.push(
  q(`num-pct-${level}`,"numerical",level,`Um valor de ${a} aumenta 25%. Qual é o novo valor?`,[String(a+1),String(a+a/4),String(a+5),String(a*2)],String(a+a/4),`25% de ${a} é ${a/4}; somando ao valor original obtemos ${a+a/4}.`,["percentagem"]),
  q(`num-ratio-${level}`,"numerical",level,`Se 2 cadernos custam ${a} Kz, quanto custam 6 ao mesmo preço unitário?`,[String(a*2),String(a*3),String(a*4),String(a+6)],String(a*3),`Se 2 custam ${a}, 6 representam três vezes 2, logo custam ${a*3}.`,["proporção"]),
  q(`seq-mult-${level}`,"sequences",level,`Qual é o próximo termo: ${level+1}, ${(level+1)*2}, ${(level+1)*4}, ?`,[String((level+1)*5),String((level+1)*6),String((level+1)*8),String((level+1)*10)],String((level+1)*8),"Cada termo é o dobro do anterior.",["multiplicação"]),
  q(`seq-letter-${level}`,"sequences",level,`Qual letra vem a seguir: A, C, E, G, ?`,["H","I","J","K"],"I","Avançamos uma letra de cada vez, saltando uma posição do alfabeto.",["letras"]),
  q(`logic-order-${level}`,"logic",level,`João é mais alto que Rui. Rui é mais alto que Paulo. Quem é o mais baixo?`,["João","Rui","Paulo","Não é possível saber"],"Paulo","Se João > Rui e Rui > Paulo, então Paulo é o mais baixo.",["ordenação"]),
  q(`logic-rule-${level}`,"logic",level,`Todos os A são B. Nenhum B é C. O que é necessariamente verdadeiro?`,["Nenhum A é C","Todos C são A","Alguns A são C","A e C são iguais"],"Nenhum A é C","Se A está contido em B e B não pode ser C, A também não pode ser C.",["dedução"]),
  q(`verbal-ant-${level}`,"verbal",level,"Escolha a relação equivalente: MÉDICO está para HOSPITAL assim como PROFESSOR está para…",["mercado","escola","avião","oficina"],"escola","O local de trabalho associado ao professor é a escola.",["analogia"]),
  q(`verbal-odd-${level}`,"verbal",level,"Qual palavra não pertence ao grupo?",["maçã","banana","laranja","cadeira"],"cadeira","As três primeiras são frutas; cadeira é um objeto.",["classificação"]),
  q(`abstract-grid-${level}`,"abstract",level,"Qual símbolo completa: ○, ●, ○, ●, ?",["○","●","□","△"],"○","O padrão alterna círculo vazio e círculo preenchido.",["padrões"]),
  q(`abstract-step-${level}`,"abstract",level,"Se a regra é △ → ○ → □ → △, qual vem depois de ○?",["△","○","□","◇"],"□","A sequência cíclica coloca □ depois de ○.",["transformação"]),
  q(`attention-code-${level}`,"attention",level,`Qual código é diferente de 8B2Q7R?`,["8B2Q7R","8B2Q7R","8B2O7R","8B2Q7R"],"8B2O7R","A terceira opção troca Q por O.",["comparação"]),
  q(`attention-count-${level}`,"attention",level,"Quantos números aparecem em A7B3C9D?",["2","3","4","5"],"3","Os algarismos são 7, 3 e 9.",["contagem"]),
  q(`spatial-turn-${level}`,"spatial",level,"Estás virado para Este e giras 180°. Para onde ficas virado?",["Norte","Sul","Oeste","Este"],"Oeste","Uma rotação de 180° transforma Este em Oeste.",["rotação"]),
  q(`spatial-route-${level}`,"spatial",level,"Avanças para Norte e depois para Este. Em relação ao ponto inicial, estás em que direção?",["Noroeste","Nordeste","Sudoeste","Sudeste"],"Nordeste","Norte + Este corresponde a Nordeste.",["orientação"]),
  q(`memory-pair-${level}`,"memory",level,"Memoriza: 8, AZUL, 3, CASA. Qual palavra apareceu?",["MAR","AZUL","VERDE","SOL"],"AZUL","A sequência continha a palavra AZUL.",["memorização"]),
  q(`memory-order-${level}`,"memory",level,"Memoriza: CÃO, 7, LUA, 2. Qual elemento estava imediatamente antes de LUA?",["CÃO","7","2","Nenhum"],"7","Na sequência, 7 aparece imediatamente antes de LUA.",["ordem"]),
  q(`speed-match-${level}`,"speed",level,"Qual par é exatamente igual a AB7K9?",["AB7K9","AB7K8","AB7X9","A87K9"],"AB7K9","A primeira opção coincide carácter por carácter.",["comparação"]),
  q(`speed-odd-${level}`,"speed",level,"Qual item é diferente? 4-8-12-16-19",["4","8","12","19"],"19","Todos os anteriores seguem múltiplos de 4; 19 é a exceção.",["identificação"])
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