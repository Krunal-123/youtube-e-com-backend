import express from "express";
const routes = express.Router();
import { updateDetails, contactus } from "../Controllers/userInfoControllers.js";
routes.patch("/", updateDetails);
routes.post("/contactus", contactus);
export default routes;