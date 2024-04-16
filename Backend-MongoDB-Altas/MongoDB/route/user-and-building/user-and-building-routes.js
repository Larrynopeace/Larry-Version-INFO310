// This is an encapsulate route for all buildings with a specific user

import { Router } from 'express';
import getAll from './get-user-and-building.js';
import updateFavorite from './update-favorite.js';
import createUser from './create-user.js';
import loginUser from './login.js';

const router = Router();

// Use the created routes: CRUD
router.use(getAll);
router.use(updateFavorite);
router.use(createUser);
router.use(loginUser);

export default router;


