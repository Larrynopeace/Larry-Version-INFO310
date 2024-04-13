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

// 'building' is the collection name in the MongoDB database
const Building = model('buildings', BuildingSchema);

export default Building;