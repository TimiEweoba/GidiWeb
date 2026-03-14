import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

// Lazy load the Three.js hero to avoid blocking initial paint
const Hero3D = lazy(() => import("@/components/hero-3d"));

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hide3D, setHide3D] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        // Check for user preference or dev toggle
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const urlParams = new URLSearchParams(window.location.search);
        if (prefersReducedMotion || urlParams.has("no3d")) {
            setHide3D(true);
        }

        document.title = "Get on the insiders' list | GidiGo";

        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };
        updateMeta('description', 'Priority access, exclusive founder perks, and early visibility. Limited slots available.');

        let ogImage = document.querySelector(`meta[property="og:image"]`);
        if (!ogImage) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
        }
        ogImage.setAttribute('content', '/landing/og-image.png');
    }, []);

    const submitMutation = useMutation({
        mutationFn: async (data: { email: string; utmSource?: string }) => {
            // Send to our backend DB
            const res = await apiRequest("POST", "/api/waitlist", data);

            // Seamlessly proxy to the user's gmail via formsubmit AJAX
            try {
                await fetch("https://formsubmit.co/ajax/Timileyineweobaja@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        _subject: "New GidiGo Waitlist Signup!",
                        email: data.email,
                        source: data.utmSource || "waitlist landing page"
                    })
                });
            } catch (err) {
                console.warn("Proxy to email failed, but backend stored correctly.");
            }

            return res.json();
        },
        onSuccess: () => {
            setIsSubmitted(true);
            // Fire analytics event
            if (typeof window !== 'undefined' && (window as any).analytics) {
                (window as any).analytics.track('waitlist_submitted', { email });
            }
        },
        onError: (error: Error) => {
            toast({
                title: "Registration Failed",
                description: error.message || "Please check your email and try again.",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot check (hidden field)
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get("website")) return; // Bot detected

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive",
            });
            return;
        }

        // Capture UTM params
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get("utm_source") || undefined;

        submitMutation.mutate({ email, utmSource });
    };

    return (
        <div className="relative min-h-screen bg-[#050510] text-[#f7f8f8] overflow-hidden font-sans selection:bg-[#32fbc1] selection:text-black">
            {/* 3D Hero Background */}
            <div className="absolute inset-0 z-0 pointer-events-auto" aria-hidden="true">
                {!hide3D ? (
                    <Suspense fallback={<div className="w-full h-full bg-[#050510]" />}>
                        <Hero3D />
                    </Suspense>
                ) : (
                    <div className="w-full h-full bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/landing/hero-fallback.svg')" }} />
                )}
            </div>

            {/* Sweep Arc Overlay Horizon Line */}
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden flex justify-center items-start">
                {/* The main green curve and glow under the text (fades in) */}
                <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="absolute w-[200vw] h-[1000px] top-[40%] md:top-[35%] rounded-[100%] border-t-[1.5px] border-[#32fbc1]/60 shadow-[0_-50px_100px_rgba(50,251,193,0.3)] mix-blend-plus-lighter bg-gradient-to-b from-[#042a1e]/40 to-transparent opacity-90 z-20"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="absolute top-[40%] md:top-[35%] w-[600px] h-[300px] bg-[#32fbc1] blur-[120px] transform -translate-y-1/2 z-20"
                />
            </div>

            {/* ── NEON 3D NIGERIAN SERVICE DOODLES ── */}
            {/* Doodles are now managed directly inside the Hero3D component for coherence and responsiveness */}

            {/* Content Overlay */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="max-w-5xl w-full mx-auto flex flex-col items-center relative z-20"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter mb-8 leading-[1.05] font-extrabold font-sans text-white drop-shadow-lg">
                        Get noticed. Get booked.<br />
                        <span className="text-white/90">Join the insiders' list.</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl font-normal mx-auto leading-relaxed drop-shadow-md">
                        Early access for local pros. Join the waiting list for exclusive founder perks and priority visibility. Limited slots available.
                    </p>

                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit}
                                className="relative w-full max-w-lg mx-auto"
                            >
                                {/* Honeypot */}
                                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                                <div className="flex flex-col sm:flex-row items-center w-full max-w-lg mx-auto gap-3">
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email here"
                                        disabled={submitMutation.isPending}
                                        required
                                        className="h-16 px-6 bg-[#0a0f16]/80 text-white placeholder:text-white/50 border-[#32fbc1]/30 focus-visible:ring-1 focus-visible:ring-[#32fbc1] focus-visible:border-[#32fbc1] rounded-full transition-all w-full text-lg backdrop-blur-xl shadow-[0_0_20px_rgba(50,251,193,0.1)] hover:border-[#32fbc1]/60"
                                        aria-label="Email address"
                                    />
                                    <Button
                                        type="submit"
                                        variant="default"
                                        disabled={submitMutation.isPending}
                                        className="w-full sm:w-20 h-16 rounded-full bg-[#32fbc1]/10 hover:bg-[#32fbc1]/25 text-[#32fbc1] transition-all active:scale-95 flex items-center justify-center border border-[#32fbc1]/40 shadow-[0_0_15px_rgba(50,251,193,0.4)] hover:shadow-[0_0_25px_rgba(50,251,193,0.6)] flex-shrink-0"
                                    >
                                        {submitMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                                    </Button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-3 bg-[#32fbc1]/10 text-[#32fbc1] px-8 py-5 rounded-full border border-[#32fbc1]/30 backdrop-blur-md"
                            >
                                <CheckCircle2 className="w-6 h-6" />
                                <span className="font-medium text-[15px] sm:text-lg text-white">You're on the list. Keep an eye on your inbox.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-8 flex items-center justify-center gap-4"
                    >
                        <div className="flex -space-x-3">
                            <img className="w-8 h-8 rounded-full border-2 border-[#050510] object-cover" src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=faces" alt="User 1" />
                            <img className="w-8 h-8 rounded-full border-2 border-[#050510] object-cover" src="https://images.unsplash.com/photo-1531123897727-8f129e1bfa8e?w=100&h=100&fit=crop&crop=faces" alt="User 2" />
                            <img className="w-8 h-8 rounded-full border-2 border-[#050510] object-cover" src="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=100&h=100&fit=crop&crop=faces" alt="User 3" />
                        </div>
                        <span className="text-sm font-medium text-white/60 tracking-wide">Join 200+ Already Onboard</span>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
