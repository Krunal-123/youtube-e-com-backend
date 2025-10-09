import user from "../models/user";
import bcrypt from "bcrypt"
import ErrorHandler from "../Utils/ErrorHandler";

export const resetPass = async (res, req, next) => {
    const { email, password } = req.body;
    try {
        let saltRound = 10
        bcrypt.genSalt(saltRound, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                user.updateOne({ email }, { password: hash }).then((response) => {
                    if (response.length <= 0) {
                        return next(new ErrorHandler(400, "Failed To Reset Password"));
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