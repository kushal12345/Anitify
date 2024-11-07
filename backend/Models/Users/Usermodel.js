import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed to 30 character"],
        minLength:[4, "Name should have more than 4 characteristics"]
    },

    password:{
        type:String,
        required:[true,"Please Enter your password"],
        minLength:[8, "Password should be greater than 8 characteristics"],
        select:false,
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid Email"],
    },
    image:{
        type:String,
    },
    country:{
        type:String,
        required:true
    },
    playlists: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Playlist' 
    }],
    createdAt:{
        type:Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, 
{ 
    timestamps: true 
});



userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,12);
});

userSchema.methods.getJWTToken = function() {
    return jwt.sign(
        {
            id:this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRE,
        }
    );
};

//compare Password
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

const Usert = mongoose.model('User',userSchema);
export default Usert;