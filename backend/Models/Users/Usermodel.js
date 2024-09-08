import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
})
const Usert = mongoose.model('User',userSchema);
export default Usert;