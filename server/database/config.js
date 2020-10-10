'use strict';

require('dotenv').config();
const knex = require('knex');

const connection = () => {
    try {
        const connection = knex({
            client: 'mysql',
            connection: {
                host: 'database',
                user: 'test',
                password: 'test',
                database: 'test',
                port: 3306
            }
        });
        return connection
    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    connection
};
