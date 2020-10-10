'use strict';

const db = require('../database/config');
const bcrypt = require('bcrypt-nodejs');

exports.login = async (user) => {
    const connection = db.connection();
    const result = await connection.select('id', 'email', 'password')
            .from('user')
            .where('email', user.email);

    if (result.length === 0) throw new Error('User not found');

    await bcrypt.compare(user.password, result[0].password,function(err, match) {
        if (err) {
            console.log(err);
            throw new Error('Cannot decode hash')
        }
    });
    return result;
};
