import { fetchTMDB, backdropUrl, posterUrl } from '../../../../lib/tmdb'
import { TVDetails, Credits, VideoResults, TMDBResponse, TVShow } from '../../interface/movie.interface'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Calendar, Globe, ArrowLeft, Play, Tv, Layers } from 'lucide-react'
import CastRow from '../../movie/[id]/components/CastRow'
import SimilarRow from '../../movie/[id]/components/SimilarRow'

export default async function TVDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [show, credits, videos, similar] = await Promise.all([
    fetchTMDB<TVDetails>(`/tv/${id}`),
    fetchTMDB<Credits>(`/tv/${id}/credits`),
    fetchTMDB<VideoResults>(`/tv/${id}/videos`),
    fetchTMDB<TMDBResponse<TVShow>>(`/tv/${id}/similar`),
  ])

  const backdrop = backdropUrl(show.backdrop_path, 'original')
  const poster = posterUrl(show.poster_path, 'w500')
  const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const creator = show.created_by?.[0]
  const avgRuntime = show.episode_run_time?.[0]

  return (
    <main className="min-h-screen bg-slate-950 relative">
      <div className="relative h-[55vh] sm:h-[65vh] w-full overflow-hidden">
        {backdrop && (
          <Image src={backdrop} alt={show.name} fill className="object-cover" priority />
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
                <Image src={poster} alt={show.name} fill className="object-cover" sizes="240px" />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                  <Tv size={40} className="text-slate-700" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 flex-1 pt-0 lg:pt-32">
            <div className="flex items-center gap-2 flex-wrap">
              {show.genres?.map(g => (
                <span key={g.id} className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  {g.name}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white leading-none tracking-wide">
                {show.name}
              </h1>
              {show.tagline && (
                <p className="text-slate-500 text-base italic">"{show.tagline}"</p>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-sm font-semibold px-3 py-1.5 rounded-full">
                <Star size={13} fill="currentColor" />
                {show.vote_average.toFixed(1)}
                <span className="text-yellow-500/60 text-xs font-normal">({show.vote_count.toLocaleString()})</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full">
                <Layers size={13} />
                {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full">
                {show.number_of_episodes} Episodes
              </span>
              {avgRuntime && (
                <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full">
                  <Clock size={13} />
                  ~{avgRuntime}m / ep
                </span>
              )}
              {show.first_air_date && (
                <span className="flex items-center gap-1.5 bg-white/8 border border-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full">
                  <Calendar size={13} />
                  {new Date(show.first_air_date).getFullYear()}
                </span>
              )}
              <span className={`text-sm px-3 py-1.5 rounded-full border font-medium ${
                show.status === 'Returning Series'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : show.status === 'Ended'
                  ? 'bg-slate-700/50 border-slate-600/50 text-slate-400'
                  : 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400'
              }`}>
                {show.status}
              </span>
            </div>

            <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
              {show.overview}
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {creator && (
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Created By</p>
                  <p className="text-white text-sm font-medium">{creator.name}</p>
                </div>
              )}
              {show.networks?.length > 0 && (
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Network</p>
                  <p className="text-white text-sm font-medium">{show.networks.map(n => n.name).join(', ')}</p>
                </div>
              )}
              {show.spoken_languages?.length > 0 && (
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Languages</p>
                  <p className="text-white text-sm font-medium">{show.spoken_languages.map(l => l.english_name).join(', ')}</p>
                </div>
              )}
            </div>

            {show.seasons?.filter(s => s.season_number > 0).length > 0 && (
              <div className="flex flex-col gap-3 pt-2">
                <p className="text-xs text-slate-600 tracking-[2px] uppercase font-semibold">Seasons</p>
                <div className="flex gap-2 flex-wrap">
                  {show.seasons.filter(s => s.season_number > 0).map(season => (
                    <div
                      key={season.id}
                      className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <span className="text-white text-sm font-semibold">S{season.season_number}</span>
                      <span className="text-slate-600 text-[10px]">{season.episode_count} eps</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
          <SimilarRow items={similar.results.slice(0, 15)} type="tv" />
        </div>
      </div>
    </main>
  )
}