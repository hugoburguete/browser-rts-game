import { Router } from "express";
import * as UsersController from './controllers/users.controller';

const router: Router = Router();
router.route('/users')
  .get(UsersController.get)
  .post(UsersController.post)

export default router;