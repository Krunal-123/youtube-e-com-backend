import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();
import ConnectionDB from "./Config/db.js"
// Error Handler
import { errorMiddleware } from "./MiddleWares/errorMiddleware.js";
// Routes import
import authRoutes from "./Routes/authRoutes.js";
import darkModeRoutes from "./Routes/darkModeRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import resetRoutes from "./Routes/resetRoutes.js";
import serviceCartRoutes from "./Routes/serviceCartstRoutes.js";
import userCartRoutes from "./Routes/userCartRoutes.js";
import userInfoRoutes from "./Routes/userInfoRoutes.js";
import favouritesCartsRoutes from "./Routes/favouritesCartsRoutes.js"

const app = express()
app.use(cors({
  origin: [process.env.ORIGIN],
  methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
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

app.use("/api/auth", authRoutes);
app.use("/darkmode", darkModeRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/reset", resetRoutes);
app.use("/cart", serviceCartRoutes);
app.use("/addcart", userCartRoutes);
app.use("/addfavourites", favouritesCartsRoutes)
app.use("/userinfo", userInfoRoutes);
app.use("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "This Page Doesn't Exist!"
  })
});

//   App listing
app.listen(process.env.PORT, () => {
  console.log(`Listning on PORT ${process.env.PORT}`);
})
