// This is a route hadnler to get all buildings with a specific user -- It is not used

import { Router } from 'express';
import UserAndBuilding from '../../models/user-and-building.js';

const router = Router();

router.get('/user-and-building/:username', (req, res) => {
    UserAndBuilding.findOne({username: req.params.username}) // It finds the first document when no query is provided
        .populate('favoriteBuildings')// The reason why we use populate is because we want to get the actual building data, not just the building id
        .then((userAndBuilding) => {
            console.log("@@@User and building:", userAndBuilding);
            res.send({userAndBuilding});
        })
        .catch((err) => {
            res.send(err);
        });
});

export default router;