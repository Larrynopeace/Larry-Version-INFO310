// This is the route handler for all building related requests

import { Router } from 'express';

// Import get-building route
import getBuilding from '../buildings/get-building.js';

const router = Router();

// Use the created routes: CRUD
router.use(getBuilding);

export default router;