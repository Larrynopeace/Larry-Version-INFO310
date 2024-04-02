//This is the route handler for all user related requests

import { Router } from 'express';

// Import create-user route
import loginUser from '../user/login-user.js';

const router = Router();

// Use the routes: CRUD
router.use(loginUser);

export default router;