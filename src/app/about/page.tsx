import { Film, Heart, Globe, Sparkles, Users, Trophy, ArrowRight, Play, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
    { label: 'Movies & Shows', value: '2M+', icon: Film },
    { label: 'Active Users', value: '10M+', icon: Users },
    { label: 'Countries', value: '190+', icon: Globe },
    { label: 'Awards Won', value: '47', icon: Trophy },
];

const values = [
    {
        icon: Heart,
        title: 'Passion for Cinema',
        description: 'We believe every frame tells a story. Our team of cinephiles curates experiences that honor the art of filmmaking.',
    },
    {
        icon: Sparkles,
        title: 'Innovation First',
        description: 'From AI-powered recommendations to immersive streaming tech, we push boundaries to redefine how you experience content.',
    },
    {
        icon: Globe,
        title: 'Globally Inclusive',
        description: 'Cinema transcends borders. We bring stories from every corner of the world to your screen, in every language.',
    },
    {
        icon: Zap,
        title: 'Lightning Performance',
        description: "Zero buffering, instant playback, and crystal-clear quality. Technology so good, you forget it's there.",
    },
];

const team = [
    { name: 'Karim Elbastawesy', role: 'CEO & Founder', initial: 'KE' },
    { name: 'Karim Elbastawesy', role: 'Chief Design Officer', initial: 'KE' },
    { name: 'Karim Elbastawesy', role: 'Head of Engineering', initial: 'KE' },
    { name: 'Karim Elbastawesy', role: 'VP of Content', initial: 'KE' },
];

const milestones = [
    { year: '2019', event: 'Pulse founded in San Francisco' },
    { year: '2020', event: 'Reached 1 million users worldwide' },
    { year: '2022', event: 'Launched 4K HDR & Dolby Vision streaming' },
    { year: '2023', event: 'Expanded to 190+ countries' },
    { year: '2024', event: 'AI-powered recommendation engine launched' },
    { year: '2025', event: '10 million active subscribers' },
];

export default function About() {
    return (
        <main className="relative overflow-hidden">

            {/* Ambient background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/15 rounded-full blur-[160px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-700/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 dot-grid" />
            </div>

            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className="relative min-h-[88vh] flex items-center justify-center px-6 pt-16">
                <div className="max-w-5xl mx-auto text-center animate-fade-in-up">

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/8 mb-8">
                        <Star className="w-4 h-4 text-violet-400" fill="currentColor" />
                        <span className="text-sm font-medium text-slate-400 tracking-wide">Redefining Cinema Since 2019</span>
                    </div>

                    <h1 className="font-bold text-6xl sm:text-8xl md:text-[10rem] leading-none mb-8 tracking-wide">
                        We Build the Future
                        <br />
                        <span className="text-gradient">of Cinema.</span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                        Pulse is more than a streaming platform, it's a movement. We're a team of
                        dreamers, engineers, and storytellers united by one mission: to make extraordinary
                        cinema accessible to everyone, everywhere.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/browse"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30"
                        >
                            <Play className="w-5 h-5" fill="currentColor" />
                            Start Watching
                        </Link>

                        <a
                            href="#story"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-slate-700 hover:border-violet-500/50 hover:bg-violet-500/5 text-slate-300 hover:text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Our Story
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Stats ─────────────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="group relative p-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-center transition-all duration-500 hover:border-violet-500/40 hover:bg-slate-900 hover:-translate-y-1"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <stat.icon className="w-6 h-6 text-violet-400 mx-auto mb-4 relative z-10" />
                                <div className="font-bold text-5xl md:text-6xl text-white relative z-10 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-500 relative z-10 font-medium tracking-widest uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Values ────────────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="font-bold text-5xl md:text-7xl mb-6">
                            Built on <span className="text-gradient">Values</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            The principles that guide every pixel, every line of code, and every decision we make.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="group relative p-10 rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 hover:bg-slate-900/60 hover:-translate-y-0.5"
                            >
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="flex items-start gap-5 relative z-10">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors duration-300">
                                        <value.icon className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl text-white mb-3 tracking-wide">{value.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">{value.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Timeline ──────────────────────────────────────────── */}
            <section id="story" className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="font-bold text-5xl md:text-7xl mb-6">
                            Our <span className="text-gradient">Journey</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            From a bold idea to a global platform, every milestone matters.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Center line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/20 to-transparent" />

                        <div className="space-y-12">
                            {milestones.map((milestone, i) => (
                                <div
                                    key={milestone.year}
                                    className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-violet-500 border-4 border-slate-950 z-10 shadow-[0_0_12px_rgba(124,58,237,0.6)]" />

                                    {/* Card */}
                                    <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                        <div className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/30 hover:bg-slate-900/70">
                                            <span className="font-bold text-3xl text-violet-400">{milestone.year}</span>
                                            <p className="text-slate-400 mt-2 leading-relaxed">{milestone.event}</p>
                                        </div>
                                    </div>

                                    {/* Spacer */}
                                    <div className="hidden md:block md:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Team ──────────────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="font-bold text-5xl md:text-7xl mb-6">
                            The <span className="text-gradient">Team</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            Visionaries and builders crafting the future of entertainment.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="group text-center p-8 rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 hover:bg-slate-900/60 hover:-translate-y-1"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/80 to-violet-900/60 border border-violet-500/30 flex items-center justify-center mx-auto mb-5 font-bold text-2xl text-white group-hover:shadow-lg group-hover:shadow-violet-500/25 transition-shadow duration-300">
                                    {member.initial}
                                </div>
                                <h3 className="font-semibold text-white mb-1 text-base">{member.name}</h3>
                                <p className="text-sm text-slate-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────── */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative p-16 rounded-[2.5rem] border border-violet-500/20 bg-gradient-to-b from-violet-500/8 to-transparent overflow-hidden">
                        <div className="absolute inset-0 dot-grid opacity-40" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-500/20 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <h2 className="font-bold text-5xl md:text-7xl mb-6">
                                Ready to Experience
                                <br />
                                <span className="text-gradient">Pulse?</span>
                            </h2>
                            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                Join millions who&apos;ve already discovered a better way to watch.
                                Your cinematic journey starts now.
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}