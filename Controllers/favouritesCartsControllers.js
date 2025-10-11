import user from "../models/user.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const favourites = async (req, res, next) => {
    const { email, id } = req.body;
    try {
        user.updateOne({ email }, { $push: { myfavourites: id } }).then((r) => {
            if (r <= 0) {
                return next(new ErrorHandler(400, "Failed to Save Data⚠️"));
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Added into Your Favorites😍"
                })
            }
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const favouritesDEL = async (req, res, next) => {
    const { email, id } = req.params;
    try {
        user.updateOne({ email }, { $pull: { myfavourites: id } }).then((r) => {
            res.status(200).json({
                success: true,
                message: "Removed in Favourites"
            })
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}