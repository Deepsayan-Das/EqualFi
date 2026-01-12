'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, Zap, Users, Lock, ArrowRight } from 'lucide-react'

function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [rotation, setRotation] = useState(0)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const features = [
    "AI Credit Scoring",
    "Real-time Analysis",
    "Secure Data Processing",
    "Multi-Agent System",
    "Instant Approvals",
    "Smart Recommendations"
  ]

  const getFeaturePosition = (index, total, radius) => {
    const angle = (index * 360 / total) - 90 + rotation
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
      angle: angle
    }
  }

const isActive = activeFeature !== null
  
  // Responsive radius based on screen size
  const [radius, setRadius] = useState(180)
  
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(120) // Small mobile
      } else if (window.innerWidth < 768) {
        setRadius(150) // Large mobile
      } else if (window.innerWidth < 1024) {
        setRadius(180) // Tablet
      } else {
        setRadius(200) // Desktop
      }
    }
    
    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  return (
    <div id='features' className="min-h-screen bg-[#f2f4f8] py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative w-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-20"
      >
        <h2 className="text-4xl md:text-7xl font-extrabold text-[#1D2233] mb-4" style={{ fontFamily: 'Instrument Serif, serif' }}>
          Platform Features
        </h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '15%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1 bg-linear-to-r from-transparent via-[#78a0ff] to-transparent mx-auto mt-4 rounded-full"
        />
        <p className="text-[#4e4e4e] text-base md:text-lg max-w-2xl mx-auto mt-6 px-4">
          Powered by Weilliptic MCP and multi-agent AI architecture
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Orbital Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-lg aspect-square"
          >
            {/* Orbital Container */}
            <div className="relative w-full h-full">
              {/* SVG Orbital Rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
                {/* Outer decorative ring */}
                <circle
                  cx="250"
                  cy="250"
                  r={radius + 50}
                  fill="none"
                  stroke="#78a0ff"
                  strokeWidth="1"
                  opacity="0.2"
                  strokeDasharray="5 10"
                />
                
                {/* Main orbital path */}
                <circle
                  cx="250"
                  cy="250"
                  r={radius}
                  fill="none"
                  stroke="#78a0ff"
                  strokeWidth="2"
                  opacity={isActive ? "0.5" : "0.3"}
                  style={{ transition: 'all 0.5s ease' }}
                />

                {/* Connection Lines */}
                {features.map((_, index) => {
                  const pos = getFeaturePosition(index, features.length, radius)
                  return (
                    <line
                      key={index}
                      x1="250"
                      y1="250"
                      x2={250 + pos.x}
                      y2={250 + pos.y}
                      stroke="#78a0ff"
                      strokeWidth="1"
                      opacity={isActive ? (hoveredFeature === index ? "0.6" : "0.3") : "0.15"}
                      style={{ transition: 'opacity 0.3s ease' }}
                    />
                  )
                })}

                {/* Energy Particles on Ring */}
                {[0, 120, 240].map((offset, i) => {
                  const angle = ((rotation * 2 + offset) % 360) * Math.PI / 180
                  const x = 250 + Math.cos(angle) * radius
                  const y = 250 + Math.sin(angle) * radius
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={isActive ? "4" : "2.5"}
                      fill="#78a0ff"
                      opacity={isActive ? "0.9" : "0.5"}
                      style={{
                        filter: `drop-shadow(0 0 ${isActive ? '8' : '4'}px #78a0ff)`,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  )
                })}
              </svg>

              {/* Central Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  onMouseEnter={() => setActiveFeature(true)}
                  onMouseLeave={() => {
                    setActiveFeature(null)
                    setHoveredFeature(null)
                  }}
                  onClick={() => setActiveFeature(!activeFeature)}
                  className="relative group"
                >
                  {/* Icon Container */}
                  <div 
                    className="relative z-10 p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl transition-all duration-500 bg-white border-2 border-[#78a0ff]/30"
                    style={{
                      transform: isActive ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)',
                      boxShadow: isActive ? '0 20px 60px rgba(120,160,255,0.3)' : '0 10px 30px rgba(120,160,255,0.15)'
                    }}
                  >
                    <Zap 
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 transition-all duration-500 text-[#78a0ff]"
                      style={{
                        filter: isActive ? 'drop-shadow(0 0 12px #78a0ff)' : 'drop-shadow(0 0 6px #78a0ff)'
                      }}
                    />
                  </div>

                  {/* Pulsing Rings */}
                  <div 
                    className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-[#78a0ff] transition-opacity duration-500"
                    style={{
                      opacity: isActive ? 0.15 : 0.08,
                      animation: 'gentlePulse 3s ease-in-out infinite'
                    }}
                  />

                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl lg:rounded-3xl blur-2xl bg-[#78a0ff] transition-opacity duration-500"
                    style={{
                      opacity: isActive ? 0.25 : 0.12
                    }}
                  />
                </button>
              </div>

              {/* Orbital Feature Points */}
              {features.map((feature, index) => {
                const pos = getFeaturePosition(index, features.length, radius)
                const isHovered = hoveredFeature === index
                
                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div
                      onMouseEnter={() => {
                        setActiveFeature(true)
                        setHoveredFeature(index)
                      }}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={() => {
                        setActiveFeature(true)
                        setHoveredFeature(index)
                      }}
                      className="relative group/feature cursor-pointer"
                    >
                      {/* Feature Node */}
                      <div 
                        className="relative z-10 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-5 lg:py-3 rounded-lg lg:rounded-xl font-semibold text-[10px] sm:text-xs lg:text-sm whitespace-nowrap transition-all duration-300"
                        style={{
                          backgroundColor: isHovered ? '#78a0ff' : 'rgba(120,160,255,0.1)',
                          color: isHovered ? 'white' : '#1D2233',
                          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                          boxShadow: isHovered ? '0 8px 25px rgba(120,160,255,0.4)' : '0 2px 10px rgba(120,160,255,0.15)',
                          border: `2px solid ${isHovered ? '#78a0ff' : 'rgba(120,160,255,0.3)'}`
                        }}
                      >
                        {feature}
                      </div>

                      {/* Feature Glow */}
                      <div 
                        className="absolute inset-0 rounded-lg lg:rounded-xl blur-lg bg-[#78a0ff] transition-opacity duration-300"
                        style={{
                          opacity: isHovered ? 0.4 : 0.15
                        }}
                      />

                      {/* Orbiting Mini Particle */}
                      {isHovered && (
                        <div 
                          className="absolute w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#78a0ff]"
                          style={{
                            top: '50%',
                            left: '50%',
                            animation: 'miniOrbit 1.5s linear infinite',
                            boxShadow: '0 0 8px #78a0ff'
                          }}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Feature List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 max-w-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#1D2233] mb-6 md:mb-8 text-center lg:text-left">
              Why Choose Our Platform?
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              {[
                { icon: Shield, title: "Secure & Compliant", desc: "Bank-grade encryption with full regulatory compliance" },
                { icon: TrendingUp, title: "Higher Approval Rates", desc: "AI-powered assessment considers more data points" },
                { icon: Users, title: "Multi-Agent Intelligence", desc: "Collaborative AI agents for accurate credit decisions" },
                { icon: Lock, title: "Privacy First", desc: "Your data is encrypted and never shared without consent" }
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex gap-4 items-start group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="p-3 rounded-xl bg-[#78a0ff]/10 group-hover:bg-[#78a0ff]/20 transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#78a0ff]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1D2233] mb-1 text-sm md:text-base">{item.title}</h4>
                      <p className="text-[#4e4e4e] text-xs md:text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-6 md:mt-8 w-full lg:w-auto group/btn relative px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base text-white overflow-hidden transition-all duration-500 bg-[#78a0ff] hover:shadow-[0_10px_30px_rgba(120,160,255,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Explore Features
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes miniOrbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(25px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(25px) rotate(-360deg);
          }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>
    </div>
  )
}

export default FeaturesSection