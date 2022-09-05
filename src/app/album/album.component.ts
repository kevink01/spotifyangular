import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AlbumService } from './album.service';
import { Color } from '../utility/index';
import { Following } from '../models/core/following';
import { Track } from '../models/components/track';
import { Album } from '../models/components/album';

@Component({
  selector: 'spotify-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  private _album!: Album;
  private _id: string = '';
  private _duration: string = '';
  private _following: boolean = false;

  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription.add(
      this.albumService.getAlbum(this.id).subscribe({
        next: (data: Album) => {
          this.album = data;
          this.subscription.add(
            this.albumService.isFollowingAlbum(data.id).subscribe({
              next: (data: Following) => {
                this.following = data.following;
              },
            })
          );
          data.tracks?.forEach((track: Track) => {
            this.subscription.add(
              this.albumService.trackPopularity(track.id).subscribe({
                next: (data: Track) => {
                  track.popularity = data.popularity;
                },
              })
            );
          });
          this.duration = this.album.tracks
            ? this.calculateDuration(this.album.tracks)
            : '0 minutes';
        },
      })
    );
  }

  toggleFollow(): void {
    this.subscription.add(
      this.albumService.toggleFollow(this.album.id, this.following).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: `${this.following ? 'Unfollowed' : 'Followed'} album!`,
            detail: `Name: ${this.album.name}`,
            life: 2000,
          });
          this.following = !this.following;
        },
      })
    );
  }

  getPopularityColor(pop: number): string {
    return Color.hexColor(pop);
  }

  private calculateDuration(tracks: Track[]): string {
    let time = 0;
    tracks.forEach((track: Track) => {
      time += track.duration;
    });
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    if (hours === 0) {
      return `${minutes} minutes`;
    } else {
      return `${hours}hr ${minutes} min`;
    }
  }

  set album(value: Album) {
    this._album = value;
  }
  get album(): Album {
    return this._album;
  }

  set id(value: string) {
    this._id = value;
  }
  get id(): string {
    return this._id;
  }

  set duration(value: string) {
    this._duration = value;
  }
  get duration(): string {
    return this._duration;
  }

  set following(value: boolean) {
    this._following = value;
  }
  get following(): boolean {
    return this._following;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
