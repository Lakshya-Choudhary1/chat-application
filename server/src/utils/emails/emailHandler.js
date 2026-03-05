import { resendClient,sender } from "../resend.js"
import {createWelcomeEmailTemplate} from "./emailTemplate.js"
import fs from "fs";

const imageBuffer = fs.readFileSync("./assets/logo.app.jpeg");

export const sendWelcomeEmail = async(email,name,clientURL) =>{
     const {data,error} = await resendClient.emails.send({
          from:`${sender.name} ${sender.email}`,
          to:email,
          subject:"WELCOME TO CHATAPP",
          html : await createWelcomeEmailTemplate(name,clientURL),
          attachments:[
               {    
                    filename:"IMAGE LOGO",
                    content:imageBuffer,
                    contentId:"imagelogo"
               }
          ]
     })
     if(error) console.log(error)
     console.log(data)
}