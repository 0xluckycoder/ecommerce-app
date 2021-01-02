// import express from 'express';
// import mongoose from 'mongoose';
// import path from 'path';
// import cors from 'cors';
// import morgan from 'morgan';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('config');
const morgan = require('morgan');
// const items = require('./routes/api/items');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan('dev'));

// DB config
const db = config.get('mongoURI');

// connect to the database
mongoose.connect(db ,{ 
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log(`🍃 connected to database`)
).catch(error => console.log(error));

// use routes
app.use('/api/items', require('./routes/api/Items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// error handler
// app.use((req, res) => {
//     let error = new Error('Route not found');
//     error.status = 404;
//     console.log('❌❌',error);
// });

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🌵 Server running on port ${PORT}`));