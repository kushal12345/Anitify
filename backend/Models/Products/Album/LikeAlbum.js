import mongoose from "mongoose";


const likealbumSchema = new mongoose.Schema({
    likecount: {
        type:Number,
        default:0
    },

    likestate:{
        type:Boolean,
        default:false
    },
    
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Album',
    }
});

const LikeAlbum = mongoose.model('LikeAlbum',likealbumSchema);
export default LikeAlbum;

