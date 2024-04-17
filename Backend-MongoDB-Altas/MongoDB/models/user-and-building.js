// This is a modal of a user which has an array of buildings

import { Schema, model } from 'mongoose';

/* const UserAndBuildingSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteBuildings: [{ type: Schema.Types.ObjectId, ref: 'buildings', required: true }]
    //favoriteBuildings: [{ type: Schema.Types.ObjectId, ref: 'buildings' }]
}); */

const BuildingSchema = new Schema({
    buildingName: { type: String, required: true },
    capacity: { type: Number, required: true },
    isFavorite: { type: Boolean, required: true },
});

const UserAndBuildingSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteBuildings: [BuildingSchema]
});

// 'users_and_buildings' is the collection name in the MongoDB database
const UserAndBuilding = model('users_and_buildings', UserAndBuildingSchema);

export default UserAndBuilding;
