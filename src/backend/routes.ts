import { Request, Response, Router } from "express";
import * as UsersController from './controllers/users.controller';
import * as AuthController from './controllers/auth.controller';
import * as AuthedMiddleware from './middleware/authed.middleware';
import * as VillageController from './controllers/village.controller';

const router: Router = Router();

// Authentication routes
router.post('/api/v1/register', AuthController.register);
router.post('/api/v1/login', AuthController.login);
router.post('/api/v1/reauthenticate', AuthController.refreshToken);

// --- Logged in routes

// User
router.get('/api/v1/user', AuthedMiddleware.isAuthenticated, UsersController.get);
router.get('/api/v1/user/:userId', AuthedMiddleware.isAuthenticated, UsersController.get);

// Village
router.get('/api/v1/village', AuthedMiddleware.isAuthenticated, VillageController.get);
router.post('/api/v1/village/:villageId/building', AuthedMiddleware.isAuthenticated, VillageController.levelBuilding);

// Any other routes should 404
router.get('/api/v1/*', (req: Request, res: Response) => res.status(404));

export default router;