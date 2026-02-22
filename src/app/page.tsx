"use client";

import { useEffect, useState, useRef } from "react";
import { Activity, AlertTriangle, Shield, CheckCircle2, Pause, Code, Lock, Unlock, Zap, Server, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VeritasVerdict {
  timestamp: string;
  decision: string;
  negotiated_delay: string;
  friction: string;
  cryptographic_reasoning_hash: string;
  savings_impact: string;
  involved_intents?: any[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export default function AppRoot() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <AdminLogin key="login" onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <AntigravityNexus key="nexus" onLogout={() => setIsAuthenticated(false)} />
      )}
    </AnimatePresence>
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);

    // Simulate network delay
    setTimeout(() => {
      if (username === "admin@gmail.com" && password === "admin") {
        onLogin();
      } else {
        setError(true);
        setAuthenticating(false);
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw",
        background: "radial-gradient(circle at center, rgba(0,255,204,0.05) 0%, var(--bg-core) 60%)"
      }}
    >
      <motion.div
        className="glass-panel"
        style={{ width: "400px", maxWidth: "90%", padding: "3rem 2rem", border: "1px solid var(--border-glow)", position: "relative" }}
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div style={{ position: "absolute", top: -1, left: "10%", width: "80%", height: 2, background: "linear-gradient(90deg, transparent, var(--neon-cyan), transparent)", boxShadow: "0 0 10px var(--neon-cyan)" }} />

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Shield size={48} className="header-accent" style={{ marginBottom: "1rem", animation: "pulseGlow 2s infinite" }} />
          <h1 className="header-accent" style={{ fontSize: "2rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Veritas Mesh</h1>
          <p style={{ color: "var(--text-sec)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Sovereign Admin Authorization
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ position: "relative" }}>
            <Server size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-sec)" }} />
            <input
              type="email"
              placeholder="SOVEREIGN ID / EMAIL"
              className="login-input"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(false); }}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <Lock size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-sec)" }} />
            <input
              type="password"
              placeholder="CRYPTOGRAPHIC KEY"
              className="login-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              required
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ color: "var(--neon-red)", fontSize: "0.85rem", textAlign: "center", fontFamily: "var(--font-mono)" }}
              >
                ACCESS DENIED: INSUFFICIENT CLEARANCE
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="btn btn-primary" disabled={authenticating} style={{ marginTop: "1rem" }}>
            {authenticating ? (
              <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Activity size={16} className="spinner" /> VERIFYING...</span>
            ) : (
              <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}><Unlock size={16} /> INITIALIZE NEXUS</span>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function AntigravityNexus({ onLogout }: { onLogout: () => void }) {
  const [verdicts, setVerdicts] = useState<VeritasVerdict[]>([]);
  const [selectedVerdict, setSelectedVerdict] = useState<VeritasVerdict | null>(null);
  const [stasisMode, setStasisMode] = useState(false);
  const [activeCollisions, setActiveCollisions] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation Logic: Feed AI intents to the kernel
  useEffect(() => {
    if (stasisMode) return;

    const generateIntents = async () => {
      const roles = ["DevOps_Bot", "SecOps_Bot", "Finance_Bot", "Sales_Bot"];
      const resources = ["DB_Main", "API_Gateway", "S3_Bucket", "Auth_Service"];
      const actions = ["READ", "WRITE", "DELETE", "FORCE_DROP", "UPDATE"];

      const intents = [
        {
          agent_id: `A-${Math.floor(Math.random() * 9000) + 1000}`,
          agent_role: roles[Math.floor(Math.random() * roles.length)],
          sp_score: Math.random() * 10,
          target_resource: resources[Math.floor(Math.random() * resources.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          chain_of_intent: "Executing scheduled optimization routine"
        },
        {
          agent_id: `B-${Math.floor(Math.random() * 9000) + 1000}`,
          agent_role: roles[Math.floor(Math.random() * roles.length)],
          sp_score: Math.random() * 10,
          target_resource: resources[Math.floor(Math.random() * resources.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          chain_of_intent: "Urgent deployment patch applied"
        }
      ];

      // Occasional forced collisions
      if (Math.random() > 0.6) {
        intents[1].target_resource = intents[0].target_resource;
      }

      try {
        const res = await fetch('/api/arbitrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ intents })
        });
        const verdict = await res.json();

        if (verdict.friction === 'high' || verdict.decision === 'HARD_BLOCK') {
          setActiveCollisions(prev => prev + 1);
          setTimeout(() => setActiveCollisions(prev => Math.max(0, prev - 1)), 2500);
        }

        setVerdicts(prev => [verdict, ...prev].slice(0, 10)); // keep last 10
      } catch (e) {
        console.error("Kernel unreachable", e);
      }
    };

    const interval = setInterval(generateIntents, 2500);
    return () => clearInterval(interval);
  }, [stasisMode]);

  // GravityWell Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.width,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          color: Math.random() > 0.4 ? '#00FFCC' : '#1e3a8a',
          size: Math.random() * 3 + 1.5
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.fillStyle = 'rgba(5, 6, 10, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isCollidingState = activeCollisions > 0;
      const centerY = canvas.height / 2;
      const centerX = canvas.width / 2;

      particles.forEach(p => {
        // Apply "Gravity Well" physics
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isCollidingState && p.color === '#00FFCC') p.color = '#FF0044'; // Red flare on collision
        if (!isCollidingState && p.color === '#FF0044') p.color = '#00FFCC';

        const pull = stasisMode ? 0 : 0.03;
        p.vx += (dx / dist) * pull;
        p.vy += (dy / dist) * pull;

        if (!stasisMode) {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Friction limits speed
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        particles.forEach(p2 => {
          const cDist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (cDist < 45) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isCollidingState ? 'rgba(255,0,68,0.4)' : `rgba(0,255,204,${1 - cDist / 45})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
      });

      // Draw Nexus Kernel Center
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      ctx.fillStyle = stasisMode ? '#FF0044' : '#00FFCC';
      ctx.shadowBlur = 30;
      ctx.shadowColor = stasisMode ? '#FF0044' : '#00FFCC';
      ctx.fill();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [stasisMode, activeCollisions]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="mesh-container"
    >
      {/* Sidebar Controls & Meta */}
      <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="glass-panel" style={{ textAlign: "center", position: "relative" }}>

          <button
            onClick={onLogout}
            style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "var(--text-sec)", cursor: "pointer", transition: "color 0.2s" }}
            title="Log Out"
          >
            <Shield size={18} />
          </button>

          <h1 className="header-accent" style={{ fontSize: "2rem", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>Veritas Mesh</h1>
          <p style={{ color: "var(--neon-cyan)", fontSize: "0.9rem", marginBottom: "1.5rem", fontFamily: "var(--font-mono)", opacity: 0.8 }}>Antigravity Nexus Control</p>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", padding: "0.8rem", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-sec)", display: "flex", alignItems: "center", gap: "6px" }}><Activity size={14} /> Node Status</span>
            <span style={{ color: stasisMode ? "var(--neon-red)" : "var(--neon-cyan)", fontWeight: "bold", fontSize: "0.85rem", textShadow: `0 0 8px ${stasisMode ? 'var(--neon-red)' : 'var(--neon-cyan)'}` }}>
              {stasisMode ? "STASIS PROTCOL ACTIVE" : "OPTIMAL ACTIVE"}
            </span>
          </div>

          <button
            className="btn btn-danger"
            onClick={() => setStasisMode(!stasisMode)}
            style={{ marginBottom: "1rem", height: "3rem", fontSize: "0.9rem", fontWeight: "bold" }}
          >
            <AlertTriangle size={18} />
            {stasisMode ? "RESUME MESH OPERATIONS" : "FORCE MESH STASIS"}
          </button>
        </div>

        {/* GravityWell Viz */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", color: "var(--text-sec)" }}>
            <Zap size={16} className={activeCollisions > 0 ? "text-neon-red" : "header-accent"} />
            Conflict Density Map
          </h3>
          <div style={{ position: "relative", width: "100%", height: "260px", borderRadius: "10px", overflow: "hidden", border: `1px solid ${activeCollisions > 0 ? 'rgba(255,0,68,0.4)' : 'rgba(0,255,204,0.1)'}`, background: "#000" }}>
            <canvas
              ref={canvasRef}
              width={350}
              height={260}
              style={{ width: "100%", height: "100%", display: "block" }}
            />
            <AnimatePresence>
              {activeCollisions > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  style={{ position: "absolute", top: "10px", right: "10px", color: "#000", background: "var(--neon-red)", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.75rem", boxShadow: "0 0 15px var(--neon-red)" }}
                >
                  COLLISION DETECTED
                </motion.div>
              )}
            </AnimatePresence>
            <div style={{ position: "absolute", bottom: "10px", left: "10px", color: "var(--text-sec)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", opacity: 0.6 }}>
              Gravity Intensity: {stasisMode ? '0.00' : '0.03'}G
            </div>
          </div>
        </div>

        <div className="glass-panel">
          <h3 style={{ marginBottom: "1rem", fontSize: "1rem", color: "var(--text-sec)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Code size={16} />
            Active Protocol Override
          </h3>
          <div className="code-block" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
            <span style={{ color: "#c678dd" }}>const</span> <span style={{ color: "#61afef" }}>laws</span> = {'{'}
            <br />  <span style={{ color: "#98c379" }}>"PreAction_Broadcast"</span>: <span style={{ color: "#e5c07b" }}>"Strict"</span>,
            <br />  <span style={{ color: "#98c379" }}>"Strategy"</span>: <span style={{ color: "#e5c07b" }}>"Nash Equilibrium"</span>,
            <br />  <span style={{ color: "#98c379" }}>"Latency_SLA"</span>: <span style={{ color: "#e5c07b" }}>"&lt;30ms"</span>
            <br />{'}'};
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ display: "flex", flexDirection: "column", gap: "1.5rem", height: "100%", overflow: "hidden" }}>
        <div className="glass-panel stat-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "rgba(0,255,204,0.05)", border: "1px solid rgba(0,255,204,0.1)", borderRadius: "8px", padding: "1.5rem" }}>
            <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Active Agents</div>
            <div style={{ color: "var(--neon-cyan)", fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>14,209</div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: "1.5rem" }}>
            <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Total Arbitrations</div>
            <div style={{ color: "var(--text-primary)", fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>{Math.floor(Date.now() / 10000 % 100000).toLocaleString()}</div>
          </div>
          <div style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.1)", borderRadius: "8px", padding: "1.5rem" }}>
            <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Mesh Yield</div>
            <div style={{ color: "#10B981", fontSize: "2rem", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>+24.1%</div>
          </div>
        </div>

        {/* DecisionFeed Table */}
        <div className="glass-panel" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <h2 style={{ marginBottom: "1.5rem", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "10px" }}>
            Supreme Court Verdict Logs
            <span style={{ fontSize: "0.7rem", backgroundColor: "rgba(0,255,204,0.1)", color: "var(--neon-cyan)", padding: "4px 8px", borderRadius: "12px", fontFamily: "var(--font-mono)" }}>LIVE FEED</span>
          </h2>

          <div style={{ flex: 1, overflowY: "auto" }}>
            <table className="data-table">
              <thead style={{ position: "sticky", top: 0, background: "var(--panel-bg)", backdropFilter: "blur(10px)", zIndex: 10 }}>
                <tr>
                  <th>Timestamp</th>
                  <th>Friction</th>
                  <th>Verdict Details</th>
                  <th>Logic Hash</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {verdicts.length === 0 && (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <td colSpan={5} style={{ textAlign: "center", padding: "4rem", color: "var(--text-sec)" }}>
                        <Activity size={24} className="spinner" style={{ margin: "0 auto 1rem", display: "block", color: "var(--neon-cyan)" }} />
                        Listening to Mesh Activity...
                      </td>
                    </motion.tr>
                  )}
                  {verdicts.map((v, i) => (
                    <motion.tr
                      key={`${v.cryptographic_reasoning_hash}-${i}`}
                      initial={{ opacity: 0, x: -20, background: "rgba(0,255,204,0.1)" }}
                      animate={{ opacity: 1 - (i * 0.08), x: 0, background: "transparent" }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setSelectedVerdict(v)}
                      style={{ cursor: "pointer" }}
                      className="log-row"
                    >
                      <td style={{ color: "var(--text-sec)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{new Date(v.timestamp).toLocaleTimeString()}</td>
                      <td>
                        <span className={v.friction === 'high' ? 'badge badge-friction' : 'badge badge-stable'} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          {v.friction === 'high' ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                          {v.friction.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>
                        {v.decision.includes('HARD_BLOCK') ? (
                          <span style={{ color: "var(--neon-red)", fontWeight: "bold", background: "rgba(255,0,68,0.1)", padding: "4px 8px", borderRadius: "4px" }}>{v.decision}</span>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {v.decision.split(',').map((d, idx) => (
                              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.02)", padding: "4px 8px", borderRadius: "4px" }}>
                                {d.includes('AUTHORIZE') ? <CheckCircle2 size={14} color="var(--neon-cyan)" /> : <Pause size={14} color="#F59E0B" />}
                                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>{d.trim()}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div style={{ fontSize: "0.75rem", color: "var(--text-sec)", marginTop: "0.4rem", fontFamily: "var(--font-mono)" }}>
                          SLA Rule: <span style={{ color: "#A78BFA" }}>{v.negotiated_delay}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--neon-cyan)", letterSpacing: "1px" }}>
                        {v.cryptographic_reasoning_hash.substring(0, 16)}...
                      </td>
                      <td style={{ color: "#10B981", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                        {v.savings_impact}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Detailed Result Modal Overlay */}
      <AnimatePresence>
        {selectedVerdict && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)",
              display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
            }}
            onClick={() => setSelectedVerdict(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel"
              style={{ width: "650px", maxWidth: "90%", maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border-glow)", boxShadow: "0 0 30px rgba(0,255,204,0.1)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
                <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.4rem" }}>
                  <Info size={24} className="header-accent" />
                  Action Log: {selectedVerdict.cryptographic_reasoning_hash.substring(0, 8)}
                </h2>
                <button onClick={() => setSelectedVerdict(null)} style={{ background: "none", border: "none", color: "var(--text-sec)", cursor: "pointer", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "var(--neon-red)")} onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-sec)")}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem" }}>Verdict Timestamp</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem" }}>{new Date(selectedVerdict.timestamp).toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem" }}>Rule Latency</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "#A78BFA" }}>{selectedVerdict.negotiated_delay}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.02)" }}>
                  <div>
                    <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem" }}>Friction Profile</div>
                    <div className={selectedVerdict.friction === 'high' ? 'badge badge-friction' : 'badge badge-stable'} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", padding: "6px 10px" }}>
                      {selectedVerdict.friction === 'high' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                      {selectedVerdict.friction.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.4rem" }}>Mesh Yield Impact</div>
                    <div style={{ color: "#10B981", fontWeight: "bold", fontSize: "1.2rem", fontFamily: "var(--font-mono)", textShadow: "0 0 10px rgba(16,185,129,0.3)" }}>{selectedVerdict.savings_impact}</div>
                  </div>
                </div>

                <div>
                  <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.8rem" }}>Sovereign Command Issued</div>
                  <div className="code-block" style={{ color: selectedVerdict.decision.includes('HARD_BLOCK') ? 'var(--neon-red)' : 'var(--neon-cyan)', fontSize: "1rem", fontWeight: "bold" }}>
                    {selectedVerdict.decision.split(',').map((d, i) => <div key={i}>{d.trim()}</div>)}
                  </div>
                </div>

                {selectedVerdict.involved_intents && selectedVerdict.involved_intents.length > 0 && (
                  <div>
                    <div style={{ color: "var(--text-sec)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.8rem" }}>Involved Nodes / Actors</div>
                    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
                      {selectedVerdict.involved_intents.map((intent: any, idx: number) => (
                        <div key={idx} style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.05)", padding: "1.2rem", borderRadius: "8px" }}>
                          <div style={{ fontWeight: "bold", color: "var(--text-primary)", marginBottom: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "1.1rem" }}>{intent.agent_id}</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-sec)", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px" }}>{intent.agent_role}</span>
                          </div>
                          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-sec)", lineHeight: 1.6 }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Action:</span> <span style={{ color: "#e5c07b" }}>{intent.action}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Target:</span> <span style={{ color: "#61afef" }}>{intent.target_resource}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Weight:</span> <span style={{ color: "#98c379" }}>{intent.sp_score.toFixed(2)} SP</span></div>
                            <div style={{ marginTop: "0.8rem", padding: "0.5rem", background: "rgba(255,255,255,0.02)", borderRadius: "4px", color: "#c678dd", fontStyle: "italic", fontSize: "0.8rem" }}>
                              "{intent.chain_of_intent}"
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
