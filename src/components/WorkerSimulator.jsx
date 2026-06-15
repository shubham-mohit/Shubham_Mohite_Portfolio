import React, { useState, useRef, useEffect } from "react";
import { Cpu, Zap, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";

export default function WorkerSimulator() {
  const [primesCount, setPrimesCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [threadMode, setThreadMode] = useState("none");
  const [statusMessage, setStatusMessage] = useState("System idle. Ready for calculation.");
  const [calculationTime, setCalculationTime] = useState(null);

  // Realtime counter to test UI responsiveness
  const [testCounter, setTestCounter] = useState(0);
  const [counterActive, setCounterActive] = useState(true);

  // HTML5 Web Worker reference
  const workerRef = useRef(null);

  // Counter loop to prove main thread responsiveness
  useEffect(() => {
    let interval;
    if (counterActive) {
      interval = setInterval(() => {
        setTestCounter((prev) => (prev + 1) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [counterActive]);

  // Handle building Worker dynamically
  useEffect(() => {
    // We construct the worker code from a blob so it requires no external file
    const workerBlobCode = `
      self.onmessage = function(e) {
        const limit = e.data;
        const startTime = performance.now();

        let count = 0;
        // Heavy computational calculation
        for (let i = 2; i <= limit; i++) {
          let isPrime = true;
          for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
              isPrime = false;
              break;
            }
          }
          if (isPrime) count++;
        }

        const endTime = performance.now();
        self.postMessage({ primesCount: count, duration: endTime - startTime });
      };
    `;
    const blob = new Blob([workerBlobCode], { type: "application/javascript" });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    worker.onmessage = (e) => {
      const { primesCount: count, duration } = e.data;
      setPrimesCount(count);
      setCalculationTime(Math.round(duration));
      setLoading(false);
      setStatusMessage(`Task complete via Worker! Calculated ${count.toLocaleString()} prime numbers.`);
    };

    workerRef.current = worker;

    return () => {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
    };
  }, []);

  // Synchronous calculation blocking UI thread
  const runOnMainThread = () => {
    setLoading(true);
    setThreadMode("main");
    setStatusMessage("Calculating on Main Thread... EXPECT FOT FREEZING OF UI INDICATOR");
    setCalculationTime(null);
    setPrimesCount(null);

    // Give browser a short cycle to paint initial state before locking up
    setTimeout(() => {
      const startTime = performance.now();
      const limit = 4500000; // Large enough prime calculation to freeze browser but not crash

      let count = 0;
      for (let i = 2; i <= limit; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
          if (i % j === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) count++;
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      setPrimesCount(count);
      setCalculationTime(Math.round(duration));
      setLoading(false);
      setStatusMessage(`Completed on Main Thread! Calculated ${count.toLocaleString()} primes.`);
    }, 100);
  };

  // Asynchronous calculation in background Worker Thread
  const runInWorker = () => {
    if (!workerRef.current) return;
    setLoading(true);
    setThreadMode("worker");
    setStatusMessage("Calculating inside isolated background Worker Thread...");
    setCalculationTime(null);
    setPrimesCount(null);

    // Send standard calculation to worker
    workerRef.current.postMessage(4500000);
  };

  const resetAll = () => {
    setPrimesCount(null);
    setLoading(false);
    setThreadMode("none");
    setCalculationTime(null);
    setStatusMessage("System idle. Ready for calculation.");
  };

  return (
    <div id="worker-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-indigo transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="font-display font-medium text-lg text-slate-100 flex items-center gap-2">
            <Cpu className="text-indigo-400 w-5 h-5 animate-pulse" />
            Worker Thread Parallelism Simulator
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-sans">
            Demonstrates how CPU-intensive tasks run in background processes without freezing webpage interactions.
          </p>
        </div>

        {/* Core Live Responsiveness Indicator */}
        <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800/60 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">UI Event Loop State</div>
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span>Dynamic Pulse:</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 min-w-[28px] text-center">
                {testCounter}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="text-sm text-slate-300 leading-relaxed font-sans">
              Finding all prime numbers up to <strong className="text-slate-100">4,500,000</strong> is an expensive computation. Watch the <strong className="text-emerald-400">Dynamic Pulse counter</strong> above while running:
            </div>

            <div className="space-y-3">
              {/* Main Thread Button */}
              <button
                onClick={runOnMainThread}
                disabled={loading}
                id="btn-run-main-thread"
                className="w-full text-left p-4 rounded-xl border border-red-950 bg-red-950/20 hover:bg-red-950/30 transition-all font-sans cursor-pointer group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-900/40 p-2 rounded-lg text-red-400">
                    <AlertTriangle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-100 text-sm">Run on Event Loop (Single-Threaded)</h4>
                    <p className="text-red-400/80 text-[11px] mt-0.5">Blocks main thread. The Pulse counter will FREEZE instantly.</p>
                  </div>
                </div>
              </button>

              {/* Worker Thread Button */}
              <button
                onClick={runInWorker}
                disabled={loading}
                id="btn-run-worker-thread"
                className="w-full text-left p-4 rounded-xl border border-indigo-950 bg-indigo-950/30 hover:bg-indigo-950/40 transition-all font-sans cursor-pointer group disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-900/40 p-2 rounded-lg text-indigo-400">
                    <Zap className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-100 text-sm">Run on Background Worker (Multi-Threaded)</h4>
                    <p className="text-indigo-300/80 text-[11px] mt-0.5">Delegates to background thread. Pulse counter updates fluidly.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetAll}
              id="btn-worker-reset"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-105 active:scale-95 px-4 py-2 rounded-lg text-xs font-mono transition-transform cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Dashboard Visualizer */}
        <div className="lg:col-span-6 bg-slate-950/80 rounded-xl border border-slate-800/60 p-5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-slate-500 tracking-wider uppercase mb-3 flex justify-between">
              <span>Background Thread Console</span>
              {loading && (
                <span className="text-yellow-500 font-bold animate-pulse flex items-center gap-1">
                  ● ACTIVE COMPUTING
                </span>
              )}
            </div>

            <div className="min-h-[110px] bg-slate-950 border border-slate-800/80 rounded-lg p-3 font-mono text-[11px] text-slate-300 space-y-2 select-text overflow-auto">
              <p className="text-slate-500">[{new Date().toLocaleTimeString()}] System loaded.</p>
              <p className="text-indigo-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 inline" /> Main Event Loop active on Port 3000
              </p>
              {threadMode === "main" && (
                <>
                  <p className="text-red-400">[{new Date().toLocaleTimeString()}] WARNING: Task dispatched directly on main loop thread.</p>
                  <p className="text-red-500/90 italic">[{new Date().toLocaleTimeString()}] &gt;&gt; UI interaction thread locked. Awaiting completion...</p>
                </>
              )}
              {threadMode === "worker" && (
                <>
                  <p className="text-indigo-300">[{new Date().toLocaleTimeString()}] Task delegated to HTML5 isolated Web Worker.</p>
                  <p className="text-emerald-400">[{new Date().toLocaleTimeString()}] &gt;&gt; Subthread running. Scroll, animations, and inputs active.</p>
                </>
              )}
              {statusMessage && <p className="text-slate-400">&gt; {statusMessage}</p>}
            </div>
          </div>

          <div className="mt-4 border-t border-slate-800/60 pt-4 grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800/60 p-3 rounded-lg text-center">
              <div className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">Computation Time</div>
              <div className={`text-xl font-display font-medium mt-1 ${calculationTime !== null && calculationTime > 100 ? "text-amber-400" : "text-indigo-300"}`}>
                {calculationTime !== null ? `${calculationTime} ms` : "--"}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800/60 p-3 rounded-lg text-center">
              <div className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">Results Found</div>
              <div className="text-xl font-display font-medium text-indigo-300 mt-1">
                {primesCount !== null ? primesCount.toLocaleString() : "--"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
