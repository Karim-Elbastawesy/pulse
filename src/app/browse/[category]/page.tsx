import { fetchTMDB } from '../../../../lib/tmdb'
import { TMDBResponse, Movie, TVShow } from '../../interface/movie.interface'
import MediaCard from '../components/MediaCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

const categoryMap: Record<string, { title: string, endpoint: string, type: 'movie' | 'tv' }> = {
    'popular-movies': { title: 'Popular Movies', endpoint: '/movie/popular', type: 'movie' },
    'trending-tv': { title: 'Trending TV', endpoint: '/trending/tv/day', type: 'tv' },
    'now-playing': { title: 'Now Playing', endpoint: '/movie/now_playing', type: 'movie' },
    'top-rated-all-time': { title: 'Top Rated Movies', endpoint: '/movie/top_rated', type: 'movie' },
    'coming-soon': { title: 'Coming Soon', endpoint: '/movie/upcoming', type: 'movie' },
    'popular-tv-shows': { title: 'Popular TV Shows', endpoint: '/tv/popular', type: 'tv' },
    'top-rated-tv': { title: 'Top Rated TV', endpoint: '/tv/top_rated', type: 'tv' },
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params
    
    const categoryData = categoryMap[category]

    if (!categoryData) {
        notFound()
    }

    const data = await fetchTMDB<TMDBResponse<Movie | TVShow>>(categoryData.endpoint)

    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-24 px-6 md:px-16">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
                
                <div className="flex flex-col items-start gap-6">
                    <Link
                        href="/browse"
                        className="flex  items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 hover:border-slate-700"
                    >
                        <ArrowLeft size={15} />
                        Back to Browse
                    </Link>
                    <div className="flex flex-col gap-2">
                        <span className="text-violet-400 text-xs font-semibold tracking-[3px] uppercase">Category</span>
                        <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
                            {categoryData.title}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
                    {data.results.map((item:any) => (
                        <MediaCard key={item.id} item={item} type={categoryData.type} />
                    ))}
                </div>
                
            </div>
        </main>
    )
}