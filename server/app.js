'use strict';


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // middleware


app.use((req, res, next) => {
    // don't work under npm test
    if(process.env.NODE_ENV !== "test") {
      console.log('Invoked: ', req.url)
    }
  
    next()
  });

// ROUTES
app.use('/api', require('./route/api'));

// middleware to deal with 404 error
app.use((req, res, next) => {
    let err = {
      message: 'route does not exist',
      status: 404
    };
    next(err)  // send error to next middleware
});

// receives error from last middleware
app.use((err, req, res, next) => {
    // if error 404, sends back message 'route does not exist'
    console.log(err.status);
    res.status(err.status || 500).send(err.message || `route does not sxist`)
});


module.exports = app;
