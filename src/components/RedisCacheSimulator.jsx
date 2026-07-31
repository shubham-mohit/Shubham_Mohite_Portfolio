// // // import React, { useState } from "react";
// // // import { HardDriveDownload, Search, Zap, Trash2, Database, Flame, Clock } from "lucide-react";

// // // const listings = [
// // //   { id: "101", name: "MacBook Pro M3 Max (16-inch, 64GB)", price: "$3,499", category: "Laptops", stock: 12 },
// // //   { id: "102", name: "Sony WH-1000XM5 Noise Cancelling Headphones", price: "$398", category: "Audio", stock: 45 },
// // //   { id: "103", name: "PlayStation 5 Pro Console (2TB)", price: "$699", category: "Gaming", stock: 7 },
// // //   { id: "104", name: "iPhone 15 Pro Max (256GB, Titanium)", price: "$1,199", category: "Phones", stock: 32 }
// // // ];

// // // export default function RedisCacheSimulator() {
// // //   const [selectedId, setSelectedId] = useState("101");
// // //   const [cache, setCache] = useState({});
// // //   const [logs, setLogs] = useState(["[System]: Redis cache engine initialized. Listening on port 6379."]);
// // //   const [queryDetails, setQueryDetails] = useState({ source: null, timeMs: null, data: null });
// // //   const [loading, setLoading] = useState(false);

// // //   const handleQuery = () => {
// // //     setLoading(true);
// // //     setQueryDetails({ source: null, timeMs: null, data: null });

// // //     const targetItem = listings.find((item) => item.id === selectedId);
// // //     const cacheKey = `listings:id:${selectedId}`;
// // //     const isInCache = !!cache[cacheKey];

// // //     setTimeout(() => {
// // //       let duration;
// // //       let source;
// // //       const timestamp = new Date().toLocaleTimeString();

// // //       if (isInCache) {
// // //         // Cache Hit
// // //         source = "Redis";
// // //         duration = Math.floor(Math.random() * 2) + 1; // 1-2 ms
// // //         setLogs((prev) => [
// // //           `[${timestamp}] ⚡ [CACHE HIT] GET '${cacheKey}' -> Success (${duration}ms)`,
// // //           ...prev
// // //         ]);
// // //       } else {
// // //         // Cache Miss (Hits the Mongo/PG SQL DB)
// // //         source = "DB";
// // //         duration = Math.floor(Math.random() * 60) + 240; // 240-300 ms

// // //         // Save to cache automatically after lookup
// // //         setCache((prev) => ({
// // //           ...prev,
// // //           [cacheKey]: targetItem
// // //         }));

// // //         setLogs((prev) => [
// // //           `[${timestamp}] 🗄️ [CACHE MISS] SET '${cacheKey}' [TTL 3600s]`,
// // //           `[${timestamp}] 📂 MongoDB execution scan: db.listings.find({ id: "${selectedId}" }) (${duration}ms)`,
// // //           ...prev
// // //         ]);
// // //       }

// // //       setQueryDetails({
// // //         source,
// // //         timeMs: duration,
// // //         data: targetItem
// // //       });
// // //       setLoading(false);
// // //     }, 450); // Small user loader effect
// // //   };

// // //   const clearRedisCache = () => {
// // //     setCache({});
// // //     const timestamp = new Date().toLocaleTimeString();
// // //     setLogs((prev) => [
// // //       `[${timestamp}] 🗑️ [FLUSHALL] Flushed all keys from Redis Memory database.`,
// // //       ...prev
// // //     ]);
// // //     setQueryDetails({ source: null, timeMs: null, data: null });
// // //   };

// // //   return (
// // //     <div id="redis-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-emerald transition-all duration-300">
// // //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
// // //         <div>
// // //           <h3 className="font-display font-medium text-lg text-slate-100 flex items-center gap-2">
// // //             <HardDriveDownload className="text-emerald-400 w-5 h-5" />
// // //             Redis Database In-Memory Cache Visualizer
// // //           </h3>
// // //           <p className="text-slate-400 text-xs mt-1 font-sans">
// // //             Simulate how memory buffers intercept heavy MongoDB/PostgreSQL transactional lookups to deliver sub-millisecond response rates (40% to 99% faster!).
// // //           </p>
// // //         </div>

// // //         <button
// // //           onClick={clearRedisCache}
// // //           id="btn-clear-redis-cache"
// // //           className="flex items-center gap-1.5 bg-slate-950 hover:bg-red-950/40 text-rose-400 border border-slate-800 hover:border-red-900/60 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer"
// // //         >
// // //           <Trash2 className="w-3.5 h-3.5" /> Flush Redis
// // //         </button>
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
// // //         {/* Controls */}
// // //         <div className="lg:col-span-5 flex flex-col justify-between">
// // //           <div className="space-y-4">
// // //             <div>
// // //               <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
// // //                 1. Select E-commerce Product Listing
// // //               </label>
// // //               <div className="relative">
// // //                 <select
// // //                   value={selectedId}
// // //                   onChange={(e) => setSelectedId(e.target.value)}
// // //                   className="w-full bg-slate-950 text-slate-200 border border-slate-805 rounded-xl px-3 py-2 text-sm font-sans focus:outline-none focus:border-emerald-500/80 cursor-pointer"
// // //                 >
// // //                   {listings.map((item) => (
// // //                     <option key={item.id} value={item.id}>
// // //                       {item.name}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //                 <div className="absolute right-3 top-3 pointer-events-none text-slate-500">
// // //                   <Search className="w-4 h-4" />
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <button
// // //               onClick={handleQuery}
// // //               disabled={loading}
// // //               id="btn-redis-simulate-query"
// // //               className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold py-3 px-4 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-emerald-500/20 active:scale-98 transition-all disabled:opacity-50"
// // //             >
// // //               <Database className="w-4 h-4" />
// // //               {loading ? "Scanning Databases..." : "Query Product Listing"}
// // //             </button>
// // //           </div>

// // //           {/* Quick Active Store Monitor */}
// // //           <div className="mt-6 p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
// // //             <h4 className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mb-2">
// // //               Redis Storage State
// // //             </h4>
// // //             <div className="flex flex-wrap gap-2">
// // //               {Object.keys(cache).length === 0 ? (
// // //                 <div className="text-xs font-mono text-slate-600 italic">No keys cached in RAM</div>
// // //               ) : (
// // //                 Object.keys(cache).map((key) => (
// // //                   <span
// // //                     key={key}
// // //                     className="bg-emerald-950/80 border border-emerald-900/60 text-emerald-400 font-mono text-[10px] px-2 py-1 rounded"
// // //                   >
// // //                     {key} (TTL: 3600s)
// // //                   </span>
// // //                 ))
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Console and Performance metrics */}
// // //         <div className="lg:col-span-7 flex flex-col gap-4">
// // //           {/* Query Report */}
// // //           <div className="bg-slate-950/90 rounded-xl border border-slate-800/80 p-4">
// // //             <h4 className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mb-3">
// // //               Query Performance Metrics
// // //             </h4>

