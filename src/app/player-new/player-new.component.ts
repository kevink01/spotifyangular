import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Playback } from '../models/player/playback';
import { Playing } from '../models/player/playing';
import { Position } from '../models/player/position';
import { Shuffle } from '../models/player/shuffle';
import { PlayerService } from '../player/player.service';
import { RepeatState } from '../utility';
import { Repeat } from '../models/player/repeat';
import { MenuItem } from 'primeng/api';
import { ActiveDeviceReturn } from '../models/core/http/activeDevice';
import { ActiveDevice } from '../models/player/activeDevice';
import { Success } from '../models/core/success';
import { Queue } from '../models/player/queue';
import { Track } from '../models/shared/track';

@Component({
  selector: 'spotify-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.scss']
})
export class PlayerNewComponent implements OnInit {
  private _playback!: Playback;
  private _progress: number = 0;
  private _songProgress: number = 0;

  private progressChange: any;

  private _queue!: Queue;

  private _devices: ActiveDevice[] = [];
  private _devicesMenu: MenuItem[] = [];

  private subscriptions = new Subscription();

  constructor(private playerService: PlayerService, private router: Router) {}

  
  ngOnInit(): void {
    this.subscriptions.add(
      this.playerService.getQueue().subscribe({
        next: (data: Queue) => {
          this.queue = data;
        },
      })
    );
    this.subscriptions.add(
      this.playerService.getPlayback().subscribe({
        next: (data: Playback) => {
          this.playback = data;
          this.startPlayer();
          this.subscriptions.add(
            this.playerService.getDevices().subscribe({
              next: (data: ActiveDeviceReturn) => {
                console.log(data);
                this.devices = data.devices;
                this.devicesMenu = data.devices.map((device: ActiveDevice) => {
                  return {
                    label: device.name,
                    icon:
                      device.type.toLocaleLowerCase() === 'computer'
                        ? 'fa-solid fa-computer'
                        : 'fa-solid fa-mobile',
                    command: () => {
                      this.subscriptions.add(
                        this.playerService.transfer(device.id).subscribe({
                          next: (success: Success) => {
                            if (success.success) {
                              this.playback.device = data.devices.find(
                                (device) => device.id === device.id
                              ) as ActiveDevice;
                            }
                          },
                        })
                      );
                    },
                  } as MenuItem;
                });
              },
            })
          );
        },
      })
    );
  }

  startPlayer(): void {
    this.progress = this.playback.progress;
    this.songProgress = (this.progress / this.playback.track.duration) * 100;
    if (this.playback.playing) {
      this.progressChange = setInterval(() => {
        this.progress += 1000;
        this.songProgress =
          (this.progress / this.playback.track.duration) * 100;
        if (this.songProgress >= 100) {
          this.queue.current = this.queue.queue.shift() as Track;
          // Update queue every 5 new tracks or no more tracks
          if (this.queue.queue.length === 0 || this.queue.queue.length === 15) {
            this.subscriptions.add(
              this.playerService.getQueue().subscribe({
                next: (data: Queue) => {
                  this.queue = data;
                },
              })
            );
          }
          clearInterval(this.progressChange);
          setTimeout(() => {}, 1000);
          this.subscriptions.add(
            this.playerService.getPlayback().subscribe({
              next: (data: Playback) => {
                this.playback = data;
                setTimeout(() => {}, 1000);
                this.startPlayer();
              },
            })
          );
        }
      }, 1000);
    }
  }

  togglePlay(): void {
    switch (this.playback.playing) {
      case true:
        this.subscriptions.add(
          this.playerService.pause().subscribe({
            next: (data: Playing) => {
              this.playback.playing = data.playing;
              setTimeout(() => {}, 1000);
              clearInterval(this.progressChange);
            },
          })
        );
        break;
      case false:
        this.subscriptions.add(
          this.playerService.play().subscribe({
            next: (data: Playing) => {
              this.playback.playing = data.playing;
              clearInterval(this.progressChange);
              setTimeout(() => {}, 1000);
              this.startPlayer();
            },
          })
        );
        break;
      default:
        break;
    }
  }

  seek(event: any): void {
    this.subscriptions.add(
      this.playerService
        .seek(Math.floor((event.value / 100) * this.playback.track.duration))
        .subscribe((data: Position) => {
          this.playback.progress = data.position;
          clearInterval(this.progressChange);
          this.startPlayer();
        })
    );
  }

  beginning(): void {
    this.subscriptions.add(
      this.playerService.seek(0).subscribe((data: Position) => {
        this.playback.progress = data.position;
        setTimeout(() => {}, 1000);
        clearInterval(this.progressChange);
        this.startPlayer();
      })
    );
  }

  next() {
    this.subscriptions.add(
      this.playerService.next().subscribe({
        next: () => {
          clearInterval(this.progressChange);
          this.queue.current = this.queue.queue.shift() as Track;
          // Update queue every 5 new tracks or no more tracks
          if (this.queue.queue.length === 0 || this.queue.queue.length === 15) {
            this.subscriptions.add(
              this.playerService.getQueue().subscribe({
                next: (data: Queue) => {
                  this.queue = data;
                },
              })
            );
          }
          setTimeout(() => {}, 1000);
          this.subscriptions.add(
            this.playerService.getPlayback().subscribe({
              next: (data: Playback) => {
                this.playback = data;
                this.startPlayer();
              },
            })
          );
        },
      })
    );
  }

  previous() {
    this.subscriptions.add(
      this.playerService.previous().subscribe({
        next: () => {
          clearInterval(this.progressChange);
          setTimeout(() => {}, 1000);
          this.subscriptions.add(
            this.playerService.getPlayback().subscribe({
              next: (data: Playback) => {
                this.playback = data;
                this.startPlayer();
              },
            })
          );
        },
      })
    );
  }

  shuffle(): void {
    this.subscriptions.add(
      this.playerService.shuffle(!this.playback.shuffle).subscribe({
        next: (data: Shuffle) => {
          this.playback.shuffle = data.shuffle;
        },
      })
    );
  }

  repeat(): void {
    this.subscriptions.add(
      this.playerService
        .repeat(RepeatState.getNextState(this.playback.repeat))
        .subscribe({
          next: (data: Repeat) => {
            this.playback.repeat = data.repeat;
          },
        })
    );
  }

  navigate(path: string, params: string): void {
    this.router.navigate([`/${path}`, params]);
  }

  set playback(value: Playback) {
    this._playback = value;
  }
  get playback(): Playback {
    return this._playback;
  }

  set progress(value: number) {
    this._progress = value;
  }
  get progress(): number {
    return this._progress;
  }

  set songProgress(value: number) {
    this._songProgress = value;
  }
  get songProgress(): number {
    return this._songProgress;
  }

  set queue(value: Queue) {
    this._queue = value;
  }
  get queue(): Queue {
    return this._queue;
  }

  set devices(value: ActiveDevice[]) {
    this._devices = value;
  }
  get devices(): ActiveDevice[] {
    return this._devices;
  }

  set devicesMenu(value: MenuItem[]) {
    this._devicesMenu = value;
    console.log(this._devicesMenu);
  }
  get devicesMenu(): MenuItem[] {
    return this._devicesMenu;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    clearInterval(this.progressChange);
  }
}
