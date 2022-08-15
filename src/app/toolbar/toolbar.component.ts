import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'spotify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[] = [];
  display = true;
  AUTH_LINK: string = '';

  profile: any = {};
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit() {
    this.AUTH_LINK = environment.AUTH_URL;
    this.loginService.profile.subscribe((data) => {
      console.log(data);
      this.profile = data;
    });
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
}
