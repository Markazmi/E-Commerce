const ErrorHandler = require('../Utils/ErrorHandler.js')
const CatchAsyncErrors = require('../middlewares/CatchAsyncerror.js');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const validator = require('validator')
// const JWT=require('jsonwebtoken');
const sendToken = require('../Utils/jwtToken.js');
const sendEmail = require('../Utils/sendEmail.js');
const crypto = require('crypto');
const cloudinary=require('cloudinary');



// resgister user
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
// const hashPassword = await bcrypt.hash(password,10);
// if the email is unique add it in the user database
const result=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder: 'avatars',
    width:150,
    crop:'scale'
})
let newUser= await User.create({
name,
email,
password,
avatar:{
    public_id:result.public_id,
    url:result.secure_url,
    // all these 4 fields are required=true in the model
},
})

// assigning a token to this particular user (thats why we wrote as newUser._id)
sendToken(newUser,201,res)
})          

// login user
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
// forgot password (doing it before logout)
exports.forgotPassword=CatchAsyncErrors(async(req,res,next)=>{
const user = await User.findOne({email:req.body.email})
if(!user){
    return next (new ErrorHandler('User not found',400))
}
    const resetToken=user.getresetPasswordToken();

    await user.save({validateBeforeSave:false});
    
    // create password url
    // const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message= `your password reset token is as follows:\n\n${resetUrl} \n\n
if you have not requested this email, please ignore it`
try{
    await sendEmail({
        email:user.email,
        subject:`ShopIt password recovery`,
        message,

    });
    res.json({
        success:true,
        message:`email sent to ${user.email}`
    })

}catch(error){
user.resetPasswordToken = undefined;
user.resetPasswordExpire=undefined;
await user.save({validateBeforeSave:false})
return next(new ErrorHandler(error.message,400))
}

});


// reset password
exports.resetPassword=CatchAsyncErrors(async(req,res,next)=>{
const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    // resetPasswordExpire: { $gt: Date.now() },
  });
console.log(user);
  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has been expires',
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password doesn"t match', 400));
  }

  // set up the new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// get current user profile
exports.getUserProfile=CatchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.json({success:true,
    user})
})

// update/change old password
exports.updatePassword = CatchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password')

    const isMatched= await bcrypt.compare(req.body.oldPassword, user.password);
    if(!isMatched){
        return next(
            new ErrorHandler('Password do not match',400)
        )}
    user.password = req.body.password
    await user.save();
    sendToken(user,200,res)
})
// exports.updatePassword = CatchAsyncErrors(async(req,res,next) =>{
//     const user = await User.findById(req.user.id).select('+password');
    
//     const isMatched = await bcrypt.compare(req.body.oldPassword, user.password);
//     if (!isMatched) {
//       return next(new ErrorHandler("Old password doesn't match'", 400));
//     }
//     const hashPassword = await bcrypt.hash(req.body.oldpassword,10);
//     user.password = hashPassword;
//     await user.save();
//     sendToken(user, 200, res);
//   });
  

// Update profile

exports.updateProfile=CatchAsyncErrors(async(req,res,next)=>{
    // which fields to update
const newUserData={
    name: req.body.name,
    email: req.body.email
}
if(req.body.avatar!==''){
    const user = await User.findById(req.user.id)
    const image_id=user.avatar.public_id;
    const res=await cloudinary.v2.uploader.destroy(image_id)
// updatebyidandupdate is used when we want to update more fields.
const result=await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:'avatars',
    width:150,
    crop:'scale'
})
newUserData.avatar={
    public_id:result.public_id,
    url: result.secure_url
}}
await User.findByIdAndUpdate(req.user.id,newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
})
res.json({
    success:true,
    message:"User Updated"
})
})


//  log out user   
exports.logout=CatchAsyncErrors(async(req,res,next)=>{
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

// get all users
exports.getAllUsers=CatchAsyncErrors(async(req,res,next)=>{

    const user= await User.find();
    res.json({
        success:true,
        user,
    })
})
exports.getUserDetails=CatchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id)
    if(!user){
    return next(
        new ErrorHandler('User not found', 400)
    )}

    res.json({
        success:true,
        user,
    })
})


// admin update's user profile
exports.UpdateUserProfile = CatchAsyncErrors(async (req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,
    }
    await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.json({
        success:true,
        message:"user updated",
    })

})
// delete a users profile
exports.DeleteUser = CatchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id)
    if(!user){
    return next (new ErrorHandler('user not found', 400))
    }
    await user.remove()

    res.json({
        success:true,
        message:"user deleted"
    })


})
// remove res.json completely bec we ave written it in other reuable function
// git push -u origin main