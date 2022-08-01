import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAlbum } from '../models/core/IAlbum';
import { IArtist } from '../models/core/IArtist';
import { IPlaylist } from '../models/core/IPlaylist';
import { Library } from '../Utility';
import { LibraryService } from './library.service';

@Component({
  selector: 'spotify-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  @ViewChild('playlists') playlistsRef!: DataView;

  playlists: IPlaylist[] = [];
  filteredPlaylists: IPlaylist[] = [];

  playlistSortInput: string = '';
  playlistSort: string = '';
  playlistOptions: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.libraryService.getPlaylists().subscribe((playlists) => {
        console.log(playlists);
        this.playlists = playlists;
        this.filteredPlaylists = playlists;
      })
    );
    this.playlistOptions = [
      { label: 'Relevant', value: '!name' },
      { label: 'Alphabetical', value: 'name' },
    ];
  }

  changeSort(event: any): void {
    const value = event.value;
    if (value.indexOf('!') === 0) {
      this.filteredPlaylists = this.playlists;
    } else {
      this.filteredPlaylists = [...this.playlists].sort(
        (playlist1, playlist2) =>
          playlist1.name
            .toLocaleLowerCase()
            .localeCompare(playlist2.name.toLocaleLowerCase())
      );
      this.playlistSort = value;
    }
  }

  // albums: IAlbum[] = [];
  // artists: IArtist[] = [];

  // filteredPlaylists: IPlaylist[] = [];
  // filteredAlbums: IAlbum[] = [];
  // filteredArtists: IArtist[] = [];

  // private _playlist_sort: string = 'most_relevant';
  // private _playlist_search: string = '';
  // private _album_sort: string = 'most_relevant';
  // private _album_search: string = '';
  // private _artist_sort: string = 'most_relevant';
  // private _artist_search: string = '';

  // constructor(
  //   private libraryService: LibraryService,
  //   private router: Router,
  //   private content: ElementRef,
  //   @Inject(DOCUMENT) private document: Document
  // ) {}
  // ngAfterContentInit(): void {}

  // ngOnInit(): void {
  //   this.subscriptions.push(
  //     this.libraryService.getPlaylists().subscribe((playlists) => {
  //       console.log(playlists);
  //       this.playlists = playlists;
  //       this.filteredPlaylists = this.playlists;
  //     })
  //   );
  //   this.subscriptions.push(
  //     this.libraryService.getFollowedArtists().subscribe((artists) => {
  //       this.artists = artists;
  //       this.filteredArtists = this.artists;
  //     })
  //   );
  //   this.subscriptions.push(
  //     this.libraryService.getLibraryAlbums().subscribe((albums) => {
  //       this.albums = albums;
  //       this.filteredAlbums = this.albums;
  //     })
  //   );
  // }

  // changeOrder(tab: string): void {
  //   switch (tab) {
  //     case 'playlists':
  //       this.playlist_search = ''; // Resets the search field
  //       this.filteredPlaylists = this.filterPlaylists(this.playlist_sort, true);
  //       break;
  //     case 'artists':
  //       this.artist_search = ''; // Resets the search field
  //       this.filteredArtists = this.filterArtists(this.artist_sort, true);
  //       break;
  //     case 'albums':
  //       this.album_search = ''; // Resets the search field
  //       this.filteredAlbums = this.filterAlbums(this.album_sort, true);
  //   }
  // }

  // filterPlaylists(search: string, isSort: boolean): any[] {
  //   if (isSort) {
  //     if (search === 'alphabetical') {
  //       return [...this.playlists].sort((playlist1, playlist2) =>
  //         playlist1.name
  //           .toLocaleLowerCase()
  //           .localeCompare(playlist2.name.toLocaleLowerCase())
  //       );
  //     } else {
  //       return this.playlists;
  //     }
  //   } else {
  //     search = search.toLocaleLowerCase();
  //     return this.playlists.filter((playlist) =>
  //       playlist.name.toLocaleLowerCase().includes(search)
  //     );
  //   }
  // }

  // filterArtists(search: string, isSort: boolean): IArtist[] {
  //   if (isSort) {
  //     if (search === 'alphabetical') {
  //       return [...this.artists].sort((artist1, artist2) =>
  //         artist1.name
  //           .toLocaleLowerCase()
  //           .localeCompare(artist2.name.toLocaleLowerCase())
  //       );
  //     } else {
  //       return this.artists;
  //     }
  //   } else {
  //     search = search.toLocaleLowerCase();
  //     return this.artists.filter((artist) =>
  //       artist.name.toLocaleLowerCase().includes(search)
  //     );
  //   }
  // }

  // filterAlbums(search: string, isSort: boolean): IAlbum[] {
  //   if (isSort) {
  //     if (search === 'alphabetical') {
  //       return [...this.albums].sort((album1, album2) =>
  //         album1.name
  //           .toLocaleLowerCase()
  //           .localeCompare(album2.name.toLocaleLowerCase())
  //       );
  //     } else if (search === 'creator') {
  //       return [...this.albums].sort((album1, album2) =>
  //         album1.artist.name
  //           .toLocaleLowerCase()
  //           .localeCompare(album2.artist.name.toLocaleLowerCase())
  //       );
  //     } else {
  //       return this.albums;
  //     }
  //   } else {
  //     search = search.toLocaleLowerCase();
  //     if (search === 'creator') {
  //       return this.albums.filter((album) =>
  //         album.artist.name.toLocaleLowerCase().includes(search)
  //       );
  //     } else {
  //       return this.albums.filter((album) =>
  //         album.name.toLocaleLowerCase().includes(search)
  //       );
  //     }
  //   }
  // }

  // set playlist_search(value: string) {
  //   this._playlist_search = value;
  //   this.filteredPlaylists = this.filterPlaylists(value, false);
  // }
  // get playlist_search() {
  //   return this._playlist_search;
  // }

  // set playlist_sort(value: string) {
  //   this._playlist_sort = value;
  // }
  // get playlist_sort() {
  //   return this._playlist_sort;
  // }

  // set artist_search(value: string) {
  //   this._artist_search = value;
  //   this.filteredArtists = this.filterArtists(value, false);
  // }
  // get artist_search() {
  //   return this._artist_search;
  // }

  // set artist_sort(value: string) {
  //   this._artist_sort = value;
  // }
  // get artist_sort() {
  //   return this._artist_sort;
  // }

  // set album_search(value: string) {
  //   this._album_search = value;
  //   this.filteredAlbums = this.filterAlbums(value, false);
  // }

  // get album_search() {
  //   return this._album_search;
  // }

  // set album_sort(value: string) {
  //   this._album_sort = value;
  // }
  // get album_sort() {
  //   return this._album_sort;
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
