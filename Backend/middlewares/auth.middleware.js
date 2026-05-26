import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1];
        }
        if(!token){
            const authError=new Error("Not authorized to access this route, please login");
            authError.statusCode = 401;
            throw authError;
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const currentUser=await User.findById(decoded.id).select("-passwordHash");
        if(!currentUser){
            const userError=new Error("User not found, invalid token");
            userError.statusCode=401;
            throw userError;    
        }
        req.user=currentUser;
        next();
    }
    catch(err){
        if(err.name==="JsonWebTokenError"){
            err.message="Invalid token, please login again";
            err.statusCode=401;
        }
        else if(err.name==="TokenExpiredError"){
            err.message="Token expired, please login again";
            err.statusCode=401;
        }
        next(err);

    }
}