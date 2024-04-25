import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { Playlist } from '../../core/interfaces/playlist.interface';
import { Track } from '../../core/interfaces/track.interface';
import { ActivatedRoute } from '@angular/router';
import { DeezerService } from '../../shared/services/deezer.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-playlist-details',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.scss'
})
export class PlaylistDetailsComponent implements OnInit {
  playlistId!: number;
  playlist?: Playlist;
  tracks: Track[] = [];
  nextPageUrl: string | null = null;

  constructor(private route: ActivatedRoute, private deezerService: DeezerService) { }

  ngOnInit(): void {
    if (this.route?.snapshot?.params) {
      this.playlistId = this.route.snapshot.params['id']
    }

    if (this.playlistId != null) {
      this.loadPlaylistDetails();
      this.loadTracks();
    }
    
  }

  loadPlaylistDetails(): void {
    this.deezerService.getPlaylistDetails(this.playlistId).subscribe(data => {
      this.playlist = data;
    });
  }

  loadTracks(): void {
    this.deezerService.getPlaylistTracks(this.playlistId).subscribe(response => {
      this.tracks = response.data;
      this.nextPageUrl = response.next; // l'API fournit une URL pour la page suivante
    });
  }

  onScroll(event: any): void {
    const target = event.target;
    if (target.offsetHeight + target.scrollTop >= target.scrollHeight) {
      this.loadMoreTracks();
    }
  }

  loadMoreTracks(): void {
    if (this.nextPageUrl) {
      const nextUrl = this.nextPageUrl.replace(environment.originalUrl, environment.apiUrl);
      this.deezerService.getMoreTracks(nextUrl).subscribe(response => {
        this.tracks = [...this.tracks, ...response.data];
        this.nextPageUrl = response.next;
      });
    }
  }

  formatDuration(seconds: number | undefined): string {
    if (seconds == null) {
      return '';
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
