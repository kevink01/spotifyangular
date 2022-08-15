import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnDestroy {
  private _accessToken!: string;
  private _refreshToken!: string;
  private _expiresIn!: number;
  private _profileSubject = new BehaviorSubject<Object>('Not logged in');
  private _profile = this._profileSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(code: string): Observable<Object> {
    return this.http.post(`${environment.SERVER_URL}/login`, {
      code: JSON.stringify(code),
    });
  }

  getMyProfile(): Observable<Object> {
    return this.http.get(
      `${environment.SERVER_URL}/${environment.USER_ME_URL}`
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

  updateProfile(profile: Object) {
    this._profileSubject.next(profile);
  }

  get profile(): Observable<Object> {
    return this._profile;
  }

  ngOnDestroy(): void {
    this._profileSubject.unsubscribe();
  }
}
