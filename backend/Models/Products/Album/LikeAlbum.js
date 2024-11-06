import { min } from "date-fns";
import mongoose from "mongoose";


const likealbumSchema = new mongoose.Schema({

    likestate:{
        type:Boolean,
        default:false
    },
    
    users:[{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default:[]
    }],
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Album',
        unique: true
    }
});

const LikeAlbum = mongoose.model('LikeAlbum',likealbumSchema);
export default LikeAlbum;