// // //             {queryDetails.source ? (
// // //               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
// // //                 {/* Visual speedometer card */}
// // //                 <div className="md:col-span-5 bg-slate-900/60 border border-slate-800 p-3.5 rounded-lg text-center">
// // //                   <div className="text-[10px] font-mono text-slate-500 uppercase">Response Time</div>
// // //                   <div
// // //                     className={`text-2xl font-display font-bold mt-1 inline-flex items-center gap-1 ${
// // //                       queryDetails.source === "Redis" ? "text-emerald-400" : "text-amber-500"
// // //                     }`}
// // //                   >
// // //                     <Clock className="w-5 h-5 inline" /> {queryDetails.timeMs}ms
// // //                   </div>
// // //                   <div className="mt-1">
// // //                     {queryDetails.source === "Redis" ? (
// // //                       <span className="bg-emerald-950 text-emerald-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
// // //                         ⚡ 99% SPEEDUP
// // //                       </span>
// // //                     ) : (
// // //                       <span className="bg-amber-950 text-amber-400 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
// // //                         🗄️ DISK SCAN
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Returned values card */}
// // //                 <div className="md:col-span-7 text-xs font-sans text-slate-300 space-y-1">
// // //                   <div className="text-slate-100 font-semibold">{queryDetails.data?.name}</div>
// // //                   <div className="text-[11px] text-slate-400">
// // //                     Category: <span className="text-slate-200">{queryDetails.data?.category}</span>
// // //                   </div>
// // //                   <div className="text-[11px] text-slate-400">
// // //                     Price Code: <strong className="text-emerald-400">{queryDetails.data?.price}</strong>
// // //                   </div>
// // //                   <div className="text-[11px] text-slate-400">
// // //                     Units in Stock: <span className="text-slate-105 font-mono">{queryDetails.data?.stock} items</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ) : (
// // //               <div className="flex flex-col items-center justify-center py-6 text-slate-600 italic text-xs font-sans">
// // //                 <Flame className="w-5 h-5 text-slate-700 mb-1.5" />
// // //                 Awaiting search transaction triggers...
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Redis Server stream */}
// // //           <div className="bg-slate-950/80 rounded-xl border border-slate-800/60 p-4 flex-1">
// // //             <h4 className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mb-1.5">
// // //               Redis Engine Server Output Logs
// // //             </h4>
// // //             <div className="h-28 bg-slate-950 border border-slate-900 rounded-lg p-2.5 font-mono text-[10px] text-slate-400 overflow-auto scroll-smooth space-y-1">
// // //               {logs.map((log, index) => (
// // //                 <div key={index} className={log.includes("CACHE HIT") ? "text-emerald-400 font-bold" : log.includes("CACHE MISS") ? "text-amber-500" : "text-slate-500"}>
// // //                   {log}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState } from "react";
// // import { HardDrive, Server, Zap, CheckCircle2, RotateCcw, AlertCircle, Database, Terminal, ChevronRight } from "lucide-react";
// // import { motion, AnimatePresence } from "motion/react";

// // export default function RedisCacheSimulator() {
// //   const [dbMethod, setDbMethod] = useState("cold");
// //   const [inputKey, setInputKey] = useState("user:profile:101");
// //   const [inputValue, setInputValue] = useState('{"name": "Shubham Mohite", "role": "Senior Engineer"}');
// //   const [simulatedLog, setSimulatedLog] = useState([
// //     { source: "Redis Node", msg: "In-memory cluster established. Key eviction set to LRU mode.", time: "09:00:01 AM", type: "system" }
// //   ]);

// //   // Real-time custom state mapping represent mock db
// //   const [mockDB, setMockDB] = useState({
// //     "user:profile:101": '{"name": "Shubham Mohite", "role": "Senior Full-Stack Engineer"}',
// //     "analytics:dashboard": '{"totalCalls": 8102, "healthRate": "100%"}',
// //     "config:jwt:duration": "3600"
// //   });

// //   const [cacheKeys, setCacheKeys] = useState(["user:profile:101"]); // Seed with one
// //   const [activeQueryResult, setActiveQueryResult] = useState(null);
// //   const [lookupStats, setLookupStats] = useState({ speed: null, source: null });

// //   const handleSetCacheValue = (e) => {
// //     e.preventDefault();
// //     if (!inputKey || !inputValue) return;

// //     // Simulate writing to both persistent and Redis background cache
// //     setMockDB(prev => ({ ...prev, [inputKey]: inputValue }));
// //     if (!cacheKeys.includes(inputKey)) {
// //       setCacheKeys(prev => [...prev, inputKey]);
// //     }

// //     setSimulatedLog(prev => [
// //       {
// //         source: "REDIS SERVER (Memory RAM)",
// //         msg: `SET ${inputKey} -> Expiry: volatile (1hr). Bytes written: ${inputValue.length}`,
// //         time: new Date().toLocaleTimeString(),
// //         type: "write"
// //       },
// //       ...prev
// //     ]);

// //     setInputKey("");
// //     setInputValue("");
// //   };

// //   const runQuery = (key) => {
// //     const start = performance.now();
// //     const hit = cacheKeys.includes(key);

// //     let delay = 0;
// //     let finalSource = "";

// //     if (hit) {
// //       // Hot Cache ram speed: extremely quick
// //       delay = Math.floor(Math.random() * 3) + 1; // 1-3ms
// //       finalSource = "REDIS IN-MEMORY RAM CACHE";
// //     } else {
// //       // Cold database fetch: full network overhead
// //       delay = Math.floor(Math.random() * 120) + 150; // 150-270ms
// //       finalSource = "COULD POSTGRESQL (Cold Hard Disk Disk)";
// //     }

// //     // Capture retrieved value or mock 404
// //     const responsePayload = mockDB[key] || "null";

// //     setTimeout(() => {
// //       setActiveQueryResult({ key, payload: responsePayload });
// //       setLookupStats({ speed: delay, source: finalSource });

// //       setSimulatedLog(prev => [
// //         {
// //           source: finalSource,
// //           msg: `GET ${key} -> Code: 200 OK. Response: ${responsePayload.slice(0, 35)}...`,
// //           time: new Date().toLocaleTimeString(),
// //           type: hit ? "hit" : "miss"
// //         },
// //         ...prev
// //       ]);
// //     }, delay);
// //   };

// //   const clearCacheStates = () => {
// //     setCacheKeys([]);
// //     setLookupStats({ speed: null, source: null });
// //     setActiveQueryResult(null);
// //     setSimulatedLog([
// //       { source: "Redis Supervisor", msg: "FLUSHDB executed. Cache storage is completely cleared.", time: new Date().toLocaleTimeString(), type: "system" }
// //     ]);
// //   };

// //   return (
// //     <div id="redis-simulator" className="glass-panel rounded-3xl p-6 sm:p-8 glow-emerald relative overflow-hidden transition-all duration-300">

// //       {/* Decorative Grid overlays */}
// //       <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

// //       <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6 mb-8">
// //         <div>
// //           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-900/30 font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-3">
// //             Database Performance Segment
// //           </div>
// //           <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-100 flex items-center gap-2.5">
// //             <Database className="text-emerald-400 w-6 h-6" />
// //             Redis Core InMemory RAM Cache Sandbox
// //           </h3>
// //           <p className="text-slate-405 text-sm font-sans mt-2 max-w-2xl leading-relaxed">
// //             In-memory systems reduce query latencies from 200ms down to sub-3ms. Test standard key lookups and see the real-time speed differences between hitting cold physical disks versus hot RAM memory pools.
// //           </p>
// //         </div>

// //         {/* Diagnostic speed dial summary */}
// //         <div className="bg-slate-950/70 p-4 border border-slate-800 rounded-2xl flex items-center gap-4 shrink-0 shadow-inner">
// //           <div className="text-center border-r border-slate-800/70 pr-4">
// //             <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider">Cold Disk</span>
// //             <div className="text-sm font-mono font-black text-rose-450 mt-0.5">~250ms</div>
// //           </div>
// //           <div className="text-center">
// //             <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider">Hot Redis Cache</span>
// //             <div className="text-sm font-mono font-black text-emerald-400 mt-0.5">~1ms</div>
// //           </div>
// //           <span className="text-xs bg-emerald-950/30 border border-emerald-900/60 text-emerald-400 px-2 py-1 rounded font-mono font-bold animate-pulse text-[10.5px]">
// //             99.5% SPEEDUP
// //           </span>
// //         </div>
// //       </div>

// //       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 select-sans">

// //         {/* Left Control Input Block */}
// //         <div className="lg:col-span-4 space-y-6">
// //           <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-2">
// //             <Terminal className="w-4 h-4 text-emerald-400" />
// //             1. Write Cache Entry (SET)
// //           </h4>

// //           <form onSubmit={handleSetCacheValue} className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-900/80">
// //             <div>
// //               <label className="block text-[10px] font-mono text-slate-505 uppercase tracking-wider mb-1.5">
// //                 Target Key
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={inputKey}
// //                 onChange={(e) => setInputKey(e.target.value)}
// //                 placeholder="E.g. sessions:active:user12"
// //                 className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-205 focus:outline-none focus:border-emerald-500/80"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-[10px] font-mono text-slate-505 uppercase tracking-wider mb-1.5">
// //                 JSON Value Payload
// //               </label>
// //               <textarea
// //                 required
// //                 rows={2}
// //                 value={inputValue}
// //                 onChange={(e) => setInputValue(e.target.value)}
// //                 className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-205 focus:outline-none focus:border-emerald-500/80 resize-none"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               id="btn-redis-set"
// //               className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold py-2 rounded-lg text-xs cursor-pointer hover:shadow-lg hover:shadow-emerald-500/20 active:scale-98 transition-all"
// //             >
// //               SET Database Key
// //             </button>
// //           </form>

