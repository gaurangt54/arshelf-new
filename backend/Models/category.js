const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name:{
            type: String,
            required: true	
        },
        image:{
            type: String,
            required: true	
        },
        is_deleted:{
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("category", categorySchema);
