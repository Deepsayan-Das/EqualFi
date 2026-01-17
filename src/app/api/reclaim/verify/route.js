import { Reclaim } from '@reclaimprotocol/js-sdk'
import { RECLAIM_CONFIG } from '@/config/reclaim'

const APP_SECRET = process.env.RECLAIM_APP_SECRET

export async function POST(req) {
    try {
        const body = await req.json()
        const { proof, providerKey } = body

        if (!proof || !providerKey) {
            return Response.json({ success: false, error: 'Missing Proof or Provider Key' }, { status: 400 })
        }

        console.log(`Verifying proof for ${providerKey}...`)

        // 1. Verify Verification Correctness
        // Ideally use Reclaim.verifyCorrectness(proof) but we need to initialize it server-side or assume the proof structure is valid signature-wise.
        // The SDK's verifyCorrectness is often used client-side or with init.
        // Server-side, we typically check the signatures manually or use the SDK's helper if available without browser objects.

        // For this implementation, we will use the SDK's methodology:
        // Ensure the proof is signed by Reclaim's witness.

        const isValid = await Reclaim.verifyCorrectness(proof)

        if (!isValid) {
            console.error('Proof verification failed: Invalid Signature')
            return Response.json({ success: false, error: 'Invalid Proof Signature' }, { status: 400 })
        }

        // 2. Extract Data
        // The proof.claimData.context contains the info.
        // The actual extracted parameters are in proof.extractedParameterValues

        const extractedData = proof.extractedParameterValues
        console.log('Verified Data:', extractedData)

        // 3. Transformation (Modular)
        // In a real app, you would use RECLAIM_CONFIG keys to map this data to your DB schema.
        // For now, we return it raw.

        return Response.json({
            success: true,
            data: extractedData
        })

    } catch (error) {
        console.error('Verification Error:', error)
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}
