
// const CatchAsyncerror = require('../middlewares/CatchAsyncerror.js');
const User = require('../models/User.js');



exports.register = async(req,res,next) =>{
    const {name,email,password} = req.body;

// checking if the email exists in database
const emailExist = await User.findOne({email});
    if(emailExist){
res.status(400).json({
    success:false,
    message: "Email already exists",
})
}
// if the email is unique add it in the user database
let newUser= await User.create({
name,
email,
password,
avatar:{
    public_id:"iht878673",
    url:"hhtp//khfeagbeg",
    // all these 4 fields are required=true in the model
},
})
res.json({
    success: true,
    message: "User registered",
    newUser
})
}