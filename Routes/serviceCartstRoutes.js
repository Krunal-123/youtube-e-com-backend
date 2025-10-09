import express from "express"
const router = express.Router()
import { servivce, search, review } from "../Controllers/servicesCartstRoutes.js"

router.post("/", servivce)
router.post("/search", search)
router.post("/review", review)

export default routes;
