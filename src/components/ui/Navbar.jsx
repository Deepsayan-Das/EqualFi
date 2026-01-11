'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Zalando_Sans_Expanded } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useLenis } from '@/hooks/useLenis'

export const zalandoExpanded = Zalando_Sans_Expanded({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-zalando-expanded',
  display: 'swap',
})





function Navbar() {
  const router = useRouter()
  const { scrollTo } = useLenis()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'About us', action: () => scrollTo('#about-us', { offset: -100, duration: 1.2 }) },
    { label: 'How It Works', action: () => scrollTo('#how-it-works', { offset: -100, duration: 1.2 }) },
    { label: 'Features', action: () => scrollTo('#features', { offset: -100, duration: 1.2 }) },
    { label: 'Docs', action: () => router.push('/docs') },
  ]

  const handleNavClick = (action) => {
    action()
    setIsMobileMenuOpen(false)
  }

  const handleSignup = () => {
    router.push('/authn')
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar */}
      <div className='w-full h-16 absolute top-0 left-0 z-50 hidden md:block mt-4'>
        <ul className={`${zalandoExpanded.className} h-full w-full flex items-center justify-evenly uppercase text-md text-[#f2f4f8]`}>
          <motion.li
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button
              onClick={() => scrollTo('#about-us', { offset: -100, duration: 1.2 })}
              className="cursor-pointer relative group pb-1 flex flex-col"
            >
              About us
              {/* <motion.span
                className='h-1 w-full bg-gradient-to-r from-transparent via-[#78a0ff] to-transparent mt-4 rounded-full'
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
              ></motion.span> */}
              {/*<motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '60%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                          className='h-1 bg-gradient-to-r from-transparent via-[#78a0ff] to-transparent mt-4 rounded-full'
                        /> */}
            </button>
          </motion.li>

          <motion.li
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button
              onClick={() => scrollTo('#how-it-works', { offset: -100, duration: 1.2 })}
              className="cursor-pointer relative group pb-1"
            >
              How It Works
              <motion.span
                className="absolute -bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(120, 160, 255, 0.8) 25%, rgba(120, 160, 255, 1) 50%, rgba(120, 160, 255, 0.8) 75%, transparent 100%)'
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </motion.li>

          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button
              onClick={() => scrollTo(0, { offset: -100, duration: 1.2 })}
              className="text-3xl font-black tracking-tighter cursor-pointer relative"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(180deg, #78a0ff 0%, #4d7fd9 50%, #2d5a8f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(120,160,255,0.5)',
              }}
            >
              EQUALFI
            </button>
          </motion.li>

          <motion.li
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button
              onClick={() => scrollTo('#features', { offset: -100, duration: 1.2 })}
              className="cursor-pointer relative group pb-1"
            >
              Features
              <motion.span
                className="absolute -bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(120, 160, 255, 0.8) 25%, rgba(120, 160, 255, 1) 50%, rgba(120, 160, 255, 0.8) 75%, transparent 100%)'
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </motion.li>

          <motion.li
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button
              onClick={() => router.push('/docs')}
              className="cursor-pointer relative group pb-1"
            >
              Docs
              <motion.span
                className="absolute -bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(120, 160, 255, 0.8) 25%, rgba(120, 160, 255, 1) 50%, rgba(120, 160, 255, 0.8) 75%, transparent 100%)'
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </motion.li>

          <motion.li
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.button
              onClick={() => router.push('/authn')}
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4a017] to-[#f4c430] font-semibold overflow-hidden group"
              whileHover="hover"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#f4c430] to-[#d4a017]"
                initial={{ x: '-100%' }}
                variants={{
                  hover: { x: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="relative z-10 flex items-center gap-2"
                variants={{
                  hover: { scale: 1.05 }
                }}
              >
                Signup
                <motion.span
                  initial={{ x: 0 }}
                  variants={{
                    hover: { x: 3 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </motion.span>
            </motion.button>
          </motion.li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className='w-full h-16 absolute top-0 left-0 z-50 md:hidden'>
        <div className='h-full w-full flex items-center justify-between px-6'>
          <motion.button
            onClick={() => scrollTo(0, { offset: -100, duration: 1.2 })}
            className="text-xl font-black tracking-tighter leading-none relative"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(180deg, #78a0ff 0%, #4d7fd9 50%, #2d5a8f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(120,160,255,0.5)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            EQUALFI
          </motion.button>

          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-[60] w-10 h-10 flex items-center justify-center text-[#f2f4f8]"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 backdrop-blur-xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 shadow-2xl border-l border-white/10"
              >
                <div className={`${zalandoExpanded.className} flex flex-col h-full pt-24 pb-8 px-8`}>
                  <nav className="flex flex-col gap-2 flex-1">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        onClick={() => handleNavClick(item.action)}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ x: 8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="text-left px-6 py-4 rounded-xl text-[#f2f4f8] uppercase text-sm font-medium tracking-wide transition-colors"
                      >
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          {item.label}
                        </motion.span>
                      </motion.button>
                    ))}
                  </nav>

                  <motion.button
                    onClick={handleSignup}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-[#d4a017] to-[#f4c430] font-bold text-sm uppercase tracking-wide shadow-lg shadow-[#d4a017]/30 relative overflow-hidden group"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-[#f4c430] to-[#d4a017]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
      `}</style>
    </>
  )
}

export default Navbar