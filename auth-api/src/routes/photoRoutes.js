import { Router } from "express";
import login from '../middlewares/login'
import photoController from "../controllers/PhotoController";



const router  = new Router();
router.post('/', login, photoController.store);

export default router