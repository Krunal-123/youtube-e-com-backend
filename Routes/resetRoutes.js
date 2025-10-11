import express from 'express'
const routes = express.Router();
// Controllers
import resetPass from '../Controllers/resetPass.js'

routes.patch('/', resetPass)

export default routes;
