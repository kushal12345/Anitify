import React from 'react'
import express from 'express'
import { Register,Login } from '../../Controllers/Users/Usercontroller.js';

const router = express.Router();

router.route("/register").post(Register).get((req,res)=>{
    res.send("Hello")
});

router.route("/login").post(Login).get((req,res)=>{
    res.send("Hello Login")
});
//router.route("/login").post(Login);
export default router;