'use strict';

const uuid = require('uuid/v4');

const db = require('../database/config');

Object.prototype.isEmpty = function() {
    for (let key in this) {
        if(this.hasOwnProperty(key)) { return false; }
    }
    return true;
};

exports.seedDummyAccounts = async() =>{
    const connection = db.connection();
    const dummyUsers = [
        {
            "email":"test@b.com",
            "password":"test123"
        },
        {
            "email":"test2@b.com",
            "password":"test123"
        },
        {
            "email":"test3@d.com",
            "password":"test123"
        },
        {
            "email":"test4@b.com",
            "password":"test123"
        },

    ];
    try {
        const data = await dummyUsers.map(x => {
            const id =  uuid();
            return {
                id: id,
                email: x.email,
                password: '$2a$10$vTowWDEXnp8LJbNCDhr.t.DsJMqag/7X83iL.iQHFhr0VKXqE3ARW'
            };
        });
        console.log(data);
        await connection.insert(data).into('user');
    } catch (err) {
        console.log(err);
    }
};

exports.create = async (user) => {
    const connection = db.connection();

    const data = await connection.select('id', 'email')
            .from('user')
            .where('email', user.email)
            .then((resultSet) => {
                return resultSet
            });
    
    if (data[0] === undefined) {
        console.log("user entry inserted!");
        await connection.insert(user).into('user');
        return data
    } else {
        return {error: `User ${user.email} already exists!`}
    }

};
