const router = require('express').Router();
const bcrypt = require('bcryptjs');
const signToken = require('../../helpers/signToken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route POST api/auth
// @desc Auth user
// @access Public
router.post('/', async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        let expires = 3600000 // 1 hour

        if (rememberMe) {
            expires = 2629800000 // 30 days
        }

        if (!email || !password) {
            res.status(400).json({ error: 'Please enter all fields' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User Does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid Credentials' });

        const accessToken = signToken(user, expires/1000);

        res.cookie("__token", accessToken, { httpOnly: true, expires: new Date(Date.now() + expires) });
        return res.status(200).json({ user });
        
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);    
    }
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ user });
});

// @route GET api/auth/logout
// @desc Logout the user
// @access private
router.get('/logout', auth, async (req, res) => {
    res.clearCookie("__token", { httpOnly: true });
    return res.status(200).json({ message: "success" });
});

module.exports = router;