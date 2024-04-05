// This is a route handler to update the property 'isFavorite' of a building

import { Router } from 'express';
import UserAndBuilding from '../../models/user-and-building.js';
import BuildingModel from '../../models/building.js';

const router = Router();

/* router.put('/add-to-favorite/:id', (req, res) => {
    UserAndBuilding.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { isFavorite: true } },
        { new: true }
    )
        .then((updatedBuilding) => {
            console.log("@@@Added building: ", updatedBuilding);
            res.send(updatedBuilding);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}); */

/* router.put('/cancel-favorite/:id', (req, res) => {
    UserAndBuilding.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { isFavorite: false } },
        { new: true }
    )
        .then((updatedBuilding) => {
            console.log("@@@Canceled building: ", updatedBuilding);
            res.send(updatedBuilding);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}); */

router.put('/add-to-favorite/:userId/:buildingId', (req, res) => {
    UserAndBuilding.findOneAndUpdate(
        { _id: req.params.userId, 'favoriteBuildings._id': req.params.buildingId },
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
