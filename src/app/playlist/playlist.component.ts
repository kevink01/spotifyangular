import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';
import { Playlist } from '../models/Profile/Playlist';
import { PlaylistService } from './playlist.service';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  id: string = '';
  playlist!: Playlist;
  subscription!: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription = this.playlistService
      .getPlaylist(this.id)
      .subscribe((playlist) => {
        this.playlist = playlist;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
