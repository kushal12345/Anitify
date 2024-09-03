import express,{json} from "express";
import {mongoose} from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import logError from "./Src/postreq/log.js";
import startServer from './Src/getreq/Startserver.js';


dotenv.config({
    path:'.env'
})

const PORT = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());

//mongoose.connect("");

logError('/log-error',app);

app.get("/",(req,res)=>{
    res.send("Hello World");
})

startServer(app,PORT);

