import http from "http";
import https from "https";
import "dotenv/config";
import app from "./app.js"
import connectDB from "./database/main.db.js";
import fs from "fs";
import path,{dirname} from "path";
import {fileURLToPath} from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));


const PORT = process.env.PORT || 8000 ;
const MONGO_URL = process.env.MONGO_URL;

const sslOptions = {
     cert : fs.readFileSync(path.join(_dirname,"..","cert.pem")),
     key : fs.readFileSync(path.join(_dirname,"..","key.pem"))
}

let server ;

if(process.env.NODE_ENV === 'production'){
     server = https.createServer(sslOptions,app);
}else{
     server = http.createServer(app);
}

const startServer = async()=>{
     await connectDB(MONGO_URL);
     server.listen(PORT,()=>{
          console.log(`Server Is Listening....${PORT}`)
     })    
     
}

startServer();
