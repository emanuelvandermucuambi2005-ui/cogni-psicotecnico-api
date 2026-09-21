import {buildApp} from "./app.js";
const app=buildApp();
const port=Number(process.env.PORT??3000);
const host=process.env.HOST??"0.0.0.0";
app.listen({port,host}).then(()=>console.log("Cogni API running on "+host+":"+port)).catch(err=>{console.error(err);process.exit(1);});
