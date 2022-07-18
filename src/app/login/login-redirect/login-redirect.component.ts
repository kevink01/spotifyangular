import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { LoginService } from '../login.service';

@Component({
  selector: 'spotify-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
})
export class LoginRedirectComponent implements OnInit {
  private _code!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.queryParamMap.get(
      'code'
    ) as string;
    this.loginService.login(this.code).subscribe((data) => {
      if (data) {
        this.loginService
          .setUser(<User>JSON.parse(data.toString()))
          .then(() => {
            this.router.navigate(['/home']);
          });
      }
    });
  }

  get code(): string {
    return this._code;
  }
  set code(value: string) {
    this._code = value;
  }
}
