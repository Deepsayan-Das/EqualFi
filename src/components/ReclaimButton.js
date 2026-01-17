'use client'
import React, { useState } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import { ShieldCheck, Loader2, Link as LinkIcon } from 'lucide-react'
import { RECLAIM_CONFIG } from '@/config/reclaim'
import QRCode from 'react-qr-code'

const ReclaimButton = ({ providerKey, onSuccess, onError }) => {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('idle') // idle, generating, verifying, verified
    const [requestUrl, setRequestUrl] = useState('')

    const handleVerification = async () => {
        setLoading(true)
        setStatus('generating')

        try {
            const APP_ID = RECLAIM_CONFIG.APP_ID
            const provider = RECLAIM_CONFIG.PROVIDERS[providerKey]

            if (!APP_ID || !provider) {
                console.error('Reclaim Config Missing')
                alert('Configuration Error: Missing App ID or Provider')
                setLoading(false)
                return
            }

            console.log('Initializing Reclaim SDK...', APP_ID)

            const reclaimProofRequest = await ReclaimProofRequest.init(
                APP_ID,
                RECLAIM_CONFIG.APP_SECRET,
                provider.providerId
            )

            const url = await reclaimProofRequest.getRequestUrl()
            console.log('Request URL generated:', url)
            setRequestUrl(url)
            
            setStatus('waiting_for_user')

            // Start the verification session
            await reclaimProofRequest.startSession({
                onSuccess: async (proof) => {
                    console.log('Proof received:', proof)
                    setStatus('verifying_server')
                    
                    // Send to our backend for secure verification
                    try {
                        const response = await fetch('/api/reclaim/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ proof, providerKey })
                        })

                        const result = await response.json()

                        if (result.success) {
                            setStatus('verified')
                            setRequestUrl('') // Hide QR 
                            if (onSuccess) onSuccess(result.data)
                        } else {
                            throw new Error(result.error)
                        }
                    } catch (err) {
                        console.error('Backend Verification Failed:', err)
                        setStatus('error')
                        if (onError) onError(err)
                    } finally {
                        setLoading(false)
                    }
                },
                onFailure: (error) => {
                    console.error('Proof Generation Failed:', error)
                    setStatus('error')
                    setLoading(false)
                    if (onError) onError(error)
                }
            })

        } catch (error) {
            console.error('Reclaim Initialization Error:', error)
            setLoading(false)
            setStatus('error')
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <button
                onClick={handleVerification}
                disabled={loading || status === 'verified'}
                className={`
            flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all w-full
            ${status === 'verified'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    }
            disabled:opacity-70 disabled:cursor-not-allowed
          `}
            >
                {loading && !requestUrl ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === 'verified' ? (
                    <ShieldCheck className="w-5 h-5" />
                ) : (
                    <ShieldCheck className="w-5 h-5" />
                )}

                <span>
                    {loading && status === 'generating' && 'Generating Link...'}
                    {loading && status === 'waiting_for_user' && 'Scan Code Below...'}
                    {loading && status === 'verifying_server' && 'Verifying Proof...'}
                    {!loading && status === 'verified' && 'Verified Successfully'}
                    {!loading && status !== 'verified' && (RECLAIM_CONFIG.PROVIDERS[providerKey]?.label || 'Verify Data')}
                </span>
            </button>

            {/* QR Code Area */}
            {requestUrl && status === 'waiting_for_user' && (
                <div className="bg-white p-4 rounded-xl border border-slate-700 animate-in fade-in zoom-in slide-in-from-top-4">
                    <QRCode value={requestUrl} size={192} />
                    <div className="mt-4 text-center">
                        <p className="text-slate-900 text-sm font-bold mb-2">Scan with your phone</p>
                        <a 
                            href={requestUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs flex items-center justify-center gap-1"
                        >
                            <LinkIcon className="w-3 h-3" />
                            Or click to open manually
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReclaimButton
