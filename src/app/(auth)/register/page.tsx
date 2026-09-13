'use client'

import Link from 'next/link'
import { Play, Mail, Lock, User, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterFormValues } from '../Schema/auth'
import { setStoredUser } from '../../../../lib/auth'
import { useRouter } from 'next/navigation'

const perks = [
  'Unlimited watchlist & collections',
  'Personalized recommendations',
  'Cross-device sync',
  '14-day Pro trial, no card needed',
]

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    await new Promise(r => setTimeout(r, 800))
    setStoredUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    })
    router.push('/browse')
  }

  const Field = ({
    label,
    error,
    children,
  }: {
    label: string
    error?: string
    children: React.ReactNode
  }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-[2px] uppercase text-slate-500">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400 mt-0.5">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  )

  const inputClass = (hasError: boolean) =>
    `w-full bg-slate-900/80 border rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 ${hasError
      ? 'border-red-500/60 focus:border-red-500'
      : 'border-slate-800 hover:border-slate-700 focus:border-violet-500/60 focus:bg-slate-900'
    }`

  return (
    <div className="min-h-screen flex">

      {/* Left — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative order-2 lg:order-1">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-600/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">

          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500 rounded-xl blur-md opacity-50" />
                <div className="relative bg-gradient-to-br from-violet-500 to-violet-700 p-2 rounded-xl">
                  <Play fill="#fff" height={16} width={16} className="translate-x-0.5" />
                </div>
              </div>
              <span className="font-display text-2xl text-white tracking-widest">PULSE</span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" error={errors.firstName?.message}>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    {...register('firstName')}
                    type="text"
                    placeholder="John"
                    className={`${inputClass(!!errors.firstName)} pl-11`}
                  />
                </div>
              </Field>
              <Field label="Last Name" error={errors.lastName?.message}>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Doe"
                  className={inputClass(!!errors.lastName)}
                />
              </Field>
            </div>

            <Field label="Email" error={errors.email?.message}>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={`${inputClass(!!errors.email)} pl-11`}
                />
              </div>
            </Field>

            <Field label="Password" error={errors.password?.message}>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Min. 8 characters"
                  className={`${inputClass(!!errors.password)} pl-11`}
                />
              </div>
            </Field>

            <Field label="Confirm Password" error={errors.confirmPassword?.message}>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className={`${inputClass(!!errors.confirmPassword)} pl-11`}
                />
              </div>
            </Field>

            <p className="text-xs text-slate-600 leading-relaxed -mt-1">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-slate-500 hover:text-violet-400 transition-colors underline underline-offset-2">Terms of Service</Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-slate-500 hover:text-violet-400 transition-colors underline underline-offset-2">Privacy Policy</Link>.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-1 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </button>

            <div className="relative flex items-center gap-4 my-1">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-700 tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 text-slate-300 text-sm font-medium transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>

      {/* Right — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950 order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-bl from-violet-950/80 via-slate-950 to-slate-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="relative z-10 flex flex-col justify-center p-16 w-full">
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-6xl xl:text-7xl leading-none text-white">
                Start Your<br />
                <span className="text-gradient">Cinema</span><br />
                Journey.
              </h2>
              <p className="text-slate-500 text-base leading-relaxed max-w-xs">
                Join over 10 million viewers already experiencing cinema the way it was meant to be.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-violet-400" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-400">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  )
}