'use client'
import React from 'react'
import { motion } from 'framer-motion'

function HowItWorks() {
  return (
    <div id='how-it-works' className='relative bg-linear-to-b min-h-screen md:h-[175vh] from-[#010514] to-[#0a1128] flex flex-col justify-center items-center overflow-hidden w-full rounded-3xl mt-10 shadow-2xl shadow-black z-20 py-16 md:py-0'>
      {/* Background Grid Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px] opacity-40 pointer-events-none'></div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.5 }}
        className='text-center mb-12 md:mb-12 max-w-3xl relative z-10 px-6'
      >
        <h2 className='text-3xl md:text-5xl font-extrabold text-[#f2f4f8] tracking-tight drop-shadow-[0_4px_20px_rgba(120,160,255,0.3)]'>
          3 Simple Steps to Credit Access
        </h2>
        <p className='text-[#a0b0d0] mt-4 text-base md:text-lg font-medium'>
          Leverage your digital income with AI-powered credit assessment through Welliptic MCP
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className='relative w-full md:w-[55%] mt-4 z-10 px-6 md:px-0'>
        
        {/* Growing line animation - Hidden on mobile */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className='hidden md:block absolute left-1/2 -translate-x-1/2 w-0.75 bg-linear-to-b from-[#78a0ff] to-[#4d7fd9] rounded-full shadow-[0_0_20px_rgba(120,160,255,0.5)] origin-top'
        ></motion.div>

        {/* Step Items */}
        <div className='flex flex-col items-center relative z-10 gap-8 md:gap-0'>

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className='w-full flex justify-center md:justify-start md:mb-20 relative'
          >
            <div className='w-full md:w-1/2 bg-[#0f1a2e]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(120,160,255,0.2)] border border-[#78a0ff]/20'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-8 h-8 md:hidden bg-[#78a0ff] rounded-full flex items-center justify-center text-[#010514] font-bold text-sm shadow-[0_0_15px_rgba(120,160,255,0.6)]'>1</div>
                <h3 className='text-[#78a0ff] font-black text-lg md:text-xl'>Step 1 — Connect Your Digital Income</h3>
              </div>
              <p className='text-[#a0b0d0] text-sm md:text-base leading-relaxed'>
                Link your freelance platforms, gig economy accounts, and digital payment histories. Our multi-agent system securely analyzes your income streams using Welliptic MCP.
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
              viewport={{ once: true, amount: 0.5 }}
              className='hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#78a0ff] rounded-full shadow-[0_0_20px_rgba(120,160,255,0.6)] border-2 border-[#010514]'
            ></motion.div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className='w-full flex justify-center md:justify-end md:mb-20 relative'
          >
            <div className='w-full md:w-1/2 bg-[#0f1a2e]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(120,160,255,0.2)] border border-[#78a0ff]/20 md:text-right'>
              <div className='flex md:flex-row-reverse items-center gap-3 mb-3'>
                <div className='w-8 h-8 md:hidden bg-[#5c8be6] rounded-full flex items-center justify-center text-[#010514] font-bold text-sm shadow-[0_0_15px_rgba(92,139,230,0.6)]'>2</div>
                <h3 className='text-[#78a0ff] font-black text-lg md:text-xl'>Step 2 — AI Credit Assessment</h3>
              </div>
              <p className='text-[#a0b0d0] text-sm md:text-base leading-relaxed'>
                {`Our intelligent agents process your data through Welliptic's MCP framework, evaluating creditworthiness based on digital income patterns, transaction consistency, and earning trends.`}
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
              viewport={{ once: true, amount: 0.5 }}
              className='hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#5c8be6] rounded-full shadow-[0_0_20px_rgba(92,139,230,0.6)] border-2 border-[#010514]'
            ></motion.div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className='w-full flex justify-center md:justify-start relative'
          >
            <div className='w-full md:w-1/2 bg-[#0f1a2e]/80 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(120,160,255,0.2)] border border-[#78a0ff]/20'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-8 h-8 md:hidden bg-[#4d7fd9] rounded-full flex items-center justify-center text-[#010514] font-bold text-sm shadow-[0_0_15px_rgba(77,127,217,0.6)]'>3</div>
                <h3 className='text-[#78a0ff] font-black text-lg md:text-xl'>Step 3 — Get Instant Credit Offers</h3>
              </div>
              <p className='text-[#a0b0d0] text-sm md:text-base leading-relaxed'>
                Receive personalized credit offers from our partner lenders. Choose the best terms for your needs and get funded quickly — all powered by transparent AI decision-making.
              </p>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 150 }}
              viewport={{ once: true, amount: 0.5 }}
              className='hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-[#4d7fd9] rounded-full shadow-[0_0_20px_rgba(77,127,217,0.6)] border-2 border-[#010514]'
            ></motion.div>
          </motion.div>

        </div>
      </div>

      {/* Tagline */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className='text-[#78a0ff] mt-12 md:mt-16 text-base md:text-lg italic font-medium text-center drop-shadow-[0_2px_10px_rgba(120,160,255,0.3)] relative z-10 px-6'
      >
        Your digital income is your credit history — unlock opportunities with AI-powered trust.
      </motion.p>
    </div>
  )
}

export default HowItWorks