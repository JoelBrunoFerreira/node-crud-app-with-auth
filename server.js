const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./src/middlewares/error.js');
const connectDB = require ("./src/config/db");
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', require('./src/routes/goalRoutes.js'));
app.use('/api/users', require('./src/routes/userRoutes.js'));

app.use(errorHandler);

// Listening on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

