# DUMMY API

This is a dummy API project useful for testing API Authorization flows with Auth0 quickstarts.

## Configuration

Rename `.env.example` to `.env`. Populate the AUTH0_DOMAIN with your tenant domain, and API_IDENTIFIER with the identifier for your API you defined in the dashboard.

## Random Authorization Failures

If you set the RANDOM_401 environment variable to `true`, the Dummy API will (pseudo)randomly send 401 status code. This can be useful for testing refresh token functionality.

## How to Run

Run `npm install` then  `npm start`.