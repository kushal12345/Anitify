import ErrorHandlersave from "../../Utils/Errorhandler";
import sendToken from "../../Utils/JWTToken";
import Usert from "../../Models/Users/Usermodel.js";
import * as CatchAsncErrors from "../../Middleware/Catchasyncerror.js"

export const Register  = CatchAsncErrors( async(req,res,next) => {
    const {name,password,email,country} = req.body;
    const user = await Usert.create({
        name,password,email,country
    });
    sendToken(user,201,res);
})