'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import GaugeComponent from 'react-gauge-component'
import { User, DollarSign, Home, TrendingUp, Activity, Sparkles, Clock, CheckCircle, ShieldCheck, ArrowUpRight, ExternalLink, AlertTriangle, Cpu, Edit } from 'lucide-react'
import { db } from '@/lib/weilliptic/api'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut, User as UserIcon } from 'lucide-react'
import Image from "next/image";
 const metadata = {
  title: "EqualFi||Your Complete Credit Profile",
  robots: {
    index: false,
    follow: false,
  },
};

function Dashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [creditScore, setCreditScore] = useState(0)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [hasProfileData, setHasProfileData] = useState(false)
  const [userData, setUserData] = useState(null)
    const getCreditRating = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 65) return 'Good'
    if (score >= 50) return 'Fair'
    return 'Needs Improvement'
  }

  useEffect(() => {
    if (!isLoaded) return
    // if (!user) {
    //   router.push('/')
    //   return
    // }

    // Check if user has completed profile (you'll replace this with actual DB check)
    const checkProfileCompletion = async () => {
      try {
        // TODO: Replace with actual API call to your database
        // const response = await fetch(`/api/user-profile/${user.id}`)
        // const data = await response.json()
        
        // For now, check localStorage or set to false by default
        const profileCompleted = localStorage.getItem(`profile_${user.id}`)

        if (profileCompleted) {
          const data = JSON.parse(profileCompleted)
          setUserData(data)
          setHasProfileData(true)

        }else {
        
          const rawRecords = await db('get_all_fields', {
            table: 'user_profiles_equalfi',  // Your table name
            key: user.id                     // The User ID or Wallet Address used as the Primary Key
          });
          const userDataDB = Object.fromEntries(rawRecords);
          if(Object.keys(userDataDB).length > 0) {
            const profileDatafromDB= {
              ...userDataDB, //!!! set creditScore field in DB !!!
              creditRating: getCreditRating(parseInt(userDataDB.creditScore)),
              approvalChance: Math.min(95,parseInt(userDataDB.creditScore) + 10),
              incomeStreams: userDataDB.incomeSource.split(',').map(s => s.trim()),
              lifeObligations: {
                rent: userDataDB.rent ? `₹${userDataDB.rent}` : '₹0',
                emi: userDataDB.emi ? `₹${userDataDB.emi}` : '₹0',
                utilities: userDataDB.utilities ? `₹${userDataDB.utilities}` : '₹0',
                insurance: userDataDB.insurance ? `₹${userDataDB.insurance}` : '₹0'
              }
            }
            setUserData(profileDatafromDB)
            setHasProfileData(true)
          }else {
            setHasProfileData(false)
          }
        }

         
      } catch (error) {
        console.error('Error checking profile:', error)
        setHasProfileData(false)
      }
    }

    checkProfileCompletion()
  }, [isLoaded, user, router])



  const handleEvaluation = () => {
    if (!hasProfileData) return
    
    setIsEvaluating(true)
    setShowResults(false)
    setCreditScore(0)
    
    setTimeout(() => {
      setIsEvaluating(false)
      setShowResults(true)
      setCreditScore(parseInt(userData?.creditScore) || 0)
    }, 3000)
  }

  const handleUpdateProfile = () => {
    router.push('/info')
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6 lg:p-12 relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(120,160,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.07)_1px,transparent_1px)] before:bg-size-[40px_40px] before:opacity-40 before:pointer-events-none">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <button
                        
                        className="text-3xl font-black tracking-tighter cursor-pointer relative"
                        style={{ 
                          fontFamily: 'Orbitron, sans-serif',
                          background: 'linear-gradient(180deg, #78a0ff 0%, #4d7fd9 50%, #2d5a8f 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          textShadow: '0 0 80px rgba(120,160,255,0.5)',
                        }}
                      >
                        EQUALFI
                      </button>
          <div className="flex items-center gap-6">
  {/* User Info */}
  <div className="flex items-center gap-4">
  {/* Left: User info + sign out */}
  <div className="flex flex-col items-end">
    <div className="text-right">
      <p className="text-sm text-slate-400">Welcome back,</p>
      <p className="font-bold text-white">
        {user.firstName || user.emailAddresses[0].emailAddress}
      </p>
    </div>

    <SignOutButton>
      <button
        type="button"
        className="
          mt-2
          flex items-center gap-2
          rounded-md px-3 py-1.5
          text-xs font-medium
          text-slate-300
          bg-slate-800/60
          border border-slate-700
          hover:bg-red-500/10
          hover:text-red-400
          hover:border-red-500/40
          transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-red-500/40
        "
        aria-label="Sign out"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </SignOutButton>
  </div>

  {/* Right: Avatar */}
  <div className="w-12 h-12 rounded-full bg-Linear-to-br from-blue-400 to-blue-600 flex items-center justify-center border border-blue-500/20">
    {user.imageUrl ? (
      <Image
        src={user.imageUrl}
        width={40}
        height={40}
        alt="User profile picture"
        className="w-full h-full rounded-full object-cover"
      />
    ) : (
      <UserIcon className="w-6 h-6 text-white" />
    )}
  </div>
