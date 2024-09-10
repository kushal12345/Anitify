import ErrorHandlersave from "../../Utils/Errorhandler.js";
import sendToken from "../../Utils/JWTToken.js";
import Usert from "../../Models/Users/Usermodel.js";
import CatchAsncErrors from "../../Middleware/Catchasyncerror.js"
import logger from "../../Logger/config.js";


export const Register  = CatchAsncErrors( async(req,res,next) => {
    try {
        const {name,password,email,country} = req.body;
        if(!name || !password || !email ||!country){
            return res.status(400).json({success:false,message:"Please fill in all fields"})
        }

        const userfind = await Usert.findOne({email});
        
        if(userfind){
            return res.status(400).json({success:false,message:"You are already registered."})
        }else{
            const user = await Usert.create({
                name,password,email,country
            });
            sendToken(user,201,res);
        }
       
    } catch (error) {
        console.log(error);
        logger(error); 
        res.status(400).json({success:false,message:"Unknown Error"});    
    }
})

//login part
export const Login = CatchAsncErrors(async (req,res,next)=>{
    try {
        const {email,password} = req.body;

        //see if email and password is empty

        if(!email || !password){
            console.log("Empty email and password please enter again");
            return next( new ErrorHandlersave("Empty Email and Password",400));
        }

        const user = await Usert.findOne({email}).select("+password");

        if(!user){
            console.log("User not found");
            return next(new ErrorHandlersave("User not found",401));
        }
        //check if password is correct
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            console.log("Password is incorrect");
            return next(new ErrorHandlersave("Password is incorrect",401));
        }
        //generate token
        sendToken(user,200,res);

    } catch (error) {
        console.log(error);
        logger(error);
    }
})
