import { Movie, TVShow, Person, GenreWithMovies } from '../interface/movie.interface'
import MediaRow from './components/MediaRow'
import PeopleRow from './components/PeopleRow'

interface Props {
    trendingTV: TVShow[]
    trendingPeople: Person[]
    popularMovies: Movie[]
    topRatedMovies: Movie[]
    nowPlaying: Movie[]
    upcomingMovies: Movie[]
    popularTV: TVShow[]
    topRatedTV: TVShow[]
    genreRows: GenreWithMovies[]
}

export default function BrowseContent({
    trendingTV, trendingPeople, popularMovies, topRatedMovies,
    nowPlaying, upcomingMovies, popularTV, topRatedTV, genreRows,
}: Props) {
    return (
        <div className="flex flex-col gap-16 pb-24 pt-16">
            <MediaRow title="Popular Movies" subtitle="What everyone's watching" items={popularMovies} type="movie" categorySlug="popular-movies" />
            <MediaRow title="Trending TV" subtitle="Shows making waves this week" items={trendingTV} type="tv" categorySlug="trending-tv" />
            <MediaRow title="Now Playing" subtitle="In cinemas right now" items={nowPlaying} type="movie" accent categorySlug="now-playing" />
            <PeopleRow people={trendingPeople} />
            <MediaRow title="Top Rated All Time" subtitle="Cinema's finest, ranked by you" items={topRatedMovies} type="movie" categorySlug="top-rated-all-time" />
            <MediaRow title="Coming Soon" subtitle="What's next on the big screen" items={upcomingMovies} type="movie" categorySlug="coming-soon" />
            <MediaRow title="Popular TV Shows" subtitle="Binge-worthy series" items={popularTV} type="tv" categorySlug="popular-tv-shows" />
            <MediaRow title="Top Rated TV" subtitle="The best television ever made" items={topRatedTV} type="tv" categorySlug="top-rated-tv" />
            {genreRows.map(({ genre, movies }) => (
                <MediaRow
                    key={genre.id}
                    title={genre.name}
                    subtitle={`Best of ${genre.name.toLowerCase()} cinema`}
                    items={movies}
                    type="movie"
                    genreId={genre.id}
                />
            ))}
        </div>
    )
}