import express from "express"
const routes = express.Router();
import themeMode from "../Controllers/darkModeControllers.js"
routes.post("/", themeMode)
export default routes;
