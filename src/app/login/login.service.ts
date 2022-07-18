import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

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
    console.log(code);
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

  setUser(user: User): Promise<void> {
    console.log(user);

    return new Promise<void>(async (resolve, reject) => {
      if (user) {
        console.log('In resolve');
        console.log(user.access_token);

        this.accessToken = await user.access_token;
        this.refreshToken = await user.refresh_token;
        this.expiresIn = await user.expires_in;
        console.log(
          `ACCESS_TOKEN: ${this.accessToken}\nREFRESH_TOKEN: ${this.refreshToken}\nEXPIRES_IN: ${this.expiresIn}\n`
        );

        resolve();
      } else {
        console.log('In reject');

        reject(new Error('Invalid User Object'));
      }
    });
  }

  test(): string {
    return this.accessToken;
  }
}
