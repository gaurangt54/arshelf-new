const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        category_id:{
            type: String,
            required: true	
        },
        name:{
            type: String,
            required: true	
        },
        description:{
            type: String,
            required: true	
        },
        dimension:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true	
        },
        dealer:{
            type: String,
            required: true	
        },
        price:{
            type: Number,
            required: true	
        },
        eoq:{
            type: Number,
            required: true	
        },
        is_deleted:{
            type:Number,
            default:0
        },
        arFile:{
            type:String,
        }
    }
);

module.exports = mongoose.model("product", productSchema);
