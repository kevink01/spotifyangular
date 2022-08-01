import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { IPlaylist } from '../models/core/IPlaylist';

@Component({
  selector: 'spotify-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  playlists: IPlaylist[] = [];
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}
}
