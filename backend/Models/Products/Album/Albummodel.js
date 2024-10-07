import mongoose from "mongoose"


const albumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter title"],
        maxLength:[30,"Name cannot exceed to 30 characters"],
        minLength:[3,"Name should be at least 3 characters"],
    },

    artist:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Artist',
       required:true
    },

    releaseDate:{
        type:Date,
        required:[true,"Release Date required"]
    },

    image:{
        type:String,
        required:[true,"Image required"]
    },

    tracks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracks',
    }]
}, 
{ 
    timestamps: true 
});

const Album = mongoose.model('Album',albumSchema);
export default Album;