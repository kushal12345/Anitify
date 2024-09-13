import jwt from "jsonwebtoken";

export const VerifyToken = (req,res,next) => {
    const token = req.body.User.token;

    if(!token){
        return res.status(403).json({message: "No token provided."})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(403).json({message: "Invalid token."})
        }
        req.user = decoded;
        next();
    })
}

