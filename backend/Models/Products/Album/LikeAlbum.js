import mongoose from "mongoose";


const likealbumSchema = new mongoose.Schema({
    likecount: {
        type:Number,
        default:0
    },

    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Album',
    }
});

const LikeAlbum = mongoose.model('LikeAlbum',likealbumSchema);
export default LikeAlbum;

