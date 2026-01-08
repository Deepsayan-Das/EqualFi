'use client'
import { motion } from "motion/react"
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Roboto_Condensed } from 'next/font/google'
import { useRouter } from 'next/navigation';


export const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-condensed', // optional but useful
})

function AnimatedButton(props) {
    const router = useRouter();
  return (
    <motion.button
        className='bg-linear-to-br from-[#d4a017] from-50% to-[#ceae5e]  min-w-fit px-6 md:px-8 h-14 md:h-16 rounded-full flex items-center gap-3 md:gap-4 relative hover:scale-105 transition-all duration-200 cursor-pointer'
        whileHover="hover"
        initial="initial"
        onClick={()=>{router.push('/authn')}}
    >
        <motion.span
            className={` ${robotoCondensed.className} text-[#1D2233] text-lg md:text-2xl whitespace-nowrap font-bold`}
        >
            {props.msg}
        </motion.span>

        <motion.div
            className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f2f4f8] flex justify-center items-center overflow-hidden relative shrink-0 -mr-4'
            variants={{
                initial: { scale: 1 },
                hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <motion.div
                className='absolute text-[#1D2233]'
                variants={{
                    initial: { x: 0, opacity: 1 },
                    hover: {
                        x: [0, 50, -50, 0],
                        opacity: [1, 0, 0, 1],
                        transition: {
                            duration: 0.5,
                            times: [0, 0.25, 0.5, 1],
                            ease: "easeInOut"
                        }
                    }
                }}
            >
                <ArrowRight size={20} className="md:w-[30px] md:h-[30px]" />
            </motion.div>
        </motion.div>
    </motion.button>
  )
}

export default AnimatedButton