export const achievements=[
{id:"first-test",title:"Primeiro Passo",description:"Conclua o primeiro teste.",xp:50},
{id:"perfect",title:"Precisão",description:"Conclua um teste sem erros.",xp:100},
{id:"streak-5",title:"Em Ritmo",description:"Faça 5 acertos seguidos.",xp:75},
{id:"streak-10",title:"Foco Total",description:"Faça 10 acertos seguidos.",xp:150},
{id:"xp-1000",title:"Persistente",description:"Alcance 1000 XP.",xp:200},
{id:"level-10",title:"Mestre",description:"Chegue ao nível 10.",xp:500}
];
export function levelFromXp(xp:number){return Math.min(10,Math.max(1,Math.floor(xp/500)+1));}
export function xpToNextLevel(xp:number){const level=levelFromXp(xp);return level>=10?0:level*500-xp;}
export function evaluateAchievements(stats:{testsCompleted:number;correct:number;answered:number;xp:number;bestStreak:number}){
 const accuracy=stats.answered?stats.correct/stats.answered:0;
 return achievements.filter(a=>a.id==="first-test"&&stats.testsCompleted>=1||a.id==="perfect"&&stats.testsCompleted>=1&&accuracy===1||a.id==="streak-5"&&stats.bestStreak>=5||a.id==="streak-10"&&stats.bestStreak>=10||a.id==="xp-1000"&&stats.xp>=1000||a.id==="level-10"&&levelFromXp(stats.xp)>=10);
}