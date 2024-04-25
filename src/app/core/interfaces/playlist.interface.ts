export interface Playlist {
    id: number;
    title: string;
    picture?: string;
    duration?: number;
    user?: User;
}

interface User {
    name: string;
}