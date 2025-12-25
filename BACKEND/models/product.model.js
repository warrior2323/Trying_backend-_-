const mongoose = require('mongoose')

const ProductSchema=mongoose.Schema(
    {   username:{
        type:String,
        required:[true,"please enter the user's name "]
                   },

        name:{
            type:String,
            required:[true,"Please enter the product name"]
        },

        quantity:{
            type:Number,
            required:true,
            default:0
        },

        price:{
            type:Number,
            required:true,
            default:0
        },

        image:{
            type:String,
            required:false
        }

    },
    {
        timestamps:true
    }
    //When you set timestamp to true, Mongoose automatically adds two new fields to your document in MongoDB:createdAt: A date representing when the document was first created.
    //updatedAt: A date representing the last time you made changes to that document.
);

const Product =mongoose.model("Product",ProductSchema);// we have to make product singular as it will add plural i.e(s) by itself in the database
module.exports = Product;