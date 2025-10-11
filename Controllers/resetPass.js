import bcrypt from "bcrypt"
import user from "../models/user.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

const resetPass = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let saltRound = 10
        bcrypt.genSalt(saltRound, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                user.updateOne({ email }, { password: hash }).then((response) => {
                    if (response.length <= 0) {
                        res.status(404).json({ success: false, message: "Failed To Reset Password" });
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            message: "Reset Password Successfully"
                        })
                    }
                })
            })
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}
export default resetPass;