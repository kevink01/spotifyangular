import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/core/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(id: string): Observable<Profile> {
    return this.http
      .get<Profile>(
        `${environment.SERVER_URL}/${environment.PROFILE_URL}?id=${id}`
      )
      .pipe(catchError((err) => throwError(() => err.error)));
  }
}
