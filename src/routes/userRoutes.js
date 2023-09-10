import { Router } from "express";
import userController from "../controllers/UserController";
import login from "../middlewares/login";
const router  = new Router();


router.get('/', login,  userController.index);


router.post('/', userController.store);
router.get('/:id', login, userController.show);
router.put('/', login, userController.update);
router.delete('/', login,  userController.delete);
export default router; 