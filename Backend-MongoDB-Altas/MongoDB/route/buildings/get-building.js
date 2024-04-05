// This is the route handler to get all buildings

import { Router } from 'express';
import BuildingModel from '../../models/building.js';

const router = Router();

router.get('/buildings/all', (req, res) => {
    BuildingModel.find()
        .then((buildings) => {
            res.send(buildings);
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;
