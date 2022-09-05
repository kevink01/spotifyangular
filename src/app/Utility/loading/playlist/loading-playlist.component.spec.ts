import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingPlaylistComponent } from './loading-playlist.component';

describe('PlaylistComponent', () => {
  let component: LoadingPlaylistComponent;
  let fixture: ComponentFixture<LoadingPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
