const jwt = require('jsonwebtoken');

const salt = 'saltK3y';
const authenticate = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' })
    }
    jwt.verify(token, salt, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
        }
        next()
    })
};

module.exports = {authenticate};