// //           {/* Quick Seeder Trigger box */}
// //           <div className="bg-slate-950/30 border border-dashed border-slate-800/80 p-3 rounded-lg text-slate-405 text-xs flex flex-col justify-between gap-2.5">
// //             <p>Database table is loaded with persistent mock blocks. Click any key on the right to test query latency.</p>
// //             <button
// //               onClick={clearCacheStates}
// //               id="btn-redis-clear"
// //               className="flex items-center gap-1.5 bg-slate-905 hover:bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-800 px-3 py-1.5 rounded-lg w-fit cursor-pointer transition-colors shadow-sm"
// //             >
// //               <RotateCcw className="w-3.5 h-3.5" /> FLUSH REDIS CACHE
// //             </button>
// //           </div>
// //         </div>

// //         {/* Middle Visual RAM grid maps and Query simulator */}
// //         <div className="lg:col-span-5 space-y-6">
// //           <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-2">
// //             <Database className="w-4 h-4 text-emerald-400" />
// //             2. Real-Time RAM Allocation Map & GET Test
// //           </h4>

// //           {/* Memory block grid cells */}
// //           <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-3 shadow-inner">
// //             <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
// //               Cluster Node-A (Volatile RAM Map - 12 Cells)
// //             </span>
// //             <div className="grid grid-cols-4 gap-2">
// //               {[...Array(12)].map((_, idx) => {
// //                 const isActive = idx < cacheKeys.length;
// //                 return (
// //                   <div
// //                     key={idx}
// //                     className={`h-11 rounded-lg border flex flex-col justify-center items-center font-mono transition-transform duration-200 hover:scale-105 ${
// //                       isActive
// //                         ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-400"
// //                         : "bg-slate-950/80 border-slate-900 text-slate-650"
// //                     }`}
// //                   >
// //                     <span className="text-[10px] font-bold">Cell {idx + 1}</span>
// //                     <span className="text-[8px] uppercase">{isActive ? "cached" : "empty"}</span>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
// //               Active Server DB Records (Click to query GET)
// //             </span>
// //             <div className="flex flex-wrap gap-2">
// //               {Object.keys(mockDB).map((k) => {
// //                 const isCached = cacheKeys.includes(k);
// //                 return (
// //                   <button
// //                     key={k}
// //                     onClick={() => runQuery(k)}
// //                     className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] cursor-pointer transition-all hover:scale-102 flex items-center gap-1.5 ${
// //                       isCached
// //                         ? "bg-slate-900 border-emerald-950 text-slate-201 hover:border-emerald-500/60"
// //                         : "bg-slate-950 border-rose-950/40 text-rose-300 hover:border-rose-500/60"
// //                     }`}
// //                   >
// //                     <span className={`w-1.5 h-1.5 rounded-full ${isCached ? "bg-emerald-400" : "bg-rose-500"}`}></span>
// //                     {k}
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right latency comparator layout */}
// //         <div className="lg:col-span-3 flex flex-col justify-between gap-6">
// //           <div className="space-y-4">
// //             <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-2">
// //               <Zap className="w-4 h-4 text-emerald-400" />
// //               3. Telemetry Results
// //             </h4>

// //             {lookupStats.speed !== null ? (
// //               <div className="space-y-4 bg-slate-950/85 p-4 rounded-xl border border-slate-900/90 shadow-md">
// //                 <div>
// //                   <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider">Source Origin</span>
// //                   <p className={`font-mono text-[11px] font-bold ${lookupStats.source.includes("REDIS") ? "text-emerald-405" : "text-rose-400"}`}>
// //                     {lookupStats.source}
// //                   </p>
// //                 </div>

// //                 <div className="pt-2 border-t border-slate-900">
// //                   <span className="text-[9px] uppercase font-mono text-slate-505 tracking-wider">Fetch Latency</span>
// //                   <div className="flex items-center gap-1.5 mt-1">
// //                     <span className={`text-2xl font-display font-black tracking-tight ${lookupStats.speed < 10 ? "text-emerald-400" : "text-rose-500"}`}>
// //                       {lookupStats.speed} ms
// //                     </span>
// //                     <span className="text-[10px] font-mono text-slate-550">
// //                       {lookupStats.speed < 10 ? "(Incredibly Fast)" : "(Cold Network Delay)"}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Speed indicator bar graph representation */}
// //                 <div className="w-full bg-slate-950 h-3 border border-slate-900 rounded-full overflow-hidden p-0.5 mt-2">
// //                   <div
// //                     className={`h-full rounded-full transition-all duration-500 ${lookupStats.speed < 10 ? "bg-gradient-to-r from-emerald-500 to-indigo-500" : "bg-rose-600"}`}
// //                     style={{ width: lookupStats.speed < 10 ? "5%" : "100%" }}
// //                   ></div>
// //                 </div>

// //               </div>
// //             ) : (
// //               <div className="p-4 bg-slate-950/40 border border-dashed border-slate-900 rounded-xl text-center text-slate-500 font-sans text-xs">
// //                 Waiting for GET request to analyze speeds.
// //               </div>
// //             )}
// //           </div>

// //           {/* Terminal Console log trail */}
// //           <div className="bg-slate-950/95 border border-slate-900 rounded-xl p-3.5 max-h-[140px] overflow-auto text-[10px] font-mono text-slate-400 space-y-1.5 shadow-inner">
// //             <span className="text-[8px] uppercase tracking-wider text-slate-550 block border-b border-slate-900 pb-1 mb-1">Live Transaction Logs</span>
// //             {simulatedLog.map((log, idx) => (
// //               <div key={idx} className="flex gap-1 items-start leading-normal">
// //                 <span className="text-slate-600">[{log.time}]</span>
// //                 <span className={
// //                   log.type === "hit" ? "text-emerald-400 font-semibold" :
// //                   log.type === "write" ? "text-indigo-405" :
// //                   log.type === "miss" ? "text-rose-450" :
// //                   "text-slate-500"
// //                 }>&gt; {log.source}:</span>
// //                 <span className="text-slate-300">{log.msg}</span>
// //               </div>
// //             ))}
// //           </div>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from "react";
// import { Cpu, Zap, RotateCcw, AlertTriangle, CheckCircle, Terminal, Activity, ArrowRight } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";

// export default function WorkerSimulator() {
//   const [primesCount, setPrimesCount] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [threadMode, setThreadMode] = useState("none");
//   const [statusMessage, setStatusMessage] = useState("System idle. Ready for parallel calculation.");
//   const [calculationTime, setCalculationTime] = useState(null);

//   // Realtime counter to test UI responsiveness
//   const [testCounter, setTestCounter] = useState(0);
//   const [counterActive] = useState(true);

//   // HTML5 Web Worker reference
//   const workerRef = useRef(null);

//   // Counter loop to prove main thread responsiveness
//   useEffect(() => {
//     let interval;
//     if (counterActive) {
//       interval = setInterval(() => {
//         setTestCounter((prev) => (prev + 3) % 100);
//       }, 30);
//     }
//     return () => clearInterval(interval);
//   }, [counterActive]);

//   // Handle building Worker dynamically
//   useEffect(() => {
//     const workerBlobCode = `
//       self.onmessage = function(e) {
//         const limit = e.data;
//         const startTime = performance.now();

//         let count = 0;
//         for (let i = 2; i <= limit; i++) {
//           let isPrime = true;
//           for (let j = 2; j <= Math.sqrt(i); j++) {
//             if (i % j === 0) {
//               isPrime = false;
//               break;
//             }
//           }
//           if (isPrime) count++;
//         }

//         const endTime = performance.now();
//         self.postMessage({ primesCount: count, duration: endTime - startTime });
//       };
//     `;
//     const blob = new Blob([workerBlobCode], { type: "application/javascript" });
//     const workerUrl = URL.createObjectURL(blob);
//     const worker = new Worker(workerUrl);

