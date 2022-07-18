import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'spotify-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  private _isDark: boolean = false;
  isOpen: boolean = false;
  @ViewChild('sidenav') private _sidenav!: SidenavComponent;
  constructor() {}

  ngOnInit(): void {}

  toggleSidenavEmit(): void {
    console.log(this.sidenav.isOpen);

    this.sidenav.toggle();
    // this.isOpen = !this.isOpen;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.sidenav.toggleTheme();
  }

  get sidenav(): SidenavComponent {
    return this._sidenav;
  }

  set isDark(value: boolean) {
    this._isDark = value;
  }
  get isDark(): boolean {
    return this._isDark;
  }
}
