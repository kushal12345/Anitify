import mongoose, { Schema } from "mongoose";

const artistSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true,"Please enter Artist name"] 
    },
    
    bio: {
        type: String 
    },

    image:{
        type:String,
        required:[true,"Image required"]
    },
    
    albums: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Album' 
    }],

    playlists: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Playlist' 
    }]
}, 
{ 
    timestamps: true 
});

const Artist = mongoose.model('Artist',artistSchema);
export default Artist;
