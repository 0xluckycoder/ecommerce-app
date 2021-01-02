const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken'); 
const auth  = require('../../middleware/auth');

// item modal
const User = require('../../models/User');

// @route PUT api/users
// @desc Update existing user
// @access Authenticated users only
router.put('/', auth, async (req, res, next) => {
    const { id, firstName, lastName, shippingAddress } = req.body;

    try {
        if (!id || !firstName || !lastName || !shippingAddress) {
            res.status(400).json({
                error: 'Please enter all fields'
            });
        }
        
        // find the user by id
        await User.findOneAndUpdate(id , { firstName, lastName, shippingAddress });
        // return the updated user to client
        const updatedUser = await User.findById(id);
        if (updatedUser) {
            res.json({ data: updatedUser });
        }

    } catch (error) {
        console.log(error.message);
    }
});

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', async (req, res, next) => {
    const {firstName, lastName, email, shippingAddress, password} = req.body;

    console.log(req.body);

    try {
        // simple validation
        if (!firstName || !lastName || !email || !shippingAddress || !password) {
            res.status(400).json({
                error: 'Please enter all fields'
            });
        }
        
        const user = await User.findOne({ email });
        user && res.status(400).json({ error: 'User already exists' });

        // const newUser = new User({
        //     firstName, lastName, email, shippingAddress, password
        // });

        const newUser = new User({
            firstName, lastName, email, password, shippingAddress
        });

        // generate salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                // handle server  validation erros in here
                try {
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
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email
                            }});
                        }
                    );
                } catch(error) {
                    console.log(error);
                    // send db validation failed response
                    error && res.status(400).json({ error: 'Validation failed, Please try again' });
                }
            });
        });
    } catch (error) {
        console.log(error);
        // res.status(500).json({ error: 'Server Error Occurred Please Try Again' });
    }

    // check for existing user
    // try {


    // } catch (error) {
    //     console.log(error);    
    // }
});

module.exports = router;