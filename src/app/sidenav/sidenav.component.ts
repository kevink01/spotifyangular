import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spotify-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isDark: boolean = false;
  isOpen: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }
  toggleSidenav(): void {
    this.isOpen = !this.isOpen;
  }
}
