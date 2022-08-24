import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbum(id: string): Observable<Object> {
    return this.http
      .get(`${environment.SERVER_URL}/${environment.ALBUM_URL}?id=${id}`)
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
