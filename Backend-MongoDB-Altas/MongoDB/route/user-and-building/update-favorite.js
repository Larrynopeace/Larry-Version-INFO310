// This is a route handler to update the property 'isFavorite' of a building

import { Router } from 'express';
import UserAndBuilding from '../../models/user-and-building.js';

const router = Router();

// Due to the building object that we need to update is nested in an user object, we need to specify the user id and the building id
router.put('/add-to-favorite/:userId/:buildingId', (req, res) => {
    UserAndBuilding.findOneAndUpdate(
        { _id: req.params.userId, 'favoriteBuildings._id': req.params.buildingId },
        // $set is a MongoDB operator that sets or updates the value of a field
        { $set: { 'favoriteBuildings.$.isFavorite': true } },
        { new: true }
    )
        .then((updatedUser) => {
            console.log("@@@Added building: ", updatedUser);
            res.send(updatedUser);
        })
        .catch((err) => {
            res.status(400).send(err);
            console.log(err);
        });
});

router.put('/cancel-favorite/:userId/:buildingId', (req, res) => {
    UserAndBuilding.findOneAndUpdate(
        { _id: req.params.userId, 'favoriteBuildings._id': req.params.buildingId },
        { $set: { 'favoriteBuildings.$.isFavorite': false } },
        { new: true }
    )
        .then((updatedUser) => {
            console.log("@@@Canceled building: ", updatedUser);
            res.send(updatedUser);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

export default router;
