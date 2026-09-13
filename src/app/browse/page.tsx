import { fetchTMDB } from '../../../lib/tmdb'
import { TMDBResponse, Movie, TVShow, Person, Genre, GenreWithMovies } from '../interface/movie.interface'
import Showcase from './Showcase'
import BrowseContent from './BrowseContent'

export default async function BrowsePage() {
  const [
    trendingMovies,
    trendingTV,
    trendingPeople,
    popularMovies,
    topRatedMovies,
    nowPlaying,
    upcomingMovies,
    popularTV,
    topRatedTV,
    movieGenres,
  ] = await Promise.all([
    fetchTMDB<TMDBResponse<Movie>>('/trending/movie/day'),
    fetchTMDB<TMDBResponse<TVShow>>('/trending/tv/day'),
    fetchTMDB<TMDBResponse<Person>>('/trending/person/day'),
    fetchTMDB<TMDBResponse<Movie>>('/movie/popular'),
    fetchTMDB<TMDBResponse<Movie>>('/movie/top_rated'),
    fetchTMDB<TMDBResponse<Movie>>('/movie/now_playing'),
    fetchTMDB<TMDBResponse<Movie>>('/movie/upcoming'),
    fetchTMDB<TMDBResponse<TVShow>>('/tv/popular'),
    fetchTMDB<TMDBResponse<TVShow>>('/tv/top_rated'),
    fetchTMDB<{ genres: Genre[] }>('/genre/movie/list'),
  ])

  const featuredGenres = movieGenres.genres.slice(0, 5)
  const genreRows: GenreWithMovies[] = await Promise.all(
    featuredGenres.map(async (genre) => {
      const data = await fetchTMDB<TMDBResponse<Movie>>('/discover/movie', {
        with_genres: String(genre.id),
        sort_by: 'popularity.desc',
      })
      return { genre, movies: data.results.slice(0, 15) }
    })
  )

  return (
    <div className="bg-slate-950 min-h-screen">
      <Showcase movies={trendingMovies.results.slice(0, 15)} />
      <BrowseContent
        trendingTV={trendingTV.results.slice(0, 15)}
        trendingPeople={trendingPeople.results.slice(0, 15)}
        popularMovies={popularMovies.results.slice(0, 15)}
        topRatedMovies={topRatedMovies.results.slice(0, 15)}
        nowPlaying={nowPlaying.results.slice(0, 15)}
        upcomingMovies={upcomingMovies.results.slice(0, 15)}
        popularTV={popularTV.results.slice(0, 15)}
        topRatedTV={topRatedTV.results.slice(0, 15)}
        genreRows={genreRows}
      />
    </div>
  )
}