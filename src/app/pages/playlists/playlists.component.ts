import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Playlist } from '../../core/interfaces/playlist.interface';
import { DeezerService } from '../../shared/services/deezer.service';
import { ErrorComponent } from '../../shared/components/error/error.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, ErrorComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit {
  public playlists: Playlist[] = [];
  public errorMessage: string = '';

  constructor(private deezerService: DeezerService, private router: Router) { }

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    const userId = 5; // Exemple de UserId fournie dans le test
    this.deezerService.getUserPlaylists(userId).subscribe(response => {
        if (response.status = 200) {
          this.playlists = response.data;
        } else {
          this.errorMessage = `Un erreur est survenu`;
        }      
    });
  }

  selectPlaylist(playlistId: number): void {
    this.router.navigate(['/playlist', playlistId]);
  }
}
