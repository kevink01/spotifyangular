import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../shared/constants';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _accessToken!: string;
  private _refreshToken!: string;
  private _expiresIn!: number;

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  login(code: string): Observable<Object> {
    return this.http.post(
      `${Constants.SERVER_URL}/login`,
      { code: JSON.stringify(code) },
      this.httpHeaders
    );
  }

  private set accessToken(value: string) {
    this._accessToken = value;
  }
  private set expiresIn(value: number) {
    this._expiresIn = value;
  }
  private set refreshToken(value: string) {
    this._refreshToken = value;
  }

  private get accessToken(): string {
    return this._accessToken;
  }

  private get expiresIn(): number {
    return this._expiresIn;
  }

  private get refreshToken(): string {
    return this._refreshToken;
  }
}
