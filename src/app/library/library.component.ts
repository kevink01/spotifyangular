import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAlbum } from '../models/core/IAlbum';
import { IArtist } from '../models/core/IArtist';
import { IPlaylist } from '../models/core/IPlaylist';
import { LibraryService } from './library.service';

@Component({
  selector: 'spotify-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  playlists: IPlaylist[] = [];
  filteredPlaylists: IPlaylist[] = [];

  playlistFilter: string = '';
  playlistSort: string = '';
  playlistOptions: any[] = [];

  artists: IArtist[] = [];
  filteredArtists: IArtist[] = [];

  artistFilter: string = '';
  artistSort: string = '';
  artistOptions: any[] = [];

  albums: IAlbum[] = [];
  filteredAlbums: IAlbum[] = [];

  albumFilter: string = '';
  albumSort: string = '';
  albumOptions: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(private libraryService: LibraryService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.libraryService.getPlaylists().subscribe((playlists) => {
        console.log(playlists);
        this.playlists = playlists;
        this.filteredPlaylists = playlists;
      })
    );
    this.subscriptions.push(
      this.libraryService.getFollowedArtists().subscribe((artists) => {
        console.log(artists);
        this.artists = artists;
        this.filteredArtists = artists;
      })
    );
    this.subscriptions.push(
      this.libraryService.getLibraryAlbums().subscribe((albums) => {
        console.log(albums);
        this.albums = albums;
        this.filteredAlbums = albums;
      })
    );
    this.playlistOptions = [
      { label: 'Relevant', value: '!name' },
      { label: 'Alphabetical', value: 'name' },
    ];
    this.artistOptions = [
      { label: 'Relevant', value: '!name' },
      { label: 'Alphabetical', value: 'name' },
    ];
    this.albumOptions = [
      { label: 'Relevant', value: '!' },
      { label: 'Album', value: 'name' },
      { label: 'Artist', value: 'artist' },
    ];
  }

  changeSort(type: string, event: any): void {
    let value;
    switch (type) {
      case 'playlists':
        value = event.value;
        if (value.indexOf('!') === 0) {
          this.filteredPlaylists = this.playlists;
        } else {
          this.filteredPlaylists = [...this.playlists].sort(
            (playlist1, playlist2) =>
              playlist1.name
                .toLocaleLowerCase()
                .localeCompare(playlist2.name.toLocaleLowerCase())
          );
        }
        this.playlistSort = value;
        break;
      case 'artists':
        value = event.value;
        if (value.indexOf('!') === 0) {
          this.filteredArtists = this.artists;
        } else {
          this.filteredArtists = [...this.artists].sort((artist1, artist2) =>
            artist1.name
              .toLocaleLowerCase()
              .localeCompare(artist2.name.toLocaleLowerCase())
          );
        }
        this.artistSort = value;
        break;
      case 'albums':
        value = event.value;
        if (value.indexOf('!') === 0) {
          this.filteredAlbums = this.albums;
        } else if (value === 'name') {
          this.filteredAlbums = [...this.albums].sort((album1, album2) =>
            album1.name.toLocaleLowerCase().localeCompare(album2.name)
          );
        } else {
          this.filteredAlbums = [...this.albums].sort((album1, album2) =>
            album1.artist.name
              .toLocaleLowerCase()
              .localeCompare(album2.artist.name)
          );
        }
        this.artistSort = value;
        break;
      default:
        break;
    }
  }

  navigate(page: string, id: string): void {
    this.router.navigate([`/${page}/`, id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
