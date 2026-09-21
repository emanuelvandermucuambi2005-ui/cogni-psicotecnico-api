import {randomUUID} from "node:crypto";
export interface CloudSnapshot{userId:string;xp:number;answered:number;correct:number;testsCompleted:number;streak:number;updatedAt:string;}
const snapshots=new Map<string,CloudSnapshot>();
export function saveSnapshot(userId:string,data:Omit<CloudSnapshot,"userId"|"updatedAt">){const snapshot={...data,userId,updatedAt:new Date().toISOString()};snapshots.set(userId,snapshot);return snapshot;}
export function getSnapshot(userId:string){return snapshots.get(userId);}
export function mergeSnapshot(userId:string,local:Omit<CloudSnapshot,"userId"|"updatedAt">){
 const remote=snapshots.get(userId);
 if(!remote)return saveSnapshot(userId,local);
 const merged={userId,xp:Math.max(remote.xp,local.xp),answered:Math.max(remote.answered,local.answered),correct:Math.max(remote.correct,local.correct),testsCompleted:Math.max(remote.testsCompleted,local.testsCompleted),streak:Math.max(remote.streak,local.streak)};
 return saveSnapshot(userId,merged);
}
