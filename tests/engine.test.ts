import {describe,it,expect} from "vitest";
import {answerSession,createSession,getProgress,getQuestion,getTest} from "../src/engine.js";
describe("test engine",()=>{
 it("creates a session",()=>{const t=getTest("numerical-level-1")!;const s=createSession("u1",t.id);expect(s.questionIds.length).toBeGreaterThan(0);});
 it("scores the actual answer",()=>{const s=createSession("u2","numerical-level-1");const q=getQuestion(s.questionIds[0])!;const result=answerSession(s.id,q.id,q.answer);expect(result.correct).toBe(true);});
 it("tracks progress",()=>{const p=getProgress("u2");expect(p.correct).toBeGreaterThanOrEqual(1);});
});
