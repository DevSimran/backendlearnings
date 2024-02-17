import { ApiError } from "../utils/apiError.js";
import { asyncHandller } from "../utils/asynchandller.js";
import jwt  from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandller(async(req, _, next)=>{
   try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
 
    if(!token){
     throw new ApiError(401, "Unauthorised request")
    }
 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOCKEN_SECRET)
 
   const user = await User.findById(decodedToken?._id).
   select("-password -refreshToken")
 
   if(!user){
     // Todo: discussion about frontend
     throw new ApiError(401, "Invalid access tocken")
   }
 
   req.user = user;
   next()
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access token")
   }
})