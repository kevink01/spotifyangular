import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { CurrentUser } from '../models/core/user';

@Component({
  selector: 'spotify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private _AUTH_LINK: string = '';
  private _profile!: CurrentUser;
  private _loggedIn: boolean = false;
  private _items: MenuItem[] = [];
  private _loginItems: MenuItem[] = [];

  private timer!: any;

  private subscriptions = new Subscription();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    // TODO Keep client refreshed
    // this.timer = setInterval(() => {
    //   console.log('Hello');
    // }, 2000);
    this.AUTH_LINK = environment.AUTH_URL;
    this.subscriptions.add(
      this.loginService.profile().subscribe((data: CurrentUser) => {
        this.profile = data;
        if (this.profile.name !== '') {
          this.loggedIn = true;
        }
      })
    );
    this.items = [
      {
        label: 'Profile',
        icon: 'fa-solid fa-user',
        routerLink: '/profile',
      },
      {
        label: 'Settings',
        icon: 'fa-solid fa-gear',
        routerLink: '/settings',
      },
      {
        label: 'Log out',
        icon: 'fa-solid fa-right-from-bracket',
        command: () => {},
      },
    ];
    this.loginItems = [
      {
        label: 'Login',
        icon: 'fa-solid fa-right-to-bracket',
        command: () => {
          window.location.href = this.AUTH_LINK;
        },
      },
    ];
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    clearInterval(this.timer);
  }

  set AUTH_LINK(value: string) {
    this._AUTH_LINK = value;
  }
  get AUTH_LINK(): string {
    return this._AUTH_LINK;
  }

  set profile(value: CurrentUser) {
    this._profile = value;
  }
  get profile(): CurrentUser {
    return this._profile;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }
  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set items(value: MenuItem[]) {
    this._items = value;
  }
  get items(): MenuItem[] {
    return this._items;
  }

  set loginItems(value: MenuItem[]) {
    this._loginItems = value;
  }
  get loginItems(): MenuItem[] {
    return this._loginItems;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
