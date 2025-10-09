import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();
import ConnectionDB from "./Config/db.js"
// Error Handler
import { errorMiddleware } from "./MiddleWares/errorMiddleware.js";
import ErrorHandler from "./Utils/ErrorHandler.js";

const app = express()
app.use(cors({
    origin: ['https://youtube-e-com-frontend.onrender.com', 'http://localhost:5173'],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}))

// DataBase Connection
ConnectionDB()

app.use(express.json())
app.use(cookieParser())
// middlewares
app.use(express.json({ extended: false }));
// Must be after all routes
app.use(errorMiddleware);

app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/mode", require("./Routes/darkModeRoutes"));
app.use("/api/payment", require("./Routes/paymentRoutes"));
app.use("/reset", require("./Routes/resetRoutes"));
app.use("/cart", require("./Routes/serviceCartstRoutes"));
app.use("/addcart", require("./Routes/userCartRoutes"));
app.use("/userinfo", require("./Routes/userInfoRoutes"));
app.get("*", (req, res, next) => {
  // manually throw an error
  return next(new ErrorHandler(404, "This route does not exist"));
});


//   App listing
app.listen(process.env.PORT, () => {
    console.log('listning');
})
