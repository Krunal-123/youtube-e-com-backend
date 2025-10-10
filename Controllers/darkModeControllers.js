import user from "../models/user.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

const themeMode = async (req, res, next) => {
    try {

        let { email, mode } = req.body
        await user.updateOne({ email }, { lightMode: mode }).then((p) => {
            res.status(200).json({
                success: true,
                message: "Theme Changed Successfully"
            })
        })
    } catch (err) {
        return next(new ErrorHandler());
    }
}

export default themeMode;