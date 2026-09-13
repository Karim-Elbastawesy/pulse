import Image from 'next/image'
import Link from 'next/link'
import { Star, Play, Calendar } from 'lucide-react'
import { Movie, TVShow } from '../../interface/movie.interface'
import { posterUrl } from '../../../../lib/tmdb'

interface Props {
    item: Movie | TVShow
    type: 'movie' | 'tv'
}

function isMovie(item: Movie | TVShow): item is Movie {
    return 'title' in item
}

export default function MediaCard({ item, type }: Props) {
    const title = isMovie(item) ? item.title : item.name
    const date = isMovie(item) ? item.release_date : item.first_air_date
    const year = date ? new Date(date).getFullYear() : '—'
    const poster = posterUrl(item.poster_path, 'w342')
    const rating = item.vote_average
    const href = `/${type}/${item.id}`

    return (
        <Link href={href} className="group relative shrink-0 w-35 sm:w-40">

            <div className="relative w-full aspect-2/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/60 transition-all duration-300 group-hover:border-violet-500/40 group-hover:shadow-xl group-hover:shadow-violet-900/20 group-hover:-translate-y-1">
                {poster ? (
                    <Image
                        src={poster}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 140px, 160px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <Play className="text-slate-700" size={32} />
                    </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <Play size={16} fill="white" className="text-white translate-x-0.5" />
                    </div>
                </div>

                <div className="absolute top-2.5 left-2.5">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold text-yellow-300">
                        <Star size={9} fill="currentColor" />
                        {rating.toFixed(1)}
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className={`text-[10px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-full ${type === 'movie'
                            ? 'bg-violet-600/80 text-violet-100'
                            : 'bg-cyan-600/80 text-cyan-100'
                        }`}>
                        {type === 'movie' ? 'Movie' : 'TV'}
                    </span>
                </div>
            </div>

            <div className="mt-3 px-0.5 flex flex-col gap-1">
                <p className="text-white text-xs font-semibold leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors duration-200">
                    {title}
                </p>
                <div className="flex items-center gap-1 text-slate-600">
                    <Calendar size={10} />
                    <span className="text-[11px]">{year}</span>
                </div>
            </div>
        </Link>
    )
}