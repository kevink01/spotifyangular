import { environment } from 'src/environments/environment';
export class Constants {
  public static readonly SCOPES: string = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-write',
    'user-read-playback-state',
    'user-modify-playback-state',
  ].join('%20');
  public static readonly AUTH_URL: string = `https://accounts.spotify.com/authorize?client_id=${environment.clientID}&response_type=code&redirect_uri=http://localhost:4200/redirect&scopes=${this.SCOPES}`;
}
