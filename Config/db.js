import mongoose from "mongoose";
const ConnectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(`✅ Connected to MongoDB on port ${process.env.PORT}`);
  } catch (error) {
    console.log(`❌ Connection failed on port ${process.env.PORT}. Try again!`);
  }
};

export default ConnectionDB;