import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { PlaylistDetailsComponent } from './playlist-details.component';
import { DeezerService } from '../../shared/services/deezer.service';

describe('PlaylistDetailsComponent', () => {
  let component: PlaylistDetailsComponent;
  let fixture: ComponentFixture<PlaylistDetailsComponent>;
  let deezerService: DeezerService;

  beforeEach(waitForAsync(() => {
    const activatedRouteStub = {
      snapshot: { paramMap: convertToParamMap({ id: 123 }) }
    };
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule, PlaylistDetailsComponent],
      declarations: [],
      providers: [
        DeezerService,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetailsComponent);
    component = fixture.componentInstance;
    deezerService = TestBed.inject(DeezerService); // Inject DeezerService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load playlist details', () => {
    const mockPlaylist = { id: 123, title: 'Test Playlist' };
    spyOn(deezerService, 'getPlaylistDetails').and.returnValue(of(mockPlaylist));

    component.loadPlaylistDetails();

    expect(component.playlist).toEqual(mockPlaylist);
  });

  it('should load tracks', () => {
    const mockTracks = [{ id: 1, title: 'Track 1' }, { id: 2, title: 'Track 2' }];
    const mockResponse = { data: mockTracks, next: null };
    spyOn(deezerService, 'getPlaylistTracks').and.returnValue(of(mockResponse));

    component.loadTracks();

    expect(component.tracks).toEqual(mockTracks);
    expect(component.nextPageUrl).toBeNull();
  });

  it('should format duration', () => {
    expect(component.formatDuration(3600)).toEqual('01:00:00');
    expect(component.formatDuration(90)).toEqual('00:01:30');
    expect(component.formatDuration(undefined)).toEqual('');
  });

});
