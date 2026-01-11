'use client'
import { Instrument_Serif } from 'next/font/google'
import React from 'react'
import { motion } from 'framer-motion'

const instr = Instrument_Serif({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-instr',
})

function AboutUs() {
  return (
    <div id='about-us' className='bg-[#f2f4f8] mt-[-10vh] min-h-screen md:h-[110vh] w-screen flex flex-col items-center justify-center py-20 md:py-0'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='flex flex-col items-center'
        >
          <h1 className={`${instr.className} text-5xl md:text-7xl text-[#1D2233] font-black mt-12 md:mt-[25vh] text-center px-4`}>
              About Us
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className='h-1 bg-linear-to-r from-transparent via-[#78a0ff] to-transparent mt-4 rounded-full'
          />
        </motion.div>

        <section className='w-full md:h-[60%] mt-8 md:mt-[5vh] px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0'>
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className='w-full md:w-[50%] flex items-center text-center md:text-left text-[#1D2233] font-medium text-base md:text-lg leading-7 md:leading-8 px-4'
                >
                    We’re building a new credit layer for India’s digital workforce. Our mission is to unlock fair, transparent credit access for gig workers, freelancers, and first-time earners who are excluded by traditional credit systems. 
                    Powered by agentic AI on Icarus, MCP-based secure data orchestration, and blockchain-backed auditability via WeilChain, our platform converts real-world digital earnings into trustworthy, explainable credit decisions—without exposing sensitive personal data. 
                    We believe the future of finance is privacy-first, behavior-driven, and verifiably fair.
                </motion.div>

                {/* Vertical divider - hidden on mobile */}
                <motion.div 
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                  className='hidden md:block h-[50%] w-0.5 bg-linear-to-b from-transparent via-[#78a0ff] to-transparent mx-8 rounded-full'
                />

                {/* Decorative elements for mobile instead of image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className='md:hidden flex flex-col items-center gap-4 my-6'
                >
                  <div className='flex gap-3'>
                    <div className='w-16 h-16 rounded-full bg-linear-to-br from-[#78a0ff] to-[#4a7fdd] shadow-lg'></div>
                    <div className='w-16 h-16 rounded-full bg-linear-to-br from-[#4a7fdd] to-[#78a0ff] shadow-lg'></div>
                  </div>
                  <div className='w-24 h-1 bg-linear-to-r from-[#78a0ff] via-[#4a7fdd] to-[#78a0ff] rounded-full'></div>
                </motion.div>

                {/* Image for desktop */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                  className='hidden md:flex h-full w-[50%] justify-center items-center'
                >
                    <div className='h-[80%] aspect-square drop-shadow-[0_10px_40px_rgba(120,160,255,0.3)]' style={{
                      backgroundImage: 'url("/aboutus.svg")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain'
                    }}>
                    </div>
                </motion.div>
        </section>
    </div>
  )
}

export default AboutUs
