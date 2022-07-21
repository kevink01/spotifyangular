import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Playlist } from '../models/playlist';

@Component({
  selector: 'spotify-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  playlists: Playlist[] = [];
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getPlaylists().subscribe((data) => {
      data.forEach((value) => {
        console.log(Object.values(value));
      });
      this.playlists = data;
    });
  }
}
