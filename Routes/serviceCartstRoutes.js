import express from "express"
const routes = express.Router()
import { services, search, review } from "../Controllers/servicesCartstRoutes.js"

routes.post("/", services)
routes.post("/search", search)
routes.post("/review", review)

export default routes;
