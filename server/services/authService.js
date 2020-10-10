'use strict';

const jwt = require('jsonwebtoken');
// TODO move secrets to  env vars
const expirationTime = '5m';
const expirationTimeRefreshToken = '1d';
const salt = 'saltK3y';
const refreshTokenKey = 'refreshK3y';

exports.generateToken = async (data) => {
    return jwt.sign(data, salt, { expiresIn: expirationTime })
};

exports.generateRefreshToken = async (data) => {
    return jwt.sign(data, refreshTokenKey, { expiresIn: expirationTimeRefreshToken})
};

exports.decodeToken = async (token) => {
    const data = await jwt.verify(token, salt);
    return data
};

exports.authorize = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.json(400, { message: 'Access Restricted' })
    } else {
        jwt.verify(token, saltkey, function (error, decoded) {
            if (error) return res.json(400, { message: 'Token Invalid' });
            return next()
        })
    }
};
