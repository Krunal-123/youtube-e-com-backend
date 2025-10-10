import express from "express"
const routes = express.Router();
// import Controllers
import { addcart, getCartsUser, purchase, deleteCart,favourites,favouritesDEL } from "../Controllers/userCartsControllers.js"
routes.post("/", addcart)
routes.post("/get", getCartsUser)
routes.post("/purchase", purchase)
routes.delete("/delete/:id", deleteCart)
routes.patch("/favourites",favourites)
routes.delete("/favourites", favouritesDEL)
export default routes;
