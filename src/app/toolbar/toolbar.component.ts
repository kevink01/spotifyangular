import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'spotify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  profile: any = {};
  items: MenuItem[] = [];

  display = true;
  AUTH_LINK: string = '';

  subscription = new Subscription();

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
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: '/settings',
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => {},
      },
    ];
  }

  home(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
