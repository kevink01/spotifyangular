import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from '../models/components/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  getArtist(id: string): Observable<Artist> {
    return this.http
      .get<Artist>(
        `${environment.SERVER_URL}/${environment.ARTIST_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
