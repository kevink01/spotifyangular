import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../shared/constants';
import { Playlist } from '../models/Profile/Playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylist(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${Constants.SERVER_URL}/${Constants.PLAYLIST_URL}?id=${id}`);
  }
}
