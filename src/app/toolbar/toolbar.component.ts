import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'spotify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[] = [];
  display = true;
  ngOnInit() {
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
