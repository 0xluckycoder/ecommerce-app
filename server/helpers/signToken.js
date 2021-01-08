const { sign } = require('jsonwebtoken');

const signToken = (user, expires) => sign({userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expires });

module.exports = signToken;

