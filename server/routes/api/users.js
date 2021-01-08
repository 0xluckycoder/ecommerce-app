const router = require('express').Router();
const bcrypt = require('bcryptjs');
const auth  = require('../../middleware/auth');
const User = require('../../models/User');
const signToken = require('../../helpers/signToken');

// @route PUT api/users
// @desc Update existing user
// @access Authenticated users only
router.put('/', auth, async (req, res) => {
    const { id, firstName, lastName, shippingAddress } = req.body;

    try {
        if (!id || !firstName || !lastName || !shippingAddress) {
            res.status(400).json({
                error: 'Please enter all fields'
            });
        }
        
        await User.findOneAndUpdate(id , { firstName, lastName, shippingAddress });

        const updatedUser = await User.findById(id);
        if (updatedUser) return res.json({ data: updatedUser });

    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
    }
});

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', async (req, res) => {
    const { firstName, lastName, email, shippingAddress, password } = req.body;

    // eslint-disable-next-line no-console
    console.log(req.body);

    try {
        // simple validation
        if (!firstName || !lastName || !email || !shippingAddress || !password) {
            res.status(400).json({
                error: 'Please enter all fields'
            });
        }
        
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });    

        const newUser = new User({
            firstName, lastName, email, password, shippingAddress
        });

        bcrypt.genSalt(10, (saltErr, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;

                try {
                    const savedUser = await newUser.save();
                    const accessToken = signToken(savedUser, 3600000); // 1 hour

                    res.cookie("__token", accessToken, { httpOnly: true, expires: new Date(Date.now() + 3600000) });
                    return res.status(200).json({ user: savedUser });

                } catch(error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    return res.json({ error: "server error" }).status(500);
                }
            });
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.json({ error: "server error" }).status(500);
    }
});

module.exports = router;