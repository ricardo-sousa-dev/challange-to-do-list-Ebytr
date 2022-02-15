const jwt = require('jsonwebtoken'); // import jwt module from nodejs

const JWT_SECRET = process.env.JWT_SECRET || 'secret'; // import JWT_SECRET from .env file

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        const err = new Error('missing auth token');
        err.status = 401;
        
        return next(err);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('>>>>>>>>>>>>> ~ decoded', decoded);
        req.user = decoded;
        
        return next();
    } catch (err) {
        err.status = 401;
        return next(err);
    }
};