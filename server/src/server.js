import http from "http";
import "dotenv/config";
import app from "./app.js"
import connectDB from "./database/main.db.js";
import {Server} from "socket.io";
import * as socket from "./socket.js"

const PORT = process.env.PORT || 8000 ;
const MONGO_URL = process.env.MONGO_URL;
const whitelist_urls = process.env.WHITELIST_URLS
  ? process.env.WHITELIST_URLS.replace(/[\[\]\s]/g, "").split(",")
  : [];


const server = http.createServer(app)
export const io = new Server(server,{
     cors:{
          origin: (origin, callback) => {
          if (!origin) return callback(null, true);

          if (
               whitelist_urls.length === 0 ||
               whitelist_urls.includes(origin)
          ) {
               return callback(null, true);
          }
          callback(new Error("CORS ERROR: Origin not allowed"));
     },
          credentials: true,
     }
})



const startServer = async()=>{
     await connectDB(MONGO_URL);
     socket.listen(io);
     server.listen(PORT,()=>{
          console.log(`Server Is Listening....${PORT}`)
     }) 
}

startServer();
