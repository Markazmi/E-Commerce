const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true, 'please senter a product name'],
        maxlength: [100, "please enter less than 100 characters"],
        trim: true,
    },
   price:{
        type: Number,
        required: [true,'please enter a price for the product'],
        default:0.0
    },
    description:{
        type: String,
        required: [true,'please enter a discription']
    },
    
    rating:{
        type: Number,
        default:0,
    },
    images: [{
public_id:{
    type: String,
    required: true
},
url:{
    type: String,
    required: true
},
},
],
category:{
type: String,
required: [true, "please select a category"],
enum: {
values:[
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
],
message: "please select the correct category"
}},
seller:{
 type: String,
 required: [true, "please enter a seller name"]   
},
stock:
{
type: Number,
required: [true, 'please enter number of items available'],
default: 0,
},
Numofreveiws:{
    type: Number,
    default: 0
},
reveiws: [{
    name:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
}],
user:{
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required:true
},
createdAt:{
type: Date,
default: Date.now,
}
})
module.exports = mongoose.model('Product', ProductSchema);