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
        length:{
            type: Number,
            required: true
        },
        breadth:{
            type: Number,
            required: true
        },
        height:{
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
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
        },
        reviews:{
            type:Array,
            default:[]
        }
    }
);

module.exports = mongoose.model("product", productSchema);
