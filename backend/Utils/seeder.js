const dotenv=require('dotenv');
const connectDatabase = require('../config/db');
// because it will be hard to test all items one by one in postman so we make this file
// so all will be tested together, at once
// import data ..json file bec it ahs all items that we want to insert
const Data=require('../Data/data.json');
// import scema so u add the products through the collection u made at end
const ProductCollection =require('../models/Products.js');
//ERROR!!!! uri.undefines cant connect to db
//  write path first so its connected to the db then call connectdatabase
dotenv.config({path: 'backend/config/config.env'});
// connect to database bec u want to add the items in database

connectDatabase();

const seedProducts = async () => {
try{
    await ProductCollection.insertMany(Data);
    console.log('products inteserted');
    // exiting process means dont run again n again.. also for this process.exit u need to
    // import dotenv file... bec process comes from therre
    // process.exit();
}catch(error){
    console.log(error);
    // process.exit();
}
}
seedProducts();