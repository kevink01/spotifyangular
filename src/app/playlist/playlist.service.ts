import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playlist } from '../models/Profile/Playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylist(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(
      `${environment.SERVER_URL}/${environment.PLAYLIST_URL}?id=${id}`
    );
  }

  createPlaylist(values: any) {
    return this.http
      .post(
        `${environment.SERVER_URL}/${environment.CREATE_PLAYLIST_URL}`,
        values
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  updatePlaylist(id: string, values: any) {
    return this.http.put(
      `${environment.SERVER_URL}/${environment.UPDATE_PLAYLIST_URL}`,
      { id: id, details: values }
    );
  }

  uploadImage(id: string, image: any): Observable<any> {
    return this.http
      .post(`${environment.SERVER_URL}/${environment.UPLOAD_IMAGE_URL}`, {
        id: id,
        image: image,
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
