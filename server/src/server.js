import http from "http";
import https from "https";



import app from "./app.js"
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000 ;
const server = http.createServer(app);

server.listen(PORT,()=>{
     console.log(`Server Is Listening....`)
})