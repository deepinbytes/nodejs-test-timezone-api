'use strict';

const authModel = require('../models/authModel');
const authService = require('../services/authService');

const tokenList = {};
exports.login = async (req, res, next) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password
        };

        const data = await authModel.login(credentials);
        if (data[0]) {
            const { email } = data[0];
            const token = await authService.generateToken({ email });
            const refreshToken = await authService.generateRefreshToken({ email });
            const response = {
                "status": "Logged in",
                "token": token,
                "refreshToken": refreshToken,
                "email":email
            };
            tokenList[refreshToken] = response;

            return res.status(200).send(response)
        }
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        if((req.body.refreshToken) && (req.body.refreshToken in tokenList)
            && (tokenList[req.body.refreshToken].email === req.body.email)) {
            const email = req.body.email;
            const token = await authService.generateToken({ email });
            const response = {
                "token": token,
                "email": email
            };
            // update the token in the list
            tokenList[req.body.refreshToken].token = token;
            res.status(200).json(response);
        } else {
            res.status(404).send('Invalid request')
        }
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
};