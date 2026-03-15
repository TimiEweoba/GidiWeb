import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema, type InsertWaitlist } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Loader2, Twitter, Instagram } from "lucide-react";
import logo from '@assets/gidigo-logo.svg';

const FadeUp = ({ children, delay = 0, duration = 0.5 }: { children: React.ReactNode, delay?: number, duration?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef(null);

  // Form setup
  const form = useForm<InsertWaitlist>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Joined!",
        description: "You've been added to our waitlist.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertWaitlist) => mutation.mutate(data);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#000] text-white selection:bg-primary/40 selection:text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* EXQUISITE BACKGROUND ANIMATIONS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -80, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-blue-500/15 blur-[120px] rounded-full"
        />

        {/* Dynamic Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Ambient Moving Noise/Grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay" />

        {/* ── NEON 3D NIGERIAN SERVICE DOODLES ── */}

        {/* 1 · Danfo Bus — top-left, yellow neon */}
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -14, 0], rotateY: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[4%] w-52 h-36 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 10px #ffe600) drop-shadow(0 0 22px #ffe60088)", opacity: 0.55 }}
        >
          <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* body */}
            <path d="M8 52 L8 28 Q8 18 18 18 L92 18 Q104 18 108 26 L114 40 L114 52 Z" stroke="#ffe600" strokeWidth="1.6" strokeLinejoin="round" />
            {/* 3-d side-face */}
            <path d="M114 40 L120 44 L120 56 L114 52" stroke="#ffb300" strokeWidth="1.2" strokeLinejoin="round" fill="#ffb30018" />
            {/* roof edge */}
            <path d="M8 18 L6 12 L94 12 L92 18" stroke="#ffe600" strokeWidth="0.9" strokeLinejoin="round" />
            {/* windows */}
            <rect x="20" y="22" width="14" height="10" rx="2" stroke="#ffe600" strokeWidth="1" />
            <rect x="40" y="22" width="14" height="10" rx="2" stroke="#ffe600" strokeWidth="1" />
            <rect x="60" y="22" width="14" height="10" rx="2" stroke="#ffe600" strokeWidth="1" />
            <rect x="80" y="22" width="14" height="10" rx="2" stroke="#ffe600" strokeWidth="1" />
            {/* wheels */}
            <circle cx="28" cy="54" r="7" stroke="#ffe600" strokeWidth="1.4" />
            <circle cx="28" cy="54" r="3" stroke="#ffb300" strokeWidth="0.9" />
            <circle cx="90" cy="54" r="7" stroke="#ffe600" strokeWidth="1.4" />
            <circle cx="90" cy="54" r="3" stroke="#ffb300" strokeWidth="0.9" />
            {/* Lagos route label */}
            <text x="46" y="45" fill="#ffe600" fontSize="5.5" fontFamily="monospace" letterSpacing="1">MUSHIN</text>
            {/* headlight */}
            <path d="M108 34 L116 32 L116 40 L108 40" stroke="#fff" strokeWidth="0.8" fill="#ffffff22" />
          </svg>
        </motion.div>

        {/* 2 · Keke Napep — top-right, cyan neon */}
        <motion.div
          animate={{ x: [0, -22, 0], y: [0, 16, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[10%] right-[5%] w-44 h-36 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 10px #00e5ff) drop-shadow(0 0 22px #00e5ff88)", opacity: 0.52 }}
        >
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* canopy */}
            <path d="M20 38 Q20 20 50 18 Q80 20 80 38 Z" stroke="#00e5ff" strokeWidth="1.5" />
            {/* body */}
            <path d="M10 38 L10 55 L90 55 L90 38 L10 38 Z" stroke="#00e5ff" strokeWidth="1.5" strokeLinejoin="round" />
            {/* 3-d side */}
            <path d="M90 38 L98 42 L98 58 L90 55" stroke="#00aacc" strokeWidth="1.1" fill="#00e5ff18" />
            {/* passenger area */}
            <rect x="30" y="40" width="36" height="12" rx="2" stroke="#00e5ff" strokeWidth="1" />
            {/* driver area */}
            <rect x="12" y="40" width="14" height="12" rx="2" stroke="#00e5ff" strokeWidth="1" />
            {/* wheels */}
            <circle cx="26" cy="57" r="6" stroke="#00e5ff" strokeWidth="1.3" />
            <circle cx="26" cy="57" r="2.5" stroke="#00aacc" strokeWidth="0.8" />
            <circle cx="76" cy="57" r="6" stroke="#00e5ff" strokeWidth="1.3" />
            <circle cx="76" cy="57" r="2.5" stroke="#00aacc" strokeWidth="0.8" />
            {/* front single wheel */}
            <circle cx="88" cy="60" r="5" stroke="#00e5ff" strokeWidth="1.3" />
          </svg>
        </motion.div>

        {/* 3 · Okada (motorcycle) — mid-left, magenta neon */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[42%] left-[2%] w-40 h-32 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 9px #ff00aa) drop-shadow(0 0 20px #ff00aa88)", opacity: 0.50 }}
        >
          <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* frame */}
            <path d="M30 48 L50 28 L70 48" stroke="#ff00aa" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M50 28 L56 20 L68 28 L70 48" stroke="#ff00aa" strokeWidth="1.4" />
            {/* handle bars */}
            <path d="M68 28 L60 22 M68 28 L76 24" stroke="#ff00aa" strokeWidth="1.2" strokeLinecap="round" />
            {/* seat */}
            <path d="M48 28 Q53 24 58 28" stroke="#ff00aa" strokeWidth="1.6" strokeLinecap="round" />
            {/* wheels */}
            <circle cx="28" cy="52" r="10" stroke="#ff00aa" strokeWidth="1.5" />
            <circle cx="28" cy="52" r="4" stroke="#cc0088" strokeWidth="0.9" />
            <circle cx="72" cy="52" r="10" stroke="#ff00aa" strokeWidth="1.5" />
            <circle cx="72" cy="52" r="4" stroke="#cc0088" strokeWidth="0.9" />
            {/* rider silhouette */}
            <circle cx="57" cy="22" r="5" stroke="#ff00aa" strokeWidth="1.2" />
            <path d="M57 27 L52 36 M57 27 L62 34" stroke="#ff00aa" strokeWidth="1.1" strokeLinecap="round" />
            {/* exhaust puff */}
            <circle cx="18" cy="52" r="2" stroke="#ff00aa" strokeWidth="0.7" opacity="0.6" />
            <circle cx="11" cy="50" r="1.4" stroke="#ff00aa" strokeWidth="0.6" opacity="0.4" />
          </svg>
        </motion.div>

        {/* 4 · Generator — bottom-left, amber neon */}
        <motion.div
          animate={{ x: [0, 14, 0], y: [0, 20, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[18%] left-[6%] w-36 h-32 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 9px #ff8c00) drop-shadow(0 0 20px #ff8c0088)", opacity: 0.50 }}
        >
          <svg viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* main box — front face */}
            <rect x="10" y="20" width="58" height="36" rx="3" stroke="#ff8c00" strokeWidth="1.5" />
            {/* 3-d top face */}
            <path d="M10 20 L20 10 L78 10 L68 20" stroke="#ffaa00" strokeWidth="1.1" fill="#ff8c0018" />
            {/* 3-d right face */}
            <path d="M68 20 L78 10 L78 46 L68 56" stroke="#cc6600" strokeWidth="1.1" fill="#ff8c0014" />
            {/* exhaust pipe */}
            <rect x="72" y="6" width="6" height="14" rx="1" stroke="#ff8c00" strokeWidth="1" />
            <ellipse cx="75" cy="6" rx="3" ry="1.5" stroke="#ffaa00" strokeWidth="0.8" />
            {/* fuel cap */}
            <ellipse cx="38" cy="20" rx="8" ry="2.5" stroke="#ff8c00" strokeWidth="1" />
            {/* control panel */}
            <rect x="16" y="28" width="16" height="20" rx="1.5" stroke="#ff8c00" strokeWidth="0.9" />
            <circle cx="24" cy="35" r="4" stroke="#ffaa00" strokeWidth="0.9" />
            <rect x="19" y="42" width="10" height="3" rx="1" stroke="#ff8c00" strokeWidth="0.6" />
            {/* pull cord */}
            <circle cx="48" cy="38" r="6" stroke="#ff8c00" strokeWidth="1" />
            <path d="M48 32 L48 26 L54 24" stroke="#ff8c00" strokeWidth="0.9" strokeLinecap="round" />
            {/* wheels */}
            <circle cx="20" cy="58" r="5" stroke="#ff8c00" strokeWidth="1.2" />
            <circle cx="58" cy="58" r="5" stroke="#ff8c00" strokeWidth="1.2" />
          </svg>
        </motion.div>

        {/* 5 · POS Terminal — mid-right, green neon */}
        <motion.div
          animate={{ x: [0, -18, 0], y: [0, -18, 0], rotateY: [0, -10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[38%] right-[4%] w-28 h-40 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 10px #00ff88) drop-shadow(0 0 22px #00ff8888)", opacity: 0.55 }}
        >
          <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* device body — front */}
            <rect x="8" y="8" width="38" height="60" rx="4" stroke="#00ff88" strokeWidth="1.5" />
            {/* 3-d right */}
            <path d="M46 8 L54 14 L54 74 L46 68" stroke="#00cc66" strokeWidth="1.1" fill="#00ff8818" />
            {/* 3-d top */}
            <path d="M8 8 L16 2 L54 2 L46 8" stroke="#00ff88" strokeWidth="1" fill="#00ff8812" />
            {/* screen */}
            <rect x="12" y="14" width="30" height="20" rx="2" stroke="#00ff88" strokeWidth="1" />
            {/* screen glow lines */}
            <path d="M15 20 L38 20 M15 25 L38 25 M15 30 L30 30" stroke="#00ff88" strokeWidth="0.6" opacity="0.6" />
            {/* keypad grid */}
            {[0, 1, 2, 3].map((row) => [0, 1, 2].map((col) => (
              <rect key={`${row}-${col}`} x={12 + col * 10} y={40 + row * 8} width="7" height="5" rx="1" stroke="#00ff88" strokeWidth="0.7" />
            )))}
            {/* card slot */}
            <rect x="12" y="72" width="30" height="5" rx="1" stroke="#00ff88" strokeWidth="1" />
            <path d="M16 74.5 L38 74.5" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="2 1" />
          </svg>
        </motion.div>

        {/* 6 · Suya Grill — bottom-right, orange-red neon */}
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-[10%] right-[5%] w-40 h-36 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 10px #ff4400) drop-shadow(0 0 24px #ff440088)", opacity: 0.52 }}
        >
          <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* grill drum */}
            <ellipse cx="50" cy="40" rx="36" ry="18" stroke="#ff4400" strokeWidth="1.5" />
            <ellipse cx="50" cy="28" rx="36" ry="18" stroke="#ff6600" strokeWidth="1.2" fill="#ff440012" />
            {/* grill bars */}
            <path d="M18 34 L82 34 M18 40 L82 40 M18 46 L82 46" stroke="#ff4400" strokeWidth="1" opacity="0.8" />
            {/* skewers */}
            <line x1="24" y1="20" x2="24" y2="60" stroke="#ffaa00" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="38" y1="16" x2="38" y2="58" stroke="#ffaa00" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="52" y1="14" x2="52" y2="56" stroke="#ffaa00" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="66" y1="16" x2="66" y2="58" stroke="#ffaa00" strokeWidth="1.2" strokeLinecap="round" />
            {/* meat chunks on skewers */}
            {[24, 38, 52, 66].map((x) => (
              <>
                <rect key={`m1-${x}`} x={x - 5} y="24" width="10" height="8" rx="2" stroke="#ff4400" strokeWidth="1" />
                <rect key={`m2-${x}`} x={x - 5} y="36" width="10" height="8" rx="2" stroke="#ff4400" strokeWidth="1" />
                <rect key={`m3-${x}`} x={x - 5} y="48" width="10" height="8" rx="2" stroke="#ff4400" strokeWidth="1" />
              </>
            ))}
            {/* legs */}
            <line x1="22" y1="58" x2="16" y2="74" stroke="#ff4400" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="78" y1="58" x2="84" y2="74" stroke="#ff4400" strokeWidth="1.3" strokeLinecap="round" />
            {/* smoke */}
            <path d="M40 14 Q38 8 42 4 Q46 0 44 -4" stroke="#ff6600" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
            <path d="M56 12 Q54 6 58 2" stroke="#ff6600" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
          </svg>
        </motion.div>

        {/* 7 · NEPA / Power Pole — upper-center-right, purple neon */}
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[20%] right-[22%] w-20 h-48 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 9px #aa00ff) drop-shadow(0 0 20px #aa00ff88)", opacity: 0.42 }}
        >
          <svg viewBox="0 30 50 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* pole */}
            <line x1="25" y1="160" x2="25" y2="40" stroke="#aa00ff" strokeWidth="2" />
            {/* cross arm */}
            <line x1="8" y1="55" x2="42" y2="55" stroke="#aa00ff" strokeWidth="1.5" />
            <line x1="4" y1="65" x2="46" y2="65" stroke="#aa00ff" strokeWidth="1.5" />
            {/* insulators */}
            <circle cx="8" cy="55" r="3" stroke="#cc44ff" strokeWidth="1" />
            <circle cx="42" cy="55" r="3" stroke="#cc44ff" strokeWidth="1" />
            <circle cx="4" cy="65" r="3" stroke="#cc44ff" strokeWidth="1" />
            <circle cx="46" cy="65" r="3" stroke="#cc44ff" strokeWidth="1" />
            {/* wires */}
            <path d="M8 55 Q16 70 25 65 Q34 60 42 55" stroke="#aa00ff" strokeWidth="0.8" opacity="0.7" />
            <path d="M4 65 Q14 80 25 75 Q36 70 46 65" stroke="#aa00ff" strokeWidth="0.8" opacity="0.7" />
            {/* transformer box */}
            <rect x="18" y="82" width="14" height="20" rx="2" stroke="#aa00ff" strokeWidth="1.1" />
            {/* base */}
            <path d="M20 160 L30 160 L28 155 L22 155 Z" stroke="#aa00ff" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* 8 · Buka Pot (clay pot) — center-bottom, lime neon */}
        <motion.div
          animate={{ x: [0, -12, 0], y: [0, -16, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          className="absolute bottom-[22%] left-[28%] w-28 h-28 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 10px #aaff00) drop-shadow(0 0 22px #aaff0088)", opacity: 0.48 }}
        >
          <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* pot body */}
            <path d="M14 44 Q14 62 35 62 Q56 62 56 44 Q60 30 35 26 Q10 30 14 44 Z" stroke="#aaff00" strokeWidth="1.5" />
            {/* pot neck */}
            <ellipse cx="35" cy="26" rx="14" ry="5" stroke="#aaff00" strokeWidth="1.3" />
            {/* pot lid */}
            <ellipse cx="35" cy="22" rx="16" ry="4.5" stroke="#ccff44" strokeWidth="1.2" />
            <ellipse cx="35" cy="20" rx="4" ry="2" stroke="#ccff44" strokeWidth="1" />
            {/* handles */}
            <path d="M14 40 Q6 38 7 44 Q8 50 14 48" stroke="#aaff00" strokeWidth="1.1" />
            <path d="M56 40 Q64 38 63 44 Q62 50 56 48" stroke="#aaff00" strokeWidth="1.1" />
            {/* steam */}
            <path d="M28 18 Q26 12 30 8 M35 16 Q33 10 37 6" stroke="#aaff00" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
          </svg>
        </motion.div>
      </div>

      {/* NAVIGATION - Minimalist & Sleek */}
      <nav className="fixed top-0 w-full p-10 flex justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="flex items-center gap-3 group cursor-default"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
            <img src={logo} alt="GidiGo Logo" className="w-12 h-12 relative transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <span className="text-3xl font-bold tracking-[-0.05em] text-white">GidiGo</span>
        </motion.div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-4xl w-full text-center px-6 mt-32 mb-32">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Coming Soon Badge */}
              <FadeUp delay={0.2}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Experience the Future</span>
                </div>
              </FadeUp>

              {/* Headline with staggered reveal */}
              <div className="overflow-visible mb-8">
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-[-0.04em] leading-[1.1] text-white pb-4"
                >
                  Local services, <br />
                  <span className="text-white/40 italic font-medium">reimagined.</span>
                </motion.h1>
              </div>

              {/* Tagline */}
              <FadeUp delay={0.5}>
                <p className="text-xl md:text-2xl text-white/40 mb-12 max-w-2xl mx-auto leading-[1.4] tracking-tight">
                  Tired of looking? Let Nia handle the search. Get matched with verified local pros through our effortless AI assistant.
                </p>
              </FadeUp>

              {/* Input & Call to Action */}
              <FadeUp delay={0.7}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="relative group p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] flex flex-col sm:flex-row gap-2 max-w-lg w-full mx-auto shadow-2xl hover:border-white/20 transition-all duration-500"
                >
                  {/* Subtle Border Glow Effect */}
                  <div className="absolute inset-x-0 bottom-[-2px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                  <div className="flex-1">
                    <Input
                      {...form.register("email")}
                      type="email"
                      placeholder="Your email address"
                      className="h-14 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/20 rounded-[1.8rem] text-lg px-8 py-0"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="h-14 px-10 rounded-[1.8rem] bg-white text-black hover:bg-neutral-200 font-bold text-lg gap-3 transition-all active:scale-95 flex-shrink-0"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  {form.formState.errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-6 mt-4 text-primary text-xs font-medium tracking-wide uppercase"
                    >
                      {form.formState.errors.email.message}
                    </motion.p>
                  )}
                </form>
              </FadeUp>

              <FadeUp delay={1}>
                <p className="mt-8 text-white/20 text-xs tracking-widest uppercase font-medium">Limited Beta Access Launching Q2 2026</p>
              </FadeUp>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              >
                <CheckCircle2 className="w-12 h-12 text-black" strokeWidth={2.5} />
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-[-0.03em]">You're on the list.</h2>
              <p className="text-xl text-white/40 max-w-sm mx-auto mb-12 leading-relaxed">
                Check your inbox soon. We'll send an exclusive invite when we open the doors.
              </p>
              <Button
                variant="ghost"
                onClick={() => setIsSuccess(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                Join with another email
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER - Floating Style */}
      <footer className="w-full pb-10 z-50 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex gap-10 items-center">
            <a href="#" className="p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 text-white/20 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300 hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <div className="px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 pointer-events-none">
              &copy; 2026 GidiGo Technologies Ltd
            </span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
