import { Router } from "express";
import * as UsersController from './controllers/users.controller';
import * as AuthController from './controllers/auth.controller';
import * as AuthedMiddleware from './middleware/authed.middleware';

const router: Router = Router();
// Authentication routes
router.post('/api/v1/register', AuthController.register);
router.post('/api/v1/login', AuthController.login);

// Logged in routes
router.use(AuthedMiddleware.isAuthenticated)
router.route('/api/v1/users')
  .get(UsersController.get)
  .post(UsersController.post)

export default router;