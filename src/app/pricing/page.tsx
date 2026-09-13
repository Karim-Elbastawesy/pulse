'use client'

import React, { useState } from 'react'
import { Check, X, Zap, Shield, Crown } from 'lucide-react'
import Image from 'next/image'

interface PricingPlan {
  id: number
  name: string
  price: number
  subtitle: string
  icon: React.ElementType
  accent: string
  features: { name: string; included: boolean }[]
}

const plans: PricingPlan[] = [
  {
    id: 1,
    name: 'Basic',
    price: 0,
    subtitle: "Essential access for casual viewers.",
    icon: Shield,
    accent: 'from-slate-500 to-slate-600',
    features: [
      { name: "1080p HD Streaming", included: true },
      { name: "Ad-supported viewing", included: true },
      { name: "Watch on 2 devices", included: true },
      { name: "Offline downloads", included: false },
      { name: "Priority support", included: false },
      { name: "Exclusive content", included: false },
    ]
  },
  {
    id: 2,
    name: 'Pro',
    price: 19.99,
    subtitle: "Uninterrupted, high-fidelity cinema for enthusiasts.",
    icon: Zap,
    accent: 'from-violet-500 to-violet-700',
    features: [
      { name: "4K HDR Streaming", included: true },
      { name: "Zero Ads", included: true },
      { name: "Watch on 4 devices", included: true },
      { name: "Offline downloads", included: true },
      { name: "Priority support", included: true },
      { name: "Exclusive content", included: false },
    ]
  },
  {
    id: 3,
    name: 'Ultimate',
    price: 49.99,
    subtitle: "The definitive, uncompromised viewing experience.",
    icon: Crown,
    accent: 'from-amber-500 to-orange-600',
    features: [
      { name: "4K HDR10+ & Dolby Vision", included: true },
      { name: "Zero Ads", included: true },
      { name: "Unlimited devices", included: true },
      { name: "Unlimited offline downloads", included: true },
      { name: "Premium support & concierge", included: true },
      { name: "Exclusive early access content", included: true },
    ]
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getPrice = (plan: PricingPlan) =>
    plan.price === 0 ? 0 : isAnnual ? Math.floor(plan.price * 12 * 0.85) : plan.price

  return (
    <main className="min-h-screen pt-24 pb-32 px-6 relative overflow-hidden">

      {/* Film strip decorations */}
      <div className="absolute top-8 -left-40 w-[600px] h-36 animate-marquee opacity-10 blur-sm rotate-[120deg] pointer-events-none z-0">
        <Image src="/images/film-strip-white.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-8 -right-40 w-[700px] h-36 animate-marquee opacity-10 blur-[3px] rotate-[150deg] pointer-events-none z-0" style={{ animationDelay: '2s' }}>
        <Image src="/images/film-strip-white.png" alt="" fill className="object-contain" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 pointer-events-none -z-10 dot-grid" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="font-bold text-5xl sm:text-6xl md:text-[5rem] leading-none mb-8 tracking-wide">
            Choose Your<br />
            <span className="text-gradient">Cinema Experience</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-xl mx-auto leading-relaxed">
            From casual watching to the ultimate cinematic journey , find your perfect plan.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-20">
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-1.5 flex items-center shadow-2xl">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-8 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 ${!isAnnual ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-400 hover:text-white'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-8 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 ${isAnnual ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-400 hover:text-white'
                }`}
            >
              Annual
              <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${isAnnual ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500/10 text-emerald-500/70'
                }`}>
                −15%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-end">
          {plans.map((plan, idx) => {
            const price = getPrice(plan)
            const isPro = plan.id === 2
            const PlanIcon = plan.icon

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border transition-all duration-500 ${isPro
                  ? 'border-violet-500/60 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl shadow-violet-600/20 lg:-translate-y-6 z-20 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
              >
                {/* Popular badge */}
                {isPro && (
                  <div className="absolute z-10 -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold px-6 py-2 rounded-full tracking-[2px] shadow-xl whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}

                {/* Card top glow for pro */}
                {isPro && (
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent rounded-t-3xl" />
                )}

                <div className="p-8 xl:p-10 flex flex-col flex-1">

                  {/* Plan icon + name */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-lg`}>
                      <PlanIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl text-white tracking-wide">{plan.name}</h3>
                      <p className="text-slate-500 text-xs mt-0.5">{plan.subtitle}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8 flex items-baseline gap-1.5">
                    {price === 0 ? (
                      <span className="font-display text-6xl text-white">Free</span>
                    ) : (
                      <>
                        <span className="text-slate-500 text-xl self-start mt-3">$</span>
                        <span className="font-display text-6xl text-white">{price}</span>
                        <span className="text-slate-500 text-sm">/ {isAnnual ? 'yr' : 'mo'}</span>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent mb-8" />

                  {/* Features */}
                  <ul className="flex-1 space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3.5">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.accent} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                            <Check className="text-white" size={11} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                            <X className="text-slate-600" size={11} strokeWidth={3} />
                          </div>
                        )}
                        <span className={`text-sm leading-tight ${feature.included ? 'text-slate-200' : 'text-slate-600 line-through'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-4 rounded-2xl font-semibold text-sm tracking-[1.5px] uppercase transition-all duration-300 hover:-translate-y-0.5 ${isPro
                      ? 'bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40'
                      : plan.id === 3
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg shadow-amber-500/15'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
                      }`}
                  >
                    {plan.price === 0 ? 'Start Free' : `Get ${plan.name}`}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-white/80 text-sm mt-12 tracking-wide">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </main>
  )
}