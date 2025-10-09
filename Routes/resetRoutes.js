import express from 'express'
const routes = express.Router();
// Controllers
import resetPass from '../Controllers/resetPass.js'
routes.post('/', resetPass)

export default routes;
