import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playlist } from '../models/Profile/Playlist';
import { PlaylistService } from './playlist.service';
import { Track } from '../models/Profile/Track';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'spotify-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  animations: [
    trigger('detailsToggle', [
      state('collapsed', style({ height: 0, maxHeight: 0 })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('250ms cubic-bezier(0,.5,0,1)')
      ),
    ]),
  ],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  id: string = '';
  playlist!: Playlist;
  length: string = '';
  subscription!: Subscription;
  displayHeaders: string[] = ['#', 'Title', 'Album', 'Date Added', 'Duration'];
  expandHeaders: string[] = [...this.displayHeaders, 'expand'];
  expandedElement!: Track | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription = this.playlistService
      .getPlaylist(this.id)
      .subscribe((playlist) => {
        console.log(playlist);
        this.playlist = playlist;
        this.length = this.calculateDuration(playlist.tracks);
      });
  }

  private calculateDuration(tracks: Track[]): string {
    let time = 0;
    tracks.forEach((track) => {
      time += track.duration;
    });
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    return `${hours}:${minutes}`;
  }

  toggleExpand(element: Track): void {
    if (this.expandedElement !== element) {
      this.expandedElement = element;
    } else {
      this.expandedElement = null;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
