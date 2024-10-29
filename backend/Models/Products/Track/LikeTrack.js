import mongoose from "mongoose";


const liketrackSchema = new mongoose.Schema({
    likecount: {
        type:Number,
        default:0
    },

    Track:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tracks',
    }
});

const Liketracks = mongoose.model('LikeTrack',liketrackSchema);
export default Liketracks;

