import { Router } from "express";
import userController from "../controllers/UserController";
import login from "../middlewares/login";
const router  = new Router();

router.post('/', userController.store);
router.get('/', login,  userController.index);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
export default router; 