//     worker.onmessage = (e) => {
//       const { primesCount: count, duration } = e.data;
//       setPrimesCount(count);
//       setCalculationTime(Math.round(duration));
//       setLoading(false);
//       setStatusMessage(`Task complete via Web Worker! Calculated ${count.toLocaleString()} prime numbers background-side.`);
//     };

//     workerRef.current = worker;

//     return () => {
//       worker.terminate();
//       URL.revokeObjectURL(workerUrl);
//     };
//   }, []);

//   const runOnMainThread = () => {
//     setLoading(true);
//     setThreadMode("main");
//     setStatusMessage("Calculating on Main Thread... EXPECT INSTANT FREEZING OF THE UI PULSE INDICATOR BELOW!");
//     setCalculationTime(null);
//     setPrimesCount(null);

//     // Give browser brief window to draw the active phase of loading list
//     setTimeout(() => {
//       const startTime = performance.now();
//       const limit = 4500000;

//       let count = 0;
//       for (let i = 2; i <= limit; i++) {
//         let isPrime = true;
//         for (let j = 2; j <= Math.sqrt(i); j++) {
//           if (i % j === 0) {
//             isPrime = false;
//             break;
//           }
//         }
//         if (isPrime) count++;
//       }

//       const endTime = performance.now();
//       const duration = endTime - startTime;

//       setPrimesCount(count);
//       setCalculationTime(Math.round(duration));
//       setLoading(false);
//       setStatusMessage(`Completed on Main Thread! Calculated ${count.toLocaleString()} primes, but user interface became completely unresponsive.`);
//     }, 100);
//   };

//   const runInWorker = () => {
//     if (!workerRef.current) return;
//     setLoading(true);
//     setThreadMode("worker");
//     setStatusMessage("Calculating inside isolated background Worker Thread...");
//     setCalculationTime(null);
//     setPrimesCount(null);

//     workerRef.current.postMessage(4500000);
//   };

//   const resetAll = () => {
//     setPrimesCount(null);
//     setLoading(false);
//     setThreadMode("none");
//     setCalculationTime(null);
//     setStatusMessage("System idle. Ready for calculation.");
//   };

//   return (
//     <div id="worker-simulator" className="glass-panel rounded-3xl p-6 sm:p-8 glow-indigo relative overflow-hidden transition-all duration-300">

//       {/* Absolute grid background line */}
//       <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

//       <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6 mb-8">
//         <div>
//           <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/40 border border-indigo-900/30 font-mono text-[10px] text-indigo-400 uppercase tracking-widest mb-3">
//             System Design Segment
//           </div>
//           <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-100 flex items-center gap-2.5">
//             <Cpu className="text-indigo-400 w-6 h-6" />
//             HTML5 Web Worker Parallelism Core
//           </h3>
//           <p className="text-slate-405 text-sm font-sans mt-2 max-w-2xl leading-relaxed">
//             Witness how multi-threading keeps web applications fast. A background thread processes heavy prime calculations (4,500,000 checks) without locking the main thread.
//           </p>
//         </div>

//         {/* Responsive pulse monitor */}
//         <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/60 flex items-center gap-4 shrink-0 shadow-inner">
//           <div className="relative flex justify-center items-center h-5 w-5">
//             {threadMode !== "main" ? (
//               <>
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-3,5 w-3.5 bg-emerald-400 shadow-md"></span>
//               </>
//             ) : (
//               <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600 shadow-md animate-pulse"></span>
//             )}
//           </div>
//           <div>
//             <div className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">UI Event Loop State</div>
//             <div className="text-sm font-mono font-bold flex items-center gap-2">
//               <span className={threadMode === "main" && loading ? "text-rose-500" : "text-emerald-400"}>
//                 {threadMode === "main" && loading ? "LOCKED (FROZEN)" : "FLUID UPDATING"}
//               </span>
//               <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-indigo-300 min-w-[42px] text-center font-black">
//                 {testCounter}%
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

//         {/* Left Interactive parameters */}
//         <div className="lg:col-span-6 flex flex-col justify-between gap-6">
//           <div className="space-y-6">
//             <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-2">
//               <Terminal className="w-4 h-4 text-indigo-400" />
//               1. Choose Execution Thread
//             </h4>

//             <div className="space-y-4">
//               {/* Single Thread btn */}
//               <button
//                 onClick={runOnMainThread}
//                 disabled={loading}
//                 id="btn-run-main-thread"
//                 className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer group disabled:opacity-50 relative overflow-hidden ${
//                   threadMode === "main"
//                     ? "bg-rose-950/25 border-rose-500/80 shadow-lg shadow-rose-950/35"
//                     : "bg-slate-950/50 border-slate-800/80 hover:bg-slate-900/40 hover:border-slate-700"
//                 }`}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className={`p-3 rounded-xl transition-colors ${threadMode === "main" ? "bg-rose-900/35 text-rose-400" : "bg-slate-900 border border-slate-800 text-rose-500/80"}`}>
//                     <AlertTriangle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//                   </div>
//                   <div>
//                     <h5 className="font-display font-bold text-slate-100 text-sm">Sync Main Thread (Single-Threaded)</h5>
//                     <p className="text-slate-400 text-xs mt-1 leading-relaxed">
//                       Computes primes on the primary Event Loop. The dynamic pulse above and all scroll interactions will freeze.
//                     </p>
//                   </div>
//                 </div>
//               </button>

//               {/* Multi Thread btn */}
//               <button
//                 onClick={runInWorker}
//                 disabled={loading}
//                 id="btn-run-worker-thread"
//                 className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer group disabled:opacity-50 relative overflow-hidden ${
//                   threadMode === "worker"
//                     ? "bg-indigo-950/25 border-indigo-500/80 shadow-lg shadow-indigo-950/30"
//                     : "bg-slate-950/50 border-slate-800/80 hover:bg-slate-900/40 hover:border-slate-700"
//                 }`}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className={`p-3 rounded-xl transition-colors ${threadMode === "worker" ? "bg-indigo-900/35 text-indigo-400" : "bg-slate-900 border border-slate-800 text-indigo-400"}`}>
//                     <Zap className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
//                   </div>
//                   <div>
//                     <h5 className="font-display font-bold text-slate-100 text-sm">HTML5 Web Worker (Multi-Threaded)</h5>
//                     <p className="text-slate-400 text-xs mt-1 leading-relaxed">
//                       Delegates processing to a background thread. Keep clicking buttons, scrolling around, or typing messages.
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-4 items-center">
//             <button
//               onClick={resetAll}
//               id="btn-worker-reset"
//               className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer active:scale-95 shadow-sm"
//             >
//               <RotateCcw className="w-3.5 h-3.5" /> Re-Initialize Console
//             </button>
//             {loading && (
//               <span className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-400 animate-pulse font-bold">
//                 <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
//                 PROCESSING TELEMETRY...
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Right Console panel */}
//         <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-inner">
//           <div className="space-y-4">
//             <div className="flex items-center justify-between border-b border-slate-900 pb-3">
//               <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
//                 <Activity className="w-3.5 h-3.5 text-indigo-400" />
//                 Virtual Subthread Diagnostics Terminal
//               </span>
//               <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded border uppercase ${
//                 threadMode === "worker" ? "bg-indigo-950/60 text-indigo-400 border-indigo-900/50" :
//                 threadMode === "main" ? "bg-rose-950/50 text-rose-450 border-rose-900/40" :
//                 "bg-slate-900 text-slate-500 border-slate-800"
//               }`}>
//                 {threadMode === "none" ? "idle" : `${threadMode}-thread`}
//               </span>
//             </div>

