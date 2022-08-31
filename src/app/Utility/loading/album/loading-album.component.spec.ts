import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAlbumComponent } from './loading-album.component';

describe('AlbumComponent', () => {
  let component: LoadingAlbumComponent;
  let fixture: ComponentFixture<LoadingAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingAlbumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
