import {questionBank,tests} from "./data.js";
import type {Question,Session} from "./types.js";

const sessions=new Map<string,Session>();

export function getQuestion(id:string){return questionBank.find(q=>q.id===id);}
export function getTest(id:string){return tests.find(t=>t.id===id);}

export function createSession(userId:string,testId:string){
 const test=getTest(testId); if(!test) throw new Error("TEST_NOT_FOUND");
 const id=`sess_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
 const s:Session={id,userId,testId,startedAt:new Date().toISOString(),questionIds:[...test.questionIds],currentIndex:0,score:0,xp:0,correct:0,answered:0,streak:0,bestStreak:0,finished:false};
 sessions.set(id,s); return s;
}

export function answerSession(sessionId:string,questionId:string,answer:string){
 const s=sessions.get(sessionId); if(!s) throw new Error("SESSION_NOT_FOUND");
 if(s.finished) throw new Error("SESSION_FINISHED");
 const expectedId=s.questionIds[s.currentIndex];
 if(expectedId!==questionId) throw new Error("QUESTION_OUT_OF_ORDER");
 const q=getQuestion(questionId); if(!q) throw new Error("QUESTION_NOT_FOUND");
 const correct=q.answer===answer;
 s.answered++;
 if(correct){
   s.correct++; s.streak++; s.bestStreak=Math.max(s.bestStreak,s.streak);
   s.score+=100+s.streak*10; s.xp+=q.xp;
 } else { s.streak=0; }
 s.currentIndex=Math.min(s.currentIndex+1,s.questionIds.length);
 if(s.currentIndex>=s.questionIds.length)s.finished=true;
 return {correct,correctAnswer:q.answer,explanation:q.explanation,score:s.score,xp:s.xp,streak:s.streak,bestStreak:s.bestStreak,finished:s.finished};
}
export function getSession(id:string){return sessions.get(id);}
export function listSessions(userId:string){return [...sessions.values()].filter(s=>s.userId===userId);}
export function getProgress(userId:string){
 const ss=listSessions(userId);
 const answered=ss.reduce((a,s)=>a+s.answered,0);
 const correct=ss.reduce((a,s)=>a+s.correct,0);
 const xp=ss.reduce((a,s)=>a+s.xp,0);
 const bestStreak=Math.max(0,...ss.map(s=>s.bestStreak));
 return {userId,xp,answered,correct,accuracy:answered?Math.round(correct/answered*100):0,testsCompleted:ss.filter(s=>s.finished).length,level:Math.max(1,Math.floor(xp/500)+1),streak:Math.max(0,...ss.map(s=>s.streak)),bestStreak};
}
export const soundEvents={correct:"correct",incorrect:"incorrect",levelUp:"level_up",streak:"streak",complete:"complete",achievement:"achievement"};
export function allQuestions():Question[]{return questionBank;}