//             <div className="min-h-[140px] bg-slate-950/90 border border-slate-900 rounded-xl p-4 font-mono text-xs text-slate-350 space-y-2.5 select-text overflow-auto">
//               <div className="text-slate-600 font-mono text-[10.5px]">[{new Date().toLocaleDateString()}] Core supervisor started.</div>
//               <div className="text-indigo-400/90 flex items-center gap-1.5">
//                 <CheckCircle className="w-4 h-4 text-indigo-400" /> Main client loop active on Port 3000
//               </div>
//               <AnimatePresence mode="popLayout">
//                 {threadMode === "main" && (
//                   <motion.div
//                     initial={{ opacity: 0, x: -5 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="text-rose-400 space-y-1 bg-rose-950/10 p-2.5 rounded-lg border border-rose-950/50"
//                   >
//                     <p className="font-bold">&gt; WARNING: Main thread dispatched calculation.</p>
//                     <p className="text-[11px] text-rose-500/90 italic">&gt; Blocking render locks... browser inputs disabled...</p>
//                   </motion.div>
//                 )}
//                 {threadMode === "worker" && (
//                   <motion.div
//                     initial={{ opacity: 0, x: -5 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="text-indigo-300 space-y-1 bg-indigo-950/10 p-2.5 rounded-lg border border-indigo-950/50"
//                   >
//                     <p>&gt; Custom isolated subthread boot logic: initialized.</p>
//                     <p className="text-emerald-400 text-[11px]">&gt; Primary event loop remains 100% operational.</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               <p className="text-slate-400 pl-2 border-l border-slate-800">&gt;&gt; {statusMessage}</p>
//             </div>
//           </div>

//           <div className="mt-6 border-t border-slate-900 pt-5 grid grid-cols-2 gap-4">
//             <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl text-center shadow-sm">
//               <div className="text-[9px] font-mono text-slate-505 tracking-wider uppercase mb-1">Time Elapsed</div>
//               <div className={`text-2xl font-display font-black tracking-tight ${calculationTime !== null && calculationTime > 150 ? "text-amber-400" : "text-slate-100"}`}>
//                 {calculationTime !== null ? `${calculationTime} ms` : "--"}
//               </div>
//             </div>

//             <div className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl text-center shadow-sm">
//               <div className="text-[9px] font-mono text-slate-550 tracking-wider uppercase mb-1 font-sans">Primes Solved</div>
//               <div className="text-2xl font-display font-black text-indigo-400 tracking-tight">
//                 {primesCount !== null ? primesCount.toLocaleString() : "--"}
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Database,
  Cpu,
  Wrench,
  ExternalLink,
  FileText,
  CheckCircle,
  Calendar,
  ChevronRight,
  Send,
  MessageSquare,
  Shield,
  HardDriveDownload,
  Terminal,
  Activity,
  User,
  Check,
  Download,
  CpuIcon,
  Sparkles,
  Layers,
  Network
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { skillsData, experienceData, projectsData, educationData } from "../data.js";

import WorkerSimulator from "./WorkerSimulator.jsx";
import RedisCacheSimulator from "./RealtimeDatabaseSimulator.jsx";
import RealtimeDatabaseSimulator from "./RealtimeDatabaseSimulator.jsx";
import OAuthVisualizer from "./OAuthVisualizer.jsx";

// Unique workspace image path generated previously
const workspaceImage = "src/assets/codenode.jpeg";

