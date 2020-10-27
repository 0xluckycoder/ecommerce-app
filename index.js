// import express from 'express';
//import mongoose from 'mongoose';
//import path from 'path';
//import cors from 'cors';
//import morgan from 'morgan';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// import items from './routes/api/items';
const items = require('./routes/api/items');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.connect();

// use routes
app.use('/api/items', items);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🌵 Server running on port ${PORT}`));