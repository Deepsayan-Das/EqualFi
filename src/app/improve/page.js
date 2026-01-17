'use client'
import AnimatedButton from '@/components/ui/AnimatedButton';
import React from 'react';
import { motion } from "motion/react"
import { ArrowRight } from 'lucide-react';
import { Roboto_Condensed } from 'next/font/google'
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { CustomScrollbar } from '@/components/ui/CustomScrollbar';
import { CursorFollower } from '@/components/ui/CustomCursor';


export const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-condensed', // optional but useful
})

export default function CreditScorePage() {
const strategies = [
  {
    title: "Increase Income Consistency",
    description: "Stable income is a strong signal of repayment reliability.",
    bullets: [
      "Maintain regular gig activity (weekly or bi-weekly)",
      "Avoid long gaps between income deposits",
      "Use fewer platforms but earn consistently"
    ],
    impact: " +10–20 points in 3–6 months"
  },
  {
    title: "Reduce Missed Payments",
    description: "Missed rent or utility payments signal financial stress.",
    bullets: [
      "Set reminders for rent and utility bills",
      "Pay at least the minimum amount on time",
      "Avoid late payments even for small bills"
    ],
    impact: " −5–8 points per missed payment"
  },
  {
    title: "Balance Income vs Expenses",
    description: "High obligations compared to income increase risk.",
    bullets: [
      "Keep obligations below 50–60% of income",
      "Reduce non-essential recurring expenses",
      "Avoid new short-term debt when applying"
    ],
    impact: " Improves approval odds and limits"
  },
  {
    title: "Build Account Stability",
    description: "Older and consistent accounts show financial maturity.",
    bullets: [
      "Avoid frequently changing bank accounts",
      "Use one account consistently for income",
      "Maintain regular transaction activity"
    ],
    impact: " Adds trust weight over time"
  },
  {
    title: "Avoid Artificial Credit Signals",
    description: "Systems detect forced or recycled financial behavior.",
    bullets: [
      "Do not take loans to pay other bills",
      "Avoid moving money in artificial loops",
      "Avoid short-term borrowing before review"
    ],
    impact: " Prevents risk-model penalties"
  }
];


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
        <Navbar/>
        <CustomScrollbar/>
        <CursorFollower/>
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Subtle radial gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15), transparent 50%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header section */}
        <div className="mb-16 max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight mt-4">
            Improve Your Credit Score
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed font-light">
            Your credit score is a key indicator of financial health. Follow these evidence-based strategies 
            to build and maintain a strong credit profile over time.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className="group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid rgba(99, 102, 241, 0.15)',
                boxShadow: '0 4px 24px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(148, 163, 184, 0.05)',
                animation: `fadeSlideUp 0.6s ease-out ${index * 0.08}s both`
              }}
            >
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.06), transparent 40%)',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}
              />

              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-slate-50">
                  {strategy.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-400 mb-5 leading-relaxed font-light">
                  {strategy.description}
                </p>
                
                {/* Bullets */}
                <ul className="space-y-2.5 mb-6">
                  {strategy.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <span 
                        className="mt-1.5 flex-shrink-0"
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(99, 102, 241, 0.6)'
                        }}
                      />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Impact badge */}
                <div className="pt-4 border-t border-slate-800/50">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-300">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {strategy.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
           
    </div>
  );
}