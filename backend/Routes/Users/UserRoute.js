import React from 'react'
import express from 'express'
import { Register } from '../../Controllers/Users/Usercontroller.js';

const router = express.Router();

router.route("/register").post(Register).get((req,res)=>{
    res.send("Hello")
});
//router.route("/login").post(Login);
export default router;