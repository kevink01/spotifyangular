import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/core/login';
import { Success } from '../models/core/success';
import { CurrentUser } from '../models/core/user';

const mockProfile: CurrentUser = {
  country: '',
  email: '',
  followers: 0,
  id: '',
  images: [],
  name: '',
  product: '',
  type: '',
  uri: '',
};

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnDestroy {
  private _access: string = '';
  private _refresh: string = '';
  private _expires: number = 0;

  private _profileSubject = new BehaviorSubject<CurrentUser>(mockProfile);
  private _profile: Observable<CurrentUser> =
    this._profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(code: string): Observable<Login> {
    return this.http
      .post<Login>(`${environment.SERVER_URL}/${environment.LOGIN_URL}`, {
        code: JSON.stringify(code),
      })
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  getMyProfile(): Observable<CurrentUser> {
    return this.http
      .get<CurrentUser>(`${environment.SERVER_URL}/${environment.USER_ME_URL}`)
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  logout(): Observable<Success> {
    return this.http
      .delete<Success>(`${environment.SERVER_URL}/${environment.LOGOUT_URL}`)
      .pipe(catchError((err) => throwError(() => err.error)));
  }

  isLoggedIn(): boolean {
    return this.profileSubjectValue !== mockProfile;
  }

  setLogin(data: Login) {
    this.access = data.access;
    this.refresh = data.refresh;
    this.expires = data.expires;
  }

  set access(value: string) {
    this._access = value;
  }
  get access(): string {
    return this._access;
  }

  set expires(value: number) {
    this._expires = value;
  }
  get expires(): number {
    return this._expires;
  }

  set refresh(value: string) {
    this._refresh = value;
  }
  get refresh(): string {
    return this._refresh;
  }

  private get profileSubjectValue(): CurrentUser {
    return this._profileSubject.getValue();
  }

  updateProfile(profile: CurrentUser) {
    this._profileSubject.next(profile);
  }

  profile(): Observable<CurrentUser> {
    return this._profile;
  }

  ngOnDestroy(): void {
    this._profileSubject.unsubscribe();
    this._profileSubject.complete();
  }
}
