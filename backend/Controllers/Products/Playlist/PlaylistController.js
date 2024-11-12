import Catchasyncerror from "../../../Middleware/Catchasyncerror";


export const PlaylistCreate = Catchasyncerror(async (req, res) => {
    // Request User Id 
    const {id} = req.params.id;
    if(!id){
        return res.status(400).json({msg: "Please provide a valid user id."});
    }

    
});