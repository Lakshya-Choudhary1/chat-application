import mongoose from 'mongoose'

mongoose.connection.once('open',()=>{
     console.log('Mongoose connection established....')
})

mongoose.connection.once('error',()=>{
     console.log('Mongoose Error....')
})

const connectDB = async(string)=>{
     try{
          await mongoose.connect(string);
          console.log('Connected To Database.')
     }catch(error){
          console.log('Connecting To Database Failed. \t',error.message);
     }
}

export default connectDB;

