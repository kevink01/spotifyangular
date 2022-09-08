import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { Core } from '../models/core/core';
import { ActiveDeviceReturn } from '../models/core/http/activeDevice';
import { RecentTracksReturn } from '../models/core/http/recent';
import { Success } from '../models/core/success';
import { Playback } from '../models/player/playback';
import { Playing } from '../models/player/playing';
import { Position } from '../models/player/position';
import { Queue } from '../models/player/queue';
import { Repeat } from '../models/player/repeat';
import { Shuffle } from '../models/player/shuffle';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getRecentlyPlayed(): Observable<RecentTracksReturn> {
    return this.http
      .get<RecentTracksReturn>(
        `${environment.SERVER_URL}/${environment.RECENTLY_PLAYED_URL}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getDevices(): Observable<ActiveDeviceReturn> {
    return this.http
      .get<ActiveDeviceReturn>(
        `${environment.SERVER_URL}/${environment.DEVICES_URL}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getPlayback(): Observable<Playback> {
    return this.http
      .get<Playback>(`${environment.SERVER_URL}/${environment.PLAYBACK_URL}`)
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  play(): Observable<Playing> {
    return this.http
      .post<Playing>(`${environment.SERVER_URL}/${environment.PLAY_URL}`, {})
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  pause(): Observable<Playing> {
    return this.http
      .post<Playing>(`${environment.SERVER_URL}/${environment.PAUSE_URL}`, {})
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  seek(position: number): Observable<Position> {
    return this.http
      .post<Position>(`${environment.SERVER_URL}/${environment.SEEK_URL}`, {
        position,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  next(): Observable<Success> {
    return this.http
      .post<Success>(`${environment.SERVER_URL}/${environment.NEXT_URL}`, {})
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  previous(): Observable<Success> {
    return this.http
      .post<Success>(
        `${environment.SERVER_URL}/${environment.PREVIOUS_URL}`,
        {}
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  shuffle(state: boolean): Observable<Shuffle> {
    return this.http
      .post<Shuffle>(`${environment.SERVER_URL}/${environment.SHUFFLE_URL}`, {
        shuffle: state,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  repeat(state: string): Observable<Repeat> {
    return this.http
      .post<Repeat>(`${environment.SERVER_URL}/${environment.REPEAT_URL}`, {
        repeat: state,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  transfer(id: string): Observable<Success> {
    return this.http
      .post<Success>(`${environment.SERVER_URL}/${environment.TRANSFER_URL}`, {
        id,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  // Need to call the spotify API to call endpoints
  getQueue(): Observable<Queue> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + this.loginService.access,
    });
    return this.http
      .get('https://api.spotify.com/v1/me/player/queue', { headers })
      .pipe(
        map((data: any) => {
          return {
            current: {
              album: {
                date: new Date(data.currently_playing.album.release_date),
                id: data.currently_playing.album.id,
                images: data.currently_playing.album.images,
                name: data.currently_playing.album.name,
                type: data.currently_playing.album.type,
                uri: data.currently_playing.album.uri,
              },
              artists: data.currently_playing.artists.map((artist: Core) => {
                return {
                  id: artist.id,
                  name: artist.name,
                  type: artist.type,
                  uri: artist.uri,
                };
              }),
              date: new Date(),
              duration: data.currently_playing.duration_ms,
              explicit: data.currently_playing.explicit,
              id: data.currently_playing.id,
              local: data.currently_playing.is_local,
              name: data.currently_playing.name,
              number: data.currently_playing.track_number,
              popularity: data.currently_playing.popularity,
              type: data.currently_playing.type,
              uri: data.currently_playing.uri,
            },
            queue: data.queue.map((track: any) => {
              return {
                album: {
                  date: new Date(track.album.release_date),
                  id: track.album.id,
                  images: track.album.images,
                  name: track.album.name,
                  type: track.album.type,
                  uri: track.album.uri,
                },
                artists: track.artists.map((artist: Core) => {
                  return {
                    id: artist.id,
                    name: artist.name,
                    type: artist.type,
                    uri: artist.uri,
                  };
                }),
                date: new Date(),
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
          } as Queue;
        }),
        catchError((err) => throwError(() => err.error))
      );
  }
}
