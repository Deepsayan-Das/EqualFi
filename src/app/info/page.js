'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Sparkles, ShieldCheck, Wallet, Landmark, Activity, AlertCircle, ChevronDown, ArrowLeft } from 'lucide-react'
import { db } from '@/lib/weilliptic/api'
import { credit } from '@/lib/weilliptic/creditApi'

const metadata = {
  title: "EqualFi||Complete Your Profile",
  robots: {
    index: false,
    follow: false,
  },
};

const Info = () => {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState({ persona: false, consistency: false })
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    persona: 'Student',
    bankAge: '',
    incomeSource: '',
    monthlyIncome: '',
    incomeConsistency: 'Income Consistency',
    evaluationDate: '',
    rent: '',
    utilities: '',
    emi: '',
    insurance: '',
    missedPayments: ''
  })

  useEffect(() => {
    if (!isLoaded) return
    if (!user) {
      router.push('/')
      return
    }

    // Load existing profile data if available
    const existingProfile = localStorage.getItem(`profile_${user.id}`)
    if (existingProfile) {
      const data = JSON.parse(existingProfile)
      setFormData(prev => ({ ...prev, ...data }))
    }
  }, [isLoaded, user, router])

  const toggleDropdown = (field) => {
    setIsOpen(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setIsOpen(prev => ({ ...prev, [field]: false }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.persona || !formData.bankAge || !formData.incomeSource || 
        !formData.monthlyIncome || formData.incomeConsistency === 'Income Consistency') {
      alert('Please fill in all required fields')
      return
    }

    setIsSaving(true)

    try {
      // Calculate credit score based on inputs
      const creditScore = await calculateCreditScore(formData)
      
      // Prepare data for storage
      const profileData = {
        ...formData,
        creditScore,
        creditRating: getCreditRating(creditScore),
        approvalChance: Math.min(95, creditScore + 10),
        incomeStreams: formData.incomeSource.split(',').map(s => s.trim()),
        lifeObligations: {
          rent: formData.rent ? `₹${formData.rent}` : '₹0',
          emi: formData.emi ? `₹${formData.emi}` : '₹0',
          utilities: formData.utilities ? `₹${formData.utilities}` : '₹0',
          insurance: formData.insurance ? `₹${formData.insurance}` : '₹0'
        }
      }
      console.log(formData);
      // TODO: Replace with actual API call to your database
      // await fetch('/api/user-profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: user.id, ...profileData })
      // })
      //tablename: 'user_profiles_equalfi'


      const allowedFields = [
        'persona', 'bankAge', 'incomeSource', 'monthlyIncome', 
        'incomeConsistency', 'evaluationDate', 'rent', 
        'utilities', 'emi', 'insurance', 'missedPayments'
      ];

      const formFieldsAsArray = Object.entries(formData)
        .filter(([key]) => allowedFields.includes(key))
        .map(([key, value]) => [key, String(value)]);

      

      await db('insert_record', {
        table: 'user_profiles_equalfi',
        key: user.id,
        fields:[
          ...formFieldsAsArray,
          ['creditScore', String(creditScore)],
        ]
      })

      // For now, save to localStorage
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData))

      // Redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

 const calculateCreditScore = async (data) => {
    try { 
      // 1. Parse inputs safely (fallback to 0 if empty)
      const payload = {
        account_age_months: parseInt(data.bankAge) || 0,
        monthly_income_avg: parseFloat(data.monthlyIncome) || 0,
        income_frequency: data.incomeConsistency,
        monthly_rent: parseFloat(data.rent) || 0,
        monthly_utilities: (parseFloat(data.utilities) || 0) + (parseFloat(data.emi) || 0) + (parseFloat(data.insurance) || 0),
        missed_payments_count: parseInt(data.missedPayments) || 0
      };

      console.log("Calculating score with:", payload);

      const result = await credit('get_score', payload);
      
      console.log("Credit Score Result:", result);
      
      // 2. Return result DIRECTLY (it is a number, not an object)
      // If result is null/undefined, default to a safe score like 300
      return typeof result === 'number' ? result : 0;

    } catch (error) {
      console.error("Credit Score Calculation Failed:", error);
      // 3. Return a fallback score so the app doesn't crash
      return 0; 
    }
  }

  const getCreditRating = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 65) return 'Good'
    if (score >= 50) return 'Fair'
    return 'Needs Improvement'
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 lg:p-12 relative overflow-hidden 
      before:absolute before:inset-0 
      before:bg-[linear-gradient(to_right,rgba(120,160,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.07)_1px,transparent_1px)] 
      before:bg-size-[40px_40px] before:opacity-40 before:pointer-events-none">
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-10">
          
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <header className="mb-10 text-left">
            <h1 className="text-3xl font-black text-slate-100 tracking-tight mb-2">Complete Your Profile</h1>
            <p className="text-slate-400 font-medium">We evaluate real-world behavior — not just credit history.</p>
          </header>

          <div className="space-y-8">
            {/* PERSONA SECTION */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Landmark className="w-3 h-3" /> Persona
              </h3>
              <div className="space-y-3">
                <div className="relative">
                  <div 
                    onClick={() => toggleDropdown('persona')}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 flex justify-between items-center cursor-pointer hover:border-blue-500/30 transition-all"
                  >
                    <span>{formData.persona}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen.persona ? 'rotate-180' : ''}`} />
                  </div>
                  {isOpen.persona && (
                    <div className="absolute z-50 w-full mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      {['Student', 'Gig Worker', 'Freelancer'].map((opt) => (
                        <div 
                          key={opt}
                          onClick={() => selectOption('persona', opt)}
                          className="p-3 text-sm text-slate-300 hover:bg-blue-600/20 hover:text-blue-400 cursor-pointer transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input 
                  type="number" 
                  placeholder="Bank Account Age (months)"
                  value={formData.bankAge}
                  onChange={(e) => handleInputChange('bankAge', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </section>

            {/* INCOME STREAMS SECTION */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Wallet className="w-3 h-3" /> Income Streams
              </h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Primary Income Source (e.g., Uber, Upwork, Allowance)"
                  value={formData.incomeSource}
                  onChange={(e) => handleInputChange('incomeSource', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <input 
                  type="number" 
                  placeholder="Monthly Average Income (₹)"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                
                <div className="relative">
                  <div 
                    onClick={() => toggleDropdown('consistency')}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 flex justify-between items-center cursor-pointer hover:border-blue-500/30 transition-all"
                  >
                    <span className={formData.incomeConsistency === 'Income Consistency' ? 'text-slate-500' : 'text-slate-200'}>
                      {formData.incomeConsistency}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen.consistency ? 'rotate-180' : ''}`} />
                  </div>
                  {isOpen.consistency && (
                    <div className="absolute z-50 w-full mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      {['High – Consistent', 'Medium – Variable', 'Low – Unpredictable'].map((opt) => (
                        <div 
                          key={opt}
                          onClick={() => selectOption('incomeConsistency', opt)}
                          className="p-3 text-sm text-slate-300 hover:bg-blue-600/20 hover:text-blue-400 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input 
                  type="date" 
                  value={formData.evaluationDate}
                  onChange={(e) => handleInputChange('evaluationDate', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all scheme-dark"
                />
              </div>
            </section>

            {/* LIFE OBLIGATIONS SECTION */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity className="w-3 h-3" /> Life Obligations
              </h3>
              <div className="space-y-3">
                <input 
                  type="number" 
                  placeholder="Rent / Housing (₹ per month)"
                  value={formData.rent}
                  onChange={(e) => handleInputChange('rent', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" 
                />
                <input 
                  type="number" 
                  placeholder="EMI Payments (₹ per month)"
                  value={formData.emi}
                  onChange={(e) => handleInputChange('emi', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" 
                />
                <input 
                  type="number" 
                  placeholder="Utilities (Phone / Internet / Electricity)"
                  value={formData.utilities}
                  onChange={(e) => handleInputChange('utilities', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" 
                />
                <input 
                  type="number" 
                  placeholder="Insurance (₹ per month)"
                  value={formData.insurance}
                  onChange={(e) => handleInputChange('insurance', e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" 
                />
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Missed Payments (last 6 months)"
                    value={formData.missedPayments}
                    onChange={(e) => handleInputChange('missedPayments', e.target.value)}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" 
                  />
                  <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-slate-600" />
                </div>
              </div>
            </section>

            <div className="pt-6 space-y-3">
              <button 
                onClick={handleSubmit}
                disabled={isSaving}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Save & Continue
                  </>
                )}
              </button>
              
              <p className="text-xs text-slate-500 text-center">
                Your information is encrypted and stored securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info