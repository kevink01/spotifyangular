import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
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
        // console.log(data);
        // this.loginService
        //   .setUser(<Credentials>JSON.parse(data.toString()))
        //   .then(() => {
        //     this.router.navigate(['/dashboard']);
        //   });
        this.router.navigate(['/dashboard']);
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
