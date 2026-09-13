import Link from 'next/link'
import { Play } from 'lucide-react'
import {
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaGithub,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
    FaLinkedin,
} from 'react-icons/fa'

const links = {
    Product: [
        { name: 'Browse', href: '/browse' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'New Releases', href: '/browse?filter=new' },
        { name: 'Top Rated', href: '/browse?filter=top' },
    ],
    Company: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' },
    ],
    Legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'DMCA', href: '/dmca' },
    ],
}

const socials = [
    { icon: FaLinkedin, href: '#', label: 'Linkedin' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaGithub, href: 'https://github.com/Karim-Elbastawesy', label: 'GitHub' },
]

export default function Footer() {
    return (
        <footer className="relative border-t border-slate-800/60 bg-slate-950 overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/8 rounded-full blur-[120px]" />
                <div className="absolute inset-0 dot-grid opacity-40" />
            </div>

            <div className="relative z-10 mx-auto px-6 lg:px-16">

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 py-20">

                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <Link href="/" className="group flex items-center gap-2.5 w-fit">
                            <div className="relative">
                                <div className="absolute inset-0 bg-violet-500 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                                <div className="relative bg-gradient-to-br from-violet-500 to-violet-700 p-2 rounded-xl">
                                    <Play fill="#fff" height={16} width={16} className="translate-x-0.5" />
                                </div>
                            </div>
                            <span className="font-display text-2xl text-white font-black tracking-widest">PULSE</span>
                        </Link>

                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Your gateway to absolute cinema. Millions of movies and shows,
                            curated for the discerning viewer.
                        </p>

                        <div className="flex items-center gap-3">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            <span className="text-xs text-slate-500 tracking-wide">All systems operational</span>
                        </div>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-3 gap-8">
                        {Object.entries(links).map(([category, items]) => (
                            <div key={category} className="flex flex-col gap-4">
                                <p className="text-xs font-semibold tracking-[2.5px] uppercase text-slate-600">
                                    {category}
                                </p>
                                <ul className="flex flex-col gap-3">
                                    {items.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-slate-800/60 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-600 tracking-wide">
                        © {new Date().getFullYear()} Pulse Inc. All rights reserved.
                    </p>
                    <p className="text-xs text-slate-700 tracking-wide">
                        Made with ❤️ by Karim Elbastawesy.
                    </p>
                    <div className="text-3xl gap-3 flex text-slate-700 tracking-wide">
                        <FaCcVisa className="hover:text-slate-500 transition-colors cursor-pointer" />
                        <FaCcMastercard className="hover:text-slate-500 transition-colors cursor-pointer" />
                        <FaCcPaypal className="hover:text-slate-500 transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    )
}