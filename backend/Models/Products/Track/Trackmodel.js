import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true,"Please Enter title"]
    },

    duration: { 
        type: Number 
    }, // Duration in seconds

    album: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Album', 
        required: [true,"Please Enter Album"] 
    },
}, 
{ 
    timestamps: true 
});

const Track = mongoose.model('Track', trackSchema);
export default Track;
