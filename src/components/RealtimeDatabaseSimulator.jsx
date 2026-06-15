// import React, { useState, useEffect } from "react";
// import { Radio, Sliders, Send, Network, Activity, Cpu } from "lucide-react";

// export default function RealtimeDatabaseSimulator() {
//   const [temperature, setTemperature] = useState(24);
//   const [humidity, setHumidity] = useState(55);
//   const [deviceState, setDeviceState] = useState("active");
//   const [liveStream, setLiveStream] = useState([]);
//   const [wsClientsCount, setWsClientsCount] = useState(5);
//   const [receivedMsgCount, setReceivedMsgCount] = useState(0);

//   // Auto-generate some background heartbeat packets to make the view look fully alive
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomTempOffset = parseFloat((Math.random() * 0.4 - 0.2).toFixed(1));
//       const randomHumOffset = Math.floor(Math.random() * 3 - 1);

//       const newPacket = {
//         sensorId: "smart-thermo-0x2",
//         topic: "device/thermo-0x2/telemetry",
//         temperature: parseFloat((temperature + randomTempOffset).toFixed(1)),
//         humidity: Math.min(100, Math.max(0, humidity + randomHumOffset)),
//         timestamp: new Date().toLocaleTimeString()
//       };

//       setLiveStream((prev) => [newPacket, ...prev.slice(0, 10)]);
//       setReceivedMsgCount((c) => c + 1);
//     }, 3500);

//     return () => clearInterval(interval);
//   }, [temperature, humidity]);

//   const handleManualTrigger = () => {
//     const newPacket = {
//       sensorId: "smart-thermo-0x2",
//       topic: "device/thermo-0x2/client_adjust",
//       temperature: temperature,
//       humidity: humidity,
//       timestamp: new Date().toLocaleTimeString()
//     };
//     setLiveStream((prev) => [newPacket, ...prev.slice(0, 10)]);
//     setReceivedMsgCount((c) => c + 1);
//   };

//   return (
//     <div id="realtime-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-indigo transition-all duration-300">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
//         <div>
//           <h3 className="font-display font-medium text-lg text-slate-100 flex items-center gap-2">
//             <Radio className="text-violet-400 w-5 h-5 animate-pulse" />
//             WebSocket & IoT Zenoh Pub/Sub Simulator
//           </h3>
//           <p className="text-slate-400 text-xs mt-1 font-sans">
//             Experience real-time low-overhead IoT message distribution. Modify the controller values to see websocket frames relaying across virtual Redis Pub/Sub channels.
//           </p>
//         </div>

//         {/* Server Connections Badge */}
//         <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 font-mono text-[10px] text-violet-400 font-bold">
//           <Network className="w-3.5 h-3.5" />
//           <span>Active WS Clients: {wsClientsCount}</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Sliders Panel */}
//         <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
//           <div className="space-y-5">
//             <div className="flex items-center justify-between border-b border-slate-900 pb-3">
//               <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
//                 <Sliders className="w-3.5 h-3.5 text-violet-400" />
//                 IoT Device Controls
//               </span>
//               <span className="bg-emerald-950/60 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded border border-emerald-900/40 uppercase">
//                 {deviceState}
//               </span>
//             </div>

//             {/* Temp control */}
//             <div>
//               <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
//                 <span>Thermostat Temp</span>
//                 <span className="text-violet-400 font-bold">{temperature}°C / {((temperature * 9)/5+32).toFixed(0)}°F</span>
//               </div>
//               <input
//                 type="range"
//                 min="10"
//                 max="45"
//                 value={temperature}
//                 onChange={(e) => {
//                   setTemperature(parseFloat(e.target.value));
//                   handleManualTrigger();
//                 }}
//                 className="w-full accent-violet-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
//               />
//             </div>

