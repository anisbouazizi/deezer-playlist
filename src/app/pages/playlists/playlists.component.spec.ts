import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsComponent } from './playlists.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PlaylistsComponent', () => {
  let component: PlaylistsComponent;
  let fixture: ComponentFixture<PlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
