import { environment } from 'src/environments/environment';
export class Constants {
  public static readonly SCOPES: string = [
    // Users scopes
    'user-read-email',
    'user-read-private',
    // Library scope
    'user-library-read',
    // Playlist scope
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    // // Listen history scope
    'user-read-recently-played',
    'user-read-playback-position',
    // 'user-top-read',
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
  public static readonly AUTH_URL: string = `https://accounts.spotify.com/authorize?client_id=${environment.clientID}&response_type=code&redirect_uri=http://localhost:4200/login&scope=${this.SCOPES}`;

  public static readonly SERVER_URL: string = 'http://localhost:4201';

  /* ***************** */
  /*       LOGIN       */
  /* ***************** */
  public static readonly LOGIN_URL: string = 'login';

  /* ******************** */
  /*       PROFILE        */
  /* ******************** */
  public static readonly USER_ME_URL: string = 'profile';
  public static readonly FOLLOWED_ARTISTS_URL: string = 'library/artists';
  public static readonly SAVED_ALBUMS_URL: string = 'library/albums';
  public static readonly TOP_TRACKS_URL: string = 'top/tracks';
  public static readonly TOP_ARTISTS_URL: string = 'top/artists';

  /* ********************** */
  /*        Playlist        */
  /* ********************** */
  public static readonly USER_PLAYLISTS_URL: string = 'library/playlists';
  public static readonly PLAYLIST_URL: string = 'playlist';
  public static readonly FEAUTRED_PLAYLISTS_URL: string = 'featured';

  /* ****************** */
  /*       Artist       */
  /* ****************** */
  public static readonly ARTIST_ALBUMS_URL: string = 'artist/albums';
  public static readonly ARTIST_TOP_TRACKS_URL: string = 'artist/tracks';
  public static readonly ARTIST_RELATED_URL: string = 'artist/related';
}
