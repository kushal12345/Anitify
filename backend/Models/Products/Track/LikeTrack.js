import mongoose from "mongoose";


const liketrackSchema = new mongoose.Schema({
    likestate:{
        type:Boolean,
        default:false
    },
    
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
            validator: function(value) {
                return mongoose.Types.ObjectId.isValid(value);
            },
            message: 'Invalid User ID'
        }
    }],
    track:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Track'
    }
}, { timestamps: true });


// Ensure that no unique index is applied to the 'users' field
liketrackSchema.index({ users: 1 });  // Optional: add index for querying but without unique constraint

const Liketracks = mongoose.model('LikeTrack',liketrackSchema);
export default Liketracks;

