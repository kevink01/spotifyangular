import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>('http://localhost:4201/playlists').pipe(
      map((data) => {
        return data.map((playlist) => {
          const newPlaylist: Playlist = {
            id: playlist.id,
            type: playlist.type,
            name: playlist.name,
            owner: <User>playlist.owner,
            description: playlist.description,
            count: playlist.count,
            public: playlist.public,
            collaborative: playlist.collaborative,
            images: Object.values(playlist.images),
            uri: playlist.uri,
          };
          return newPlaylist;
        });
      })
    );
  }

  // getPlaylist(id: string): Observable<Playlist> {
  //   return this.http.get<Playlist>(`http://localhost:4201/playlist/`, {id: id});
  // }
}
