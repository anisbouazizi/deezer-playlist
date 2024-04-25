import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserPlaylists(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/playlists`);
  }

  getPlaylistDetails(playlistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlist/${playlistId}`);
  }

  getPlaylistTracks(playlistId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlist/${playlistId}/tracks`);
  }

  getMoreTracks(url: string): Observable<any> {
    return this.http.get(url);
  }
}
