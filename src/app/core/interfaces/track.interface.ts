export interface Track {
    id: number;
    title: string;
    artist?: Artist;
    duration?: number;
}

interface Artist {
    name: string;
};