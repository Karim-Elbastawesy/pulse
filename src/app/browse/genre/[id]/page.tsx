import { fetchTMDB } from '../../../../../lib/tmdb'
import { TMDBResponse, Movie, Genre } from '../../../interface/movie.interface'
import MediaCard from '../../components/MediaCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function GenrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [data, genreList] = await Promise.all([
    fetchTMDB<TMDBResponse<Movie>>('/discover/movie', {
      with_genres: id,
      sort_by: 'popularity.desc',
    }),
    fetchTMDB<{ genres: Genre[] }>('/genre/movie/list'),
  ])

  const genre = genreList.genres.find(g => String(g.id) === id)
  if (!genre) notFound()

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        <div className="flex flex-col items-start gap-6">
          <Link
            href="/browse"
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-700"
          >
            <ArrowLeft size={15} />
            Back to Browse
          </Link>
          <div className="flex flex-col gap-2">
            <span className="text-violet-400 text-xs font-semibold tracking-[3px] uppercase">Genre</span>
            <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">{genre.name}</h1>
            <p className="text-slate-500 text-sm">{data.total_results.toLocaleString()} titles</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
          {data.results.map((item) => (
            <MediaCard key={item.id} item={item} type="movie" />
          ))}
        </div>
      </div>
    </main>
  )
}