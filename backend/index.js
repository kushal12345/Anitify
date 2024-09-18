import express,{json} from "express";
import {mongoose} from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import logError from "./Src/postreq/log.js";
import startServer from './Src/getreq/Startserver.js';
import logger from "./Logger/config.js";
import ErrorHandler from "./Middleware/errorHandler.js";
import { logEvents } from "./Logger/config.js";
import connectDB from "./Config/database.js";
import corsOption from "./Origin/corsOption.js";
import Connectioninfo from "./Middleware/connectioninfo.js";
import router from "./Routes/Users/UserRoute.js";

connectDB();

dotenv.config({
    path:'.env'
})

const PORT = process.env.PORT;
const app = express();
app.use(logger);
app.use(json());
app.use(cors(corsOption));

/*
app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
*/

app.use(Connectioninfo); // middleware to store connection info in log file

//logError('/log-error',app);

app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.use('/api',router);

app.use(ErrorHandler);

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB Please wait Starting server..')
    startServer(app,PORT);
    })

mongoose.connection.on('error',err=>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')
})

