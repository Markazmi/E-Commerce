const express=require('express');

const app= express();

module.exports=app;
const productRoutes= require("./routes/productRoutes");

app.use(express.json())
app.use('/api/v1',productRoutes);
module.exports=app;