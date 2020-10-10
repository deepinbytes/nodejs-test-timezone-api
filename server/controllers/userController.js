'use strict';

const uuid = require('uuid/v4');
const bcrypt = require('bcrypt-nodejs');
const userModel = require('../models/userModel');

exports.register = async (req, res, next) => {
    try {
        let data;
        const id = await uuid();
        let salt = bcrypt.genSaltSync();
        await bcrypt.hash(req.body.password,salt,null,function(err, hash) {
            if (err) {
                console.log(err)
            }
            const user = {
                id: id,
                email: req.body.email,
                password: hash
            };
            data =  userModel.create(user);
            if (!data.hasOwnProperty('error')) {
                return res.status(201).send({
                    id: id,
                    user: `User ${user.email} created`
                })
            } else {
                return res.status(406).send(data)
            }
        });
    } catch(error) {
        console.error(error);
        return res.status(400).send({ message: error.message })
    }
};