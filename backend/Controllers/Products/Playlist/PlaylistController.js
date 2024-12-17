import Catchasyncerror from "../../../Middleware/Catchasyncerror.js";
import Playlist from "../../../Models/Products/Playlist/Playlistmodel.js";
import Liketracks from "../../../Models/Products/Track/LikeTrack.js";

export const PlaylistCreate = Catchasyncerror(async (req, res) => {
    // Request User Id 
    const likedstatus = req.params.likedstatus;
    const user_id = req.params.user_id;


    if(!likedstatus && !user_id){
        return res.status(400).json({msg: "Please provide a valid user id."});
    }

    if(likedstatus==="liked"){
        /* Fetch all liked tracks according to user_id */

        const tracksliked_user = await Liketracks.find({users: user_id}).populate("track","title");
        if(!tracksliked_user){
            return res.status(400).json({msg: "Empty list"});
        }
        return res.status(200).json({success: true, results: tracksliked_user });
    }else{
        console.log("notliked");

    }
    
});