require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;


// DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('open', () => {
    console.log('Connected to database');
})

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/', require('./routes/todos'));

// LISTEN TO PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})