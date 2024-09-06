import React from 'react'
import logger, { logEvents } from "../Logger/config.js";


const ErrorHandler = (err,req,res,next) => {
 logEvents(`${err.name}:  ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errLog.log')
 console.log(err.stack);
 const status =  res.statusCode ? res.statusCode : 500  //server error
 res.status(status)
 res.json({message: err.message})}

export default ErrorHandler