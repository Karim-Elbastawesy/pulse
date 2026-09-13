import Image from 'next/image'
import { CastMember } from '../../../interface/movie.interface'
import { posterUrl } from '../../../../../lib/tmdb'
import { User } from 'lucide-react'

export default function CastRow({ cast }: { cast: CastMember[] }) {
  const visible = cast.filter(c => c.profile_path).slice(0, 20)

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="text-violet-400 text-xs font-semibold tracking-[3px] uppercase">The Cast</span>
        <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">Who's In It</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
        {visible.map((member) => {
          const photo = posterUrl(member.profile_path, 'w200')
          return (
            <div key={member.id} className="group shrink-0 flex flex-col gap-3 w-[100px] sm:w-[110px]">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-violet-500/40 transition-all duration-300 group-hover:-translate-y-1">
                {photo ? (
                  <Image
                    src={photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="110px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={28} className="text-slate-700" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-white text-xs font-semibold leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">
                  {member.name}
                </p>
                <p className="text-slate-600 text-[10px] line-clamp-1 italic">
                  {member.character}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}