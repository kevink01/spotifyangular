import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';

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
      'http://localhost:4201/login',
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

  // setUser(credentials: Credentials): Promise<void> {
  //   return new Promise<void>(async (resolve, reject) => {
  //     if (credentials) {
  //       // this.accessToken = await credentials.access_token;
  //       // this.refreshToken = await credentials.refresh_token;
  //       // this.expiresIn = await credentials.expires_in;
  //       resolve();
  //     } else {
  //       reject(new Error('Invalid User Object'));
  //     }
  //   });
  // }
}
