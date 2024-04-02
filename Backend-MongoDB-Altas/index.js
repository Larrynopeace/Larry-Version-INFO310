// Run this server by command: node index.js

// Create const express
import express from 'express';

// Create const app
const app = express();

// *Import cors to allow cross origin requests, because we are running on localhost:3000 and our vue app is running on localhost:5173
import cors from 'cors';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import mongodb-setting.js
import db from './MongoDB/mongodb-setting/mongodb-setting.js';
import userRoutes from './MongoDB/route/user/user-routes.js';

// Connect to mongoDB
db(() => {
    // Use the user routes
    app.use(userRoutes);

    // success
    console.log('Connection succeeded');
}, () => {
    // err
    console.log('Connection failed');
});

// Start express server, listen to port 3000
app.listen(3000, () => {
    console.log('server started on port 3000!!!');
});