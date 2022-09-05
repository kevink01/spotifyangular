/* Express JS backend server */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const SpotifyAPIBuilder = require("spotify-web-api-node");

/**
 * Utility class for parsing data
 */
const Utility = require("./utility");
const util = new Utility();

const app = express();
app.use(cors());
app.use(express.json());

const spotify = new SpotifyAPIBuilder({
  clientId: process.env.client_ID,
  clientSecret: process.env.client_SECRET,
  redirectUri: "http://localhost:4200/login",
});

/* ***************** */
/*       LOGIN       */
/* ***************** */
app.post("/login", (req, res) => {
  spotify
    .authorizationCodeGrant(JSON.parse(req.body.code))
    .then((data) => {
      spotify.setAccessToken(data.body.access_token);
      spotify.setRefreshToken(data.body.refresh_token);
      res.status(200).send(util.login(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

/* ******************** */
/*       PROFILE        */
/* ******************** */

app.get("/profile", (req, res) => {
  spotify
    .getMe()
    .then((data) => {
      res.status(200).send(util.profile(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/profile/playlists", (req, res) => {
  spotify
    .getUserPlaylists()
    .then((data) => {
      res.status(200).send(util.userPlaylist(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/profile/artists", (req, res) => {
  spotify
    .getFollowedArtists()
    .then((data) => {
      res.status(200).send(util.followedArtists(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/profile/albums", (req, res) => {
  spotify
    .getMySavedAlbums()
    .then((data) => {
      res.status(200).send(util.savedAlbums(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/profile/tracks", (req, res) => {
  return spotify
    .getMySavedTracks({ limit: 1 })
    .then(async (data) => {
      await getAllSavedTracks(data.body)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(err.statusCode).send(err.body.error);
        });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/top/tracks", (req, res) => {
  spotify
    .getMyTopTracks()
    .then((data) => {
      res.status(200).send(util.topTracks(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/top/artists", (req, res) => {
  spotify
    .getMyTopArtists()
    .then((data) => {
      res.status(200).send(util.topArtists(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/tracks/recent", (req, res) => {
  spotify
    .getMyRecentlyPlayedTracks({
      limit: 10,
    })
    .then((data) => {
      res.status(200).send(util.recentlyPlayed(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

/* ********************** */
/*        Playlist        */
/* ********************** */

app.get("/playlist", (req, res) => {
  spotify
    .getPlaylist(req.query.id, { limit: 1 })
    .then(async (data) => {
      await getAllPlaylistTracks(data.body)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(err.statusCode).send(err.body.error);
        });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.post("/playlist/new", (req, res) => {
  spotify
    .createPlaylist(req.body.name, {
      description: req.body.description,
      public: req.body.public,
      collaborative: req.body.collaborative,
    })
    .then((data) => {
      res.status(200).send(util.createPlaylist(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.post("/playlist/image", (req, res) => {
  spotify
    .uploadCustomPlaylistCoverImage(req.body.id, req.body.image)
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.put("/playlist/update", (req, res) => {
  spotify
    .changePlaylistDetails(req.body.id, {
      name: req.body.details.name,
      description: req.body.details.description,
      public: req.body.details.public,
      collaborative: req.body.details.collaborative,
    })
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.post("/playlist/add", (req, res) => {
  spotify
    .addTracksToPlaylist(req.body.id, req.body.tracks, {
      position: req.body.position,
    })
    .then((data) => {
      res.status(200).send({ snapshot: data.body.snapshot_id });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.put("/playlist/reorder", async (req, res) => {
  let sent = false;
  let snapshot = req.body.snapshot;
  const calls = Math.ceil(req.body.tracks.length / 100);
  await spotify
    .replaceTracksInPlaylist(
      req.body.id,
      req.body.tracks.slice(
        0,
        req.body.tracks.length < 100 ? req.body.tracks.length : 100
      )
    )
    .then((data) => {
      snapshot = data.body.snapshot_id;
    })
    .catch((err) => {
      sent = true;
      res.status(err.statusCode).send(err.body.error);
    });
  for (let i = 1; i < calls; i++) {
    if (!sent) {
      await spotify
        .addTracksToPlaylist(
          req.body.id,
          req.body.tracks.slice(
            i * 100,
            i * 100 + 100 > req.body.tracks.length
              ? i * 100 + (req.body.tracks.length % 100)
              : i * 100 + 100
          ),
          { position: i * 100 }
        )
        .then((data) => {
          snapshot = data.body.snapshot_id;
        })
        .catch((err) => {
          sent = true;
          res.status(err.statusCode).send(err.body.error);
        });
    }
  }
  if (!sent) {
    res.status(200).send({ snapshot: snapshot });
  }
});

app.delete("/playlist/delete", (req, res) => {
  spotify
    .unfollowPlaylist(req.body.id)
    .then(() => res.status(200).send({ success: true }))
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/featured", (req, res) => {
  spotify
    .getFeaturedPlaylists()
    .then((data) => {
      res.status(200).send(util.featuredPlaylist(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

/* ****************** */
/*       Artist       */
/* ****************** */

app.get("/artist", (req, res) => {
  return spotify
    .getArtist(req.query.id)
    .then((data) => {
      res.status(200).send(util.artist(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/artist/albums", (req, res) => {
  return spotify
    .getArtistAlbums(req.query.id)
    .then((data) => {
      res.status(200).send(util.artistsAlbums(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/artist/tracks", (req, res) => {
  return spotify
    .getArtistTopTracks(req.query.id, req.query.country)
    .then((data) => {
      res.status(200).send(util.topArtistTracks(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/artist/related", (req, res) => {
  return spotify
    .getArtistRelatedArtists(req.query.id)
    .then((data) => {
      res.status(200).send(util.relatedArtists(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

/* ****************** */
/*       Album       */
/* ****************** */

app.get("/album", (req, res) => {
  return spotify
    .getAlbum(req.query.id)
    .then((data) => {
      res.status(200).send(util.album(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/album/following", (req, res) => {
  spotify
    .containsMySavedAlbums([req.query.id])
    .then((data) => {
      res.status(200).send({ following: data.body[0] });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.post("/album/follow", (req, res) => {
  switch (req.body.following) {
    case true:
      spotify
        .removeFromMySavedAlbums([req.body.id])
        .then((data) => {
          res.status(200).send({ success: true });
        })
        .catch((err) => {
          res.status(err.statusCode).send(err.body.error);
        });
      break;
    case false:
      spotify
        .addToMySavedAlbums([req.body.id])
        .then((data) => {
          res.status(200).send({ success: true });
        })
        .catch((err) => {
          res.status(err.statusCode).send(err.body.error);
        });
      break;
    default:
      break;
  }
});

/* ****************** */
/*        Track       */
/* ****************** */

app.get("/track", (req, res) => {
  spotify
    .getTrack(req.query.id)
    .then((data) => {
      res.status(200).send(util.track(data.body));
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

/* ***************** */
/*       Player      */
/* ***************** */

/* *************** */
/*       MISC      */
/* *************** */
// TODO Provide seed
app.get("/recommendations", (req, res) => {
  spotify
    .getRecommendations()
    .then((data) => {
      res.status(200).send(data.body);
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.get("/test", (req, res) => {
  return spotify
    .play()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(err.statusCode).send(err.body.error);
    });
});

app.listen(4201);

/* *************************** */
/*       Helper Functions      */
/* *************************** */
const getAllPlaylistTracks = (data) => {
  const calls = Math.floor(data.tracks.total / 100) + 1;
  const offset = Array(calls)
    .fill(null)
    .map((_, i) => i * 100);
  const requests = offset.map((value) => {
    return spotify
      .getPlaylistTracks(data.id, { limit: 100, offset: value })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  return Promise.all(requests).then((responses) =>
    Promise.all(
      responses.flatMap((r) => {
        return r.body.items.map((item) => {
          return {
            album: {
              date: new Date(item.track.album.release_date),
              id: item.track.album.id,
              images: item.track.album.images,
              name: item.track.album.name,
              type: item.track.album.type,
              uri: item.track.album.uri,
            },
            artists: item.track.artists.map((artist) => {
              return {
                id: artist.id,
                name: artist.name,
                type: artist.type,
                uri: artist.uri,
              };
            }),
            date: new Date(item.added_at),
            duration: item.track.duration_ms,
            explicit: item.track.explicit,
            id: item.track.id,
            local: item.is_local,
            name: item.track.name,
            number: item.track.track_number,
            popularity: item.track.popularity,
            type: item.track.type,
            uri: item.track.uri,
          };
        });
      })
    ).then((tracks) => {
      return {
        collaborative: data.collaborative,
        description: data.description,
        id: data.id,
        images: data.images,
        name: data.name,
        owner: {
          id: data.owner.id,
          name: data.owner.display_name,
          type: data.owner.type,
          uri: data.owner.uri,
        },
        public: data.public,
        snapshot: data.snapshot_id,
        tracks: tracks,
        type: data.type,
        uri: data.uri,
      };
    })
  );
};

const getAllSavedTracks = (data) => {
  const calls = Math.floor(data.total / 50) + 1;
  const offset = Array(calls)
    .fill(null)
    .map((_, i) => i * 50);
  const requests = offset.map((value) => {
    return spotify
      .getMySavedTracks({ limit: 50, offset: value })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  return Promise.all(requests).then((responses) =>
    Promise.all(
      responses.flatMap((r) => {
        return r.body.items.map((item) => {
          return {
            album: {
              id: item.track.album.id,
              name: item.track.album.name,
              type: item.track.album.type,
              uri: item.track.album.uri,
            },
            artists: item.track.artists.map((artist) => {
              return {
                id: artist.id,
                name: artist.name,
                type: artist.type,
                uri: artist.uri,
              };
            }),
            date: new Date(item.added_at),
            duration: item.track.duration_ms,
            explicit: item.track.explicit,
            id: item.track.id,
            local: item.track.is_local,
            name: item.track.name,
            number: item.track.track_number,
            popularity: item.track.popularity,
            type: item.track.type,
            uri: item.track.uri,
          };
        });
      })
    )
      .then((tracks) => {
        return {
          tracks: tracks,
        };
      })
      .catch((err) => {
        throw new Error(err);
      })
  );
};
