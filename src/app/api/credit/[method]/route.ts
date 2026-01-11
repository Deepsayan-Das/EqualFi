// src/app/api/credit/[method]/route.ts
import { NextResponse } from 'next/server';
import { getAdminWallet } from '@/lib/server/adminWallet'; // Reusing your existing secure wallet loader
import { credit_score } from '@/lib/weilliptic/creditBindings';

export async function POST(
  req: Request,
  context: { params: Promise<{ method: string }> }
) {
  try {
    const body = await req.json();
    // Await params as required in Next.js 15+
    const { method } = await context.params;

    // 1. Load Admin Wallet (Server Side Security)
    const adminWallet = getAdminWallet();
    
    // 2. Load Contract Address
    const contractAddr = process.env.NEXT_PUBLIC_CREDIT_CONTRACT_ADDRESS;
    if (!contractAddr) throw new Error("Server Error: Missing Credit Contract Address");

    // 3. Initialize the Binding
    const contract = credit_score(adminWallet, contractAddr);

    console.log(`[Credit API] Calling method: ${method}`);

    let result;

    // 4. Map Methods and Arguments
    switch (method) {
      case 'get_score':
        // Validation: Ensure all required fields exist
        if (
          body.account_age_months === undefined || 
          body.monthly_income_avg === undefined ||
          body.income_frequency === undefined ||
          body.monthly_rent === undefined ||
          body.monthly_utilities === undefined ||
          body.missed_payments_count === undefined
        ) {
          return NextResponse.json({ success: false, error: "Missing required parameters for get_score" }, { status: 400 });
        }

        // Execute Contract Call
        result = await contract.get_score(
          Number(body.account_age_months),
          Number(body.monthly_income_avg),
          String(body.income_frequency),
          Number(body.monthly_rent),
          Number(body.monthly_utilities),
          Number(body.missed_payments_count)
        );
        break;

      default:
        return NextResponse.json({ success: false, error: `Method '${method}' not implemented` }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });

  } catch (error: any) {
    console.error(`[Credit API Error] ${error.message}`);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}