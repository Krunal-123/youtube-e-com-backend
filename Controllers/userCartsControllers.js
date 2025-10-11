import jwt from "jsonwebtoken"
import user from "../models/user.js"
import ErrorHandler from "../Utils/ErrorHandler.js"
import dotenv from "dotenv";
dotenv.config();

export const addcart = async (req, res, next) => {
    try {
        const { id, cookies } = req.body
        const decode = jwt.verify(cookies.token, process.env.JWT_SECRET)
        const data = await user.updateOne({ email: decode.email }, { $push: { addcart: id } })
        res.status(200).json({
            success: true,
            message: "Successfully added to cart",
            data
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const getCartsUser = async (req, res, next) => {
    try {
        const { cookies } = req.body
        const decode = jwt.verify(cookies.token, process.env.JWT_SECRET)
        const userData = await user.find({ email: decode.email }).populate("addcart").populate("myitems").populate("myfavourites").populate('orderhistory.id')
        res.status(200).json({
            success: true,
            message: "Successfully",
            data: userData
        });
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const purchase = async (req, res, next) => {
    const { data, id, amount } = req.body
    await Promise.all([
        user.updateMany({ _id: id }, { $push: { myitems: data } }),
        user.findByIdAndUpdate({ _id: id }, { $set: { addcart: [] } }),
        user.findByIdAndUpdate({ _id: id }, { $set: { newItems: [] } }),
        user.findByIdAndUpdate({ _id: id }, { $push: { newItems: data } }, { expireAfterSeconds: 60 }),
        user.findByIdAndUpdate({ _id: id }, { $push: { orderhistory: { amount, id: data } } })
    ]).then(data => {
        res.status(200).json({
            success: true,
            message: "🥳New Item Added🎉"
        })
    }).catch(error => {
        return next(new ErrorHandler());
    })

}

export const deleteCart = async (req, res, next) => {
    try {
        const { id, cookies } = req.params
        const decode = jwt.verify(cookies, process.env.JWT_SECRET)
        const data = await user.updateOne({ email: decode.email }, { $pull: { addcart: id } })
        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            data
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}