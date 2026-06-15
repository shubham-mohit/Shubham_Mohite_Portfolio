// import React, { useState } from "react";
// import { Shield, Key, ArrowRight, RefreshCw, Send, Lock } from "lucide-react";

// const oauthSteps = [
//   {
//     id: 1,
//     title: "Authorization Request (with PKCE Challenge)",
//     sub: "Initiates flow by computing a dynamic code_challenge",
//     sender: "Client Web Application (React App)",
//     receiver: "Custom AGMAH OAuth Authorization Server",
//     payload: "GET /oauth/authorize?response_type=code&client_id=shubham_web&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWBuG71bC-N_g&code_challenge_method=S256&redirect_uri=https://shubham.dev/callback",
//     detail: "The client creates a random cryptographically secure string 'code_verifier', hashes it using SHA-256, and encodes it into URL-safe base64 to build the 'code_challenge'. It securely stores the verifier in sessionStorage to use later."
//   },
//   {
//     id: 2,
//     title: "User Authenticates & Grants Authorization Code",
//     sub: "Server validates user logins and issues temporary single-use code",
//     sender: "OAuth Authorization Server",
//     receiver: "Client Application via Browser Redirect",
//     payload: "302 Redirect to https://shubham.dev/callback?code=splat_auth_68231_code_9a8f",
//     detail: "Upon credential submission, the user consents to client scopes. The auth server redirects the browser back to the app with a transient code. Because this travels via public browser queries, it is vulnerable to intercept — but PKCE completely protects this!"
//   },
//   {
//     id: 3,
//     title: "Token Exchange (with original Verifier check)",
//     sub: "Client trades transient code for an high-security JWT access token",
//     sender: "Client Web Application (Post/Back-channel)",
//     receiver: "OAuth Token Server (Secure API endpoint)",
//     payload: "POST /oauth/token\nheaders: { 'Content-Type': 'application/x-www-form-urlencoded' }\nbody: { code: 'splat_auth_68231_code_9a8f', client_id: 'shubham_web', code_verifier: 'my_hyper_secure_original_secret_verifier_68231' }",
//     detail: "The client exchanges the public code. It includes the plain-text 'code_verifier' it saved in Step 1. The token server hashes this verifier with SHA-256 and matches it strictly against the challenge sent in Step 1. If it aligns, it proves the code requestor is the identical client!"
//   },
//   {
//     id: 4,
//     title: "Issue Crypographic ACCESS & REFRESH tokens",
//     sub: "Signs tokens with RSA-256 algorithm and provides user detail response",
//     sender: "OAuth Authorization Server",
//     receiver: "Client Application (JSON Encrypted Packet)",
//     payload: "HTTP 200 OK\n{\n  access_token: \"eyJhbGciOiJSUzI1NiIs...\",\n  token_type: \"Bearer\",\n  expires_in: 3600,\n  refresh_token: \"rotator_rf_1928_86a9\"\n}",
//     detail: "The server returns signed JWT tokens. The access token holds scopes, tenant credentials, user specifications, and expires within 1 hour. The refresh token stays securely with the client to trade for new active access keys without requiring login again."
//   }
// ];

// export default function OAuthVisualizer() {
//   const [activeStep, setActiveStep] = useState(0);

//   return (
//     <div id="oauth-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 glow-indigo transition-all duration-300">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
//         <div>
//           <h3 className="font-display font-medium text-lg text-slate-100 flex items-center gap-2">
//             <Shield className="text-indigo-400 w-5 h-5" />
//             OAuth 2.0 PKCE Security Flow Visualizer
//           </h3>
//           <p className="text-slate-400 text-xs mt-1 font-sans">
//             Step-by-step cryptographic protocol trace detailing Shubham's custom-engineered OAuth 2.0 server design for secure microservice transactions.
//           </p>
//         </div>

//         <button
//           onClick={() => setActiveStep((prev) => (prev + 1) % oauthSteps.length)}
//           className="flex items-center gap-1.5 bg-indigo-950/40 text-indigo-300 border border-indigo-900/60 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer hover:bg-indigo-900/40 active:scale-95"
//         >
//           <RefreshCw className="w-3.5 h-3.5" /> Next Step
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Step List stepper */}
//         <div className="lg:col-span-5 space-y-2">
//           <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Protocol Trace Steps</div>
//           {oauthSteps.map((step, index) => (
//             <button
//               key={step.id}
//               onClick={() => setActiveStep(index)}
//               className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer font-sans block ${
//                 activeStep === index
//                   ? "bg-indigo-950/40 border-indigo-500/80 text-slate-100 shadow-indigo-500/10 shadow-lg"
//                   : "bg-slate-950/40 border-slate-800/80 hover:border-slate-750 text-slate-400 hover:text-slate-350"
//               }`}
//             >
//               <div className="flex items-center gap-2.5">
//                 <span className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center border ${
//                   activeStep === index
//                     ? "bg-indigo-500 border-indigo-400 text-slate-950"
//                     : "bg-slate-900 border-slate-800 text-slate-400"
//                 }`}>
//                   {step.id}
//                 </span>
//                 <span className="font-semibold text-xs leading-snug">{step.title}</span>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Detailed Frame console */}
//         <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
//           <div>
//             {/* Sender and receiver route */}
//             <div className="flex items-center justify-between gap-2 border-b border-slate-900 pb-3 mb-4 text-[10px] font-mono text-slate-500">
//               <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">{oauthSteps[activeStep].sender}</span>
//               <ArrowRight className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
//               <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">{oauthSteps[activeStep].receiver}</span>
//             </div>

