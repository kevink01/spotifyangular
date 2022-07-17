/**
 * Using Express.js for the backend
 * Including the Spotify API wrapper: https://github.com/thelinmichael/spotify-web-api-node
 */
const express = require("express");
const SpotifyAPIBuilder = require("spotify-web-api-node");

/**
 * CORS and body parser for configuration
 * Including environment variables for client ID and client secret
 */
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Creating a new SpotifyAPIBuilder instance
const spotify = new SpotifyAPIBuilder({
  clientId: process.env.client_ID,
  clientSecret: process.env.client_SECRET,
  redirectUri: "http://localhost:4200/redirect",
});

/**
 * Post call for logging in to Spotify.
 * Returns the access_token, refresh_token, and expires_in duration
 */
app.post("/login", (req, res) => {
  spotify
    .authorizationCodeGrant(JSON.parse(req.body.code))
    .then((data) => {
      res.json(
        JSON.stringify({
          access_token: data.body.access_token,
          refresh_token: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      );
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.listen(4201);
