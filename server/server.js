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

const app = express();
app.use(cors());
app.use(express.json());

/* ***************** */
/*       LOGIN       */
/* ***************** */
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

/* ******************** */
/*       PROFILE        */
/* ******************** */
app.get("/profile", (req, res) => {
  util
    .getMe()
    .then((data) => {
      res.json({ user: data, status: 200 });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/library/artists", (req, res) => {
  util
    .getFollowedArtists()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/library/albums", (req, res) => {
  return util
    .getMySavedAlbums()
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

/* ********************** */
/*        Playlist        */
/* ********************** */

app.post("/playlist", (req, res) => {
  util
    .createPlaylist(req.body.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/library/playlists", (req, res) => {
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

/* ****************** */
/*       Artist       */
/* ****************** */

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

/* *************** */
/*       MISC      */
/* *************** */
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

app.post("/test", (req, res) => {
  return util
    .test(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.listen(4201);
