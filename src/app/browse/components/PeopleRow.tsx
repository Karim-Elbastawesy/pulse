import Image from 'next/image'
import { Person } from '../../interface/movie.interface'
import { posterUrl } from '../../../../lib/tmdb'
import { Users } from 'lucide-react'

export default function PeopleRow({ people }: { people: Person[] }) {
    return (
        <section className="flex flex-col gap-5 px-5 sm:px-10 lg:px-16">

            <div className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-cyan-400 text-xs font-semibold tracking-[3px] uppercase">Spotlight</span>
                    <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">Trending People</h2>
                    <p className="text-slate-500 text-sm">The faces everyone's talking about</p>
                </div>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-3 pr-5 sm:pr-10 lg:pr-16" style={{ scrollbarWidth: 'none' }}>
                {people.map((person) => {
                    const photo = posterUrl(person.profile_path, 'w342')
                    return (
                        <div key={person.id} className="group shrink-0 flex flex-col items-center gap-3 cursor-pointer w-25 sm:w-27.5">

                            <div className="relative w-20 h-20 sm:w-22.5 sm:h-22.5 rounded-full overflow-hidden border-2 border-slate-800 group-hover:border-violet-500/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-violet-900/30">
                                {photo ? (
                                    <Image
                                        src={photo}
                                        alt={person.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="90px"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                        <Users size={24} className="text-slate-600" />
                                    </div>
                                )}
                                <div className="absolute inset-0 rounded-full ring-2 ring-violet-500/0 group-hover:ring-violet-500/40 transition-all duration-300" />
                            </div>

                            <div className="text-center">
                                <p className="text-white text-xs font-semibold leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors duration-200">
                                    {person.name}
                                </p>
                                <p className="text-slate-600 text-[10px] mt-0.5 tracking-wide">
                                    {person.known_for_department}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}