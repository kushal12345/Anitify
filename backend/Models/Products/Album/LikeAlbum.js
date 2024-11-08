import { min } from "date-fns";
import mongoose from "mongoose";


const likealbumSchema = new mongoose.Schema({

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
    album:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Album'
    }
}, { timestamps: true });


// Ensure that no unique index is applied to the 'users' field
likealbumSchema.index({ users: 1 });  // Optional: add index for querying but without unique constraint


const LikeAlbum = mongoose.model('LikeAlbum',likealbumSchema);
export default LikeAlbum;

