const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('express-jwt');
const rsaValidation = require('auth0-api-jwt-rsa-validation');
require('dotenv').config();

const port = process.env.PORT || 7000;

const jwtCheck = jwt({
  secret: rsaValidation(),
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

app.get('/authorized', function (req, res) { 

  const randomNumber = getRandomInt (1,100);

  // check to see if we want to send random 401 status
  // this can be useful for testing refresh token functionality
  if (process.env.RANDOM_401 === 'true' && randomNumber % 2 === 0) {
    console.log('Sending 401 status');
    return res.status(401).json({});
  }

  console.log('Sending 200 status');
  return res.json({status: 'ok', data: 'here is some data ' + randomNumber});
});

app.listen(port);