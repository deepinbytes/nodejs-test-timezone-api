'use strict';
var fs = require('fs');
require('dotenv').config();
const knex = require('knex');
var path = require('path');
var timezone_sql = fs.readFileSync(path.join(__dirname, '../../docker-sql/timezonedb.sql')).toString();

const connection = knex({
    client: 'mysql',
    version: '5.7',
    connection: {
        host: '172.25.0.2',
        user: 'test',
        password: 'test',
        database: 'test',
        port: 3306,
    multipleStatements: true
    }
});

exports.testSeed = async (user) => {
    var fillTimezoneData = connection
        .raw('use test')
        .then(() => connection.raw(timezone_sql));
    console.log("seeded data : " + fillTimezoneData);
    return
};

exports.createDummyAccounts = async (user) => {

    var fillTimezoneData = connection
        .raw('use test')
        .then(() => connection.raw(timezone_sql));
    console.log("seeded data : " + fillTimezoneData);
    return
};










