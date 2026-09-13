export interface Movie {
id: number;
title: string;
overview: string;
poster_path: string | null;
backdrop_path: string | null;
release_date: string;
vote_average: number;
vote_count: number;
popularity: number;
adult: boolean;
original_language: string;
original_title: string;
genre_ids?: number[];
}

export interface TVShow {
id: number;
name: string;
overview: string;
poster_path: string | null;
backdrop_path: string | null;
first_air_date: string;
vote_average: number;
vote_count: number;
popularity: number;
adult?: boolean;
original_language: string;
original_name: string;
genre_ids?: number[];
}

export interface Person {
id: number;
name: string;
profile_path: string | null;
popularity: number;
known_for_department: string;
known_for?: (Movie | TVShow)[];
}

export interface Genre {
id: number;
name: string;
}

export interface GenreWithMovies {
genre: Genre;
movies: Movie[];
}

export interface MovieDetails extends Movie {
genres: Genre[];
runtime: number;
status: string;
tagline: string;
budget: number;
revenue: number;
production_companies: {
id: number;
name: string;
logo_path: string | null;
}[];
spoken_languages: {
english_name: string;
}[];
}

export interface TVDetails extends TVShow {
genres: Genre[];
number_of_episodes: number;
number_of_seasons: number;
status: string;
tagline: string;
episode_run_time: number[];
networks: {
id: number;
name: string;
logo_path: string | null;
}[];
created_by: {
id: number;
name: string;
profile_path: string | null;
}[];
seasons: Season[];
spoken_languages: {
english_name: string;
}[];
}

export interface Season {
id: number;
name: string;
overview: string;
poster_path: string | null;
season_number: number;
episode_count: number;
air_date: string;
}

export interface CastMember {
id: number;
name: string;
character: string;
profile_path: string | null;
order: number;
}

export interface CrewMember {
id: number;
name: string;
job: string;
department: string;
profile_path: string | null;
}

export interface Credits {
cast: CastMember[];
crew: CrewMember[];
}

export interface Video {
id: string;
key: string;
name: string;
site: string;
type: string;
official: boolean;
}

export interface VideoResults {
results: Video[];
}
