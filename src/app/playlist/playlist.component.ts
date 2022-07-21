import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account/account.service';
import { Playlist } from '../models/playlist';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  id!: string;
  playlist!: Playlist;
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    // this.playlist = this.accountService
    //   .getPlaylist()
    //   .subscribe((playlist) => (this.playlist = playlist));
  }
}
