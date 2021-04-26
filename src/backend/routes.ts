import { Router } from "express";
import * as UsersController from './controllers/users.controller';
import * as AuthController from './controllers/auth.controller';
import * as AuthedMiddleware from './middleware/authed.middleware';

const router: Router = Router();

// Authentication routes
router.post('/api/v1/register', AuthController.register);
router.post('/api/v1/login', AuthController.login);

// Logged in routes
router.get('/api/v1/user', AuthedMiddleware.isAuthenticated, UsersController.get);
router.get('/api/v1/user/:userId', AuthedMiddleware.isAuthenticated, UsersController.get);

export default router;