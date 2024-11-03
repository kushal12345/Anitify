import logger from "../../Logger/config.js";
import Catchasyncerror from "../../Middleware/Catchasyncerror.js";
import Usert from "../../Models/Users/Usermodel.js";
import Artist from "../../Models/Products/Artist/Artistmodel.js";


export const ArtistRegister = Catchasyncerror(async(req,res,next) => {
    try {
        const {id} = req.params;
        
        const userfind = await Usert.findById(id)
        
        if(userfind){
            try {
                await Artist.create({
                    _id:id,
                    name: userfind.name,
                    email: userfind.email,
                    country:userfind.country,
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


export const ArtistUpdate = Catchasyncerror(async(req,res,next) => {
    try {
        const {id} = req.params.id;
        const {profile} = req.params.profile;
        const {name, email, bio, country} = req.body;
        const avatar = req.files.image ?req.files.image[0].filename : null;

        const userfind = await Artist.findById(req.params.id);
        
        if(userfind){
            try {
                const update = await Artist.updateMany({
                    name: name,
                    email: email,
                    bio: bio,
                    country:country,
                    image:avatar
                 })
                 if(update){
                    console.log("updated");
                    return res.status(200).json({success:true,message:"Sucessfully Updated Artist"});
                 }
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

export const Artistfetch = Catchasyncerror(async(req,res,next)=>{
    const {id} = req.params;
    let artist;
    try {
        //check if ID is empty or not;
        if(!id){
            return res.status(400).json({success:false,message:"Please provide Artist id"})
        }

        if(id==="all"){
            artist = await Artist.find();
            if(!artist){
                return res.status(400).json({success:false,message:"We currently don't have any artist"});
            }
        }else{
            artist = await Artist.findById(id);
            if(!artist){
                return res.status(400).json({success:false,message:"Artist not found"})
            }
        }

        return res.status(200).json({success:false,result:artist});
    } catch (error) {
        console.log(error);
        logger(error);
        res.status(400).json({success:false,message:"Unknown Error"});
    }
})