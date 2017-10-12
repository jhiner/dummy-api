const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('express-jwt');
const rsaValidation = require('auth0-api-jwt-rsa-validation');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const port = process.env.PORT || 7000;

const jwtCheck = jwt({
  secret: rsaValidation({strictSSL:false}),
  algorithms: ['RS256'],
  issuer: 'https://' + process.env.AUTH0_DOMAIN + '/',
  audience: process.env.API_IDENTIFIER
});

app.use(cors());
app.use(jwtCheck);

// Returns a random integer between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/', function (req, res) { 
  const randomNumber = getRandomInt (1,10000);
  console.log('Sending 200 status');
  return res.json({status: 'ok', data: 'here is some data ' + randomNumber});
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(port);