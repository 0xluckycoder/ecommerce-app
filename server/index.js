const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// connect to the database
mongoose.connect(process.env.MONGO_URI ,{ 
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
// eslint-disable-next-line no-console
}).then(() => console.log(`🍃 connected to database`)
// eslint-disable-next-line no-console
).catch(error => console.log(error));

// api routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`🌵 Server running on port ${PORT}`));