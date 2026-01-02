import Link from 'next/link'
import React from 'react'
import { Zalando_Sans_Expanded } from 'next/font/google'

export const zalandoExpanded = Zalando_Sans_Expanded({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-zalando-expanded',
  display: 'swap',
})
function Navbar() {
  return (
    <div className='w-full h-16  absolute top-0 left-0 z-50'>
        <ul className={`
           ${zalandoExpanded.className} h-full w-full flex items-center justify-evenly uppercase text-sm text-[#f2f4f8]`
            }>
            <li>
                <Link href='/'>
                    About us 
                </Link>
            </li>
            <li>
                <Link href='/'>
                    How It Works 
                </Link>
            </li>
            <li>
                <Link href='/'>
                    EQUALFI
                </Link>
            </li>
            <li>
                <Link href='/'>
                    Features 
                </Link>
            </li>
            <li>
                <Link href='/'>
                    docs
                </Link>
            </li>
            <li>
                <Link href='/'>
                    <button className=' px-4 py-2 rounded-full bg-[#d4a017]'>
                        Signup
                    </button> 
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar