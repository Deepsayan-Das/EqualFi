// src/app/api/db/[method]/route.ts
import { NextResponse } from 'next/server';
import { getAdminWallet } from '@/lib/server/adminWallet';
import { in_memory_db } from '@/lib/weilliptic/bindings';

export async function POST(
  req: Request,
  context: { params: Promise<{ method: string }> } // 👈 params is now a Promise
) {
  try {
    const body = await req.json();
    
    // 1. Await the params before accessing properties
    const { method } = await context.params; // 👈 FIX: Await here

    // 2. Load Admin Wallet & Contract
    const adminWallet = getAdminWallet();
    const contractAddr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (!contractAddr) throw new Error("Missing Contract Address");

    const db = in_memory_db(adminWallet, contractAddr);

    // 3. Dispatch to correct method
    console.log(`[DB API] Calling method: ${method}`);

    // We cast db to 'any' to allow dynamic access by string name
    const dbAny = db as any;

    if (typeof dbAny[method] !== 'function') {
      return NextResponse.json({ error: `Method '${method}' not found` }, { status: 400 });
    }

    let result;

    // 4. Execute
    switch (method) {
      case 'create_table':
      case 'drop_table':
      case 'table_size':
        result = await dbAny[method](body.table_name || body.table); 
        break;
      
      case 'list_tables':
        result = await db.list_tables();
        break;

      case 'insert':
      case 'update':
        result = await dbAny[method](body.table, body.key, body.field, body.value);
        break;

      case 'get_value':
      case 'remove_field':
        result = await dbAny[method](body.table, body.key, body.field);
        break;

      case 'remove_record':
      case 'get_all_fields':
        result = await dbAny[method](body.table, body.key);
        break;

      case 'insert_record':
        result = await db.insert_record(body.table, body.key, body.fields);
        break;

      case 'insert_records':
        result = await db.insert_records(body.table, body.records);
        break;

      case 'get_fields':
        result = await db.get_fields(body.table, body.key, body.fields);
        break;

      default:
        return NextResponse.json({ error: "Method mapping not implemented" }, { status: 501 });
    }

    return NextResponse.json({ success: true, result });

  } catch (error: any) {
    console.error(`[DB API Error] ${error.message}`);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}