// import dotenv to use its port
const dot =require('dotenv')
const app=require("./app.js");
const connectDatabase = require('./config/db.js');
// path for dotenv file
dot.config({path: 'backend/config/config.env'});
const port = process.env.PORT || 5000;
connectDatabase();
app.listen(port, ()=>{
    console.log(`server is listening ON ${port} in ${process.env.NODE_ENV} mode`);
})