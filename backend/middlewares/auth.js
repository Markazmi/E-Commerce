const ErrorHandler = require("../Utils/ErrorHandler");
const CatchAsyncerror = require("./CatchAsyncerror");
const User=require('../models/User.js')
const JWT = require('jsonwebtoken')
exports.IsAuthenticatedUser=CatchAsyncerror(async(req,res,next)=>{
    const {token} = req.cookies
    // if the user doesnot have token (means he didnt signup)
    if(!token){
        return next(new ErrorHandler("login first to aceess the route", 401))
    }
// if the user is logged in.. get his id from DECODED
    const decoded = JWT.verify(token, process.env.JWT_SECRET)
    req.user=await User.findById(decoded.id)
    next();
})

// handling user roles
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        const {role} = req.user
        // if the role==admin then do update,create,delete
        if(!roles.includes(role)){

            return next(
                new ErrorHandler(`Role ${role} is not allowed to access this route`,403)
            )
        }
        next();
    }
}