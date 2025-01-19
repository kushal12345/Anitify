import Catchasyncerror from "../../../Middleware/Catchasyncerror.js";
import CurrentPlaying from "../../../Models/Products/Audio/CurrentPlaying.js";

export const CurrentPlayingreg = Catchasyncerror(async(req,res,next)=>{
    const {playing,title,artist,id} = req.body;

    const currentPlaying = await CurrentPlaying.findOne({id});
    let current;
    if(currentPlaying){
        currentPlaying = await CurrentPlaying.findOneAndUpdate(
            { id },
            { $inc: { times: 1 }, playing, title, artist },
            { new: true }
        );
    }else{
        current = await CurrentPlaying.create({
            playing,title,artist,id,times:1
        });
    
    }

    res.status(200).json({
        success:true,
        current
    });
});

export const FetchCurrentPlaying = Catchasyncerror(async(req,res,next)=>{
    const id = req.params.id;

    const current = await CurrentPlaying.find({id});

    if(!current){
        return res.status(404).json({
            success:false,
            message:"No current playing found"
        });
    }

    res.status(200).json({
        success:true,
        current
    });
});