'use client'
import React, { useState } from 'react'
import { Sparkles, ShieldCheck, Wallet, Landmark, Activity, AlertCircle, ChevronDown } from 'lucide-react'

const Info = ({ onEvaluate }) => {
  const [isOpen, setIsOpen] = useState({ persona: false, consistency: false });
  const [formData, setFormData] = useState({
    persona: 'Student',
    bankAge: '',
    incomeSource: '',
    monthlyIncome: '',
    incomeConsistency: 'Income Consistency',
    evaluationDate: '',
    rent: '',
    utilities: '',
    missedPayments: ''
  });

  const toggleDropdown = (field) => {
    setIsOpen(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsOpen(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 lg:p-12 relative overflow-hidden 
      before:absolute before:inset-0 
      before:bg-[linear-gradient(to_right,rgba(120,160,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.07)_1px,transparent_1px)] 
      before:bg-[size:40px_40px] before:opacity-40 before:pointer-events-none">
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-10">
          
          <header className="mb-10 text-left">
            <h1 className="text-3xl font-black text-slate-100 tracking-tight mb-2">Credit Profile Evaluation</h1>
            <p className="text-slate-400 font-medium">We evaluate real-world behavior — not just credit history.</p>
          </header>

          <div className="space-y-8">
            {/* PERSONA SECTION */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Landmark className="w-3 h-3" /> Persona
              </h3>
              <div className="space-y-3">
                {/* Custom Persona Dropdown */}
                <div className="relative">
                  <div 
                    onClick={() => toggleDropdown('persona')}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 flex justify-between items-center cursor-pointer hover:border-blue-500/30 transition-all"
                  >
                    <span>{formData.persona}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen.persona ? 'rotate-180' : ''}`} />
                  </div>
                  {isOpen.persona && (
                    <div className="absolute z-50 w-full mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
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
                  placeholder="Primary Income Source (Uber, Upwork, Allowance)"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Monthly Average Income (₹)"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                
                {/* Custom Consistency Dropdown */}
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
                    <div className="absolute z-50 w-full mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                      {['High – Weekly', 'Medium – Irregular', 'Low – Sporadic'].map((opt) => (
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
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all [color-scheme:dark]"
                />
              </div>
            </section>

            {/* LIFE OBLIGATIONS SECTION */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity className="w-3 h-3" /> Life Obligations
              </h3>
              <div className="space-y-3">
                <input type="text" placeholder="Rent / Housing (₹ per month)" className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" />
                <input type="text" placeholder="Utilities (Phone / Internet / Electricity)" className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" />
                <div className="relative">
                  <input type="number" placeholder="Missed Payments (last 6 months)" className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all" />
                  <AlertCircle className="absolute right-3 top-3.5 w-4 h-4 text-slate-600" />
                </div>
              </div>
            </section>

            <div className="pt-6">
              <button 
                onClick={() => onEvaluate(formData)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5" />
                Run Credit Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info;