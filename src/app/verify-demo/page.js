'use client'
import React, { useState } from 'react'
import ReclaimButton from '@/components/ReclaimButton'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function VerifyDemo() {
    const router = useRouter()
    const [verifiedData, setVerifiedData] = useState(null)

    const handleSuccess = (data) => {
        console.log('Verification Success:', data)
        setVerifiedData(data)
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white p-8">
            <div className="max-w-md mx-auto space-y-8">

                <button
                    onClick={() => router.push('/info')} // Back to main app for context
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to App
                </button>

                <header>
                    <h1 className="text-3xl font-black text-blue-500 mb-2">Verification Demo</h1>
                    <p className="text-slate-400">Test the Reclaim Protocol integration isolated from the main form.</p>
                </header>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">

                    <div className="space-y-2">
                        <h3 className="font-bold text-slate-200">1. Verify Upwork Income</h3>
                        <ReclaimButton
                            providerKey="UPWORK"
                            onSuccess={handleSuccess}
                            onError={(err) => alert(err.message)}
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-slate-200">2. Verify Uber Earnings</h3>
                        <ReclaimButton
                            providerKey="UBER"
                            onSuccess={handleSuccess}
                            onError={(err) => alert(err.message)}
                        />
                    </div>

                </div>

                {verifiedData && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-2 mb-4 text-green-400">
                            <CheckCircle className="w-6 h-6" />
                            <h2 className="text-lg font-bold">Data Verified!</h2>
                        </div>
                        <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-xs text-green-300 font-mono">
                            {JSON.stringify(verifiedData, null, 2)}
                        </pre>
                    </div>
                )}

            </div>
        </div>
    )
}
