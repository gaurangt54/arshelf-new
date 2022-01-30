const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            minlength: [6, "A user password must have at least 6 characters"],
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            validate: [Validator.isEmail, "Please provide a valid email"],
        },

        phoneNumber: {
            type: Number,
            minlength: [10, "A phone number must be of atleast 10 digits"],
            required: true,
        },

        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },

        cart:{
            type: Array,
            default: []
        },

        wishlist:{
            type: Array,
            default: []
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


module.exports = mongoose.model("user", userSchema);
