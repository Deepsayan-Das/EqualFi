'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedButton from './ui/AnimatedButton'
import Glow from './ui/Glow'

function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const words = ['Credit Needs', 'Financial Goals', 'Business Growth', 'Dream Purchase', 'Loan Requirements']
    const currentWord = words[currentWordIndex]
    const typingSpeed = isDeleting ? 50 : 100

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      } else {
        setDisplayedText(
          isDeleting
            ? currentWord.substring(0, displayedText.length - 1)
            : currentWord.substring(0, displayedText.length + 1)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentWordIndex])

  return (
    <div
      className="
        min-h-screen md:h-[110vh] w-full rounded-b-2xl md:rounded-b-3xl
        bg-[#010514]
        flex flex-col items-center md:items-start justify-center 
        gap-6 md:gap-8
        px-6 md:pl-12 md:pr-0
        py-12 md:py-0
        relative overflow-hidden
        before:absolute before:inset-0
        before:bg-[linear-gradient(to_right,rgba(120,160,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.07)_1px,transparent_1px)]
        before:bg-size-[40px_40px]
        before:opacity-40
        before:pointer-events-none
        shadow-2xl shadow-black
      "
    >
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="
          text-4xl sm:text-5xl md:text-7xl
          text-[#f2f4f8] font-extrabold 
          relative z-10 
          drop-shadow-[0_4px_20px_rgba(120,160,255,0.3)]
          text-center md:text-left
          leading-tight
        "
      >
        {`Turning India's Digital Income`}
        <br />
        {`Into Trusted Credit`}
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="
          relative z-10 
          text-lg sm:text-xl md:text-2xl
          text-[#a0b0d0] font-medium 
          drop-shadow-[0_2px_10px_rgba(120,160,255,0.2)]
          text-center md:text-left
        "
      >
        Onestop Destination For Your - <span className="text-[#78a0ff] font-semibold">{displayedText}<span className="animate-pulse">|</span></span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="relative z-10 drop-shadow-[0_8px_30px_rgba(120,160,255,0.4)]"
      >
        <AnimatedButton msg="Get Started" />
      </motion.div>
        
    </div>
  )
}

export default Hero