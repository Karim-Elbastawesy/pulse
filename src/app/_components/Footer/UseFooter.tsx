'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'

export default function UseFooter() {

    const pathname = usePathname()
    if (pathname === '/' || pathname === '/browse') return null
    return <Footer />
}