//             {/* Humidity control */}
//             <div>
//               <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
//                 <span>Ambient Humidity</span>
//                 <span className="text-indigo-400 font-bold">{humidity}% RH</span>
//               </div>
//               <input
//                 type="range"
//                 min="10"
//                 max="95"
//                 value={humidity}
//                 onChange={(e) => {
//                   setHumidity(parseInt(e.target.value));
//                   handleManualTrigger();
//                 }}
//                 className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <button
//               onClick={() => {
//                 setWsClientsCount((c) => c + 1);
//                 setReceivedMsgCount((c) => c + 1);
//               }}
//               className="w-full text-center py-2 px-3 border border-slate-800 hover:border-slate-700 hover:bg-slate-950/80 rounded-xl text-xs font-mono text-slate-300 transition-all cursor-pointer"
//             >
//               + Boot Virtual Client Terminal
//             </button>
//           </div>
//         </div>

//         {/* Realtime Stream Panel */}
//         <div className="lg:col-span-7 flex flex-col justify-between gap-4">
//           {/* Active GUI Gauge Displays */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className={`p-4 rounded-xl border transition-all ${temperature > 30 ? "bg-rose-950/10 border-rose-900/30 text-rose-300" : temperature < 18 ? "bg-blue-950/10 border-blue-900/30 text-blue-300" : "bg-slate-950/40 border-slate-800 text-slate-300"}`}>
//               <div className="text-[9px] font-mono uppercase text-slate-500">Live Client Room temp</div>
//               <div className="text-2xl font-display font-medium mt-1">{temperature}°C</div>
//               <div className="text-[10px] text-slate-500 mt-1 font-sans">
//                 {temperature > 30 ? "🌡️ High telemetry warning" : temperature < 18 ? "❄️ Low climate warning" : "🟢 Cozy comfort state"}
//               </div>
//             </div>

//             <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl text-slate-300">
//               <div className="text-[9px] font-mono uppercase text-slate-500">Total WebSocket Frames Received</div>
//               <div className="text-2xl font-display font-medium text-violet-400 mt-1">{receivedMsgCount} frames</div>
//               <div className="text-[10px] text-slate-500 mt-1 font-mono flex items-center gap-1">
//                 <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
//                 Subscription: device/thermo/#
//               </div>
//             </div>
//           </div>

//           {/* MQTT/Zenoh Protocol Flow Logger */}
//           <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-4 flex-1">
//             <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 border-b border-slate-900 pb-1.5">
//               <span>Zenoh MQTT & WS Event Pipeline output</span>
//               <Activity className="w-3 h-3 text-violet-400 animate-pulse" />
//             </div>

