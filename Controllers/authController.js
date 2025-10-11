import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
// import Routes
import signupMail from "../SignupMail.js";
import mailDetails from "../mailDetails.js";
import sendOtpEmail from "../mailer.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, number, email, gender, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "Already Account Created" });
        const hash = await bcrypt.hash(password, 10);
        const pic = gender === "Male"
            ? "https://yt3.ggpht.com/a/AATXAJzFE_5zKBk19JRw6RbSvLseEhNrI0W5qfPjoQ=s900-c-k-c0xffffffff-no-rj-mo"
            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp";

        const newUser = await user.create({ profilePic: pic, firstName, lastName, email, gender, number, password: hash });
        signupMail(email, firstName);
        mailDetails(email, firstName, lastName, gender, number, password, new Date().toLocaleDateString());
        res.json({ success: true, message: "🎉 Account Created Successfully 🎉" }).status(201);
    } catch (error) {
        return next(new ErrorHandler())
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        if (!User) return res.status(404).json({ success: false, message: "User Doesn't Exist❌" });
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) return res.status(404).json({ success: false, message: "Invalid Password❌" });
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({
            success: true,
            message: "Successfully Login",
            data: token
        })
    } catch (error) {
        return next(new ErrorHandler(500, "server Error"))
    }
};

export const sendOTP = async (req, res, next) => {
    try {

        const { email } = req.body;
        user.find({ email }).then((data) => {
            if (data.length <= 0) {
                return res.status(404).json({ success: false, message: "User Not Found❌" });
            }
            else {
                // Generate OTP and expiration
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                sendOtpEmail(email, otp, res);
            }
        })
    } catch (err) {
        return next(new ErrorHandler(500, "server Error"))
    }
};