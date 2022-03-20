const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const approvalSchema = new Schema(
    {

        userEmail:{
            type: String,
            required: true,
        },

        userName:{
            type: String,
            required: true,
        },

        userPhone:{
            type: Number,
            required: true
        },

        product:{
            type: Object,
            required: true
        },

        customization:{
            type:Object,
            required: true
        },

        status:{
            type: String,
            default: "Pending",
            required: true,
            enum: ["Pending", "Accepted", "Declined", "Cancelled", "Ordered"],
        },

        date:{
            type: Date,
            required: true
        }
    }
);

module.exports = mongoose.model("approval", approvalSchema);
