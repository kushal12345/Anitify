import { min } from "date-fns";
import mongoose from "mongoose";


const likealbumSchema = new mongoose.Schema({
    likecount: {
        type:Number,
        default:0,
        min:[0, 'likecount cannot be less than 0']
    },

    likestate:{
        type:Boolean,
        default:false
    },
    
    users:[{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default: []
    }],
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Album',
        unique: true
    }
});

const LikeAlbum = mongoose.model('LikeAlbum',likealbumSchema);
export default LikeAlbum;

