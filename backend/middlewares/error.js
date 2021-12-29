const ErrorHandler = require("../Utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
      

    // DEVELOPMENT ERROR
if (process.env.NODE_ENV==='DEVELOPMENT'){
  res.status(err.statusCode).json({
    success: false,
    error: err,
    message:err.message,
    stack: err.stack,
  })

}
// PRODUCTION ERROR
 if(process.env.NODE_ENV==='PRODUCTION'){
// there are different types of errors and we want to show each in a nice way to the user
if(err.name === "CastError"){
  // CatError if you remove digits from objectid...map not needed because it doesnot have a long/nested object
  const message= `Resource not found, Invalid ${err.path}`;
 err= new ErrorHandler(message, 400);
}
if(err.name ==="ValidationError"){
  // using map because it has a nested object and we want to get message form it
  // object.vaues because we only want VALUES of this big object, not keys or anything
const message = Object.values(err.errors).map((S) => S.message)
err=new ErrorHandler(message,400)
}
res.status(err.statusCode).json({
success: false,
// helps us show casterror in postman ratger than seeing it in the terminal
message:err.message,
})}
}