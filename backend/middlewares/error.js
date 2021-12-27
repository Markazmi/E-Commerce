// handling errors

module.exports=(err,req,res,next)=>{
    err.statusCode= err.statusCode ||500;
    err.message= err.message || "internal server error"

res.status(err.statusCode).json({
    success:false,
    // stacl=to see the error in postman
    error: err.stack,

})}