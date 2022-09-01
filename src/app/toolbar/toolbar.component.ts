import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'spotify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private _AUTH_LINK: string = '';
  private _profile: any = {};
  private _items: MenuItem[] = [];

  private subscription = new Subscription();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.AUTH_LINK = environment.AUTH_URL;
    this.subscription.add(
      this.loginService.profile.subscribe((data) => {
        this.profile = data;
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
  }

  returnHome(): void {
    this.router.navigate(['/dashboard']);
  }

  set AUTH_LINK(value: string) {
    this._AUTH_LINK = value;
  }
  get AUTH_LINK(): string {
    return this._AUTH_LINK;
  }

  set profile(value: any) {
    this._profile = value;
  }
  get profile(): any {
    return this._profile;
  }

  set items(value: MenuItem[]) {
    this._items = value;
  }
  get items(): MenuItem[] {
    return this._items;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
