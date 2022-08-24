import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumService } from './album.service';

@Component({
  selector: 'spotify-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: any;
  id: string = '';

  length: string = '';
  subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription.add(
      this.albumService.getAlbum(this.id).subscribe({
        next: (data) => {
          this.album = data;
          this.length = this.calculateDuration(this.album.tracks);
        },
      })
    );
  }

  private calculateDuration(tracks: Object[]): string {
    let time = 0;
    tracks.forEach((track: any) => {
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
}
