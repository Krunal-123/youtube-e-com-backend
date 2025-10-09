import jwt from "jsonwebtoken"
import user from "../models/user"
import ErrorHandler from "../Utils/ErrorHandler"
export const addcart = async (req, res, next) => {
    try {
        let { id, cookies } = req.body
        let decode = jwt.verify(cookies.token, process.env.JWT_SECRET)
        let check = await user.find({ email: decode })
        await user.updateOne({ email: decode }, { $push: { addcart: id } })
        res.status(200).json({
            success: true,
            message: "Successfully added to cart",
            data: check
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const getCartsUser = async (req, res, next) => {
    try {
        let { cookies } = req.body
        let decode = jwt.verify(cookies.token, process.env.JWT_SECRET)
        let userData = await user.find({ email: decode }).populate("addcart").populate("myitems").populate("myfavourites").populate('orderhistory.id')
        res.status(200).json({
            success: true,
            message: "Successfull",
            data: userData
        });
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const purchase = async (req, res, next) => {
    try {
        let { data, id, amount } = req.body
        await Promise.all([
            user.updateMany({ _id: id }, { $push: { myitems: data } }),
            user.findByIdAndUpdate({ _id: id }, { $set: { addcart: [] } }),
            user.findByIdAndUpdate({ _id: id }, { $set: { newItems: [] } }),
            user.findByIdAndUpdate({ _id: id }, { $push: { newItems: data } }, { expireAfterSeconds: 60 }),
            user.findByIdAndUpdate({ _id: id }, { $push: { orderhistory: { amount, id: data } } })
        ])
        res.status(200).json({
            success: true,
            message: "Order completed successfully 🎉"
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        let { id } = req.params
        let { cookies } = req.body
        let decode = jwt.verify(cookies.token, process.env.JWT_SECRET)
        let data = await user.updateOne({ email: decode }, { $pull: { addcart: id } })
        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            data
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}

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
                    message: "Successfully SAVE"
                })
            }
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const favouritesDEL = async (req, res, next) => {
    const { email, id } = req.body;
    try {
        user.updateOne({ email }, { $pull: { myfavourites: id } }).then((r) => {
            res.status(200).json({
                success: true,
                message: "Successfully Deleted"
            })
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}