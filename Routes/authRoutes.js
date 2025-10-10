import express from "express"
const routes = express.Router()
// Routes
import { login, signup, sendOTP } from "../Controllers/authController.js"

routes.post("/signup", signup)
routes.post("/login", login)
routes.post("/verify", sendOTP)

export default routes;