export default function App() {
  const [activePlayground, setActivePlayground] = useState("worker");
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("all");
  const [activeProjectTab, setActiveProjectTab] = useState("proj1");

  // Real-time hovering indicators to enrich skills list
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Local message state for simulated contact box
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [messagesHistory, setMessagesHistory] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [smtpLogs, setSmtpLogs] = useState([]);
  const [sendingSmtp, setSendingSmtp] = useState(false);

  // Load message history from local storage
  useEffect(() => {
    const historical = localStorage.getItem("shubham_portfolio_messages");
    if (historical) {
      try {
        setMessagesHistory(JSON.parse(historical));
      } catch (e) {
        console.error("Failed parsing message logs", e);
      }
    }
  }, []);

  const triggerSmtpSimulation = (name, email, msg) => {
    setSendingSmtp(true);
    const timeline = [
      { t: "Connecting to mail.shubham.dev:587...", delay: 200 },
      { t: "SMTP >> 220 mail.shubham.dev ESMTP Postfix", delay: 600 },
      { t: `SMTP << EHLO portfolio.client`, delay: 1000 },
      { t: "SMTP >> 250-mail.shubham.dev greeting, 250-STARTTLS, 250-CHUNKING", delay: 1400 },
      { t: `SMTP << MAIL FROM: <${email}>`, delay: 1900 },
      { t: "SMTP >> 250 2.1.0 Sender Ok", delay: 2300 },
      { t: `SMTP << RCPT TO: <shubhammohite801@gmail.com>`, delay: 2700 },
      { t: "SMTP >> 250 2.1.5 Recipient Ok (Forwarded to in-memory store)", delay: 3100 },
      { t: "SMTP << DATA", delay: 3400 },
      { t: `SMTP >> 354 Start input; end with <CR><LF>.<CR><LF>. Subject: Msg from ${name}`, delay: 3800 },
      { t: "SMTP >> 250 2.0.0 Message received and cached successfully!", delay: 4200 }
    ];

    setSmtpLogs([]);
    timeline.forEach((item) => {
      setTimeout(() => {
        setSmtpLogs((prev) => [...prev, { text: item.t, time: new Date().toLocaleTimeString() }]);
        if (item.t.includes("Message received")) {
          setSendingSmtp(false);
          setFormSubmitted(true);
          setTimeout(() => setFormSubmitted(false), 5000);
        }
      }, item.delay);
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    const newMsg = {
      name: contactName,
      email: contactEmail,
      msg: contactMsg,
      time: new Date().toLocaleString()
    };

    const updated = [newMsg, ...messagesHistory];
    setMessagesHistory(updated);
    localStorage.setItem("shubham_portfolio_messages", JSON.stringify(updated));

    // Fire simulated server connection logs
    triggerSmtpSimulation(contactName, contactEmail, contactMsg);

    setContactName("");
    setContactEmail("");
    setContactMsg("");
  };

  const filteredSkills = skillsData.filter(
    (sk) => skillCategoryFilter === "all" || sk.category === skillCategoryFilter
  );

  // Trigger print mode layout
  // const triggerPrintCV = () => {
  //   window.print();
  // };


  const resumePath = "/Shubham_Mohite_Resume.pdf";

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Shubham_Mohite_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#030611] text-slate-300 font-sans min-h-screen selection:bg-indigo-500 selection:text-slate-950 relative overflow-x-hidden">

      {/* Dynamic Background Mesh Grid & Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        {/* Colorful large radial gradients */}
        <div className="absolute top-[12%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-indigo-900/10 blur-[130px] animate-pulse-slow"></div>
        <div className="absolute top-[45%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-emerald-950/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[8%] left-[15%] w-[55rem] h-[55rem] rounded-full bg-violet-900/10 blur-[140px] animate-pulse-slow"></div>
      </div>

      {/* Top Header Row / Navigation */}
      <header id="portfolio-header" className="sticky top-0 bg-[#030611]/80 backdrop-blur-xl border-b border-slate-900/80 z-50 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo Brand */}
          <a href="#about" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-slate-950 font-display font-black text-sm flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              SM
            </span>
            <div className="text-left">
              <h1 className="font-display font-black text-sm text-slate-100 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                Shubham Mohite
              </h1>
              <p className="text-[10px] font-mono text-indigo-400/90 font-bold uppercase tracking-wider">Full Stack Systems Engineer</p>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 bg-slate-950/60 px-6 py-2 rounded-full border border-slate-900/80">
            <a href="#about" className="text-[11.5px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-100 hover:scale-102 transition-all">About</a>
            <a href="#experience" className="text-[11.5px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-100 hover:scale-102 transition-all">Experience</a>
            <a href="#projects" className="text-[11.5px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-100 hover:scale-102 transition-all">Projects</a>
            <a href="#playgrounds" className="text-[11.5px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-100 hover:scale-102 transition-all">Sandboxes</a>
            <a href="#skills" className="text-[11.5px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-100 hover:scale-102 transition-all">Skills</a>
            <a href="#contact" className="text-[11.5px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-100 hover:scale-102 transition-all">Contact</a>
          </nav>

          {/* Call To Actions */}
          <div className="flex items-center gap-3">
            {/* Elegant Download Resume Trigger */}
            <button
              onClick={downloadCV}
              id="btn-download-resume"
              className="flex items-center gap-2 bg-slate-955 hover:bg-slate-900 border border-slate-800 text-slate-205 hover:text-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" /> Export CV
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-sans font-black text-xs px-4.5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-95 cursor-pointer"
            >
              Hire Me
            </a>
          </div>

        </div>
      </header>

      {/* Primary Container Wrap */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10 space-y-28 scroll-smooth">

        {/* HERO / BIO MODULE */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4 items-center">

          {/* Hero Left Typographics */}
          <div className="lg:col-span-7 space-y-6">

            {/* Quick Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-indigo-950/40 border border-indigo-900/40 rounded-full font-mono text-[11px] text-indigo-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse relative flex">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              </span>
              Available for New Opportunities
            </div>

            <div className="space-y-4">
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-50 tracking-tight leading-none">
                Hi, I'm <span className="gradient-text font-black">Shubham Mohite</span>
              </h1>
              <h2 className="font-display font-semibold text-lg sm:text-2xl text-indigo-400 flex items-center gap-2.5">
                <Terminal className="w-6 h-6 text-indigo-400" />
                High-Performance Full-Stack Architect
              </h2>
            </div>

            <p className="font-sans text-slate-400 text-sm leading-relaxed sm:text-base max-w-2xl select-text">
              A highly motivated and results-driven Software Engineer with a passion for solving complex architectural problems and delivering high-quality fullstack systems. I specialize in building heavy asynchronous backends using <strong className="text-slate-100">Node.js</strong> and <strong className="text-slate-100">Express</strong>, caching systems with <strong className="text-emerald-400">Redis</strong>, and composable frontends in <strong className="text-indigo-400">React.js</strong>.
            </p>

            {/* Quick Tech Highlights Badge Row */}
            <div className="flex flex-wrap gap-2 py-2">
              {[
                { name: "Node.js & Express", style: "border-indigo-950 text-indigo-300 bg-indigo-950/20" },
                { name: "React + Hooks", style: "border-violet-950 text-violet-300 bg-violet-950/20" },
                { name: "MongoDB & SQL", style: "border-blue-950 text-blue-300 bg-blue-950/10" },
                { name: "Redis Memory RAM", style: "border-emerald-950 text-emerald-400 bg-emerald-950/20" },
                { name: "Sub-50ms Sockets", style: "border-rose-950 text-rose-300 bg-rose-950/10" },
                { name: "Docker containers", style: "border-cyan-950 text-cyan-305 bg-cyan-950/20" }
              ].map((tech) => (
                <span key={tech.name} className={`border font-mono font-bold text-[10.5px] px-3.5 py-1.5 rounded-xl ${tech.style}`}>
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Contact quick links bar */}
            <div className="flex flex-wrap gap-x-5 gap-y-3 pt-6 border-t border-slate-900 font-mono text-xs text-slate-400">
              <a href="mailto:shubhammohite801@gmail.com" className="flex items-center gap-2 hover:text-indigo-400 transition-colors select-all">
                <Mail className="w-4 h-4 text-slate-550" /> shubhammohite801@gmail.com
              </a>
              <a href="https://github.com/shubham-mohit" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Github className="w-4 h-4 text-slate-550" /> github.com/shubham
              </a>
              <a href="https://github.com/shubham-mohit" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Linkedin className="w-4 h-4 text-slate-550" /> linkedin.com/in/shubham
              </a>
              <span className="flex items-center gap-2 select-text text-slate-400">
                <Phone className="w-4 h-4 text-slate-550" /> +91 8698568231
              </span>
              <span className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-550" /> Pune, India
              </span>
            </div>

          </div>

          {/* Hero Right Interactive Bento Card */}
          <div className="lg:col-span-5 space-y-6">

            {/* Custom high-tech asset frame container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/40 p-1 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/10 opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={workspaceImage}
                alt="Shubham's Workspace Artwork"
                className="w-full h-48 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Active Station</span>
                  <p className="text-xs font-mono font-bold text-slate-201 mt-0.5">primary_core_pune.sh</p>
                </div>
                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
            </div>

            {/* Metrics List panel */}
            <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 relative">
              <h3 className="font-display font-bold text-slate-100 text-xs border-b border-slate-900 pb-3 mb-4 flex items-center gap-2">
                <Activity className="text-indigo-400 w-4 h-4" />
                Verified Performance Metrics
              </h3>

              <div className="space-y-4 font-mono text-xs">

                {/* Metric 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-450">System Availability (AGMAH)</span>
                    <span className="text-emerald-400 font-bold">99.99% Uptime</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "99.99%" }}></div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-450">Database Cache Reduction (Redis)</span>
                    <span className="text-emerald-400 font-bold">40% Latency Drop</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                    <div className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-405">CPU Subthreading Efficiency</span>
                    <span className="text-indigo-400 font-bold">Asynchronous Worker Pools</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="space-y-8 scroll-mt-28">
          <div className="border-b border-slate-900/80 pb-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-3">
              <Briefcase className="text-indigo-400 w-6 h-6 animate-pulse" />
              Professional Career Experience
            </h2>
            <p className="text-slate-405 text-sm font-sans mt-2">
              Proving senior expertise in high-concurrency systems design, secure authentication, and cloud-scaling.
            </p>
          </div>

          {/* Timeline list layout */}
          <div className="relative border-l-2 border-slate-900 ml-4 pl-6 md:pl-10 space-y-12">

            {experienceData.map((job) => (
              <div key={job.id} className="relative group">

                {/* Timeline item marker */}
                <div className="absolute -left-[31px] md:-left-[45px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:scale-125 transition-all duration-300 shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                </div>

                <div className="glass-panel-interactive p-6 md:p-8 rounded-2xl relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/60 pb-4 mb-5">
                    <div>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-100 tracking-tight group-hover:text-indigo-400 transition-colors">
                        {job.role}
                      </h3>
                      <h4 className="text-sm font-mono text-indigo-400/90 font-bold mt-1 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> {job.company}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-indigo-305 bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-900/20 w-fit shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{job.period}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed select-text">
                    {job.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80 shrink-0 mt-2"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Badges container */}
                  <div className="mt-6 border-t border-slate-900/80 pt-4">
                    <span className="text-[10px] uppercase font-mono text-slate-500 tracking-widest block mb-2.5">
                      Operational Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {job.techTags.map((tag) => (
                        <span key={tag} className="bg-slate-950 border border-slate-900 font-mono text-[10.5px] text-slate-350 px-2.5 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </section>

        {/* PROJECTS PORTFOLIO */}
        <section id="projects" className="space-y-8 scroll-mt-28">
          <div className="border-b border-slate-900/80 pb-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-3">
              <Code className="text-emerald-405 w-6 h-6 animate-pulse" />
              Advanced Engineering Projects
            </h2>
            <p className="text-slate-405 text-sm font-sans mt-2">
              Browse deep system architectures configured to tackle dynamic multi-tenancy, IoT channels, and high latency.
            </p>
          </div>

          {/* Tab Selector row with indicator line */}
          <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
            {projectsData.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProjectTab(proj.id)}
                id={`tab-${proj.id}`}
                className={`font-display text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer ${activeProjectTab === proj.id
                  ? "bg-slate-900 border border-slate-800 text-emerald-400 shadow-md shadow-slate-950"
                  : "text-slate-500 hover:text-slate-300"
                  }`}
              >
                {proj.title}
              </button>
            ))}
          </div>

          {/* Project Display details */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {projectsData.map((proj) => {
                if (proj.id !== activeProjectTab) return null;
                return (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel p-6 sm:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 select-text relative overflow-hidden"
                  >
                    {/* Glow circles behind cards */}
                    <div className="absolute top-[-5%] right-[-5%] w-[22rem] h-[22rem] rounded-full bg-emerald-950/10 blur-[90px] pointer-events-none"></div>

                    {/* Column 1 info details left */}
                    <div className="lg:col-span-7 space-y-6">

                      <div className="space-y-3">
                        <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-3 py-1.5 rounded-lg w-fit block">
                          Role: {proj.role}
                        </span>
                        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-100 tracking-tight">
                          {proj.title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm font-mono italic">
                          "{proj.summary}"
                        </p>
                      </div>

                      <p className="font-sans text-slate-300 text-sm leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-emerald-400" /> Key Execution Vectors
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5">
                          {proj.keyFeatures.map((feat, i) => (
                            <li key={i} className="flex gap-3 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {proj.techTags.map((tag) => (
                          <span key={tag} className="bg-slate-950 border border-slate-900 font-mono text-[10.5px] text-slate-350 px-2.5 py-1 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Column 2 sub architectural specifications on the right */}
                    <div className="lg:col-span-5 bg-slate-950/80 border border-slate-900 rounded-2xl p-5 sm:p-6 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <h4 className="font-display font-semibold text-xs text-slate-105 uppercase tracking-wider border-b border-slate-900 pb-3 flex items-center gap-2">
                          <Terminal className="text-emerald-400 w-4.5 h-4.5" />
                          Architecture Blueprint Highlight
                        </h4>

                        <div className="grid grid-cols-1 gap-4">
                          {proj.systemHighlights.map((hl, k) => (
                            <div key={k} className="p-4 bg-[#050b1a] border border-emerald-950/40 rounded-xl space-y-1.5 hover:border-emerald-500/25 transition-colors">
                              <div className="text-xs font-mono font-black text-emerald-400 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                {hl.title}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                                {hl.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#050b1a]/50 p-4 rounded-xl text-xs font-sans text-slate-450 leading-relaxed border border-dashed border-slate-900 shadow-sm mt-4">
                        ⚡ <strong>Simulation trigger</strong>: Interact with the live sandbox dashboards in the <a href="#playgrounds" className="text-indigo-400 hover:underline font-semibold">Interactive Sandboxes</a> segment right below to try these system constructs in real-time.
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </section>

        {/* INTERACTIVE PLAYGROUNDS CORE HUB */}
        <section id="playgrounds" className="space-y-8 scroll-mt-28">
          <div className="border-b border-slate-900/80 pb-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-3">
              <Cpu className="text-indigo-405 w-6 h-6 animate-pulse" />
              Interactive Full-Stack Architecture Sandboxes
            </h2>
            <p className="text-slate-405 text-sm font-sans mt-2">
              Run local simulations representing parallel computing pools, cache memory nodes, real-time channels, and security parameters.
            </p>
          </div>

          {/* Stepper Tabs headers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950/65 p-2.5 border border-slate-900 rounded-2xl shadow-inner">

            {/* Tab Worker */}
            <button
              onClick={() => setActivePlayground("worker")}
              id="playground-tab-worker"
              className={`p-4 rounded-xl border font-mono text-xs flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${activePlayground === "worker"
                ? "bg-slate-900 border-indigo-500/80 text-indigo-300 shadow-lg shadow-indigo-950 font-bold"
                : "bg-slate-950/10 border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
                }`}
            >
              <Cpu className={`w-5 h-5 ${activePlayground === "worker" ? "text-indigo-404 animate-bounce-slow" : "text-slate-500"}`} />
              <span>1. Worker Threading</span>
            </button>

            {/* Tab Redis */}
            <button
              onClick={() => setActivePlayground("redis")}
              id="playground-tab-redis"
              className={`p-4 rounded-xl border font-mono text-xs flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${activePlayground === "redis"
                ? "bg-slate-905 border-emerald-500/80 text-emerald-400 shadow-lg shadow-emerald-950 font-bold"
                : "bg-slate-950/10 border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
                }`}
            >
              <HardDriveDownload className={`w-5 h-5 ${activePlayground === "redis" ? "text-emerald-400 animate-pulse" : "text-slate-500"}`} />
              <span>2. Redis RAM Cache</span>
            </button>

            {/* Tab WS */}
            <button
              onClick={() => setActivePlayground("ws")}
              id="playground-tab-ws"
              className={`p-4 rounded-xl border font-mono text-xs flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${activePlayground === "ws"
                ? "bg-slate-905 border-violet-500/80 text-violet-300 shadow-lg shadow-violet-950 font-bold"
                : "bg-slate-950/10 border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
                }`}
            >
              <Activity className={`w-5 h-5 ${activePlayground === "ws" ? "text-violet-400" : "text-slate-500"}`} />
              <span>3. Socket IoT PubSub</span>
            </button>

            {/* Tab OAuth JWT */}
            <button
              onClick={() => setActivePlayground("oauth")}
              id="playground-tab-oauth"
              className={`p-4 rounded-xl border font-mono text-xs flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-all ${activePlayground === "oauth"
                ? "bg-slate-905 border-indigo-500/80 text-indigo-301 shadow-lg shadow-indigo-950 font-bold"
                : "bg-slate-950/10 border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
                }`}
            >
              <Shield className={`w-5 h-5 ${activePlayground === "oauth" ? "text-indigo-400" : "text-slate-500"}`} />
              <span>4. OAuth 2.0 PKCE</span>
            </button>

          </div>

          {/* Active Playground Frame display with animated loader */}
          <div className="relative min-h-[300px] rounded-3xl transition-all duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlayground}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                {activePlayground === "worker" && <WorkerSimulator />}
                {activePlayground === "redis" && <RedisCacheSimulator />}
                {activePlayground === "ws" && <RealtimeDatabaseSimulator />}
                {activePlayground === "oauth" && <OAuthVisualizer />}
              </motion.div>
            </AnimatePresence>
          </div>

        </section>

        {/* TECHNICAL SKILLS SEGMENT */}
        <section id="skills" className="space-y-8 scroll-mt-28">
          <div className="border-b border-slate-900/80 pb-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-3">
              <Wrench className="text-indigo-400 w-6 h-6 animate-pulse" />
              Technical Core Competencies
            </h2>
            <p className="text-slate-405 text-sm font-sans mt-2">
              Filter by operational categories. Hover over any technology cell for real-world production highlights.
            </p>
          </div>

          {/* Category Pill selectors */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "all", label: "All Stack" },
              { id: "backend", label: "BackEnd Modules" },
              { id: "frontend", label: "FrontEnd Layouts" },
              { id: "database", label: "Database Tuning" },
              { id: "tools", label: "DevOps & Sockets" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSkillCategoryFilter(cat.id)}
                id={`btn-skill-cat-${cat.id}`}
                className={`px-4.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-all ${skillCategoryFilter === cat.id
                  ? "bg-slate-100 text-slate-950 shadow-md border-slate-200"
                  : "bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-slate-200"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Composed Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-text">
            {filteredSkills.map((sk) => {
              const isHovered = hoveredSkill === sk.name;
              return (
                <div
                  key={sk.name}
                  onMouseEnter={() => setHoveredSkill(sk.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="glass-panel-interactive p-6 rounded-2xl space-y-4 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-[4rem] h-[4rem] bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>

                  {/* Header Card name */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                        {sk.category === "backend" && <Cpu className="w-4.5 h-4.5" />}
                        {sk.category === "frontend" && <Code className="w-4.5 h-4.5" />}
                        {sk.category === "database" && <Database className="w-4.5 h-4.5" />}
                        {sk.category === "tools" && <Wrench className="w-4.5 h-4.5" />}
                      </span>
                      <h4 className="font-display font-extrabold text-slate-100 text-sm group-hover:text-indigo-400 transition-colors">
                        {sk.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-wider">
                      {sk.yearsOfExp}+ Yrs
                    </span>
                  </div>

                  {/* strength progress metrics */}
                  <div className="space-y-1.5 relative z-10">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500">
                      <span>Pro-Efficiency</span>
                      <span className="text-indigo-400">{sk.level}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-900">
                      <div className="bg-indigo-500/80 h-full rounded-full" style={{ width: `${sk.level}%` }}></div>
                    </div>
                  </div>

                  {/* Sub Bullet details */}
                  <ul className="space-y-2 border-t border-slate-900/85 pt-4 text-[11px] text-slate-400 leading-relaxed font-sans relative z-10">
                    {sk.details.map((bullet, di) => (
                      <li key={di} className="flex gap-2">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              );
            })}
          </div>
        </section>

        {/* EDUCATION & ACADEMIC ACHIEVEMENTS */}
        <section className="space-y-8 select-text">
          <div className="border-b border-slate-900/80 pb-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-3">
              <GraduationCap className="text-indigo-400 w-6 h-6 animate-pulse" />
              Education & Academic Milestones
            </h2>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[20rem] h-[20rem] rounded-full bg-indigo-950/10 blur-[80px] pointer-events-none"></div>

            {/* Institution Badge Left */}
            <div className="md:col-span-4 bg-slate-950/80 border border-slate-900 rounded-2xl p-6 text-center flex flex-col justify-center items-center h-full shadow-inner relative z-10">
              <div className="w-14 h-14 bg-indigo-950/50 border border-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 shadow-sm">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="font-display font-black text-slate-100 text-sm leading-snug">{educationData.institution}</h3>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black mt-2">Pune, India</p>
            </div>

            {/* Honor Milestones right */}
            <div className="md:col-span-8 space-y-5 relative z-10">
              <div className="space-y-2">
                <span className="text-[10px] font-mono bg-indigo-950/40 text-indigo-400 border border-indigo-900/30 px-3 py-1 rounded-md uppercase font-bold tracking-widest">
                  {educationData.period}
                </span>
                <h4 className="font-display font-extrabold text-slate-100 text-lg sm:text-xl tracking-tight leading-tight mt-1.5">
                  {educationData.degree}
                </h4>
                <p className="text-xs font-mono text-emerald-400 font-bold border-l-2 border-emerald-500/80 pl-2 mt-2">
                  Academic Cumulative Grade: {educationData.gpa}
                </p>
              </div>

              <div className="border-t border-slate-900/80 pt-4 space-y-3.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                {educationData.milestones.map((ms, j) => (
                  <p key={j} className="flex gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{ms}</span>
                  </p>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT BOX FORM & SUBMISSION ARCH */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-28 items-start select-text pb-12">

          {/* Pitch left */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-3">
                <MessageSquare className="text-indigo-404 w-6 h-6 animate-pulse" />
                Let's Build Together
              </h2>
              <p className="text-slate-405 text-sm font-sans mt-2">
                Simulate a secure transaction. Comments submitted below trigger full real-time SMTP logs in the browser!
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              <p>
                Whether you need a high-concurrency microservice architect, a robust API designer, or an experienced MERN fullstack builder, I am ready to collaborate!
              </p>
              <p>
                I thrive in remote engineering setups, prioritizing responsive communications, structural test-driven architectures, and pristine styling.
              </p>
            </div>

            {/* Quick social card links */}
            <div className="p-5 bg-slate-950/50 border border-slate-900 rounded-2xl space-y-3.5 font-mono text-xs shadow-inner">
              <h4 className="text-[10px] uppercase text-slate-505 tracking-widest font-black">Verified Contacts</h4>

              <div className="space-y-2.5 select-text">
                <a href="mailto:shubhammohite801@gmail.com" className="flex items-center gap-2.5 text-slate-350 hover:text-indigo-400 transition-colors">
                  <Mail className="w-4 h-4 text-indigo-400" /> shubhammohite801@gmail.com
                </a>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Phone className="w-4 h-4 text-indigo-400" /> +91 8698568231
                </div>
              </div>
            </div>

          </div>

          {/* Form box Right */}
          <div className="lg:col-span-1"></div>
          <div className="lg:col-span-6 space-y-6">

            <form onSubmit={handleSendMessage} className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6 md:p-8 space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[4rem] h-[4rem] bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>

              <h3 className="font-display font-bold text-sm text-slate-100 border-b border-slate-900 pb-3 mb-2 flex items-center gap-2">
                <Send className="w-4.5 h-4.5 text-indigo-400" />
                Dispatch Message Gateway
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    disabled={sendingSmtp}
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="E.g. Satya Nadella"
                    className="w-full bg-[#040915] border border-slate-850 rounded-xl px-4 py-3 text-xs font-sans text-slate-201 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-650"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    disabled={sendingSmtp}
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="E.g. satya@microsoft.com"
                    className="w-full bg-[#040915] border border-slate-850 rounded-xl px-4 py-3 text-xs font-sans text-slate-201 focus:outline-none focus:border-indigo-500/80 placeholder:text-slate-650"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">
                  Message Body
                </label>
                <textarea
                  required
                  rows={4}
                  disabled={sendingSmtp}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="I am looking to hire a Software Engineer to architect our database modules..."
                  className="w-full bg-[#040915] border border-slate-850 rounded-xl px-4 py-3 text-xs font-sans text-slate-201 focus:outline-none focus:border-indigo-500/80 resize-none placeholder:text-slate-650 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                id="btn-contact-submit"
                disabled={sendingSmtp || !contactName || !contactEmail || !contactMsg}
                className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-slate-950 font-sans font-black tracking-wider text-xs uppercase py-3.5 px-4 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all shrink-0"
              >
                {sendingSmtp ? "Initiating SMTP Handshake..." : "Send Message"}
              </button>

            </form>

            {/* SMTP logs interactive panel */}
            {smtpLogs.length > 0 && (
              <div className="space-y-2.5 bg-slate-950 border border-slate-900 p-5 rounded-2xl shadow-inner">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block border-b border-slate-900 pb-2 mb-2">
                  Interactive Postfix SMTP Client Telemetry Logs
                </span>
                <div className="space-y-1.5 font-mono text-[10px] text-slate-400 max-h-[160px] overflow-auto select-all leading-normal">
                  {smtpLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-slate-600">[{log.time}]</span>
                      <span className={log.text.includes("SMTP >>") ? "text-indigo-400" : log.text.includes("SMTP <<") ? "text-violet-405" : "text-slate-505"}>
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Persisted History Stream list */}
            {messagesHistory.length > 0 && (
              <div className="space-y-4 bg-slate-950/80 border border-slate-905 p-5 rounded-2xl shadow-sm">
                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <span>Browser Cache Message Logs</span>
                  <button
                    onClick={() => {
                      localStorage.removeItem("shubham_portfolio_messages");
                      setMessagesHistory([]);
                    }}
                    className="text-rose-450 hover:underline cursor-pointer"
                  >
                    Clear Cache Space
                  </button>
                </h4>

                <div className="space-y-3.5 max-h-[220px] overflow-auto pr-1">
                  {messagesHistory.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/30 border border-slate-900/80 p-4 rounded-xl font-sans text-xs space-y-1 relative">
                      <div className="flex items-center justify-between text-slate-400">
                        <strong className="text-slate-200 font-semibold">{item.name}</strong>
                        <span className="text-[10px] font-mono text-slate-600">{item.time}</span>
                      </div>
                      <div className="text-[11px] font-mono text-indigo-400 italic font-bold">{item.email}</div>
                      <p className="text-slate-300 bg-[#050b1a] p-3 rounded-lg border border-slate-900 text-[11px] font-sans mt-2 leading-relaxed">
                        {item.msg}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-20 bg-[#030611] text-center py-10 font-mono text-[11px] text-slate-505 max-w-7xl mx-auto px-4 space-y-2">
        <p>&copy; {new Date().getFullYear()} Shubham Mohite. Structured with React, Tailwind CSS v4, Framer Motion, and Lucide Vectors.</p>
        <p className="text-slate-650">Host Node active on Port 3000. All metrics validated.</p>
      </footer>

      {/* Printable clean portfolio styles exclusively when printing (CTRL+P) */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-family: system-ui, sans-serif !important;
          }
          header, footer, #playgrounds, #btn-download-resume, #contact, input, select, textarea, button, iframe {
            display: none !important;
          }
          main {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #about, #experience, #projects, #skills, section {
            display: block !important;
            color: black !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            page-break-inside: avoid;
            margin-bottom: 2rem !important;
          }
          .gradient-text {
            color: black !important;
            -webkit-text-fill-color: black !important;
            background: none !important;
            font-weight: bold !important;
          }
          h1, h2, h3, h4, h5, h6, p, li, span, strong {
            color: black !important;
          }
          .border, .border-b, .border-t, .border-l-2 {
            border-color: #ddd !important;
          }
          .bg-slate-900, .bg-slate-950, .bg-slate-950\\/10, .bg-slate-900\\/35, .bg-slate-900\\/40, .bg-slate-900\\/30 {
            background: #fafafa !important;
            border: 1px solid #ddd !important;
          }
        }
      `}</style>

    </div>
  );
}
