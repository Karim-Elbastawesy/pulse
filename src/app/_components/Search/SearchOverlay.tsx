'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, Film, Tv, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { posterUrl } from '../../../../lib/tmdb'

interface SearchResult {
    id: number
    media_type: 'movie' | 'tv' | 'person'
    title?: string
    name?: string
    poster_path: string | null
    profile_path?: string | null
    vote_average?: number
    release_date?: string
    first_air_date?: string
    overview?: string
    known_for_department?: string
}

interface Props {
    isOpen: boolean
    onClose: () => void
}

const RECENT_KEY = 'pulse_recent_searches'

function getRecent(): string[] {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') } catch { return [] }
}

function addRecent(query: string) {
    const prev = getRecent().filter(q => q !== query)
    localStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev].slice(0, 6)))
}

function removeRecent(query: string) {
    localStorage.setItem(RECENT_KEY, JSON.stringify(getRecent().filter(q => q !== query)))
}

export default function SearchOverlay({ isOpen, onClose }: Props) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [recent, setRecent] = useState<string[]>([])
    const [activeIdx, setActiveIdx] = useState(-1)

    const inputRef = useRef<HTMLInputElement>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (isOpen) {
            setRecent(getRecent())
            setTimeout(() => inputRef.current?.focus(), 80)
        } else {
            setQuery('')
            setResults([])
            setActiveIdx(-1)
        }
    }, [isOpen])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onClose() }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    const search = useCallback(async (q: string) => {
        if (!q.trim()) { setResults([]); setLoading(false); return }
        setLoading(true)
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(q)}&page=1`,
                { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}` } }
            )
            const data = await res.json()
            setResults((data.results || []).filter((r: SearchResult) => r.media_type !== 'person').slice(0, 8))
        } catch {
            setResults([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (!query.trim()) { setResults([]); setLoading(false); return }
        setLoading(true)
        debounceRef.current = setTimeout(() => search(query), 350)
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [query, search])

    const allResults = results
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, allResults.length - 1)) }
        if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)) }
        if (e.key === 'Enter' && activeIdx >= 0 && allResults[activeIdx]) {
            const r = allResults[activeIdx]
            const href = `/${r.media_type}/${r.id}`
            addRecent(query)
            setRecent(getRecent())
            onClose()
            window.location.href = href
        }
    }

    const handleResultClick = (q: string) => {
        if (q) { addRecent(q); setRecent(getRecent()) }
        onClose()
    }

    const handleRecentClick = (q: string) => {
        setQuery(q)
        inputRef.current?.focus()
    }

    const handleRemoveRecent = (e: React.MouseEvent, q: string) => {
        e.stopPropagation()
        removeRecent(q)
        setRecent(getRecent())
    }

    const showRecent = !query && recent.length > 0
    const showResults = !!query && results.length > 0
    const showEmpty = !!query && !loading && results.length === 0

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex flex-col">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-3xl mx-auto mt-[10vh] px-4">

                {/* Search input */}
                <div className="relative flex items-center gap-4 bg-slate-900 border border-slate-700/60 rounded-2xl px-5 shadow-2xl shadow-black/60 ring-1 ring-violet-500/20">
                    <Search
                        size={20}
                        className={`shrink-0 transition-colors duration-200 ${loading ? 'text-violet-400' : 'text-slate-500'}`}
                    />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => { setQuery(e.target.value); setActiveIdx(-1) }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search movies, TV shows..."
                        className="flex-1 bg-transparent py-5 text-white text-lg placeholder:text-slate-600 outline-none"
                    />
                    <div className="flex items-center gap-3 shrink-0">
                        {loading && (
                            <svg className="animate-spin w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        )}
                        {query ? (
                            <button
                                onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all duration-200"
                            >
                                <X size={16} />
                            </button>
                        ) : (
                            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-500 text-xs font-mono">
                                ESC
                            </kbd>
                        )}
                    </div>
                </div>

                {/* Results panel */}
                {(showRecent || showResults || showEmpty) && (
                    <div className="mt-3 bg-slate-900/95 backdrop-blur border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">

                        {/* Recent searches */}
                        {showRecent && (
                            <div className="p-4">
                                <p className="text-xs text-slate-600 font-semibold tracking-[2px] uppercase mb-3 px-1">
                                    Recent Searches
                                </p>
                                <div className="flex flex-col gap-0.5">
                                    {recent.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => handleRecentClick(q)}
                                            className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/6 transition-all duration-150 text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Clock size={14} className="text-slate-600 shrink-0" />
                                                <span className="text-slate-300 text-sm">{q}</span>
                                            </div>
                                            <button
                                                onClick={(e) => handleRemoveRecent(e, q)}
                                                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10 text-slate-600 hover:text-slate-400 transition-all duration-150"
                                            >
                                                <X size={12} />
                                            </button>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Live results */}
                        {showResults && (
                            <div className="p-3">
                                <p className="text-xs text-slate-600 font-semibold tracking-[2px] uppercase mb-2 px-2">
                                    Results
                                </p>
                                <div className="flex flex-col gap-0.5">
                                    {results.map((result, idx) => {
                                        const title = result.title || result.name || ''
                                        const type = result.media_type as 'movie' | 'tv'
                                        const date = result.release_date || result.first_air_date
                                        const year = date ? new Date(date).getFullYear() : null
                                        const poster = posterUrl(result.poster_path, 'w200')
                                        const href = `/${type}/${result.id}`
                                        const isActive = idx === activeIdx

                                        return (
                                            <Link
                                                key={`${result.media_type}-${result.id}`}
                                                href={href}
                                                onClick={() => handleResultClick(query)}
                                                className={`flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-150 group ${isActive ? 'bg-violet-600/20 border border-violet-500/30' : 'hover:bg-white/6 border border-transparent'
                                                    }`}
                                                onMouseEnter={() => setActiveIdx(idx)}
                                            >
                                                {/* Poster thumbnail */}
                                                <div className="relative w-10 h-[58px] rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/50">
                                                    {poster ? (
                                                        <Image src={poster} alt={title} fill className="object-cover" sizes="40px" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            {type === 'movie' ? <Film size={16} className="text-slate-600" /> : <Tv size={16} className="text-slate-600" />}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-semibold leading-snug truncate transition-colors duration-150 ${isActive ? 'text-violet-300' : 'text-white group-hover:text-violet-300'}`}>
                                                        {title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`flex items-center gap-1 text-[10px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full ${type === 'movie'
                                                                ? 'bg-violet-600/20 text-violet-400'
                                                                : 'bg-cyan-600/20 text-cyan-400'
                                                            }`}>
                                                            {type === 'movie' ? <Film size={9} /> : <Tv size={9} />}
                                                            {type === 'movie' ? 'Movie' : 'TV'}
                                                        </span>
                                                        {year && <span className="text-slate-600 text-xs">{year}</span>}
                                                        {result.vote_average && result.vote_average > 0 && (
                                                            <span className="text-slate-600 text-xs">★ {result.vote_average.toFixed(1)}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <ArrowRight
                                                    size={14}
                                                    className={`shrink-0 transition-all duration-150 ${isActive ? 'text-violet-400 opacity-100' : 'text-slate-700 opacity-0 group-hover:opacity-100'
                                                        }`}
                                                />
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* See all results link */}
                                <div className="mt-2 pt-2 border-t border-slate-800/60 px-1">
                                    <button
                                        onClick={() => { addRecent(query); setRecent(getRecent()); onClose() }}
                                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/6 transition-all duration-150 group"
                                    >
                                        <span className="text-sm text-slate-500 group-hover:text-white transition-colors">
                                            See all results for <span className="text-violet-400 font-medium">"{query}"</span>
                                        </span>
                                        <ArrowRight size={14} className="text-slate-700 group-hover:text-violet-400 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Empty state */}
                        {showEmpty && (
                            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                                    <Search size={20} className="text-slate-600" />
                                </div>
                                <p className="text-white text-sm font-semibold mb-1">No results found</p>
                                <p className="text-slate-600 text-xs">
                                    Nothing matched <span className="text-slate-500">"{query}"</span> — try a different title.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Keyboard hints */}
                <div className="flex items-center justify-center gap-6 mt-5">
                    {[
                        { keys: ['↑', '↓'], label: 'Navigate' },
                        { keys: ['↵'], label: 'Open' },
                        { keys: ['Esc'], label: 'Close' },
                    ].map(({ keys, label }) => (
                        <div key={label} className="flex items-center gap-1.5">
                            {keys.map(k => (
                                <kbd key={k} className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-600 text-xs font-mono">
                                    {k}
                                </kbd>
                            ))}
                            <span className="text-slate-700 text-xs">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}