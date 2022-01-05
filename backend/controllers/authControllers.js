const ErrorHandler = require('../Utils/ErrorHandler.js')
const CatchAsyncErrors = require('../middlewares/CatchAsyncerror.js');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const validator = require('validator')
// const JWT=require('jsonwebtoken');
const sendToken = require('../Utils/jwtToken.js');

exports.register = CatchAsyncErrors( async(req,res,next) =>{
    const {name,email,password} = req.body;

// checking if the email exists in database
const emailExist = await User.findOne({email});
    if(emailExist){
return next ( new ErrorHandler('Email already exists', 400))
}
// validator.islength is to check the length of password, it takes 2 parameters
// 1) who's length you wont to check/validate
// 2) min or max length you want to set
const isValidPassword = validator.isLength(password, {min: 6})
if(!isValidPassword){
    return next ( new ErrorHandler('Password should be more than 6 characters', 400))
}
// Encrypting a password it takes 2 paramemters
// 1) what we want to hash, which in this case is password
// 2) salt: salt is that the package adds X number of characters after the password
// because if 2 users have keep same password that would be a problem so bcrypt adds
// a salt number after the user's password
const hashPassword = await bcrypt.hash(password,10);
// if the email is unique add it in the user database
let newUser= await User.create({
name,
email,
password: hashPassword,
avatar:{
    public_id:"iht878673",
    url:"hhtp//khfeagbeg",
    // all these 4 fields are required=true in the model
},
})

// assigning a token to this particular user (thats why we wrote as newUser._id)
sendToken(newUser,201,res)
})
exports.login = CatchAsyncErrors( async(req,res,next) =>{
    const {email, password} = req.body
    if(!email||!password){
        return next (
            new ErrorHandler("Please fill all fields",400)
)}
// check if the email user entered to login exists in our db
// +password is imp, if you dont write this it wont show the error of "password is incorrect"

    const user =await User.findOne({email}).select('+password');
    if(!user)
        return next(
            new ErrorHandler('User does not exist', 400)
        )
    
    // Checking if the password user entered matches tge db password
    // comparing both passwords .compare(password user entered(one u destructured),getting the password in db)
    const matchPassword = await bcrypt.compare(password, user.password);
// if both compared passwords do not match
if(!matchPassword){
    return next(new ErrorHandler('Password is incorrect',400))
}
// JWT.SIGN takes 3 parameters
// 1) payload can be in form of object,buffer,string
// 2) secret or private key
// 3) expiry time

sendToken(user,200,res);
});

exports.logout=((req,res,next)=>{
const options = {
    expires:new Date(Date.now()),
    httpOnly:true,
}
//  when the user leaves w ehave to make the token null
res.cookie('token',null,options);
res.json({
    success:true,
    message:"logged out"
})
})



// remove res.json completely bec we ave written it in other reuable function