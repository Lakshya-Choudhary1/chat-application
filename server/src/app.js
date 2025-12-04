import express from "express";

const app = express();

app.get('/',(req,res)=>{
     return res.send('successfull')
})

export default app;