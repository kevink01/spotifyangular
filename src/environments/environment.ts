// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const SCOPES: string = [
  // Users scopes
  'user-read-email',
  'user-read-private',
  // Library scope
  'user-library-read',
  'user-library-modify',
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
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  // // Playback scope
  'app-remote-control',
  'streaming',
].join(' ');
const clientID: string = '71d200c4569d4b5bad224df289aeff4c';

export const environment = {
  production: false,
  AUTH_URL: `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=http://localhost:4200/login&scope=${SCOPES}`,

  SERVER_URL: 'http://localhost:4201',

  /* ************* */
  /*     LOGIN     */
  /* ************* */
  LOGIN_URL: 'login',
  LOGOUT_URL: 'logout',

  /* ************ */
  /*     USER     */
  /* ************ */
  USER_ME_URL: 'me',
  USER_PLAYLISTS_URL: 'user/playlists',
  FOLLOWED_ARTISTS_URL: 'user/artists',
  SAVED_SONGS_URL: 'user/tracks',
  SAVED_ALBUMS_URL: 'user/albums',
  TOP_TRACKS_URL: 'user/top/tracks',
  TOP_ARTISTS_URL: 'user/top/artists',
  RECENTLY_PLAYED_URL: 'user/recent/tracks',

  /* *************** */
  /*     PROFILE     */
  /* *************** */
  PROFILE_URL: 'profile',
  PROFILE_PLAYLISTS_URL: 'profile/playlists',
  FOLLOWING_USER_URL: 'profile/following',
  FOLLOW_USER_URL: 'profile/new',
  UNFOLLOW_USER_URL: 'profile',

  /* **************** */
  /*     Playlist     */
  /* **************** */
  PLAYLIST_URL: 'playlist',
  CREATE_PLAYLIST_URL: 'playlist/new',
  UPDATE_PLAYLIST_URL: 'playlist/details',
  UPLOAD_IMAGE_URL: 'playlist/image',
  ADD_TO_PLAYLIST_URL: 'playlist/tracks/new',
  REORDER_PLAYLIST_URL: 'playlist/tracks/reorder',
  DELETE_PLAYLIST_URL: 'playlist',
  FEAUTRED_PLAYLISTS_URL: 'playlist/featured',

  /* ************** */
  /*     Artist     */
  /* ************** */
  ARTIST_URL: 'artist',
  ARTIST_ALBUMS_URL: 'artist/albums',
  ARTIST_TOP_TRACKS_URL: 'artist/tracks',
  ARTIST_RELATED_URL: 'artist/related',

  /* ************* */
  /*     Album     */
  /* ************* */
  ALBUM_URL: 'album',
  FOLLOWING_ALBUM_URL: 'album/following',
  FOLLOW_ALBUM_URL: 'album/add',

  /* ************* */
  /*     Track     */
  /* ************* */
  TRACK_URL: 'track',

  /* ************** */
  /*     Player     */
  /* ************** */
  DEVICES_URL: 'devices',
  PLAYBACK_URL: 'playback',
  PLAY_URL: 'play',
  PAUSE_URL: 'pause',
  SEEK_URL: 'seek',
  NEXT_URL: 'next',
  PREVIOUS_URL: 'previous',
  SHUFFLE_URL: 'shuffle',
  REPEAT_URL: 'repeat',
  TRANSFER_URL: 'transfer',

  /* ************ */
  /*     MISC     */
  /* ************ */
  RECOMMENDATIONS_URL: 'recommendations',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
