import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
import cors from "@fastify/cors";
import {categories,tests} from "./data.js";
import {allQuestions,answerSession,createSession,getProgress,getQuestion,getSession,getTest,listSessions,soundEvents} from "./engine.js";

export function buildApp(){
 const app=Fastify({logger:true});
 app.register(cors,{origin:true});
 app.get("/api/v1/health",async()=>({status:"ok",service:"cogni-psicotecnico-api",version:"1.0.0"}));

 app.get("/api/v1/sync/progress/:userId",async(req,res)=>{const snapshot=getSnapshot((req.params as any).userId);if(!snapshot)return res.code(404).send({error:"NO_SYNC_DATA"});return snapshot;});
 app.post("/api/v1/sync/progress/:userId",async(req)=>{const b=req.body as any;return mergeSnapshot((req.params as any).userId,{xp:Number(b.xp)||0,answered:Number(b.answered)||0,correct:Number(b.correct)||0,testsCompleted:Number(b.testsCompleted)||0,streak:Number(b.streak)||0});});
 app.get("/api/v1/categories",async()=>categories);
 app.get("/api/v1/levels",async()=>Array.from({length:10},(_,i)=>({level:i+1,xpRequired:i*500,title:i<2?"Iniciante":i<5?"Treinando":i<8?"Avançado":"Mestre"})));
 app.get("/api/v1/tests",async(req)=>{const q=req.query as {category?:string,level?:string}; return tests.filter(t=>(!q.category||t.category===q.category)&&(!q.level||t.level===Number(q.level)));});
 app.get("/api/v1/tests/:id",async(req,res)=>{const t=getTest((req.params as any).id);if(!t)return res.code(404).send({error:"TEST_NOT_FOUND"});return t;});
 app.get("/api/v1/tests/:id/questions",async(req,res)=>{const t=getTest((req.params as any).id);if(!t)return res.code(404).send({error:"TEST_NOT_FOUND"});return t.questionIds.map(getQuestion).filter(Boolean).map(({answer,...safe}:any)=>safe);});
 app.get("/api/v1/questions/:id",async(req,res)=>{const q=getQuestion((req.params as any).id);if(!q)return res.code(404).send({error:"QUESTION_NOT_FOUND"});const {answer,...safe}=q;return safe;});
 app.post("/api/v1/sessions",async(req,res)=>{try{const body=req.body as any;const s=createSession(body.userId??"guest",body.testId);return res.code(201).send(s);}catch(e:any){return res.code(400).send({error:e.message});}});
 app.post("/api/v1/sessions/:id/answers",async(req,res)=>{try{const b=req.body as any;return answerSession((req.params as any).id,b.questionId,b.answer);}catch(e:any){return res.code(400).send({error:e.message});}});
 app.get("/api/v1/sessions/:id",async(req,res)=>{const s=getSession((req.params as any).id);if(!s)return res.code(404).send({error:"SESSION_NOT_FOUND"});return s;});
 app.get("/api/v1/progress/:userId",async(req)=>getProgress((req.params as any).userId));
 app.get("/api/v1/users/:userId/sessions",async(req)=>listSessions((req.params as any).userId));
 app.get("/api/v1/sound-events",async()=>soundEvents);
 app.get("/api/v1/stats",async()=>({questions:allQuestions().length,tests:tests.length,categories:categories.length,levels:10}));
 return app;
}