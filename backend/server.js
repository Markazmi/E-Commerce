// import dotenv to use its port
const dot =require('dotenv')
const app=require("./app.js");
const connectDatabase = require('./config/db.js');
const error = require('./middlewares/error.js');
// path for dotenv file

// process.on("Uncaught exception", error =>{
//     console.log(`Error: ${error.stack}`)
//     console.log("Shutting down the server due to UnCaught Exceptions");
//     process.exit(1)
// })
dot.config({path: 'backend/config/config.env'});
const port = process.env.PORT || 5000;
connectDatabase();
app.listen(port, ()=>{
    console.log(`server is listening ON ${port} in ${process.env.NODE_ENV} mode`);
})
// process.on("UnhandledRejection", error =>{
//     console.log(`Error:${error.stack}`)
//     console.log('Shutting down the server due to Unhandle promise Exceptions');
//     process.exit(1)
// })