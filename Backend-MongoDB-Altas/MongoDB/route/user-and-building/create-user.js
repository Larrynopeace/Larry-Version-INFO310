// This is the route handler for creating a new user

import { Router } from 'express';
import UserAndBuilding from '../../models/user-and-building.js';
//import mongoose from 'mongoose';

// Hardcoded the building ids from an existing building collection
/* const b1 = new mongoose.Types.ObjectId('660df82972ce27235d99a2b1');
const b2 = new mongoose.Types.ObjectId('660df82972ce27235d99a2b2');
const b3 = new mongoose.Types.ObjectId('660df82972ce27235d99a2b3'); */

// Hardcoded the building 
const b1 = {
    buildingName: "Library",
    capacity: 100,
    isFavorite: false
};

const b2 = {
    buildingName: "Gym",
    capacity: 200,
    isFavorite: false
};

const b3 = {
    buildingName: "Cafe",
    capacity: 300,
    isFavorite: false
};


const router = Router();

router.post('/user/create', (req, res) => {
    // This is an object that we are going to save to the database
    const newUser = new UserAndBuilding({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        favoriteBuildings: [
            b1, b2, b3
        ]
    })

    // Check if the user already exists

    newUser.save()
        .then((data) => {
            console.log("@@@Created user:", data);
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

export default router;