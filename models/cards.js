import mongoose from "mongoose";
const cardsSchema = new mongoose.Schema({},
    { strict: false }
)
const cards = mongoose.model("cards", cardsSchema)
export default cards;