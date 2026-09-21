const API_BASE="";
const storageKey="cogni_pwa_session";
export async function registerPwa(){if("serviceWorker" in navigator){try{await navigator.serviceWorker.register("/sw.js",{scope:"/"});}catch(e){console.warn("PWA service worker:",e);}}}
export function saveSession(session){localStorage.setItem(storageKey,JSON.stringify(session));}
export function loadSession(){try{return JSON.parse(localStorage.getItem(storageKey)||"null");}catch{return null;}}
export async function syncProgress(userId,progress){
 const response=await fetch(API_BASE+"/api/v1/sync/progress/"+encodeURIComponent(userId),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(progress)});
 if(!response.ok)throw new Error("SYNC_FAILED"); return response.json();
}
