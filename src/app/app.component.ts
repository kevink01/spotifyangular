import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private breakPointObserver: BreakpointObserver) {
    breakPointObserver.isMatched('(')
  }
  title = 'SpotifyClone';
}
