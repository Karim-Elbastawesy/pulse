'use client'

import React, { useState } from 'react'
import { Movie } from '../interface/movie.interface'
import Image from 'next/image'
import Link from 'next/link'
import { InfoIcon, PlayCircle, Star, ChevronRight, ChevronLeft, List, X } from 'lucide-react'

export default function Showcase({ movies }: { movies: Movie[] }) {
    const [activeMovie, setActiveMovie] = useState(movies[0])
    const [transitioning, setTransitioning] = useState(false)
    const [mobileListOpen, setMobileListOpen] = useState(false)

    const handleMovieSelect = (movie: Movie) => {
        if (movie.id === activeMovie.id) {
            setMobileListOpen(false)
            return
        }
        setTransitioning(true)
        setMobileListOpen(false)
        setTimeout(() => {
            setActiveMovie(movie)
            setTransitioning(false)
        }, 200)
    }

    const activeIndex = movies.findIndex(m => m.id === activeMovie.id)

    const handlePrev = () => {
        const prev = movies[(activeIndex - 1 + movies.length) % movies.length]
        handleMovieSelect(prev)
    }

    const handleNext = () => {
        const next = movies[(activeIndex + 1) % movies.length]
        handleMovieSelect(next)
    }

    return (
        <main className='min-h-screen relative w-full overflow-hidden'>
            <div className="absolute inset-0 z-0">
                <Image
                    src={`https://image.tmdb.org/t/p/original${activeMovie.backdrop_path}`}
                    fill
                    alt={activeMovie.title}
                    className={`object-cover transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-60'}`}
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/40" />
            </div>

            <div className="relative z-10 flex justify-between items-center min-h-screen px-5 sm:px-10 lg:px-20 gap-8 pt-20 pb-8">
                <div className={`flex flex-col justify-center gap-4 sm:gap-6 w-full lg:max-w-2xl transition-all duration-300 ${transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1.5 bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full">
                            <Star fill='currentColor' height={12} width={12} />
                            {activeMovie.vote_average.toFixed(1)}
                        </span>
                        <span className="bg-white/10 border border-white/20 text-gray-300 text-xs sm:text-sm px-2.5 py-1 rounded-full">
                            {new Date(activeMovie.release_date).getFullYear()}
                        </span>
                        <span className="bg-white/10 border border-white/20 text-gray-300 text-xs sm:text-sm px-2.5 py-1 rounded-full uppercase">
                            {activeMovie.original_language}
                        </span>
                        {activeMovie.adult && (
                            <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-xs sm:text-sm px-2.5 py-1 rounded-full">
                                18+
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-tight drop-shadow-2xl line-clamp-3">
                        {activeMovie.title}
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                        {activeMovie.overview}
                    </p>

                    <div className="flex gap-3 flex-wrap">
                        <Link href={`/movie/${activeMovie.id}`} className='flex items-center gap-2 cursor-pointer px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-br from-violet-500 to-violet-800 hover:from-violet-400 hover:to-violet-700 rounded-2xl border border-violet-500 text-sm sm:text-base font-semibold tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30'>
                            <PlayCircle height={18} width={18} />
                            Watch Now
                        </Link>
                        <Link href={`/movie/${activeMovie.id}`} className='flex items-center gap-2 cursor-pointer px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/20 hover:border-white/40 text-sm sm:text-base font-semibold tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5'>
                            <InfoIcon height={18} width={18} />
                            Details
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 lg:hidden mt-2">
                        <button
                            onClick={handlePrev}
                            className="p-2.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 transition-all duration-200"
                        >
                            <ChevronLeft height={18} width={18} />
                        </button>
                        <span className="text-xs text-slate-500 flex-1 text-center">
                            {activeIndex + 1} / {movies.length}
                        </span>
                        <button
                            onClick={handleNext}
                            className="p-2.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 transition-all duration-200"
                        >
                            <ChevronRight height={18} width={18} />
                        </button>
                        <button
                            onClick={() => setMobileListOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 text-sm font-medium transition-all duration-200 ml-2"
                        >
                            <List height={16} width={16} />
                            All
                        </button>
                    </div>
                </div>

                <div className="hidden lg:flex flex-col w-80 shrink-0 self-center">
                    <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-slate-950/80 to-transparent z-10 pointer-events-none rounded-t-2xl" />
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-slate-950/80 to-transparent z-10 pointer-events-none rounded-b-2xl" />
                        <div className="flex flex-col gap-2 max-h-[75vh] overflow-y-auto scroll-smooth px-1 py-4" style={{ scrollbarWidth: 'none' }}>
                            {movies.map((movie) => {
                                const isActive = activeMovie.id === movie.id
                                return (
                                    <div
                                        key={movie.id}
                                        onClick={() => handleMovieSelect(movie)}
                                        className={`group flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all duration-300 ${isActive
                                            ? 'bg-white/15 border border-violet-500/50 shadow-lg shadow-violet-900/20'
                                            : 'border border-transparent hover:bg-white/8 hover:border-white/15'
                                            }`}
                                    >
                                        <div className={`relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${isActive ? 'w-14 h-20' : 'w-12.5 h-18 opacity-70 group-hover:opacity-100'}`}>
                                            <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} fill className='object-cover' />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-semibold text-sm leading-snug line-clamp-2 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                {movie.title}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <Star fill='#facc15' className='text-yellow-400 shrink-0' height={11} width={11} />
                                                <span className="text-xs text-gray-400">{movie.vote_average.toFixed(1)}</span>
                                                <span className="text-gray-600 text-xs">·</span>
                                                <span className="text-xs text-gray-500">{new Date(movie.release_date).getFullYear()}</span>
                                            </div>
                                        </div>
                                        <ChevronRight
                                            className={`shrink-0 transition-all duration-300 ${isActive ? 'text-violet-400 opacity-100' : 'opacity-0 group-hover:opacity-40 text-gray-400'}`}
                                            height={16} width={16}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`fixed inset-0 z-60 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileListOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileListOpen(false)}
            />
            <div className={`fixed bottom-0 left-0 right-0 z-70 lg:hidden bg-slate-950 border-t border-white/10 rounded-t-3xl transition-transform duration-300 ease-out ${mobileListOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 bg-white/20 rounded-full" />
                </div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
                    <p className="font-semibold text-white text-sm">All Movies</p>
                    <button onClick={() => setMobileListOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <X height={18} width={18} className="text-slate-400" />
                    </button>
                </div>
                <div className="flex flex-col gap-1.5 px-4 py-3 max-h-[55vh] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    {movies.map((movie) => {
                        const isActive = activeMovie.id === movie.id
                        return (
                            <div
                                key={movie.id}
                                onClick={() => handleMovieSelect(movie)}
                                className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all duration-200 ${isActive
                                    ? 'bg-violet-600/20 border border-violet-500/40'
                                    : 'border border-transparent hover:bg-white/6'
                                    }`}
                            >
                                <div className="relative shrink-0 w-11 h-15.5 rounded-xl overflow-hidden">
                                    <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} fill className='object-cover' />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-semibold text-sm line-clamp-1 ${isActive ? 'text-white' : 'text-gray-300'}`}>{movie.title}</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Star fill='#facc15' className='text-yellow-400 shrink-0' height={10} width={10} />
                                        <span className="text-xs text-gray-400">{movie.vote_average.toFixed(1)}</span>
                                        <span className="text-gray-600 text-xs">·</span>
                                        <span className="text-xs text-gray-500">{new Date(movie.release_date).getFullYear()}</span>
                                    </div>
                                </div>
                                {isActive && <ChevronRight height={15} width={15} className="text-violet-400 shrink-0" />}
                            </div>
                        )
                    })}
                </div>
                <div className="h-safe-area pb-6" />
            </div>
        </main>
    )
}