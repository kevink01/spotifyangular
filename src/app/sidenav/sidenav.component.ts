import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Constants } from '../shared/constants';
@Component({
  selector: 'spotify-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  private _isDark: boolean = false;
  private _isOpen: boolean = false;
  private _AUTH_LINK!: string;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.AUTH_LINK = Constants.AUTH_URL;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }
  toggleSidenav(): void {
    this.isOpen = !this.isOpen;
  }

  set isDark(value: boolean) {
    this._isDark = value;
  }

  get isDark(): boolean {
    return this._isDark;
  }

  set isOpen(value: boolean) {
    this._isOpen = value;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  set AUTH_LINK(value: string) {
    this._AUTH_LINK = value;
  }

  get AUTH_LINK(): string {
    return this._AUTH_LINK;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