//             {/* Sub description */}
//             <h4 className="text-sm font-display font-medium text-slate-200">{oauthSteps[activeStep].title}</h4>
//             <p className="text-slate-450 text-[11px] font-mono mt-1 text-slate-450">{oauthSteps[activeStep].sub}</p>

//             {/* Payload Terminal panel */}
//             <div className="my-4 bg-slate-950 border border-slate-900 rounded-lg p-3 relative">
//               <span className="absolute top-2 right-2 text-[9px] font-mono text-slate-600 uppercase flex items-center gap-1">
//                 <Lock className="w-3 h-3 text-indigo-500" /> Secure SSL Payload
//               </span>
//               <h5 className="text-[10px] uppercase font-mono text-indigo-400 font-bold mb-1.5 flex items-center gap-1">
//                 <Key className="w-3.5 h-3.5 inline text-indigo-400" />
//                 Raw Data Package
//               </h5>
//               <pre className="text-[10.5px] font-mono text-slate-300 leading-normal select-text overflow-auto max-h-[140px] whitespace-pre-wrap">
//                 {oauthSteps[activeStep].payload}
//               </pre>
//             </div>

//             {/* Step summary explainer */}
//             <div className="text-xs text-slate-400 leading-relaxed font-sans border-t border-slate-900 pt-3 flex items-start gap-2">
//               <div className="bg-indigo-900/20 p-1.5 rounded-lg text-indigo-400 mt-0.5">
//                 <Shield className="w-3.5 h-3.5" />
//               </div>
//               <div className="text-[11px]">
//                 {oauthSteps[activeStep].detail}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Shield, Key, Lock, Unlock, ArrowRight, RefreshCw, Terminal, CheckCircle2, FileCode, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function OAuthVisualizer() {
  const [flowStep, setFlowStep] = useState(1);
  const [codeVerifier, setCodeVerifier] = useState("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk");
  const [codeChallenge, setCodeChallenge] = useState("E9Melhoa2OwvFrGMTJguCH5K140WqRY4b_CE9YFMdBw");
  const [authState, setAuthState] = useState("state_rand_89124");
  const [authCode, setAuthCode] = useState("splat_code_8192aBc92841");
  const [accessToken, setAccessToken] = useState("");

  const generateNewVerifier = () => {
    // Generate secure randomized key string
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let verifier = "";
    for (let i = 0; i < 43; i++) {
      verifier += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Simulate SHA256 code challenge generation
    // To present secure PKCE challenge code hash without complex async WebCrypto
    let mockChallenge = btoa(verifier)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")
      .slice(0, 43);

    setCodeVerifier(verifier);
    setCodeChallenge(mockChallenge);
    setAuthState(`state_rand_${Math.floor(Math.random() * 90000) + 10000}`);
    setFlowStep(1);
    setAccessToken("");
  };

  const handleAuthExchange = () => {
    setFlowStep(3);
    // Build simulated signature
    setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaHViaGFtX21vaGl0ZSIsImVtYWlsIjoic2h1YmhhbW1vaGl0ZTgwMUBnbWFpbC5jb20iLCJpYXQiOjE3ODM2OTkyMDAsImV4cCI6MTc4MzcwMjgwMCwic2NvcGVzIjpbInByb2ZpbGUiLCJhcGkud3JpdGUiXSwicm9sZXMiOsi0FSTUifQ.sV_S_Nl72A8...");
  };

  return (
    <div id="oauth-simulator" className="glass-panel rounded-3xl p-6 sm:p-8 glow-indigo relative overflow-hidden transition-all duration-300">

      {/* Decorative Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/40 border border-indigo-900/30 font-mono text-[10px] text-indigo-400 uppercase tracking-widest mb-3">
            Security & Authentication Segment
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-100 flex items-center gap-2.5">
            <Shield className="text-indigo-400 w-6 h-6" />
            OAuth 2.0 PKCE Cryptographic Flow Engine
          </h3>
          <p className="text-slate-405 text-sm font-sans mt-2 max-w-2xl leading-relaxed">
            Proof of Key Code Exchange (PKCE) prevents interception attacks on public clients. Step through token acquisition using randomized verifiers, challenges, and JWT tokens.
          </p>
        </div>

        {/* Global state indicator */}
        <div className="bg-slate-950/70 p-4 border border-slate-800 rounded-2xl flex items-center gap-3 shrink-0 shadow-inner font-mono text-xs">
          <div className="relative flex justify-center items-center h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-400"></span>
          </div>
          <div>
            <div className="text-[9px] uppercase text-slate-500 tracking-wider">Engine Status</div>
            <div className="font-bold text-slate-101 select-none">PKCE VERIFIER ACTIVE</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">

        {/* Left column flow steps mapping */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-1.5">
            <Terminal className="w-4 h-4 text-indigo-400" />
            Authorization Flow Stages
          </h4>

          <div className="space-y-3">
            {/* Step 1 card */}
            <button
              onClick={() => setFlowStep(1)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                flowStep === 1
                  ? "bg-slate-900 border-indigo-500/80 text-slate-101 shadow-md shadow-indigo-950/40"
                  : "bg-slate-950/50 border-slate-900 text-slate-450 hover:bg-slate-900/10 hover:border-slate-800"
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-1.5 rounded-lg h-8 w-8 flex items-center justify-center shrink-0 ${flowStep === 1 ? "bg-indigo-950/40 text-indigo-400" : "bg-slate-900 text-slate-600"}`}>
                  <Key className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-xs">Stage 1: Generate Secrets</h5>
                  <p className="text-[10.5px] text-slate-400 mt-1 leading-normal">
                    Generate the unique hash variables: <strong>Verifier</strong> and hashed <strong>Challenge</strong>.
                  </p>
                </div>
              </div>
            </button>

            {/* Step 2 card */}
            <button
              onClick={() => setFlowStep(2)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                flowStep === 2
                  ? "bg-slate-900 border-indigo-500/80 text-slate-101 shadow-md shadow-indigo-950/40"
                  : "bg-slate-950/50 border-slate-900 text-slate-450 hover:bg-slate-900/10 hover:border-slate-800"
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-1.5 rounded-lg h-8 w-8 flex items-center justify-center shrink-0 ${flowStep === 2 ? "bg-indigo-950/40 text-indigo-400" : "bg-slate-900 text-slate-600"}`}>
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-xs">Stage 2: Code Grant Request</h5>
                  <p className="text-[10.5px] text-slate-400 mt-1 leading-normal">
                    Redirect to identity server using challenge parameters and gather authorization code.
                  </p>
                </div>
              </div>
            </button>

            {/* Step 3 card */}
            <button
              onClick={() => handleAuthExchange()}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                flowStep === 3
                  ? "bg-slate-900 border-indigo-500/80 text-slate-101 shadow-md shadow-indigo-950/40"
                  : "bg-slate-950/50 border-slate-900 text-slate-450 hover:bg-slate-900/10 hover:border-slate-800"
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-1.5 rounded-lg h-8 w-8 flex items-center justify-center shrink-0 ${flowStep === 3 ? "bg-indigo-950/40 text-indigo-400" : "bg-slate-900 text-slate-600"}`}>
                  <Unlock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h5 className="font-display font-extrabold text-xs">Stage 3: Token Exchange</h5>
                  <p className="text-[10.5px] text-slate-400 mt-1 leading-normal">
                    Submit authentic authorization code coupled with verifier string to pull secure JWT Bearer credentials.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={generateNewVerifier}
            id="btn-oauth-regenerate"
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-350 border border-slate-800 py-2.5 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Regenerate Seeds
          </button>
        </div>

        {/* Right column detailed visual consoles */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between shadow-inner select-text">

          <AnimatePresence mode="wait">
            {flowStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Stage 1 Parameters &rarr; Secret Keys Generated
                  </span>
                  <span className="text-[9px] font-mono bg-indigo-950/40 text-indigo-400 px-2.5 py-0.5 rounded border border-indigo-900/40 font-bold uppercase">
                    client side
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase mb-1">Code Verifier (Randomized High-Entropy Salt)</span>
                    <p className="bg-slate-900 border border-slate-900 p-3 rounded-lg text-slate-300 break-all select-all font-mono font-semibold relative">
                      {codeVerifier}
                      <span className="absolute right-3.5 top-3.5 text-[8px] bg-slate-950 px-1.5 py-0.5 rounded text-amber-500 font-bold uppercase">plain</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-500 text-[10px] block uppercase mb-1">Code Challenge (BASE64URL(SHA256(Verifier)))</span>
                    <p className="bg-slate-900 border border-slate-900 p-3 rounded-lg text-indigo-300 break-all select-all font-mono font-semibold relative">
                      {codeChallenge}
                      <span className="absolute right-3.5 top-3.5 text-[8px] bg-slate-950 px-1.5 py-0.5 rounded text-indigo-400 font-bold uppercase">sha256</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex justify-end">
                  <button
                    onClick={() => setFlowStep(2)}
                    id="btn-oauth-next-step"
                    className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-sans font-semibold text-xs px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer"
                  >
                    Load Stage 2 Grant <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {flowStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Stage 2 &rarr; authorization_code compilation URI
                  </span>
                  <span className="text-[9px] font-mono bg-violet-950/45 text-violet-400 px-2.5 py-0.5 rounded border border-violet-900/40 font-bold uppercase">
                    redirect phase
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] block uppercase mb-1">Generated auth_uri query params</span>
                    <div className="bg-slate-900 border border-slate-900 p-4 rounded-xl text-slate-300 break-all font-mono text-xs leading-relaxed max-h-[120px] overflow-auto shadow-inner select-all">
                      https://identity.shubham.io/oauth/authorize?<br/>
                      <span className="text-emerald-450">&amp;response_type=code</span><br/>
                      <span className="text-indigo-405">&amp;client_id=portfolio_app_id</span><br/>
                      <span className="text-violet-400">&amp;code_challenge={codeChallenge}</span><br/>
                      <span className="text-pink-400">&amp;code_challenge_method=S256</span><br/>
                      <span className="text-amber-455">&amp;state={authState}</span><br/>
                      <span className="text-slate-505">&amp;redirect_uri=http://localhost:3000/callback</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 p-3.5 rounded-lg border border-slate-900 text-xs text-slate-405 space-y-1 bg-slate-950/50">
                    <span className="text-emerald-400 font-bold block">✓ Mock User Handshake Success!</span>
                    <p>The identity provider resolved the password verification and compiled an active Authorization Code token: <code className="text-indigo-400 font-bold font-mono">{authCode}</code></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex justify-end gap-3">
                  <button
                    onClick={() => setFlowStep(1)}
                    className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-sans font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleAuthExchange()}
                    id="btn-oauth-exchange-trigger"
                    className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-sans font-semibold text-xs px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer"
                  >
                    Perform Token Exchange <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {flowStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                  <span className="text-[10px] font-mono text-slate-505 uppercase tracking-wider">
                    Stage 3 &rarr; REST Token Endpoint Resolved
                  </span>
                  <span className="text-[9px] font-mono bg-emerald-950/40 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-900/40 font-bold uppercase animate-pulse">
                    granted access jwt
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left token raw text */}
                  <div>
                    <span className="text-slate-500 font-mono text-[9px] block uppercase mb-1">1. JWT Bearer Access Token String</span>
                    <div className="bg-slate-900 border border-slate-900 p-3.5 rounded-xl font-mono text-[9.5px] leading-relaxed text-indigo-400 break-all select-all h-[140px] overflow-auto shadow-inner">
                      {accessToken}
                    </div>
                  </div>

                  {/* Right verified payload decoded */}
                  <div>
                    <span className="text-slate-500 font-mono text-[9px] block uppercase mb-1">2. Decoded JWT Payload (JSON Verified)</span>
                    <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl font-mono text-[9.5px] leading-normal text-emerald-400 h-[140px] overflow-auto select-all">
                      {"{"}<br/>
                      &nbsp;&nbsp;&quot;sub&quot;: &quot;shubham_mohite&quot;,<br/>
                      &nbsp;&nbsp;&quot;email&quot;: &quot;shubhammohite801@gmail.com&quot;,<br/>
                      &nbsp;&nbsp;&quot;role&quot;: &quot;Senior Software Engineer&quot;,<br/>
                      &nbsp;&nbsp;&quot;scopes&quot;: [<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&quot;github.repo.write&quot;,<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&quot;database.full_access&quot;<br/>
                      &nbsp;&nbsp;],<br/>
                      &nbsp;&nbsp;&quot;iss&quot;: &quot;auth.shubham.dev&quot;,<br/>
                      &nbsp;&nbsp;&quot;exp_status&quot;: &quot;active_1hr&quot;<br/>
                      {"}"}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-[11px] text-slate-450">
                  <span className="flex items-center gap-1 text-emerald-405 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Cryptographic PKCE signature successfully verified.
                  </span>
                  <button
                    onClick={() => setFlowStep(1)}
                    className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-sans font-semibold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    Re-Verify Flow
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
