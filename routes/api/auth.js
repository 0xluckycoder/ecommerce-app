const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken'); 

const auth = require('../../middleware/auth');

// item modal
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth user
// @access Public
router.post('/', async (req, res, next) => {
    const {email, password} = req.body;

    try {
        // simple validation
        if (!email || !password) {
            res.status(400).json({ error: 'Please enter all fields' });
        }

        // check for existing user
        const user = await User.findOne({ email });
        user || res.status(400).json({ error: 'User Does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(400).json({ error: 'Invalid Credentials' });

        jwt.sign(
            {id: user.id},
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                // send success response
                res.status(200).json({ token, user });
            }
        )
    } catch (error) {
        console.log(error);    
    }
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

module.exports = router;