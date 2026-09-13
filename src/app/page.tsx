import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'


export default function page() {
  return (
    <main className="relative overflow-hidden isolate" >
      <section className='relative flex justify-center items-center min-h-screen'>

        <div className="absolute top-8 right-0 w-250 h-36 animate-marquee opacity-10 blur-xs rotate-20 scale-110 drop-shadow-sm pointer-events-none z-0" style={{ animationDelay: '1.5s' }}>
          <Image
            src="/images/film-strip-white.png"
            alt="Film Strip"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-8 -left-70 w-350 h-36 animate-marquee opacity-10 blur-[3px] rotate-35 scale-110 drop-shadow-sm pointer-events-none z-0" style={{ animationDelay: '1.5s' }}>
          <Image
            src="/images/film-strip-white.png"
            alt="Film Strip"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute h-full w-full pointer-events-none"><div className="absolute -z-5 h-full w-full opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" /></div>

        <div className='flex justify-center flex-col text-center items-center gap-5'>
          <h1 className='text-5xl md:text-8xl font-bold'>Introducing absolute <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-violet-700/90 to-violet-500  ">
              Cinema.
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Your gateway to millions of movies and TV shows. Navigate through endless categories, discover hidden gems, and curate your ultimate watchlist.
          </p>

          <div className="flex gap-4 items-center">
            <Link
              href="/browse"
              className="bg-linear-to-r px-4  group cursor-pointer hover:-translate-y-1 transition-all from-violet-600 to-violet-800 border-2 border-violet-600 flex items-center md:px-8 py-3 rounded-2xl gap-2 text-lg font-medium"
            >
              Browse Now!
              <ChevronRight className='group-hover:translate-x-1 transition-all' height={22} width={22} />
            </Link>

            <Link
              href="/about"
              className="group cursor-pointer hover:-translate-y-1 transition-all border-2 border-violet-600 flex items-center px-8 py-3 rounded-2xl gap-2 text-lg font-medium"
            >
              Learn More
            </Link>

          </div>
        </div>
      </section>
    </main>
  )
}
