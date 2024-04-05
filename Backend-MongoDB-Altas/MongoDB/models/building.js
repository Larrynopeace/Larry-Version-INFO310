// Encapsulate the building model in a module

// import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const BuildingSchema = new Schema({
    buildingName: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
});

const Building = model('buildings', BuildingSchema);

export default Building;