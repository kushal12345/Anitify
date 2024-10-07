import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },

    tracks: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Track' 
    }],

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' }, // Can refer to both User and Artist

    creatorType: { 
        type: String, 
        enum: ['user', 'artist'], 
        required: true } // Indicates if creator is a user or artist

}, 
{ 
    timestamps: true 
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;