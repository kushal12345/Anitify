import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config({
    path:'.env'
})

const connectDB = async ()=>{
    try{
        await  mongoose.connect(process.env.DB_URI);
          //console.log(`MongoDB connected to DB (${process.env.DB_URI})`);
    } catch(err) {
        //console.log(err);
        process.exit(1);
    }
}

export default connectDB;