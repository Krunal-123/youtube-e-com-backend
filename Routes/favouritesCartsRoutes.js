import express from "express";
import { favourites, favouritesDEL } from "../Controllers/favouritesCartsControllers.js";
const routes = express.Router();

routes.post("/", favourites);
routes.delete("/del/:id/:email", favouritesDEL);

export default routes;