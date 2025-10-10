import express from "express"
const routes = express.Router();
// controllers
import themeMode from "../Controllers/darkModeControllers.js"
routes.post("/", themeMode)
export default routes;
