const express=require('express');
const app= express();
const productRoutes= require("./routes/productRoutes");
const authRoutes= require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/error.js")
const cookieParser=require('cookie-parser')

app.use(express.json())
app.use(cookieParser());

app.use('/api/v1',productRoutes);
app.use('/api/v1', authRoutes);
app.use(errorMiddleware);

module.exports=app;