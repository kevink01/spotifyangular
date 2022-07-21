import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'spotify-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  AUTH_LINK!: string;
  constructor() {}

  ngOnInit(): void {
    this.AUTH_LINK = Constants.AUTH_URL;
  }
}
