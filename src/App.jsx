import React, { useState } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink, 
  HelpCircle, 
  Play, 
  RotateCcw, 
  Code2, 
  Zap, 
  MousePointerClick, 
  ListChecks, 
  XCircle,
  FileCode,
  Github
} from 'lucide-react';

const PRESET_SCENARIOS = [
  {
    id: 'auth',
    title: 'JWT Authentication Middleware',
    category: 'Backend Security',
    agentMessage: 'I have implemented the JWT verification middleware in `auth.js` with access token validation and role-based permissions check. The test suite is passing with 100% coverage.',
    question: 'Suggested next steps:',
    isMultiSelect: false,
    options: [
      { text: '(Recommended) Add refresh token rotation and revocation blacklist in Redis', desc: 'Prevents stolen refresh tokens from persisting indefinitely.' },
      { text: 'Add OAuth2 Google / GitHub social login providers', desc: 'Allows users to sign in using their existing identity accounts.' },
      { text: 'Generate OpenAPI / Swagger documentation for auth endpoints', desc: 'Provides interactive API docs and schema validation for clients.' }
    ]
  },
  {
    id: 'bugfix',
    title: 'WebSocket Memory Leak Fix',
    category: 'Bugfix & Reliability',
    agentMessage: 'Resolved the heartbeat listener memory leak in `ws_client.ts`. Event listeners are now safely cleaned up inside `connection.on("close")`. Verified with 10,000 reconnect cycles.',
    question: 'Suggested next steps:',
    isMultiSelect: true,
    options: [
      { text: '(Recommended) Add automated regression test for reconnect memory profiles', desc: 'Locks in heap-dump memory assertions in GitHub Actions CI.' },
      { text: 'Deploy fix to staging canary environment for telemetry check', desc: 'Validates live connection stability under real client traffic.' },
      { text: 'Update changelog and tag patch release v1.4.2', desc: 'Bumps the package version and publishes updated release notes.' }
    ]
  },
  {
    id: 'schema',
    title: 'PostgreSQL Vector Search Migration',
    category: 'Database & AI',
    agentMessage: 'Created Prisma migration `20261117_pgvector` adding the `HNSW` vector index on `document_embeddings.vector` (1536 dims). Cosine similarity queries now execute in under 12ms.',
    question: 'Suggested next steps:',
    isMultiSelect: false,
    options: [
      { text: '(Recommended) Implement hybrid search combining pgvector with BM25 keyword matching', desc: 'Improves retrieval quality for rare entity queries.' },
      { text: 'Add chunking batch pipeline for bulk PDF ingestion', desc: 'Processes large document libraries with background worker queue.' },
      { text: 'Set up automated embedding caching layer', desc: 'Reduces OpenAI API costs for frequently queried prompt texts.' }
    ]
  }
];

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState(PRESET_SCENARIOS[0]);
  const [selectedOptions, setSelectedOptions] = useState([0]); // Default select recommended
  const [isMulti, setIsMulti] = useState(false);
  const [simulatorState, setSimulatorState] = useState('active'); // 'active', 'submitted', 'skipped'
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [activeTab, setActiveTab] = useState('rule'); // 'rule', 'skill', 'manifest'
  const [copiedCode, setCopiedCode] = useState(false);

  const handleScenarioChange = (scenario) => {
    setSelectedScenario(scenario);
    setIsMulti(scenario.isMultiSelect);
    setSelectedOptions([0]);
    setSimulatorState('active');
    setSubmittedMessage('');
  };

  const toggleOption = (idx) => {
    if (simulatorState !== 'active') return;
    if (isMulti) {
      if (selectedOptions.includes(idx)) {
        setSelectedOptions(selectedOptions.filter(i => i !== idx));
      } else {
        setSelectedOptions([...selectedOptions, idx]);
      }
    } else {
      setSelectedOptions([idx]);
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;
    const chosen = selectedOptions.map(i => selectedScenario.options[i].text);
    setSimulatorState('submitted');
    setSubmittedMessage(`Acknowledged! Proceeding with: ${chosen.join(' AND ')}.`);
  };

  const handleSkip = () => {
    setSimulatorState('skipped');
    setSubmittedMessage('Understood! Task successfully completed. Concluding turn without further action.');
  };

  const handleReset = () => {
    setSimulatorState('active');
    setSelectedOptions([0]);
    setSubmittedMessage('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
              <ChevronRight className="w-5 h-5 text-indigo-400 stroke-[3]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">Next Steps</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  v1.1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">For Google Antigravity AI Agent</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="#simulator" className="hover:text-indigo-300 transition-colors">Simulator</a>
            <a href="#principles" className="hover:text-indigo-300 transition-colors">Protocol Rules</a>
            <a href="#reference" className="hover:text-indigo-300 transition-colors">Skill Reference</a>
            <a href="#install" className="hover:text-indigo-300 transition-colors">Installation</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a 
              href="https://github.com/Domush/antigravity-plugin-suggest-next-steps" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 text-sm font-medium transition-all"
            >
              <Github className="w-4 h-4 text-indigo-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[200px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Official Google Antigravity Plugin
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Turn Every Task Completion Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-sky-400 bg-clip-text text-transparent">
              Immediate Momentum
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Never get stranded at the end of a turn wondering what to prompt next. 
            <span className="text-white font-medium"> Next Steps Suggester</span> prompts your agent to present at least 2 logical, context-aware options as interactive prompt chips using Antigravity’s native <code className="text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded text-sm font-mono">ask_question</code> UI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a 
              href="#simulator" 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Try Interactive Simulator
            </a>
            <a 
              href="#principles" 
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold transition-all hover:bg-slate-800/60 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              Explore Protocol Rules
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-indigo-400 font-bold text-2xl mb-1 flex items-center gap-1.5">
                <MousePointerClick className="w-5 h-5" />
                1-Click
              </div>
              <div className="text-xs text-slate-400 font-medium">Native clickable prompt chips in chat</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-purple-400 font-bold text-2xl mb-1 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5" />
                (Recommended)
              </div>
              <div className="text-xs text-slate-400 font-medium">Clear prioritization on strongest path</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-emerald-400 font-bold text-2xl mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5" />
                Subagent-Safe
              </div>
              <div className="text-xs text-slate-400 font-medium">Zero prompt noise from workers</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-sky-400 font-bold text-2xl mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" />
                Graceful Skip
              </div>
              <div className="text-xs text-slate-400 font-medium">Clean turn exit without nagging</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator" className="py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              Live Interactive Simulator
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
              Experience the Turn-Ending Flow
            </h2>
            <p className="text-slate-400 text-sm">
              Select a scenario below to see how Antigravity summarizes candidate steps in chat, renders interactive selection cards, and handles user decisions or skips.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {PRESET_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleScenarioChange(sc)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedScenario.id === sc.id 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>

          {/* Interactive Chat Window */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden max-w-3xl mx-auto">
            {/* Window Chrome */}
            <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-2 font-mono text-[11px] text-slate-400">Antigravity Chat Session</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                  Mode: {isMulti ? 'Multi-Select' : 'Single-Select'}
                </span>
                <button 
                  onClick={handleReset} 
                  className="hover:text-white flex items-center gap-1 transition-colors"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-6 space-y-6">
              {/* Agent Completed Task Output */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex-shrink-0 flex items-center justify-center text-indigo-400 font-bold text-xs">
                  AG
                </div>
                <div className="flex-1 space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 text-sm leading-relaxed text-slate-200">
                    <p className="font-semibold text-white mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Task Completed: {selectedScenario.title}
                    </p>
                    <p className="text-slate-300 mb-3">{selectedScenario.agentMessage}</p>
                    
                    <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                      <p className="font-semibold text-slate-300">Context Summary of Candidate Next Steps:</p>
                      {selectedScenario.options.map((opt, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="text-indigo-400 font-mono">•</span>
                          <span><strong className="text-slate-200">{opt.text}:</strong> {opt.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ask_question Interactive Card */}
                  {simulatorState === 'active' && (
                    <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between text-xs text-indigo-300 font-medium">
                        <span className="flex items-center gap-1.5">
                          <HelpCircle className="w-4 h-4 text-indigo-400" />
                          {selectedScenario.question}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {isMulti ? 'Select all that apply' : 'Choose one option'}
                        </span>
                      </div>

                      {/* Interactive Option Chips */}
                      <div className="space-y-2">
                        {selectedScenario.options.map((opt, idx) => {
                          const isSelected = selectedOptions.includes(idx);
                          const isRec = opt.text.includes('(Recommended)');
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleOption(idx)}
                              className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-3 select-none ${
                                isSelected 
                                  ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-sm shadow-indigo-500/10' 
                                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all ${
                                isSelected ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-slate-700 bg-slate-900'
                              } ${isMulti ? 'rounded' : 'rounded-full'}`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <div className="flex-1">
                                <span className={`font-medium ${isRec ? 'text-indigo-300' : 'text-slate-200'}`}>
                                  {opt.text}
                                </span>
                                <p className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Card Action Controls */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={handleSkip}
                          className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-all"
                        >
                          Skip / Conclude Turn
                        </button>

                        <button
                          onClick={handleSubmit}
                          disabled={selectedOptions.length === 0}
                          className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            selectedOptions.length > 0 
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20' 
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <span>Confirm Selection ({selectedOptions.length})</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Simulator State: Submitted */}
                  {simulatorState === 'submitted' && (
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 space-y-2 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold flex items-center gap-1.5 text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          User Selection Received
                        </span>
                        <button onClick={handleReset} className="text-slate-400 hover:text-white underline text-[11px]">
                          Try another selection
                        </button>
                      </div>
                      <p className="text-slate-300 font-mono text-[11px] bg-slate-950/60 p-2 rounded border border-emerald-500/20">
                        {submittedMessage}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        The agent immediately proceeds with the selected task without requiring you to re-type instructions.
                      </p>
                    </div>
                  )}

                  {/* Simulator State: Skipped */}
                  {simulatorState === 'skipped' && (
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                          <XCircle className="w-4 h-4 text-slate-400" />
                          Prompt Skipped by User
                        </span>
                        <button onClick={handleReset} className="text-indigo-400 hover:underline text-[11px]">
                          Reset prompt
                        </button>
                      </div>
                      <p className="text-slate-300 font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800">
                        {submittedMessage}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Zero nag policy: The agent respects the user's skip and refrains from sending redundant follow-ups.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Principles */}
      <section id="principles" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
              The 5 Immutable Next-Steps Principles
            </h2>
            <p className="text-slate-400 text-base">
              Engineered into Antigravity’s core rule engine to ensure next-step suggestions are always helpful, non-intrusive, and mathematically prioritized.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Fulfill First Mandate</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Never propose next steps mid-task or in place of finishing requested work. The agent must fully complete all code changes, test executions, and explanations before initiating suggestions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ListChecks className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Context in Chat</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Always outline candidate options and their rationales directly in markdown response text before invoking the tool, ensuring you know exactly what each chip does before clicking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. (Recommended) Priority</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                The single most logical continuation (such as running test suites, staging deployments, or adding error handlers) is clearly labeled with <code className="text-indigo-300">(Recommended)</code>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Subagent Isolation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Scoped strictly to the primary root assistant. Background subagents, researchers, and tool workers are strictly forbidden from calling question prompts directly to avoid context clutter.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">5. Respectful Skip</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                If you skip or provide no answer, the agent treats this as confirmation that no further work is needed and gracefully concludes the turn without prompting again.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Multi-Select Support</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Supports <code className="text-indigo-300">is_multi_select: true</code> when multiple actions can be batched together, such as committing, tagging, and deploying at once.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code & Reference Section */}
      <section id="reference" className="py-16 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Plugin Specifications</h2>
              <p className="text-sm text-slate-400">Inspect the exact rules, skill definition, and manifest packaged in the plugin.</p>
            </div>

            {/* Tab Controls */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveTab('rule')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'rule' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                AGENTS.md
              </button>
              <button
                onClick={() => setActiveTab('skill')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'skill' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                SKILL.md
              </button>
              <button
                onClick={() => setActiveTab('manifest')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'manifest' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                plugin.json
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative shadow-xl">
            <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px] text-slate-300">
                {activeTab === 'rule' && 'rules/AGENTS.md'}
                {activeTab === 'skill' && 'skills/suggest-next-steps/SKILL.md'}
                {activeTab === 'manifest' && 'plugin.json'}
              </span>
              <button
                onClick={() => {
                  const content = activeTab === 'rule' 
                    ? `# Next Steps Suggestion Protocol\n\nApply this protocol only as the primary assistant communicating directly with the user. Subagents must never call ask_question or propose next steps.\n\n1. Complete Request First\n2. Context & Summary in Chat\n3. Tool Invocation (at least 2 options, (Recommended) prefix)\n4. Handling Skip`
                    : activeTab === 'skill'
                    ? `name: suggest-next-steps\ndescription: Best practices for proposing proactive next steps using interactive prompt cards.`
                    : `{\n  "name": "antigravity-plugin-suggest-next-steps",\n  "version": "1.1.0"\n}`;
                  copyToClipboard(content);
                }}
                className="hover:text-white flex items-center gap-1 transition-colors text-xs"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-5 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[380px]">
              {activeTab === 'rule' && (
`# Next Steps Suggestion Protocol

Apply this protocol only as the primary assistant communicating directly with the user. 
Subagents must never call ask_question or propose next steps; communicate only with the 
calling agent via send_message.

## Requirements

1. Complete the Request First:
   Fully complete the user's immediate request, code changes, or answers before proposing
   next steps. Never offer next steps mid-task or in place of finishing requested work.

2. Context & Summary in Chat:
   Summarize the proposed next steps in your text response before invoking the tool.
   Clearly explain what each option does and why it is useful so the user has full context.

3. Tool Invocation:
   Present at least 2 concrete, actionable options using ask_question:
   - Set is_multi_select: true when options can be selected together, or false for single-choice.
   - Prefix the primary continuation with (Recommended).
   - Do not call ask_question if a clarifying question was already asked to finish the current task.

4. Handling Skip:
   If the user skips or does not answer, treat this as confirmation that no further actions
   are desired and conclude the turn without reprompting.`
              )}

              {activeTab === 'skill' && (
`---
name: suggest-next-steps
description: Best practices and instructions for proposing proactive, high-value next steps using interactive chat selection cards.
---

# Next Steps Suggester Skill

This skill guides the formulation of actionable, high-impact suggestions presented at 
the conclusion of conversation turns.

## Scope & Subagent Restrictions
- Primary Agent Only: This skill and the ask_question next-steps pattern must only ever
  be executed by the top-level / primary assistant talking directly to the user.
- Subagents & Worker Agents: Subagents must never call ask_question or propose next steps.

## Workflow
1. Complete Initial Work: Finish all requested tasks, file changes, and explanations first.
2. Summarize Options in Text: Outline candidate next steps and explain why each is useful.
3. Present Prompt Chips: Call ask_question with at least 2 concise options.
4. Respect Skips: If user skips, conclude immediately without follow-up prompts.`
              )}

              {activeTab === 'manifest' && (
`{
  "name": "antigravity-plugin-suggest-next-steps",
  "displayName": "Next Steps Suggester",
  "description": "Displays interactive prompt cards proposing at least 2 logical next steps at the end of completed turns.",
  "version": "1.1.0",
  "author": "Phillip Webber <github@webbsense.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/Domush/antigravity-plugin-suggest-next-steps.git"
  },
  "homepage": "https://domush.github.io/antigravity-plugin-suggest-next-steps/",
  "logo": "assets/icon.svg",
  "suggestedPrompts": [
    "What should we work on next?",
    "Review recent changes and suggest next steps",
    "Propose a roadmap for this project"
  ]
}`
              )}
            </pre>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
              Installation & Configuration
            </h2>
            <p className="text-slate-400 text-sm">
              Deploy Next Steps Suggester into your local Google Antigravity setup in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Method 1: Local Plugin Directory */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Local Plugin Directory</h3>
                  <p className="text-xs text-slate-400">Recommended for personal Antigravity setup</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Clone into your Antigravity user plugins directory. Antigravity discovers and registers it automatically:
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 flex items-center justify-between">
                <span>git clone https://github.com/Domush/antigravity-plugin-suggest-next-steps.git ~/.gemini/config/plugins/suggest-next-steps</span>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p>• Automatically loaded across all your Antigravity chats.</p>
                <p>• Toggle on/off anytime from Customizations &gt; Plugins.</p>
              </div>
            </div>

            {/* Method 2: npm Release */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">npm Release Workflow</h3>
                  <p className="text-xs text-slate-400">Automated CI/CD via GitHub Actions</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Includes automated release CI via <code className="text-purple-300">.github/workflows/publish.yml</code>. Tag a version to test and publish to npm with provenance:
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                <span>git tag v1.1.0 && git push origin v1.1.0</span>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p>• Automated Node 22 test runner verification.</p>
                <p>• OIDC provenance signing on npm registry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-md bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span>Antigravity Next Steps Suggester • MIT License</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <a 
              href="https://github.com/Domush/antigravity-plugin-suggest-next-steps" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub Repository
            </a>
            <a 
              href="https://github.com/Domush" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              @Domush
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
