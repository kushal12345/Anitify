import logger from "../../Logger/config.js";
import Catchasyncerror from "../../Middleware/Catchasyncerror.js";
import Usert from "../../Models/Users/Usermodel.js";
import Artist from "../../Models/Products/Artist/Artistmodel.js";


export const ArtistRegister = Catchasyncerror(async(req,res,next) => {
    try {
        const {id} = req.params;
        console.log(id);

        const userfind = await Usert.findById(id)
        
        if(userfind){
            try {
                await Artist.create({
                    name: userfind.name,
                    email: userfind.email,
                 })
                 return res.status(200).json({success:false,message:"Sucessfully Registered as Artist"});                 
            } catch (error) {
                console.log("During Registration artist ",error)
                return res.status(400).json({success:false,message:"Something went wrong"});
            }            
        }else{
            return res.status(400).json({success:false,message:"You are not Registered in Aurora. Please register first"})
        }

    } catch (error) {
        console.log(error);
        logger(error);
        res.status(400).json({success:false,message:"Unknown Error"});    
    }
})

export const Artistlogin = Catchasyncerror(async(req,res,next)=> {
    try {
        
    } catch (error) {
        console.log(error);
        logger(error);
        res.status(400).json({success:false,message:"Unknown Error"});
    }
}) 