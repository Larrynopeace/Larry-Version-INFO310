// Encapsulate the user model in a module

// import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, /* { collection: 'users' } */); // Specify the collection names in the database

// 'users' is the collection name in the MongoDB database
let UserModel = model('users', UserSchema);

export default UserModel;