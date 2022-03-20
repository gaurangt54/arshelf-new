const Razorpay = require("razorpay");
require("dotenv").config();

exports.getRazorpayKey = (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
};

exports.makePayment = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: req.body.amount,
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");
        
        res.send(order);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};
