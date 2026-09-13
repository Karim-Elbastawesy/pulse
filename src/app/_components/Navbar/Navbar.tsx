'use client'

import { ChevronRight, Play, X, Menu, Zap, LogOut, User, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { getStoredUser, clearStoredUser, StoredUser } from '../../../../lib/auth'
import SearchOverlay from '../Search/SearchOverlay'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
]

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [user, setUser] = useState<StoredUser | null>(null)
    const [dropOpen, setDropOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setUser(getStoredUser()) }, [pathname])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    // Cmd+K / Ctrl+K opens search
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setSearchOpen(true)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    const handleLogout = () => {
        clearStoredUser()
        setUser(null)
        setDropOpen(false)
        setMenuOpen(false)
        router.push('/')
    }

    const initials = user
        ? `${user.firstName[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
        : ''

    return (
        <>
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/8 shadow-2xl shadow-black/40'
                : 'bg-transparent backdrop-blur-none'
                }`}>
                <div className="px-4 sm:px-8 lg:px-16">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo */}
                        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-500 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                                <div className="relative bg-gradient-to-br from-violet-500 to-violet-700 p-1.5 sm:p-2 rounded-xl">
                                    <Play fill="#fff" height={16} width={16} className="translate-x-0.5" />
                                </div>
                            </div>
                            <span className="text-lg sm:text-xl font-black tracking-widest text-white uppercase">Pulse</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/8 rounded-2xl px-3 py-2 backdrop-blur-sm">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`relative px-5 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/8'
                                            }`}
                                    >
                                        {isActive && (
                                            <span className="absolute inset-0 bg-gradient-to-br from-violet-600/80 to-violet-800/80 rounded-xl border border-violet-500/40 shadow-lg shadow-violet-900/30" />
                                        )}
                                        <span className="relative">{item.name}</span>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Desktop right side */}
                        <div className="hidden md:flex items-center gap-3">

                            {/* Search trigger */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/15 transition-all duration-200"
                            >
                                <Search size={15} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
                                <span className="text-slate-600 text-sm group-hover:text-slate-400 transition-colors hidden lg:block">Search...</span>
                                <div className="hidden lg:flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-600 text-[10px] font-mono">⌘</kbd>
                                    <kbd className="px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-600 text-[10px] font-mono">K</kbd>
                                </div>
                            </button>

                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setDropOpen(p => !p)}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/8 transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-xs font-bold text-white border border-violet-500/40">
                                            {initials || <User size={14} />}
                                        </div>
                                        <span className="text-sm font-medium text-slate-300">{user.firstName}</span>
                                        <ChevronRight size={14} className={`text-slate-500 transition-transform duration-200 ${dropOpen ? 'rotate-90' : ''}`} />
                                    </button>
                                    {dropOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} />
                                            <div className="absolute right-0 top-full mt-2 w-52 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl shadow-black/40 z-20 overflow-hidden">
                                                <div className="px-4 py-3 border-b border-slate-800">
                                                    <p className="text-white text-sm font-semibold">{user.firstName} {user.lastName}</p>
                                                    <p className="text-slate-500 text-xs mt-0.5 truncate">{user.email}</p>
                                                </div>
                                                <div className="p-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                                                    >
                                                        <LogOut size={15} />
                                                        Log Out
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 tracking-wide px-2">
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-violet-500 transition-all duration-300 group-hover:from-violet-500 group-hover:to-violet-400" />
                                        <span className="relative">Get Started</span>
                                        <ChevronRight className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile right */}
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-200"
                                aria-label="Search"
                            >
                                <Search height={20} width={20} />
                            </button>
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-200"
                                aria-label="Open menu"
                            >
                                <Menu height={22} width={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Mobile drawer */}
            <div className={`fixed top-0 right-0 bottom-0 z-[60] w-[min(300px,85vw)] bg-slate-950 border-l border-white/8 shadow-2xl transition-transform duration-300 ease-out md:hidden flex flex-col ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-violet-500 to-violet-700 p-1.5 rounded-lg">
                            <Play fill="#fff" height={14} width={14} className="translate-x-px" />
                        </div>
                        <span className="text-base font-black tracking-widest text-white uppercase">Pulse</span>
                    </Link>
                    <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-200" aria-label="Close menu">
                        <X height={20} width={20} />
                    </button>
                </div>

                {user && (
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-white/8">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-xs font-bold text-white border border-violet-500/40 shrink-0">
                            {initials || <User size={14} />}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-sm font-semibold">{user.firstName} {user.lastName}</p>
                            <p className="text-slate-500 text-xs truncate">{user.email}</p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-1 px-4 py-6 flex-1">
                    {navItems.map((item, i) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${isActive
                                    ? 'bg-violet-600/20 border border-violet-500/30 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-white/6'
                                    }`}
                            >
                                <span>{item.name}</span>
                                {isActive && <ChevronRight height={15} width={15} className="text-violet-400" />}
                            </Link>
                        )
                    })}
                </div>

                <div className="flex flex-col gap-3 px-4 pb-8 border-t border-white/8 pt-6">
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all duration-200"
                        >
                            <LogOut size={15} />
                            Log Out
                        </button>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium text-slate-300 border border-white/10 hover:bg-white/6 hover:text-white transition-all duration-200">
                                Sign In
                            </Link>
                            <Link href="/register" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 transition-all duration-200">
                                <Zap height={15} width={15} fill="currentColor" />
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}