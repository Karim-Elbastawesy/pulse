import { fetchTMDB, backdropUrl, posterUrl } from '../../../../lib/tmdb'
import { MovieDetails, Credits, VideoResults, TMDBResponse, Movie } from '../../interface/movie.interface'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Calendar, Globe, DollarSign, ArrowLeft, Play, Tv } from 'lucide-react'
import CastRow from './components/CastRow'
import SimilarRow from './components/SimilarRow'

export default async function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const [movie, credits, videos, similar] = await Promise.all([
        fetchTMDB<MovieDetails>(`/movie/${id}`),
        fetchTMDB<Credits>(`/movie/${id}/credits`),
        fetchTMDB<VideoResults>(`/movie/${id}/videos`),
        fetchTMDB<TMDBResponse<Movie>>(`/movie/${id}/similar`),
    ])

    const backdrop = backdropUrl(movie.backdrop_path, 'original')
    const poster = posterUrl(movie.poster_path, 'w500')
    const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    const director = credits.crew.find(c => c.job === 'Director')
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null

    return (
        <main className="min-h-screen bg-slate-950 relative">
            <div className="relative h-[55vh] sm:h-[75vh] w-full overflow-hidden">
                {backdrop && (
                    <Image
                        src={backdrop}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />
                <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 to-transparent" />

                <div className="absolute top-25 left-5 sm:left-10 lg:left-16">
                    <Link
                        href="/browse"
                        className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 hover:border-white/20"
                    >
                        <ArrowLeft size={15} />
                        Back to Browse
                    </Link>
                </div>

            </div>

            <div className="px-5 sm:px-10 lg:px-16 -mt-48 relative z-10 pb-24">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    <div className="shrink-0 w-40 sm:w-50 lg:w-60">
                        <div className="relative w-full aspect-2/3 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl shadow-black/60">
                            {poster ? (
                                <Image src={poster} alt={movie.title} fill className="object-cover" sizes="240px" />
                            ) : (
                                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                    <Tv size={40} className="text-slate-700" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 flex-1 pt-0 lg:pt-32">
                        <div className="flex items-center gap-2 flex-wrap">
                            {movie.genres.map(g => (
                                <span key={g.id} className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white leading-none tracking-wide">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-slate-500 text-base italic">"{movie.tagline}"</p>
                            )}
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-1.5 bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-sm font-semibold px-3 py-1.5 rounded-full">
                                <Star size={13} fill="currentColor" />
                                {movie.vote_average.toFixed(1)}
                                <span className="text-yellow-500/60 text-xs font-normal">({movie.vote_count.toLocaleString()})</span>
                            </span>
                            {runtime && (
                                <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full">
                                    <Clock size={13} />
                                    {runtime}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full">
                                <Calendar size={13} />
                                {new Date(movie.release_date).getFullYear()}
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full uppercase">
                                <Globe size={13} />
                                {movie.original_language}
                            </span>
                            {movie.adult && (
                                <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-sm px-3 py-1.5 rounded-full">18+</span>
                            )}
                        </div>

                        <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
                            {movie.overview}
                        </p>

                        <div className="flex flex-wrap gap-x-10 gap-y-4">
                            {director && (
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Director</p>
                                    <p className="text-white text-sm font-medium">{director.name}</p>
                                </div>
                            )}
                            {movie.spoken_languages?.length > 0 && (
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Languages</p>
                                    <p className="text-white text-sm font-medium">
                                        {movie.spoken_languages.map(l => l.english_name).join(', ')}
                                    </p>
                                </div>
                            )}
                            {movie.status && (
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Status</p>
                                    <p className="text-white text-sm font-medium">{movie.status}</p>
                                </div>
                            )}
                            {movie.budget > 0 && (
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Budget</p>
                                    <p className="text-white text-sm font-medium">${movie.budget.toLocaleString()}</p>
                                </div>
                            )}
                            {movie.revenue > 0 && (
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Box Office</p>
                                    <p className="text-white text-sm font-medium">${movie.revenue.toLocaleString()}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 flex-wrap pt-2">
                            <button className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 rounded-2xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30">
                                <Play size={16} fill="white" className="translate-x-0.5" />
                                Watch Now
                            </button>
                            {trailer && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/15 hover:border-white/30 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <Play size={16} />
                                    Trailer
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <CastRow cast={credits.cast} />
                </div>

                <div className="mt-16">
                    <SimilarRow items={similar.results.slice(0, 15)} type="movie" />
                </div>
            </div>
        </main>
    )
}