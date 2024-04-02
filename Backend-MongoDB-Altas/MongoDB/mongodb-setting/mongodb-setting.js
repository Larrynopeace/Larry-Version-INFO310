// Encapsulate the setting of mongodb:

// 1. connect to mongoose
// 2. import mongoose
import mongoose from 'mongoose';

// success is the callback function when connect successfully
// err is the callback function when connect failed
export default function (success, err) {

    // 3. connect to mongoDB Atlas : 'Larry_Vue3' is the specified name of the database
    mongoose.connect('mongodb+srv://Larry:larry123456@larry-info310.rm5fdxk.mongodb.net/Larry_Vue3?retryWrites=true&w=majority&appName=Larry-INFO310');

    // 4. set the connection
    // 4.1. connect successfully
    mongoose.connection.on('connected', function () {
        success(); //hand it to the callback function in server/index.js
    });


    // 4.2. connect failed
    mongoose.connection.on('error', function () {
        //console.log(err);
        err(); //hand it to the callback function in server/index.js
    });

    // 4.3. disconnect
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });

}