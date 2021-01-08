const { verify } = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.__token;

    if (!token)  { 
        return res.status(401).json({ error: 'TOKEN_ERR' });
    }
    
    try {
        const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'TOKEN_ERR' });
    }
}

module.exports = auth