const express=require('express');
const app= express();
const productRoutes= require("./routes/productRoutes");
const errorMiddleware = require("./middlewares/error.js")

app.use(express.json())

app.use('/api/v1',productRoutes);
app.use(errorMiddleware);

module.exports=app;