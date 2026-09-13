import { Movie, TVShow } from '../../../interface/movie.interface'
import MediaCard from '../../../browse/components/MediaCard'

interface Props {
    items: (Movie | TVShow)[]
    type: 'movie' | 'tv'
}

export default function SimilarRow({ items, type }: Props) {
    if (!items.length) return null

    return (
        <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <span className="text-violet-400 text-xs font-semibold tracking-[3px] uppercase">More Like This</span>
                <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">You Might Also Like</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 pr-5 sm:pr-10 lg:pr-16" style={{ scrollbarWidth: 'none' }}>
                {items.map((item) => (
                    <MediaCard key={item.id} item={item} type={type} />
                ))}
            </div>
        </section>
    )
}