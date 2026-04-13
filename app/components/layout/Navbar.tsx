'use client'

import { ShoppingBag, User, Search, Menu } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu */}
        <button className="p-2 text-stone-600 lg:hidden">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-serif tracking-tighter text-pink-600">
            SER<span className="font-light italic">MULHER</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:space-x-8">
          <Link href="/skincare" className="text-sm font-medium text-stone-600 hover:text-stone-900">Skincare</Link>
          <Link href="/maquiagem" className="text-sm font-medium text-stone-600 hover:text-stone-900">Maquiagem</Link>
          <Link href="/corpo" className="text-sm font-medium text-stone-600 hover:text-stone-900">Corpo & Banho</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-stone-600 hover:text-stone-900">
            <Search size={20} />
          </button>
          <Link href="/admin/login" className="p-2 text-stone-600 hover:text-stone-900">
            <User size={20} />
          </Link>
          <button className="relative p-2 text-stone-600 hover:text-stone-900">
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
              0
            </span>
          </button>
        </div>
      </div>      
    </nav>
  )
}