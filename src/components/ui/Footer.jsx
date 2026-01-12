'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

function Footer() {
  const footerLinks = {
    Product: ['Features', 'How It Works', 'Pricing', 'Security', 'API Docs'],
    Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
    Resources: ['Help Center', 'Documentation', 'Guides', 'Terms of Service', 'Privacy Policy'],
    Connect: ['Twitter', 'LinkedIn', 'GitHub', 'Discord', 'Email']
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#010514] via-[#0a1128] to-[#000000] text-white overflow-hidden rounded-t-2xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none rounded-t-2xl" />
      
      {/* Animated Gradient Orbs */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#78a0ff] rounded-full blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4d7fd9] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Section - Links */}
        <div className="pt-20 pb-16 border-b border-[#78a0ff]/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-[#78a0ff] font-bold text-lg mb-6 tracking-wide">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <a
                        href="#"
                        className="text-[#a0b0d0] hover:text-[#78a0ff] transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-wrap gap-8 justify-center md:justify-start"
          >
            <div className="flex items-center gap-3 text-[#a0b0d0]">
              <div className="p-2 rounded-lg bg-[#78a0ff]/10">
                <Mail className="w-5 h-5 text-[#78a0ff]" />
              </div>
              <span>contact.equalfi@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-[#a0b0d0]">
              <div className="p-2 rounded-lg bg-[#78a0ff]/10">
                <Phone className="w-5 h-5 text-[#78a0ff]" />
              </div>
              <span>+91 8637329216 </span>
            </div>
            <div className="flex items-center gap-3 text-[#a0b0d0]">
              <div className="p-2 rounded-lg bg-[#78a0ff]/10">
                <MapPin className="w-5 h-5 text-[#78a0ff]" />
              </div>
              <span>Kolkata, India </span>
            </div>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex gap-4 justify-center md:justify-start"
          >
            {[Twitter, Linkedin, Github, Mail].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-3 rounded-xl bg-[#78a0ff]/10 hover:bg-[#78a0ff] text-[#78a0ff] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(120,160,255,0.5)]"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section - EQUALFI Branding */}
        <div className="py-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            {/* Main Logo */}
            <h1 
              className="text-[4rem] md:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-none relative"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(180deg, #78a0ff 0%, #4d7fd9 50%, #2d5a8f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(120,160,255,0.5)',
              }}
            >
              EQUALFI
            </h1>

            {/* Glowing underline */}
            {/* <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-transparent via-[#78a0ff] to-transparent mx-auto mt-4 rounded-full"
              style={{ boxShadow: '0 0 20px rgba(120,160,255,0.6)' }}
            /> */}

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 text-[#a0b0d0] text-md md:text-xl font-light tracking-wide"
            >
              Equal Access to Financial Opportunities
            </motion.p>

            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-8 text-[#a0b0d0]/60 text-sm"
            >
              © 2026 EqualFi. All rights reserved. Powered by Weilliptic MCP.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
      `}</style>
    </footer>
  )
}

export default Footer