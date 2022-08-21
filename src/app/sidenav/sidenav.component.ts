import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { PlayerService } from '../player/player.service';
import { CreatePlaylistComponent } from './playlist/create-playlist.component';
@Component({
  selector: 'spotify-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  private _AUTH_LINK!: string;
  private _dialogRef!: DynamicDialogRef;
  profile: any = undefined;
  recent: any = undefined;
  subscriptions = new Subscription();
  constructor(
    private router: Router,
    private dialogService: DialogService,
    private loginService: LoginService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.AUTH_LINK = environment.AUTH_URL;
    this.subscriptions.add(
      this.loginService.profile.subscribe({
        next: (profile) => {
          console.log(profile);
          this.profile = profile;
          this.subscriptions.add(
            this.playerService.getRecentlyPlayed().subscribe({
              next: (recent: any) => {
                console.log(recent);
                this.recent = recent.items;
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      })
    );
  }

  set AUTH_LINK(value: string) {
    this._AUTH_LINK = value;
  }
  get AUTH_LINK(): string {
    return this._AUTH_LINK;
  }

  getDialog(): DynamicDialogRef {
    return this._dialogRef;
  }

  navigate(url: string): void {
    this.router.navigate(['/' + url]);
  }

  createPlaylist(): void {
    this._dialogRef = this.dialogService.open(CreatePlaylistComponent, {
      width: '50vw',
      height: '90vh',
    });
    this._dialogRef.onClose.subscribe(() => console.log('Done with create'));
  }

  ngOnDestroy(): void {
    if (this._dialogRef) {
      this._dialogRef.close();
    }
    this.subscriptions.unsubscribe();
  }
}
