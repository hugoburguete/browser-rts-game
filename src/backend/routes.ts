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
router.get('/api/v1/user', UsersController.get);
router.get('/api/v1/user/:userId', UsersController.get);

export default router;