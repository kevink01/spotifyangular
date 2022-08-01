import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Constants } from '../shared/constants';
import { log } from '../Utility/Library';
@Component({
  selector: 'spotify-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  private _AUTH_LINK!: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.AUTH_LINK = Constants.AUTH_URL;
  }

  set AUTH_LINK(value: string) {
    this._AUTH_LINK = value;
  }
  get AUTH_LINK(): string {
    return this._AUTH_LINK;
  }

  navigate(url: string): void {
    this.router.navigate(['/' + url]);
  }
}
