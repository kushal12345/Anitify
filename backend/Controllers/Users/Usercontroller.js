import ErrorHandlersave from "../../Utils/Errorhandler.js";
import sendToken from "../../Utils/JWTToken.js";
import Usert from "../../Models/Users/Usermodel.js";
import CatchAsncErrors from "../../Middleware/Catchasyncerror.js"
import logger from "../../Logger/config.js";
import Artist from "../../Models/Products/Artist/Artistmodel.js";

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
            sendToken(user,user,201,res);
        }
    } catch (error) {
        //console.log(error);
        logger(error); 
        res.status(400).json({success:false,message:"Unknown Error"});    
    }
})

//login part
export const Login = CatchAsncErrors(async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        let authority = "";

        //see if email and password is empty

        if(!email || !password){
            //console.log("Empty email and password please enter again");
            return res.status(400).json({success:false,message:"Empty Email and Password"});
        }

        const user = await Usert.findOne({email}).select("+password");
        const artist = await Artist.findOne({email}); 

        if(!user){
            //console.log("User not found");
            authority = null;
            return res.status(400).json({success:false,message:"User Not Found"});            
        }else if(user && !artist){
            authority = "user";
        }else if(user && artist) {
            authority = "artist";
        }else{
            authority = null;
            return res.status(400).json({success:false,message:"User Not Found"});
        }
        //check if password is correct
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            //console.log("Password is incorrect");
            return res.status(400).json({success:false,message:"Incorrect Password."});
        }
        //generate token
        sendToken(user,authority,200,res);

    } catch (error) {
        //console.log(error);
        logger(error);
        return res.status(400).json({success:false,message:error})
    }
})



export const ProtectRoute = async (req,res) => {
    const user = await Usert.findById(req.body.user._id);
    if(!user){
        return res.status(401).json({message:"User not found"});
    }
    res.status(200).json({success:true,message:"Sucessfully authenticated"});
}
