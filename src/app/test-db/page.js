// src/app/test-db/page.js
'use client';
import { useState } from 'react';
import { useUserWallet } from '@/hooks/useUserWallet';

// --- CONFIG ---
const TEST_TABLE = "test_table_v1";
const API_BASE = "/api/db";

export default function DbTestPage() {
  const { address, status, connect } = useUserWallet();
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // --- LOGGING HELPER ---
  const log = (msg, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${msg}`;
    console.log(entry); // Console log as requested
    setLogs(prev => [{ text: entry, type }, ...prev]);
  };

  // --- API CALLER HELPER ---
  // This matches the Universal API Route we built: /api/db/[method]
  const callApi = async (method, body) => {
    try {
      const res = await fetch(`${API_BASE}/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      
      if (!data.success) throw new Error(data.error || "Unknown API Error");
      return data.result;
    } catch (err) {
      log(`❌ ${method} Failed: ${err.message}`, 'error');
      throw err;
    }
  };

  // --- 1. TABLE OPERATIONS ---
  
  const createTable = async () => {
    log(`Creating table '${TEST_TABLE}'...`);
    await callApi('create_table', { table_name: TEST_TABLE });
    log(`✅ Table '${TEST_TABLE}' created.`, 'success');
  };

  const listTables = async () => {
    log("Fetching table list...");
    const tables = await callApi('list_tables', {});
    log(`✅ Tables found: ${JSON.stringify(tables)}`, 'success');
  };

  const dropTable = async () => {
    log(`Dropping table '${TEST_TABLE}'...`);
    await callApi('drop_table', { table_name: TEST_TABLE });
    log(`✅ Table '${TEST_TABLE}' dropped.`, 'success');
  };

  const tableSize = async () => {
    log(`Checking size of '${TEST_TABLE}'...`);
    const size = await callApi('table_size', { table_name: TEST_TABLE });
    log(`✅ Size: ${size}`, 'success');
  };

  // --- 2. SINGLE RECORD OPERATIONS ---

  const insertSingle = async () => {
    if (!address) return alert("Connect Wallet first (need address as key)");
    log(`Inserting: Key=${address}, Field=role, Value=tester`);
    await callApi('insert', { 
      table: TEST_TABLE, 
      key: address, 
      field: "role", 
      value: "tester" 
    });
    log("✅ Insert successful.", 'success');
  };

  const updateSingle = async () => {
    if (!address) return;
    log(`Updating: Key=${address}, Field=role, Value=super_admin`);
    await callApi('update', { 
      table: TEST_TABLE, 
      key: address, 
      field: "role", 
      value: "super_admin" 
    });
    log("✅ Update successful.", 'success');
  };

  const getValue = async () => {
    if (!address) return;
    log(`Reading: Key=${address}, Field=role`);
    const val = await callApi('get_value', { 
      table: TEST_TABLE, 
      key: address, 
      field: "role" 
    });
    log(`✅ Retrieved Value: ${val}`, 'success');
  };

  const removeField = async () => {
    if (!address) return;
    log(`Removing Field: Key=${address}, Field=role`);
    await callApi('remove_field', { 
      table: TEST_TABLE, 
      key: address, 
      field: "role" 
    });
    log("✅ Field removed.", 'success');
  };

  // --- 3. BATCH & ADVANCED OPERATIONS ---

  const insertRecord = async () => {
    if (!address) return;
    const fields = [["email", "test@weil.com"], ["age", "25"]];
    log(`Insert Record (Batch Fields): ${JSON.stringify(fields)}`);
    
    await callApi('insert_record', {
      table: TEST_TABLE,
      key: address,
      fields: fields
    });
    log("✅ Insert Record successful.", 'success');
  };

  const getFields = async () => {
    if (!address) return;
    const reqFields = ["email", "age"];
    log(`Getting specific fields: ${reqFields.join(", ")}`);
    
    const res = await callApi('get_fields', {
      table: TEST_TABLE,
      key: address,
      fields: reqFields
    });
    log(`✅ Got Fields: ${JSON.stringify(res)}`, 'success');
  };

  const getAllFields = async () => {
    if (!address) return;
    log(`Getting ALL fields for Key=${address}`);
    const res = await callApi('get_all_fields', { table: TEST_TABLE, key: address });
    log(`✅ All Fields: ${JSON.stringify(res)}`, 'success');
  };

  const removeRecord = async () => {
    if (!address) return;
    log(`Removing ENTIRE record for Key=${address}`);
    await callApi('remove_record', { table: TEST_TABLE, key: address });
    log("✅ Record removed.", 'success');
  };

  // --- 4. FULL SYSTEM CHECK (THE BIG BUTTON) ---
  const runFullCheck = async () => {
    if (!address) return alert("Please connect wallet first");
    setIsRunning(true);
    setLogs([]); // Clear logs
    log("🚀 STARTING FULL SYSTEM DIAGNOSTIC...", 'info');

    try {
      // 1. Clean Slate
      try { await callApi('drop_table', { table_name: TEST_TABLE }); } catch (e) {}
      
      // 2. Lifecycle
      await createTable();
      await insertSingle();  // writes 'role': 'tester'
      await updateSingle();  // updates 'role': 'super_admin'
      await insertRecord();  // adds 'email', 'age'
      await tableSize();     // should be > 0
      
      // 3. Reads
      const val = await callApi('get_value', { table: TEST_TABLE, key: address, field: "role" });
      if (val !== "super_admin") throw new Error(`Verification Failed! Expected 'super_admin', got '${val}'`);
      log("🔍 Verification passed: Role is super_admin", 'success');

      await getAllFields();

      // 4. Cleanup
      await removeRecord();
      await dropTable();

      log("🎉 FULL DIAGNOSTIC PASSED SUCCESSFULLY!", 'success');
    } catch (err) {
      log("⛔ DIAGNOSTIC FAILED. See logs above.", 'error');
    } finally {
      setIsRunning(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🛠 DB Diagnostic Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Target Table: <span className="bg-gray-100 px-2 py-0.5 rounded text-blue-600">{TEST_TABLE}</span></p>
          </div>
          
          <div>
            {status === 'connected' ? (
              <div className="text-right">
                <p className="text-xs text-green-600 font-bold uppercase">Wallet Connected</p>
                <p className="text-sm font-bold">{address.slice(0, 6)}...{address.slice(-4)}</p>
              </div>
            ) : (
              <button onClick={connect} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Connect Wallet to Test
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: CONTROLS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Auto Runner */}
            <div className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
              <h3 className="font-bold mb-3">🚀 Auto-Pilot</h3>
              <button 
                onClick={runFullCheck} 
                disabled={isRunning || !address}
                className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {isRunning ? "Running..." : "Run Full System Check"}
              </button>
            </div>

            {/* Manual Controls */}
            <div className="bg-white p-4 rounded shadow space-y-4">
              <h3 className="font-bold text-gray-700 border-b pb-2">Table Ops</h3>
              <div className="grid grid-cols-2 gap-2">
                <Btn onClick={createTable} label="Create Table" />
                <Btn onClick={dropTable} label="Drop Table" color="red" />
                <Btn onClick={listTables} label="List Tables" />
                <Btn onClick={tableSize} label="Get Size" />
              </div>

              <h3 className="font-bold text-gray-700 border-b pb-2 mt-4">CRUD (Single)</h3>
              <div className="grid grid-cols-2 gap-2">
                <Btn onClick={insertSingle} label="Insert (Role)" />
                <Btn onClick={updateSingle} label="Update (Role)" />
                <Btn onClick={getValue} label="Get (Role)" />
                <Btn onClick={removeField} label="Del Field" color="red" />
              </div>

              <h3 className="font-bold text-gray-700 border-b pb-2 mt-4">Advanced</h3>
              <div className="grid grid-cols-2 gap-2">
                <Btn onClick={insertRecord} label="Insert Record" />
                <Btn onClick={removeRecord} label="Del Record" color="red" />
                <Btn onClick={getFields} label="Get Fields" />
                <Btn onClick={getAllFields} label="Get All Fields" />
              </div>
            </div>
          </div>

          {/* RIGHT: LOGS */}
          <div className="lg:col-span-2 flex flex-col h-[600px] bg-gray-900 rounded-lg shadow overflow-hidden border border-gray-800">
            <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
              <span className="text-gray-400 text-xs">TERMINAL OUTPUT</span>
              <button onClick={() => setLogs([])} className="text-xs text-gray-400 hover:text-white">Clear</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-sm">
              {logs.length === 0 && <p className="text-gray-600 italic">Ready for commands...</p>}
              {logs.map((log, i) => (
                <div key={i} className={`${
                  log.type === 'error' ? 'text-red-400' : 
                  log.type === 'success' ? 'text-green-400' : 
                  'text-blue-300'
                }`}>
                  {log.text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Simple Button Component for cleaner JSX
function Btn({ onClick, label, color = "gray" }) {
  const base = "px-3 py-2 text-xs font-medium rounded transition ";
  const styles = color === "red" 
    ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" 
    : "bg-gray-50 text-gray-700 hover:bg-gray-200 border border-gray-200";
    
  return <button onClick={onClick} className={base + styles}>{label}</button>;
}