// Run this server by command: node index.js

// Create const express
import express from 'express';

// Create const app
const app = express();

// *Import cors to allow cross origin requests, because we are running on localhost:3000 and our vue app is running on localhost:5173
import cors from 'cors';
app.use(cors());
app.use(express.json());
// This urlencoded middleware function parses incoming request bodies before your handlers are called, specifically URL-encoded data (data sent from a form with the application/x-www-form-urlencoded MIME type).
// The parsed data will be populated on the req.body object. This means that in your route handlers, you can access the data sent in the request with req.body.
app.use(express.urlencoded({ extended: false }));

// Import mongodb-setting.js
import db from './MongoDB/mongodb-setting/mongodb-setting.js';
import userAndBuildingRoutes from './MongoDB/route/user-and-building/user-and-building-routes.js';

// Connect to mongoDB
db(() => {

    // Use the user and building routes
    app.use(userAndBuildingRoutes);

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