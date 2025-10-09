import { json } from "stream/consumers";
import cards from "../models/cards";
import ErrorHandler from "../Utils/ErrorHandler";

export const services = async (req, res, next) => {
    try {
        let categorise = req.body
        if (categorise == undefined || categorise.categorise == "all") {
            categorise = {}
        }
        let data = await cards.find(categorise)
        res.status(200).json({
            success: true,
            message: "Successfully",
            data
        })
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const search = async (req, res, next) => {
    try {
        let { value } = req.body
        // check condition string has number or not
        if (value.match(/\d+/g)) {
            let [num] = value.match(/\d+/g).map(Number)
            let data = await cards.find({ price: { $lt: num * 2 } })
            res.status(200).json({
                success: true,
                message: "Successfully Finded",
                data
            })
        }
        else {
            let data = await cards.find({ $or: [{ categorise: { $regex: value, $options: "i" } }, { title: { $regex: value, $options: "i" } }] })
            res.status(200).json({
                success: true,
                message: "Successfully Finded",
                data
            })
        }
    } catch (error) {
        return next(new ErrorHandler());
    }
}

export const review = async (req, res, next) => {
    try {

        let { reviewData } = req.body
        let { id, profilePic, name, review, rating } = reviewData
        if (rating == null) {
            rating = 0
        }
        cards.findByIdAndUpdate({ _id: id }, { $push: { reviews: { _id: new mongoose.Types.ObjectId(), profilePic, name, review, rating, createdAt: Date() } } }, { new: true })
            .then((r) => {
                res.status(200), json({
                    success: true,
                    message: "Review Submited Successfully"
                })
            })
    } catch (err) {
        return next(new ErrorHandler());
    }
}