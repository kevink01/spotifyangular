// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const SCOPES: string = [
  // Users scopes
  'user-read-email',
  'user-read-private',
  // Library scope
  'user-library-read',
  // Playlist scope
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  // // Listen history scope
  'user-read-recently-played',
  'user-read-playback-position',
  'user-top-read',
  // // Follow scope
  'user-follow-modify',
  'user-follow-read',
  // // Image scope
  'ugc-image-upload',
  // // Spotify connect scope
  // // 'user-modify-playback-state',
  // // 'user-read-playback-state',
  // // 'user-read-currently-playing',
  // // Playback scope
  // // 'app-remote-control',
  // // 'streaming'
].join(' ');
const clientID: string = '71d200c4569d4b5bad224df289aeff4c';

export const environment = {
  production: false,
  AUTH_URL: `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=http://localhost:4200/login&scope=${SCOPES}`,

  SERVER_URL: 'http://localhost:4201',

  /* ***************** */
  /*       LOGIN       */
  /* ***************** */
  LOGIN_URL: 'login',

  /* ******************** */
  /*       PROFILE        */
  /* ******************** */
  USER_ME_URL: 'profile',
  USER_PLAYLISTS_URL: 'profile/playlists',
  FOLLOWED_ARTISTS_URL: 'profile/artists',
  SAVED_ALBUMS_URL: 'profile/albums',
  TOP_TRACKS_URL: 'top/tracks',
  TOP_ARTISTS_URL: 'top/artists',
  SAVED_SONGS_URL: 'profile/tracks',

  /* ********************** */
  /*        Playlist        */
  /* ********************** */
  PLAYLIST_URL: 'playlist',
  FEAUTRED_PLAYLISTS_URL: 'featured',
  CREATE_PLAYLIST_URL: 'playlist/new',
  UPDATE_PLAYLIST_URL: 'playlist/update',
  REORDER_PLAYLIST_URL: 'playlist/reorder',
  UPLOAD_IMAGE_URL: 'playlist/image',
  ADD_TO_PLAYLIST_URL: 'playlist/add',
  DELETE_PLAYLIST_URL: 'playlist/delete',

  /* ****************** */
  /*       Artist       */
  /* ****************** */
  ARTIST_ALBUMS_URL: 'artist/albums',
  ARTIST_TOP_TRACKS_URL: 'artist/tracks',
  ARTIST_RELATED_URL: 'artist/related',

  /* ****************** */
  /*       Album        */
  /* ****************** */
  ALBUM_URL: 'album',

  /* ****************** */
  /*       Player       */
  /* ****************** */
  RECENTLY_PLAYED_URL: 'tracks/recent',
  TRACK_URL: 'track',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
