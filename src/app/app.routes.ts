import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/playlists/playlists.component')
            .then(m => m.PlaylistsComponent)
    },
    {
        path: 'playlist/:id',
        loadComponent: () => import('./pages/playlist-details/playlist-details.component')
            .then(m => m.PlaylistDetailsComponent)
    }
];
