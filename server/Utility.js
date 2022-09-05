/**
 * Exports the functions for calling the Spotify API
 * Helper functions are listed below the exports
 */
module.exports = class Utility {
  constructor() {}

  /* ************* */
  /*     LOGIN     */
  /* ************* */
  login(data) {
    return {
      access: data.access_token,
      expires: data.expires_in,
      refresh: data.refresh_token,
    };
  }

  /* ************ */
  /*     USER     */
  /* ************ */
  myProfile(data) {
    return {
      country: data.country,
      email: data.email,
      followers: data.followers.total,
      id: data.id,
      images: data.images,
      name: data.display_name,
      product: data.product,
      type: data.type,
      uri: data.uri,
    };
  }

  userPlaylists(data) {
    return {
      playlists: data.items.map((item) => {
        return {
          collaborative: item.collaborative,
          description: item.description,
          id: item.id,
          images: item.images,
          name: item.name,
          owner: {
            id: item.owner.id,
            name: item.owner.display_name,
            type: item.owner.type,
            uri: item.owner.uri,
          },
          public: item.public,
          type: item.type,
          uri: item.uri,
        };
      }),
    };
  }

  myFollowedArtists(data) {
    return {
      artists: data.artists.items.map((artist) => {
        return {
          followers: artist.followers.total,
          genres: artist.genres,
          id: artist.id,
          images: artist.images,
          name: artist.name,
          popularity: artist.popularity,
          type: artist.type,
          uri: artist.uri,
        };
      }),
    };
  }

  mySavedAlbums(data) {
    return {
      albums: data.items.map((item) => {
        return {
          artists: item.album.artists.map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              type: artist.type,
              uri: artist.uri,
            };
          }),
          copyrights: item.album.copyrights,
          date: new Date(item.album.release_date),
          genres: item.album.genres,
          id: item.album.id,
          images: item.album.images,
          name: item.album.name,
          popularity: item.album.popularity,
          tracks: item.album.tracks.items.map((track) => {
            return {
              album: null,
              artists: track.artists.map((artist) => {
                return {
                  id: artist.id,
                  name: artist.name,
                  type: artist.type,
                  uri: artist.uri,
                };
              }),
              date: null,
              duration: track.duration_ms,
              explicit: track.explicit,
              local: track.is_local,
              number: track.track_number,
              popularity: track.popularity,
            };
          }),
          type: item.album.type,
          uri: item.album.uri,
        };
      }),
    };
  }

  myTopTracks(data) {
    return {
      tracks: data.items.map((track) => {
        return {
          album: {
            id: track.album.id,
            name: track.album.name,
            type: track.album.type,
            uri: track.album.uri,
          },
          artists: track.artists.map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              type: artist.type,
              uri: artist.uri,
            };
          }),
          date: null,
          duration: track.duration_ms,
          explicit: track.explicit,
          local: track.is_local,
          name: track.name,
          number: track.track_number,
          popularity: track.popularity,
          type: track.type,
          uri: track.uri,
        };
      }),
    };
  }

  myTopArtists(data) {
    return {
      artists: data.items.map((artist) => {
        return {
          followers: artist.followers.total,
          genres: artist.genres,
          id: artist.id,
          images: artist.images,
          name: artist.name,
          popularity: artist.popularity,
          type: artist.type,
          uri: artist.uri,
        };
      }),
    };
  }

  myRecentlyPlayed(data) {
    return {
      tracks: data.items.map((item) => {
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
          date: new Date(item.played_at),
          duration: item.track.duration_ms,
          explicit: item.track.explicit,
          id: item.track.id,
          local: item.track.is_local,
          name: item.track.name,
          popularity: item.track.popularity,
          type: item.track.type,
          uri: item.track.uri,
        };
      }),
    };
  }

  /* *************** */
  /*     PROFILE     */
  /* *************** */
  profile(data) {
    return {
      followers: data.followers.total,
      id: data.id,
      images: data.images,
      name: data.display_name,
      type: data.type,
      uri: data.uri,
    };
  }

  /* **************** */
  /*     Playlist     */
  /* **************** */
  createdPlaylist(data) {
    return {
      collaborative: data.collaborative,
      description: data.description,
      id: data.id,
      images: data.images,
      name: data.name,
      owner: {
        id: data.owner.id,
        name: data.owner.name,
        type: data.owner.type,
        uri: data.owner.uri,
      },
      public: data.public,
      snapshot: data.snapshot,
      tracks: data.tracks.items,
      type: data.type,
      uri: data.uri,
    };
  }

  featuredPlaylists(data) {
    return {
      message: data.message,
      playlists: data.playlists.items.map((playlist) => {
        return {
          collaborative: playlist.collaborative,
          description: playlist.description,
          id: playlist.id,
          images: playlist.images,
          name: playlist.name,
          owner: {
            id: playlist.owner.id,
            name: playlist.owner.display_name,
            type: playlist.owner.type,
            uri: playlist.owner.uri,
          },
          public: playlist.public,
          tracks: playlist.tracks.count,
          type: playlist.type,
          uri: playlist.uri,
        };
      }),
    };
  }

  /* ************** */
  /*     Artist     */
  /* ************** */
  artist(data) {
    return {
      followers: data.followers.total,
      genres: data.genres,
      id: data.id,
      images: data.images,
      name: data.name,
      popularity: data.popularity,
      type: data.type,
      uri: data.uri,
    };
  }

  artistAlbums(data) {
    return {
      albums: data.items.map((album) => {
        return {
          artists: album.artists.map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              type: artist.type,
              uri: artist.uri,
            };
          }),
          date: new Date(album.release_date),
          id: album.id,
          images: album.images,
          name: album.name,
          tracks: album.total_tracks,
          type: album.type,
          uri: album.uri,
        };
      }),
    };
  }

  topArtistTracks(data) {
    return {
      tracks: data.tracks.map((track) => {
        return {
          album: {
            id: track.album.id,
            name: track.album.name,
            type: track.album.id,
            uri: track.album.uri,
          },
          artists: track.artists.map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              type: artist.type,
              uri: artist.uri,
            };
          }),
          date: null,
          duration: track.duration_ms,
          explicit: track.explicit,
          local: track.is_local,
          id: track.id,
          name: track.name,
          popularity: track.popularity,
          type: track.type,
          uri: track.uri,
        };
      }),
    };
  }

  relatedArtists(data) {
    return {
      artists: data.artists.map((artist) => {
        return {
          followers: artist.followers.total,
          genres: artist.genres,
          id: artist.id,
          images: artist.images,
          name: artist.name,
          popularity: artist.popularity,
          type: artist.type,
          uri: artist.uri,
        };
      }),
    };
  }

  /* ************* */
  /*     Album     */
  /* ************* */
  album(data) {
    return {
      artists: data.artists.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          type: artist.type,
          uri: artist.uri,
        };
      }),
      copyrights: data.copyrights,
      date: new Date(data.release_date),
      genres: data.genres,
      id: data.id,
      images: data.images,
      name: data.name,
      popularity: data.popularity,
      tracks: data.tracks.items.map((track) => {
        console.log(track);
        return {
          artists: track.artists.map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              type: artist.type,
              uri: artist.uri,
            };
          }),
          duration: track.duration_ms,
          explicit: track.explicit,
          id: track.id,
          local: track.is_local,
          name: track.name,
          number: track.track_number,
          popularity: track.popularity,
          type: track.type,
          uri: track.uri,
        };
      }),
      type: data.type,
      uri: data.uri,
    };
  }

  /* ************* */
  /*     Track     */
  /* ************* */
  track(data) {
    return {
      album: {
        id: data.album.id,
        name: data.album.name,
        type: data.album.type,
        uri: data.album.uri,
      },
      artists: data.artists.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          type: artist.type,
          uri: artist.uri,
        };
      }),
      duration: data.duration_ms,
      explciit: data.explicit,
      id: data.id,
      local: data.is_local,
      name: data.name,
      number: data.track_number,
      popularity: data.popularity,
      type: data.type,
      uri: data.uri,
    };
  }
};
