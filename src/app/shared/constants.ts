import { environment } from 'src/environments/environment';
export class Constants {
  public static readonly SCOPES: string = [
    'playlist-read-private',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'user-follow-read',
  ].join(' ');

  // private static readonly queryParams = new URLSearchParams(this.SCOPES);

  // public static readonly AUTH_URL: string = `https://accounts.spotify.com/authorize?client_id=${environment.clientID}&response_type=code&redirect_uri=http://localhost:4200/login&scopes=user-read-email%20user-read-private%20user-library-read%20playlist-read-private%20playlist-modify-private%20playlist-read-collaborative%20playlist-modify-public%20
  // `;

  public static readonly AUTH_URL: string = `https://accounts.spotify.com/authorize?client_id=${environment.clientID}&response_type=code&redirect_uri=http://localhost:4200/login&scope=${this.SCOPES}`;
}
