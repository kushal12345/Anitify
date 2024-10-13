import express from 'express'
import { Register,Login,ProtectRoute } from '../../Controllers/Users/Usercontroller.js';
import { VerifyToken } from '../../Middleware/VerifyToken.js';
import { ArtistRegister } from '../../Controllers/Artist/ArtistContoller.js';
import { Artistlogin } from '../../Controllers/Artist/ArtistContoller.js';

const router = express.Router();

router.route("/register").post(Register).get((req,res)=>{
    res.send("Hello")
});

router.route(`/artistregister/:id`).post(ArtistRegister).get((req,res)=>{
    res.send("Hello Artist")
});

router.route("/login").post(Login).get((req,res)=>{
    res.send("Hello Login")
});

router.route("/Artistlogin").post(Artistlogin).get((req,res)=>{
    res.send("Hello Login")
});

router.route("/protected").post(VerifyToken,ProtectRoute).get((req,res)=>{
    res.send("protected route working")
});
    
   
//router.route("/login").post(Login);
export default router;