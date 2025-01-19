import mongoose from "mongoose";


const playingSchema = new mongoose.Schema({
    
    playing:{
        type:Boolean,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
        unique:true,
    },
    times:{
        type:Number,
        required:true,
        default:0,
    }
},{timestamps:true});

const CurrentPlaying = mongoose.model("CurrentPlaying",playingSchema);
export default CurrentPlaying;