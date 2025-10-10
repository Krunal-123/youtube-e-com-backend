import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    profilePic: {
        type: String,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    number: {
        type: Number
    },
    addcart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'cards'
    },
    myitems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'cards'
    },
    myfavourites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'cards'
    },
    orderhistory: [{
        id: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'cards'
        },
        amount: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
    ,
    newItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'cards'
    },
    lightMode: {
        type: Boolean
    }
    , createdAt: {
        type: Date,
        default: Date.now
    }
}
)
const user = mongoose.model('user', userSchema)
export default user;