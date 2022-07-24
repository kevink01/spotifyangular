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
    // Listen history scope
    'user-read-recently-played',
    'user-read-playback-position',
    'user-top-read',
    // Follow scope
    'user-follow-modify',
    'user-follow-read',
    // Image scope
    'ugc-image-upload',
    // Spotify connect scope
    // 'user-modify-playback-state',
    // 'user-read-playback-state',
    // 'user-read-currently-playing',
    // Playback scope
    // 'app-remote-control',
    // 'streaming'
  ].join(' ');

  public static readonly SERVER_URL: string = 'http://localhost:4201';

  public static readonly AUTH_URL: string = `https://accounts.spotify.com/authorize?client_id=${environment.clientID}&response_type=code&redirect_uri=http://localhost:4200/login&scope=${this.SCOPES}`;
}