</div>

  
</div>
          
        </div>
        <p className="text-slate-400 text-lg font-medium">Credit Profile Evaluation Dashboard</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Left Column - User Info & Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Personal Information */}
          <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold">Personal Information</h2>
              </div>
              <button
                onClick={handleUpdateProfile}
                className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors"
                title="Update Profile"
              >
                <Edit className="w-4 h-4 text-blue-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Full Name</label>
                <p className="text-white font-medium">
                  {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Not set'}
                </p>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Email</label>
                <p className="text-white font-medium">{user.emailAddresses[0].emailAddress}</p>
              </div>
              {hasProfileData && userData?.persona && (
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Persona</label>
                  <div className="flex gap-2 mt-2">
                    <span className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white shadow-lg shadow-blue-500/40">
                      {userData.persona}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Income Information */}
          {hasProfileData && userData ? (
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold">Income Streams</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Active Platforms</label>
                  <div className="flex flex-wrap gap-2">
                    {userData.incomeStreams?.map((stream, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-400 font-medium">
                        {stream}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Income Consistency</label>
                  <p className="text-white font-medium">{userData.incomeConsistency}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Monthly Income</label>
                  <p className="text-2xl font-bold text-blue-400 tracking-tight">{userData.monthlyIncome}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-yellow-500/20 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-yellow-400">Profile Incomplete</h2>
              </div>
              <p className="text-slate-300 mb-4">Complete your profile to unlock credit evaluation.</p>
              <button
                onClick={handleUpdateProfile}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-all"
              >
                Complete Profile Now
              </button>
            </div>
          )}

          {/* Life Obligations */}
          {hasProfileData && userData?.lifeObligations && (
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Home className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold">Life Obligations</h2>
              </div>
              <div className="space-y-3">
                {Object.entries(userData.lifeObligations).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-slate-400 capitalize">{key}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-blue-500/20 flex justify-between items-center">
                  <span className="text-white font-semibold">Total</span>
                  <span className="font-bold text-lg text-blue-400">
                    ₹{Object.values(userData.lifeObligations).reduce((sum, val) => 
                      sum + parseInt(val.replace(/[₹,]/g, '')), 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Evaluate Button */}
          <button
            onClick={handleEvaluation}
            disabled={isEvaluating || !hasProfileData}
            className={`w-full py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 border ${
              hasProfileData
                ? 'bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/40 border-blue-400/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border-slate-700'
            }`}
          >
            {isEvaluating ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Evaluating...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> {hasProfileData ? 'Run Credit Evaluation' : 'Complete Profile First'}</>
            )}
          </button>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Credit Score Gauge Card */}
          <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-blue-500/20 shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 text-center">Credit Decision</h2>
            <p className="text-center text-slate-400 text-sm mb-6">Based on verified income, behaviour, and stability signals</p>

            <div className="w-full max-w-md mx-auto relative mb-2">
              <GaugeComponent
                value={creditScore}
                type="radial"
                labels={{
                  tickLabels: {
                    type: "inner",
                    ticks: [{ value: 20 }, { value: 40 }, { value: 60 }, { value: 80 }, { value: 100 }],
                    style: { fill: '#94a3b8', fontSize: '12px' }
                  },
                  valueLabel: {
                    formatTextValue: (val) => showResults ? `${val}` : '',
                    style: { fill: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.5)', fontSize: '40px', fontWeight: 'bold' }
                  }
                }}
                arc={{
                  colorArray: ['#ef4444', '#fbbf24', '#78a0ff', '#4ade80'],
                  subArcs: [{limit: 20}, {limit: 40}, {limit: 60}, {limit: 80}, {limit: 100}],
                  padding: 0.02,
                  width: 0.25
                }}
                pointer={{ elastic: true, animationDelay: 0, color: '#94a3b8' }}
              />
            </div>

            <div className={`text-center transition-all duration-700 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-6 py-1.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30 font-bold mb-2">
                <ShieldCheck className="w-4 h-4" /> APPROVED
              </div>
              <p className="text-slate-400 text-lg font-medium">Stability Index: <span className="text-white font-bold">{creditScore} / 100</span></p>
            </div>
          </div>

          {showResults && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">
              
              {/* Decision Rationale */}
              <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">Why this decision was made</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /><p className="text-slate-300">Consistent income for the last 9 months</p></div>
                  <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /><p className="text-slate-300">Regular gig activity with predictable earnings</p></div>
                  <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-400" /><p className="text-slate-300">No missed utility or rent payments in last 6 months</p></div>
                  <div className="flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-yellow-400" /><p className="text-slate-300">Moderate income variability detected</p></div>
                </div>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg"><CheckCircle className="w-5 h-5 text-green-400" /></div>
                    <span className="text-sm text-slate-400">Approval Chance</span>
                  </div>
                  <p className="text-3xl font-black text-green-400">{userData?.approvalChance || 85}%</p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg"><TrendingUp className="w-5 h-5 text-blue-400" /></div>
                    <span className="text-sm text-slate-400">Credit Limit</span>
                  </div>
                  <p className="text-3xl font-black text-blue-400">₹2.5L</p>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg"><Clock className="w-5 h-5 text-yellow-400" /></div>
                    <span className="text-sm text-slate-400">Processing Time</span>
                  </div>
                  <p className="text-3xl font-black text-yellow-400">24 hrs</p>
                </div>
              </div>

              {/* On-Chain Audit & Next Steps */}
              <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 shadow-xl">
                <h3 className="text-lg font-bold mb-2">What happens next</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">This decision has been cryptographically recorded. Lenders can verify the outcome without accessing your private data.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-semibold border border-white/5 transition-colors">
                    <ExternalLink className="w-4 h-4" /> View On-Chain Audit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-xl text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all">
                    <ArrowUpRight className="w-4 h-4" /> Improve My Score
                  </button>
                </div>
              </div>

              {/* Compliance Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold opacity-70">
                <div className="flex items-center gap-2"><Cpu className="w-3 h-3" /> Decision generated by Agentic AI</div>
                <div>Hash-only audit</div>
                <div className="text-blue-400">DPDP-aligned</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard