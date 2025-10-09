import user from "../models/user"
import UserDetails from "../models/UserDetails"
import ErrorHandler from "../Utils/ErrorHandler"
const updateDetails = async (req, res,next) => {
    try {

        let { profilePic, firstName, lastName, email, gender, number } = req.body
        user.updateOne({ email }, { profilePic, firstName, lastName, gender, number }).then((r) => {
            res.status(200).json({
                success: true,
                message: "Updated Succesfully"
            })
        })
    } catch (err) {
        return next(new ErrorHandler());
    }
}
const contactus = async (req, res,next) => {
    try {

        let { Name, Phone, Email, Subject, Message } = req.body;
        await UserDetails({ Name, Phone, Email, Subject, Message }).save();
        res.status(200).json({
            success: true,
            message: "Submited Successfully"
        });
    } catch (err) {
        return next(new ErrorHandler());
    }
}
export default { updateDetails, contactus }