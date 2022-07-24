/* Express JS backend server */
const express = require("express");
const Utility = require("./Utility");
/**
 * Utility class that wraps the Sptofiy API wrapper: https://github.com/thelinmichael/spotify-web-api-node
 * Exports functions that parses JSON responses and errors
 */
const util = new Utility();

/**
 * CORS and body parser for configuration
 * Including environment variables for client ID and client secret
 */
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


/**
 * Post call for logging in to Spotify.
 * Returns the access_token, refresh_token, and expires_in duration
 */
app.post("/login", (req, res) => {
  util
    .login(JSON.parse(req.body.code))
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ ...err, status: 400 });
    });
});

app.get("/user", (req, res) => {
  util
    .getMe()
    .then((data) => {
      res.json({ user: data, status: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/playlists", (req, res) => {
  util
    .getPlaylists()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/playlist", (req, res) => {
  util
    .getPlaylist(req.query.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/artists", (req, res) => {
  util
    .getFollowedArtists()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/recommendations", (req, res) => {
  util
    .getRecommendations()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/tracks", (req, res) => {
  util
    .getPlaylistTracks(req.body.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/top/artists", (req, res) => {
  util
    .getMyTopArtists()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/top/tracks", (req, res) => {
  util
    .getMyTopTracks()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/artist/albums", (req, res) => {
  return util
    .getArtistAlbums(req.body.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/artist/tracks", (req, res) => {
  return util
    .getArtistTopTracks(req.body.id, req.body.country)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/artist/related", (req, res) => {
  return util
    .getArtistRelatedArtists(req.body.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/saved/albums", (req, res) => {
  return util
    .getMySavedAlbums()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/test", (req, res) => {
  return util
    .test()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.listen(4201);



app.get("/featured", (req, res) => {
  util
    .getFeaturedPlaylists()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
