import mongoose from "mongoose";


const likeplaylistSchema = new mongoose.Schema({
    likecount: {
        type:Number,
        default:0
    },

    playlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Playlist',
    }
});

const Likeplaylist = mongoose.model('LikePlaylist',likeplaylistSchema);
export default Likeplaylist;

