import express from "express"
const routes = express.Router();
import order from "../Controllers/paymentsController.js"
routes.post("/create-order", order);
export default routes;
