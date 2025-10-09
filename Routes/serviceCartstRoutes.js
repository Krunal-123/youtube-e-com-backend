import express from "express"
const router = express.Router()
import { servivce, search, review } from "../Controllers/servicesCartstRoutes.js"
import routes from "./authRoutes.js"

routes.post("/", servivce)
routes.post("/search", search)
routes.post("/review", review)

export default routes;
