import Link from 'next/link'
import { Movie, TVShow } from '../../interface/movie.interface'
import MediaCard from './MediaCard'

interface Props {
    title: string
    subtitle?: string
    items: Movie[] | TVShow[]
    type: 'movie' | 'tv'
    accent?: boolean
    categorySlug?: string
    genreId?: number
}

export default function MediaRow({ title, subtitle, items, type, accent, categorySlug, genreId }: Props) {
    const seeAllHref = genreId
        ? `/browse/genre/${genreId}`
        : categorySlug
            ? `/browse/${categorySlug}`
            : null

    return (
        <section className="flex flex-col gap-5 px-5 sm:px-10 lg:px-16">
            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                    {accent && (
                        <span className="text-violet-400 text-xs font-semibold tracking-[3px] uppercase">Featured</span>
                    )}
                    <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">{title}</h2>
                    {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
                </div>
                {seeAllHref && (
                    <Link
                        href={seeAllHref}
                        className="text-xs text-slate-600 hover:text-violet-400 tracking-widest uppercase font-semibold transition-colors duration-200 shrink-0 ml-4"
                    >
                        See All →
                    </Link>
                )}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
                {(items as (Movie | TVShow)[]).map((item) => (
                    <MediaCard key={item.id} item={item} type={type} />
                ))}
            </div>
        </section>
    )
}