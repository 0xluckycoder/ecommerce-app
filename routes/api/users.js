const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken'); 

// item modal
const User = require('../../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', async (req, res, next) => {
    const {name, email, password} = req.body;

    // simple validation
    if (!name || !email || !password) {
        res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    // check for existing user
    try {
        const user = await User.findOne({ email });
        user && res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            name,
            email,
            password
        });

        // generate salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                
                const user = await newUser.save();
                
                jwt.sign(
                    {id: user.id},
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;

                        // send success response
                        res.status(200).json({ token, user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }});
                    }
                )
            });
        });

    } catch (error) {
        console.log(error);    
    }
});

module.exports = router;