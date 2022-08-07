import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'spotify-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  AUTH_LINK!: string;
  constructor() {}

  ngOnInit(): void {
    this.AUTH_LINK = environment.AUTH_URL;
  }
}
