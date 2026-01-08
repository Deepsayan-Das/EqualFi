'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Zap, TrendingUp, Lock, Check } from 'lucide-react'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function LoginSignupPage() {
  const router = useRouter()
  const { signIn, isLoaded: signInLoaded } = useSignIn()
  const { signUp, isLoaded: signUpLoaded } = useSignUp()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [activeFeature, setActiveFeature] = useState(0)
  const [particlePositions, setParticlePositions] = useState([])

  const features = [
    {
      icon: Zap,
      title: "Instant Credit Access",
      description: "Get approved in minutes with AI-powered credit assessment",
      color: "#78a0ff"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is encrypted and protected with military-grade security",
      color: "#5c8be6"
    },
    {
      icon: TrendingUp,
      title: "Digital Income = Credit",
      description: "Transform your freelance and gig income into trusted credit history",
      color: "#4d7fd9"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your information is never shared without your explicit consent",
      color: "#78a0ff"
    }
  ]

  const OAUTH_PROVIDERS = {
    Google: 'oauth_google',
    GitHub: 'oauth_github',
    Apple: 'oauth_apple',
  }

  const oauthLogin = (strategy) => {
    if (!signIn || !strategy) return
    signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/dashboard',
    })
  }

  React.useEffect(() => {
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15
    }))
    setParticlePositions(particles)
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async () => {
    if (!signInLoaded) return
    setError('')

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Login failed')
    }
  }

  const handleSignup = async () => {
    if (!signUpLoaded) return
    setError('')

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').slice(1).join(' ') || '',
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      alert('Check your email for verification code')
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#010514] flex overflow-hidden relative pt-10">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-black text-[#78a0ff] mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              EQUALFI
            </h1>
            <p className="text-[#a0b0d0] text-sm">Equal Access to Financial Opportunities</p>
          </motion.div>

          <div className="flex gap-2 mb-8 bg-[#0f1a2e] p-1 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-[#78a0ff] text-white shadow-[0_0_20px_rgba(120,160,255,0.4)]'
                  : 'text-[#a0b0d0] hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-[#78a0ff] text-white shadow-[0_0_20px_rgba(120,160,255,0.4)]'
                  : 'text-[#a0b0d0] hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0f1a2e]/50 backdrop-blur-md p-8 rounded-2xl border border-[#78a0ff]/20"
            >
              {isLogin ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-[#a0b0d0] cursor-pointer">
                      <input type="checkbox" className="mr-2 accent-[#78a0ff]" />
                      Remember me
                    </label>
                    <a href="#" className="text-[#78a0ff] hover:underline">Forgot password?</a>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full py-4 bg-[#78a0ff] hover:bg-[#5c8be6] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(120,160,255,0.3)] hover:shadow-[0_6px_30px_rgba(120,160,255,0.5)] hover:translate-y-[-2px]"
                  >
                    Sign In
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#78a0ff]/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#0f1a2e]/50 text-[#a0b0d0]">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {['Google', 'GitHub', 'Apple'].map((provider) => (
                      <button
                        key={provider}
                        onClick={() => oauthLogin(OAUTH_PROVIDERS[provider])}
                        className="py-3 px-4 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-[#a0b0d0] hover:border-[#78a0ff] hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#a0b0d0] mb-2 text-sm font-medium">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-white placeholder-[#a0b0d0]/50 focus:border-[#78a0ff] focus:outline-none focus:ring-2 focus:ring-[#78a0ff]/20 transition-all"
                    />
                  </div>

                  <label className="flex items-start text-[#a0b0d0] text-sm cursor-pointer">
                    <input type="checkbox" className="mr-2 mt-1 accent-[#78a0ff]" />
                    <span>I agree to the <a href="#" className="text-[#78a0ff] hover:underline">Terms of Service</a> and <a href="#" className="text-[#78a0ff] hover:underline">Privacy Policy</a></span>
                  </label>

                  <button 
                    onClick={handleSignup}
                    className="w-full py-4 bg-[#78a0ff] hover:bg-[#5c8be6] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(120,160,255,0.3)] hover:shadow-[0_6px_30px_rgba(120,160,255,0.5)] hover:translate-y-[-2px]"
                  >
                    Create Account
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#78a0ff]/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#0f1a2e]/50 text-[#a0b0d0]">Or sign up with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {['Google', 'GitHub', 'Apple'].map((provider) => (
                      <button
                        key={provider}
                        onClick={() => oauthLogin(OAUTH_PROVIDERS[provider])}
                        className="py-3 px-4 bg-[#010514] border border-[#78a0ff]/30 rounded-xl text-[#a0b0d0] hover:border-[#78a0ff] hover:text-white transition-all duration-300 text-sm font-medium"
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#78a0ff]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="relative z-10 max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 mx-auto mb-8 relative"
                >
                  <div 
                    className="absolute inset-0 rounded-full opacity-20 blur-xl"
                    style={{ backgroundColor: features[activeFeature].color }}
                  />
                  <div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${features[activeFeature].color}40, ${features[activeFeature].color}10)`,
                      border: `2px solid ${features[activeFeature].color}60`,
                      boxShadow: `0 0 40px ${features[activeFeature].color}40`
                    }}
                  >
                    {React.createElement(features[activeFeature].icon, {
                      className: "w-16 h-16",
                      style: { color: features[activeFeature].color }
                    })}
                  </div>
                </motion.div>

                <h3 className="text-4xl font-bold text-white mb-4 text-center">
                  {features[activeFeature].title}
                </h3>
                <p className="text-[#a0b0d0] text-lg text-center leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mb-12">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeFeature ? 'w-12 bg-[#78a0ff]' : 'w-2 bg-[#78a0ff]/30'
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">
            {[
              "No traditional credit history required",
              "Instant approval decisions",
              "Transparent AI-powered assessment",
              "Secure data handling with encryption"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 text-[#a0b0d0]"
              >
                <div className="w-6 h-6 rounded-full bg-[#78a0ff]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#78a0ff]" />
                </div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-[#78a0ff]/20 rounded-full" />
        <div className="absolute bottom-10 left-10 w-60 h-60 border-2 border-[#78a0ff]/20 rounded-full" />
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
      `}</style>
    </div>
  )
}

export default LoginSignupPage