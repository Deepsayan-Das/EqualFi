'use client'
import React from 'react'
import { CursorFollower } from "@/components/ui/CustomCursor";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import Navbar from "@/components/ui/Navbar";
import { useLenis } from "@/hooks/useLenis";
import { 
  Book, 
  Terminal, 
  Shield, 
  Cpu, 
  Zap, 
  Database, 
  Layers, 
  Code, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function Docs() {
  useLenis();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(120,160,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.07)_1px,transparent_1px)] before:bg-size-[40px_40px] before:opacity-40 before:pointer-events-none">
      
      {/* Navbar Wrapper to ensure it sits above the background */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-20 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-xs font-bold uppercase tracking-widest mb-4">
            <Book className="w-3 h-3" /> Knowledge Base
          </div>
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(180deg, #78a0ff 0%, #4d7fd9 50%, #2d5a8f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(120,160,255,0.5)',
            }}
          >
            EqualFi Documentation
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Technical resources for the decentralized credit intelligence platform.
          </p>
        </div>
        
        <div className="space-y-12">
          
          {/* Introduction */}
          <section id="introduction" className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-blue-500/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg"><Layers className="w-5 h-5 text-blue-400" /></div>
              Introduction
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                EqualFi is a cutting-edge financial intelligence platform designed to democratize credit access for India's digital workforce. 
                We leverage <span className="text-blue-400 font-medium">agentic AI</span>, blockchain technology, and secure data orchestration to provide fair, transparent credit evaluations 
                for gig workers, freelancers, and first-time earners who are often excluded by traditional banking systems.
              </p>
              <p>
                Our platform converts real-world digital earnings into trustworthy, explainable credit decisions without compromising 
                user privacy. Powered by Weilliptic's MCP (Multi-Chain Protocol) and WeilChain blockchain, EqualFi ensures 
                auditability and security while maintaining data privacy.
              </p>
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started">
            <h2 className="text-2xl font-bold mb-6 text-white pl-2 border-l-4 border-blue-500">Getting Started</h2>
            <div className="grid gap-6">
              {[
                { title: "Connect Your Wallet", desc: "Use the Wallet Connect button on the homepage to link your Web3 wallet. This enables secure, decentralized authentication." },
                { title: "Complete Your Profile", desc: "Navigate to the Info page to fill out your financial profile including income sources, account age, and expenses." },
                { title: "Access Your Dashboard", desc: "Once your profile is complete, visit the Dashboard to view your credit score and personalized financial insights." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start bg-slate-900/30 p-6 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold border border-blue-500/30">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl border border-blue-500/20 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg"><Cpu className="w-5 h-5 text-purple-400" /></div>
              How It Works
            </h2>
            <p className="text-slate-400 mb-6">
              EqualFi simplifies credit access through a 3-step process that leverages your digital financial behavior:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="text-blue-400 font-bold mb-2">01. Data Collection</div>
                <p className="text-sm text-slate-400">Securely gather and analyze your digital income patterns and consistency through MCP data orchestration.</p>
              </div>
              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="text-blue-400 font-bold mb-2">02. AI Analysis</div>
                <p className="text-sm text-slate-400">Agentic AI evaluates creditworthiness using income frequency, account age, and expense patterns.</p>
              </div>
              <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800">
                <div className="text-blue-400 font-bold mb-2">03. Instant Results</div>
                <p className="text-sm text-slate-400">Receive immediate credit scores and loan eligibility insights with transparent explanations.</p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features">
            <h2 className="text-2xl font-bold mb-6 text-white pl-2 border-l-4 border-blue-500">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "AI Credit Scoring", icon: <Cpu className="w-4 h-4" />, desc: "Advanced machine learning algorithms analyze your financial behavior to generate behavior-driven scores." },
                { title: "Real-time Analysis", icon: <Zap className="w-4 h-4" />, desc: "Instant credit evaluations with live updates as your financial data changes." },
                { title: "Secure Processing", icon: <Shield className="w-4 h-4" />, desc: "End-to-end encryption and blockchain-based auditability ensure your data remains private." },
                { title: "Multi-Agent System", icon: <Layers className="w-4 h-4" />, desc: "Distributed AI agents work together to provide comprehensive financial insights." },
                { title: "Instant Approvals", icon: <CheckCircle className="w-4 h-4" />, desc: "Rapid loan eligibility assessments with immediate results and clear explanations." },
                { title: "Smart Recommendations", icon: <ArrowRight className="w-4 h-4" />, desc: "Personalized financial advice based on your credit profile and goals." },
              ].map((feature, idx) => (
                <div key={idx} className="bg-slate-900/50 p-6 rounded-xl border border-blue-500/10 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all group">
                  <h3 className="font-bold mb-2 text-white flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    {feature.icon} {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference">
            <div className="bg-slate-900/80 backdrop-blur-xl p-1 rounded-2xl border border-slate-700 shadow-2xl">
              <div className="bg-slate-950 rounded-xl p-8 border border-slate-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  <Terminal className="w-6 h-6 text-green-400" />
                  API Reference
                </h2>
                
                <div className="space-y-8">
                  {/* Endpoint 1 */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">POST</span>
                      <code className="text-slate-300 font-mono text-sm">/api/credit/get_score</code>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">Calculates credit score based on financial parameters.</p>
                    
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Parameters</h4>
                      <div className="grid gap-2 text-sm font-mono">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-purple-400">account_age_months</span>
                          <span className="text-slate-500">number</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-purple-400">monthly_income_avg</span>
                          <span className="text-slate-500">number</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-purple-400">missed_payments</span>
                          <span className="text-slate-500">number</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Endpoint 2 */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">POST</span>
                      <code className="text-slate-300 font-mono text-sm">/api/db/[method]</code>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">Blockchain-based database operations for secure data storage.</p>
                    
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Available Methods</h4>
                      <div className="flex flex-wrap gap-2 font-mono text-xs">
                         {['create_table', 'insert', 'update', 'query', 'list_tables'].map(method => (
                           <span key={method} className="px-2 py-1 bg-slate-800 text-green-400 rounded border border-slate-700">{method}</span>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Support */}
          <section id="support" className="text-center py-8 border-t border-slate-800">
            <h2 className="text-xl font-bold mb-4 text-white">Support & Resources</h2>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto mb-6">
              For technical support, API documentation, or questions about EqualFi, please visit our GitHub repository 
              or contact our development team.
            </p>
            <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700">
              Contact Developer Team
            </button>
          </section>

        </div>
      </div>
    </div>
  )
}