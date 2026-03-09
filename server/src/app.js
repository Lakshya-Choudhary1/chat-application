import express, { json, urlencoded } from "express";
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import path from 'path'
import url from 'url'
import mainRouter from "./routes/main.route.js";
const _filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const app = express();
const whitelist_urls = process.env.WHITELIST_URLS
  ? process.env.WHITELIST_URLS.replace(/[\[\]\s]/g, "").split(",")
  : [];

// routes
// helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//       styleSrc: ["'self'", "'unsafe-inline'"],
//     },
//   },
// })
app.use(
  cors({
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
  })
);
app.use(urlencoded({limit:"10mb",extended:true}));
app.use(json({limit:"10mb"}));
app.use(cookieParser());
app.use('/api',mainRouter);


app.get("/test",(req,res)=>{
  return res.status(200).json({test:"successfull"})
})


app.use(express.static(path.join(__dirname , "../", "public")));
app.get("/",(req,res)=>{
     res.sendFile(path.join(__dirname,"../", "public", "index.html"));
})




  
 


export default app;