import mongoose from "mongoose";
const userdetailsSchema= new mongoose.Schema({},{strict:false})
const UserDetails= mongoose.model("UserDetails",userdetailsSchema)
export default UserDetails;
 