import Razorpay from "razorpay"
import ErrorHandler from "../Utils/ErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();

// Server-side (Node.js) code to create Razorpay order
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
const order = async (req, res, next) => {
    const { amount } = req.body;
    const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({
            success: true,
            message: "🥳New Items Added🎉",
            data: order
        });
    } catch (error) {
        return next(new ErrorHandler());
    }
}
export default order;