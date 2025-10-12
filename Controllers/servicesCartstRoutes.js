import mongoose from "mongoose";
import cards from "../models/cards.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const services = async (req, res, next) => {
    try {
        let filter = req.body
        if (filter == undefined || filter.categorise == "all") {
            filter = {}
        }
        const data = await cards.find(filter)
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
        const { value } = req.body
        // check condition string has number or not
        if (value.match(/\d+/g)) {
            const [num] = value.match(/\d+/g).map(Number)
            const data = await cards.find({ price: { $lt: num * 2 } })
            res.status(200).json({
                success: true,
                message: "Successfully Finded",
                data
            })
        }
        else {
            const data = await cards.find({ $or: [{ categorise: { $regex: value, $options: "i" } }, { title: { $regex: value, $options: "i" } }] })
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
    const { reviewData } = req.body
    const { id, profilePic, name, review, rating } = reviewData
    console.log({ id, profilePic, name, review, rating });
    if (rating == null) {
        rating = 0
    }
    cards.findByIdAndUpdate(
        { _id: id },
        {
            $push: {
                reviews: {
                    _id: new mongoose.Types.ObjectId(),
                    profilePic,
                    name,
                    review,
                    rating,
                    createdAt: new Date(),
                },
            },
        },
        { new: true }
    )
        .then((r) => {
            res.status(200).json({
                success: true,
                message: "Submitted Successfully",
            });
        })
        .catch((err) => {
            return next(new ErrorHandler(500, "Failed to submit review", err));
        });
}