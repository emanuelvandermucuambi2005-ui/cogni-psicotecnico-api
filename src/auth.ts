import {randomUUID} from "node:crypto";
export interface User{ id:string; email:string; name:string; passwordHash:string; createdAt:string; }
const users=new Map<string,User>();
const tokens=new Map<string,string>();
const hash=(value:string)=>Buffer.from(value).toString("base64");
export function register(email:string,name:string,password:string){
 const normalized=email.trim().toLowerCase(); if(!normalized||!name.trim()||password.length<6) throw new Error("INVALID_REGISTRATION");
 if([...users.values()].some(u=>u.email===normalized)) throw new Error("EMAIL_ALREADY_EXISTS");
 const user={id:"usr_"+randomUUID(),email:normalized,name:name.trim(),passwordHash:hash(password),createdAt:new Date().toISOString()}; users.set(user.id,user); return publicUser(user);
}
export function login(email:string,password:string){const user=[...users.values()].find(u=>u.email===email.trim().toLowerCase()&&u.passwordHash===hash(password));if(!user)throw new Error("INVALID_CREDENTIALS");const token=randomUUID();tokens.set(token,user.id);return {token,user:publicUser(user)};}
export function getUserByToken(token:string){const id=tokens.get(token);return id?publicUser(users.get(id)!):undefined;}
const publicUser=(u:User)=>({id:u.id,email:u.email,name:u.name,createdAt:u.createdAt});
