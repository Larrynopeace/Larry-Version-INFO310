// This is a route hadnler to get all buildings with a specific user

import { Router } from 'express';
import UserAndBuilding from '../../models/user-and-building.js';

const router = Router();

router.get('/user-and-building', (req, res) => {
    UserAndBuilding.findOne() // It finds the first document when no query is provided
        .populate('favoriteBuildings')
        .then((userAndBuilding) => {
            console.log("@@@User and building:", userAndBuilding);
            res.send({userAndBuilding});
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;