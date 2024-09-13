import express from 'express'
import { Register,Login,ProtectRoute } from '../../Controllers/Users/Usercontroller.js';
import { VerifyToken } from '../../Middleware/VerifyToken.js';

const router = express.Router();

router.route("/register").post(Register).get((req,res)=>{
    res.send("Hello")
});

router.route("/login").post(Login).get((req,res)=>{
    res.send("Hello Login")
});
router.route("/protected").post(VerifyToken,ProtectRoute).get((req,res)=>{
    res.send("protected route working")
});
    
   
//router.route("/login").post(Login);
export default router;