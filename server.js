const http=require("http");
const next=require("next");
const port=parseInt(process.env.PORT||"3000",10);
const hostname=process.env.HOSTNAME||"127.0.0.1";
const app=next({dev:false,hostname,port});
const handle=app.getRequestHandler();
app.prepare().then(()=>http.createServer((req,res)=>handle(req,res)).listen(port,hostname,()=>console.log(`App listening on ${hostname}:${port}`))).catch(e=>{console.error(e);process.exit(1)});
