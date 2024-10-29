import mongoose from "mongoose";


const likeartistSchema = new mongoose.Schema({
    likecount: {
        type:Number,
        default:0
    },

    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Artist',
    }
});

const LikeArtist = mongoose.model('LikeArtist',likeartistSchema);
export default LikeArtist;

