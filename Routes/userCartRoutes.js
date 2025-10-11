import express from "express"
const routes = express.Router();
// import Controllers
import { addcart, getCartsUser, purchase, deleteCart } from "../Controllers/userCartsControllers.js"
routes.post("/", addcart)
routes.post("/get", getCartsUser)
routes.post("/purchase", purchase)
routes.delete("/delete/:id/:cookies", deleteCart)
export default routes;
