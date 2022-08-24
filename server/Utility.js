/**
 * Exports the functions for calling the Spotify API
 * Helper functions are listed below the exports
 */
module.exports = class Utility {
  constructor() {}

  /* ******************** */
  /*       PROFILE        */
  /* ******************** */

  userPlaylist(data) {
    return {
      playlists: data.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          owner: {
            name: item.owner.display_name,
            id: item.owner.id,
            type: item.owner.type,
            uri: item.owner.uri,
          },
          images: item.images,
          public: item.public,
          collaborative: item.collaborative,
          type: item.type,
          uri: item.uri,
        };
      }),
    };
  }

  followedArtists(data) {
    return {
      artists: data.artists.items.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          images: artist.images,
          type: artist.type,
          uri: artist.uri,
        };
      }),
    };
  }

  savedAlbums(data) {
    return {
      albums: data.items.map((item) => {
        return {
          id: item.album.id,
          name: item.album.name,
          artist: {
            id: item.album.artists[0].id,
            name: item.album.artists[0].name,
            images: null,
            type: item.album.artists[0].type,
            uri: item.album.artists[0].uri,
          },
          images: item.album.images,
          type: item.album.type,
          uri: item.album.uri,
        };
      }),
    };
  }

  topTracks(data) {
    return {
      tracks: data.items.map((track) => {
        return {
          added_at: null,
          isLocal: track.is_local,
          album: {
            id: track.album.id,
            type: track.album.type,
            name: track.album.name,
            release: new Date(track.album.release_date),
            tracks: track.album.total_tracks,
            artists: track.album.artists.map((artist) => {
              return {
                id: artist.id,
                name: artist.name,
                type: artist.type,
                uri: artist.uri,
              };
            }),
            images: track.album.images,
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
          duration: track.duration_ms,
          explicit: track.explicit,
          id: track.id,
          name: track.name,
          type: track.type,
          uri: track.uri,
        };
      }),
    };
  }

  topArtists(data) {
    return {
      artists: data.items.map((artist) => {
        return {
          name: artist.name,
          id: artist.id,
          type: artist.type,
          followers: artist.followers.total,
          popularity: artist.popularity,
          genres: artist.genres,
          images: artist.images,
          uri: artist.uri,
        };
      }),
    };
  }

  /* ********************** */
  /*        Playlist        */
  /* ********************** */

  featuredPlaylist(data) {
    return {
      featured: data.playlists.items.map((playlist) => {
        return {
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          type: playlist.type,
          count: playlist.tracks.count,
          owner: {
            name: playlist.owner.display_name,
            id: playlist.owner.id,
            type: playlist.owner.type,
            uri: playlist.owner.uri,
          },
          public: playlist.public,
          collaborative: playlist.collaborative,
          images: playlist.images,
          uri: playlist.uri,
        };
      }),
    };
  }

  createPlaylist(data) {
    return data;
  }

  /* ****************** */
  /*       Artist       */
  /* ****************** */

  artist(data) {
    return {
      id: data.id,
      name: data.name,
      genres: data.genres,
      images: data.images,
      popularity: data.popularity,
      followers: data.followers.total,
      type: data.type,
      uri: data.uri,
    };
  }

  artistsAlbums(data) {
    return {
      albums: data.items.map((album) => {
        return {
          id: album.id,
          type: album.type,
          name: album.name,
          release: new Date(album.release_date),
          tracks: album.total_tracks,
          artists: album.artists.map((artist) => {
            return {
              id: artist.id,
              name: artist.name,
              type: artist.type,
              uri: artist.uri,
            };
          }),
          images: album.images,
          uri: album.uri,
        };
      }),
    };
  }

  topArtistTracks(data) {
    return {
      tracks: data.tracks.map((track) => {
        return {
          added_at: null,
          isLocal: track.is_local,
          album: {
            id: track.album.id,
            type: track.album.id,
            name: track.album.name,
            release: new Date(track.album.release_date),
            tracks: track.album.total_tracks,
            artists: track.album.artists.map((artist) => {
              return {
                id: artist.id,
                name: artist.name,
                type: artist.type,
                uri: artist.uri,
              };
            }),
            images: track.album.images,
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
          duration: track.duration_ms,
          explicit: track.explicit,
          id: track.id,
          name: track.name,
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
          id: artist.id,
          name: artist.name,
          followers: artist.followers.total,
          popularity: artist.popularity,
          genres: artist.genres,
          images: artist.images,
          type: artist.type,
          uri: artist.uri,
        };
      }),
    };
  }

  /* ****************** */
  /*        Album       */
  /* ****************** */

  album(data) {
    return {
      id: data.id,
      name: data.name,
      artists: data.artists.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
          type: artist.type,
          uri: artist.uri,
        };
      }),
      tracks: data.tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          number: track.track_number,
          duration: track.duration_ms,
          local: track.is_local,
          explicit: track.explicit,
          type: track.type,
          uri: track.uri,
        };
      }),
      copyrights: data.copyrights,
      genres: data.genres,
      images: data.images,
      popularity: data.popularity,
      release: new Date(data.release_date),
      type: data.type,
      uri: data.uri,
    };
  }
};