//             <div className="h-[120px] font-mono text-[10px] overflow-auto select-text scroll-smooth space-y-1.5 text-slate-400 leading-normal">
//               {liveStream.length === 0 ? (
//                 <div className="text-slate-600 italic text-center py-8">Awaiting sensor updates... Drag climate inputs to broadcast.</div>
//               ) : (
//                 liveStream.map((pkt, ind) => (
//                   <div key={ind} className="bg-slate-900/40 border-l-2 border-violet-500/60 pl-2.5 py-1 rounded">
//                     <span className="text-slate-600 font-bold">[{pkt.timestamp}] </span>
//                     <span className="text-violet-400 font-bold">PUB </span>
//                     <span className="text-slate-200">"{pkt.topic}"</span>
//                     <div className="mt-0.5 text-slate-500 text-[9px] flex gap-3">
//                       <span>Payload: &#123; sensorId: "{pkt.sensorId}", temp: {pkt.temperature}°C, hum: {pkt.humidity}% &#125;</span>
//                       <span className="text-emerald-500 font-bold">&gt;&gt; REDIS PUB/SUB DISTRIBUTED OK</span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Activity, Radio, Tablet, Smartphone, Cpu, Send, RefreshCw, Terminal, ChevronRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RealtimeDatabaseSimulator() {
  const [channels, setChannels] = useState([
    { id: "living-room", label: "Smart Living Room Screen", temp: 22, active: true },
    { id: "mobile-app", label: "Developer Mobile Client", temp: 22, active: true },
    { id: "admin-console", label: "Industrial Supervisor Console", temp: 22, active: true }
  ]);

  const [masterTemp, setMasterTemp] = useState(22);
  const [pulseWaves, setPulseWaves] = useState([]);
  const [socketLog, setSocketLog] = useState([
    { actor: "Socket Server", event: "HANDSHAKE_ESTABLISHED", detail: "WebSocket connection upgraded on Port 3000", time: "09:00:03 AM", badge: "info" }
  ]);
  const [broadcastCount, setBroadcastCount] = useState(0);

  // Trigger a broadcast ripple anytime the master temperature changes
  const handleTempAdjust = (newVal) => {
    setMasterTemp(newVal);

    // Increment logs
    setBroadcastCount(prev => prev + 1);

    // Add transaction log entry
    const timestamp = new Date().toLocaleTimeString();
    setSocketLog(prev => [
      {
        actor: "Publish IoT (Device)",
        event: "PUB telemetry/thermostat",
        detail: `Payload: {"temp": ${newVal}°C, "qos": 1}`,
        time: timestamp,
        badge: "pub"
      },
      {
        actor: "Socket Server Broker",
        event: "BROADCAST to connected clients",
        detail: `Distributed telemetry to ${channels.filter(c => c.active).length} sub-subscribers`,
        time: timestamp,
        badge: "server"
      },
      ...prev
    ].slice(0, 50));

    // Propagate changes to subscribers instantly
    setChannels(prev =>
      prev.map(ch => (ch.active ? { ...ch, temp: newVal } : ch))
    );

    // Create dual glowing ripples to visualize transmission
    const waveId = Date.now();
    setPulseWaves(prev => [...prev, waveId]);
    setTimeout(() => {
      setPulseWaves(prev => prev.filter(w => w !== waveId));
    }, 1200);
  };

  const toggleSubState = (id) => {
    setChannels(prev =>
      prev.map(ch => {
        if (ch.id === id) {
          const nextActive = !ch.active;
          const timestamp = new Date().toLocaleTimeString();
          // Add websocket status log
          setSocketLog(l => [
            {
              actor: "Socket Server",
              event: nextActive ? "SUBSCRIBE" : "UNSUBSCRIBE",
              detail: `${ch.label} requested socket ${nextActive ? "bind" : "un-bind"}.`,
              time: timestamp,
              badge: "info"
            },
            ...l
          ]);
          return { ...ch, active: nextActive, temp: nextActive ? masterTemp : "--" };
        }
        return ch;
      })
    );
  };

  return (
    <div id="socket-simulator" className="glass-panel rounded-3xl p-6 sm:p-8 glow-violet relative overflow-hidden transition-all duration-300">

      {/* Decorative Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-950/40 border border-violet-900/30 font-mono text-[10px] text-violet-400 uppercase tracking-widest mb-3">
            Realtime Websockets Segment
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-100 flex items-center gap-2.5">
            <Radio className="text-violet-400 w-6 h-6 animate-pulse" />
            Distributed WebSocket PubSub IoT Gateway
          </h3>
          <p className="text-slate-405 text-sm font-sans mt-2 max-w-2xl leading-relaxed">
            Experience sub-50ms atomic state propagation. Rotate the central thermostat slider to publish dynamic telemetry, and see how server brokers broadcast event payloads instantly across all sockets.
          </p>
        </div>

        {/* Global socket statistics ticker */}
        <div className="bg-slate-950/70 p-4 border border-slate-800 rounded-2xl flex items-center gap-4 shrink-0 shadow-inner">
          <div className="text-center border-r border-slate-800 pr-4">
            <span className="text-[9px] uppercase font-mono text-slate-500 tracking-wider">Broadcaster</span>
            <div className="text-sm font-mono font-black text-violet-400 mt-0.5">WS PubSub</div>
          </div>
          <div className="text-center font-mono text-xs">
            <span className="text-[9px] uppercase text-slate-500 tracking-wider block">Total broadcasts</span>
            <span className="font-black text-slate-101 text-sm bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-center">
              {broadcastCount} pkts
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Thermostat Dial controls */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-slate-950/50 p-6 rounded-2xl border border-slate-900/90 relative shadow-inner">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block absolute top-4 left-4">
            Thermostat Controller (PUB Node)
          </span>

          <div className="relative flex items-center justify-center h-48 w-48 mt-4">
            {/* Visual broadcast wave ripples */}
            <AnimatePresence>
              {pulseWaves.map((wave) => (
                <motion.div
                  key={wave}
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-full border border-violet-500/80 pointer-events-none"
                />
              ))}
            </AnimatePresence>

            {/* Glowing circle representation */}
            <div className="absolute inset-2.5 rounded-full bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-center shadow-lg">
              <span className="text-[9px] font-mono text-violet-400 tracking-widest font-black uppercase mb-1">
                temperature
              </span>
              <span className="text-4xl font-display font-black text-slate-100 select-none tracking-tighter">
                {masterTemp}°C
              </span>
              <span className="text-[9px] font-mono text-slate-450 mt-1 uppercase">
                active pubsub
              </span>
            </div>
          </div>

          <div className="w-full mt-6 space-y-2">
            <input
              type="range"
              min="15"
              max="35"
              value={masterTemp}
              onChange={(e) => handleTempAdjust(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-ew-resize accent-violet-500 focus:outline-none border border-slate-800"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-505">
              <span>15°C (Min)</span>
              <span>35°C (Max)</span>
            </div>
          </div>
        </div>

        {/* Middle Real-time subscribers list */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-1.5">
            <Tablet className="w-4 h-4 text-violet-400" />
            Connected client subscribers (SUB Nodes)
          </h4>

          <div className="space-y-3.5">
            {channels.map((chan) => (
              <div
                key={chan.id}
                className={`p-4 border rounded-xl flex items-center justify-between transition-all duration-300 relative overflow-hidden ${
                  chan.active
                    ? "bg-slate-900/40 border-violet-900/30 text-slate-100"
                    : "bg-slate-950/20 border-slate-900 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`p-2 rounded-lg ${chan.active ? "bg-violet-950/40 text-violet-400" : "bg-slate-950 text-slate-600"}`}>
                    {chan.id === "living-room" && <Cpu className="w-4.5 h-4.5" />}
                    {chan.id === "mobile-app" && <Smartphone className="w-4.5 h-4.5" />}
                    {chan.id === "admin-console" && <Tablet className="w-4.5 h-4.5" />}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs">{chan.label}</h5>
                    <p className="text-[10px] font-mono text-slate-500">
                      State: {chan.active ? "WS_LISTENING" : "SESSION_DISCONNECTED"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 relative z-10 font-mono">
                  <div className="text-right">
                    <span className={`text-base font-black ${chan.active ? "text-violet-400" : "text-slate-650"}`}>
                      {chan.temp !== "--" ? `${chan.temp}°C` : "MOCK_404"}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleSubState(chan.id)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded border uppercase cursor-pointer transition-all ${
                      chan.active
                        ? "bg-violet-950/45 text-violet-300 border-violet-900/50 hover:bg-violet-900/40"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    {chan.active ? "drop" : "bind"}
                  </button>
                </div>

                {/* Active pulse flash block under lay */}
                {chan.active && (
                  <motion.div
                    key={masterTemp}
                    initial={{ opacity: 0.1, x: "-10%" }}
                    animate={{ opacity: 0, x: "110%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent pointer-events-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Socket Log Terminal */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-1.5">
            <Terminal className="w-4 h-4 text-violet-400" />
            Telemetry Console Logs
          </h4>

          <div className="bg-slate-950/95 border border-slate-900 rounded-xl p-3 max-h-[220px] overflow-auto text-[10px] font-mono text-slate-400 space-y-2 select-text shadow-inner">
            {socketLog.map((log, sIdx) => (
              <div key={sIdx} className="space-y-0.5 border-b border-slate-900/50 pb-1.5 last:border-0 leading-normal">
                <div className="flex items-center justify-between">
                  <span className={`font-extrabold ${
                    log.badge === "pub" ? "text-violet-400" :
                    log.badge === "server" ? "text-emerald-400" :
                    "text-indigo-400"
                  }`}>
                    {log.actor}
                  </span>
                  <span className="text-slate-600 text-[8px]">{log.time}</span>
                </div>
                <div className="text-slate-500 text-[8px] font-bold uppercase">{log.event}</div>
                <p className="text-slate-300 text-[9.5px] leading-tight select-all">{log.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
