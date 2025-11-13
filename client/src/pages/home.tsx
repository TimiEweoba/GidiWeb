import { ArrowRight, Sparkles, Shield, Zap, Check, Star, ChevronDown, Play, MessageSquare, Calendar, CreditCard, BarChart3, Users, AlertCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import phoneMockup from '@assets/generated_images/GidiGo_app_phone_mockup_dee3aef4.png';
import salonImage from '@assets/generated_images/Kiki_Kudi_hair_salon_8bbfd566.png';
import plumberImage from '@assets/generated_images/Nedu_plumbing_professional_54c8ee3a.png';
import tutorImage from '@assets/generated_images/Emmy_math_tutor_a4f11245.png';
import founderImage from '@assets/generated_images/Timi_founder_portrait_2371ad92.png';
import logo from '@assets/gidigo-logo.svg';

const PAYSTACK_FOUNDER = "https://paystack.shop/pay/fw6hofwxac";
const PAYSTACK_BETA = "https://paystack.shop/pay/fw6hofwxac";
const WHATSAPP_NUMBER = "+2348144657589";
const WHATSAPP_INVITE = `https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20join%20the%20GidiGo%20waitlist`;
const codeString = `class MatchAgent {
  constructor(providers) { 
    this.providers = providers; 
  }
  
  score(request, provider) {
    // simple score: rating * availability * distanceFactor
    return provider.rating * 
           (provider.available ? 1 : 0.5) * 
           (1 / (1 + provider.distanceKm));
  }
  
  findBest(request) {
    return this.providers
      .map(p => ({ p, score: this.score(request, p) }))
      .sort((a,b) => b.score - a.score)[0].p;
  }
}`;

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  const { data: slotData } = useQuery({
    queryKey: ['/api/slots'],
    refetchInterval: 30000,
  });

  const founderSlots = (slotData as { founderSlots?: number })?.founderSlots ?? 247;

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background">
      {showVideoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
          onClick={() => setShowVideoModal(false)}
          data-testid="video-modal"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close video"
              data-testid="button-close-video"
            >
              <X className="w-6 h-6" />
            </button>
            <Card className="overflow-hidden">
              <div className="aspect-video bg-card flex items-center justify-center">
                <div className="text-center p-8">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Founder Video Coming Soon</h3>
                  <p className="text-muted-foreground mb-6">
                    Watch Timi share the GidiGo story and vision for transforming local services in Nigeria.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild data-testid="button-reserve-modal">
                      <a href={PAYSTACK_FOUNDER} target="_blank" rel="noopener noreferrer">
                        Reserve Founder Slot — ₦2,000
                      </a>
                    </Button>
                    <Button variant="outline" onClick={() => setShowVideoModal(false)} data-testid="button-close-modal">
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/80" data-testid="nav-header">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="GidiGo Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold">GidiGo</span>
              </a>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-benefits">Benefits</a>
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-services">Services</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-faq">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild data-testid="button-waitlist">
                <a href={WHATSAPP_INVITE} target="_blank" rel="noopener noreferrer">
                  Join Waitlist
                </a>
              </Button>
              <Button size="sm" asChild data-testid="button-reserve-nav">
                <a href={PAYSTACK_FOUNDER} target="_blank" rel="noopener noreferrer">
                  Reserve Slot
                </a>
              </Button>
            </div>

            <button
              className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-4 space-y-4">
              <a 
                href="#benefits" 
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-benefits-mobile"
              >
                Benefits
              </a>
              <a 
                href="#services" 
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-services-mobile"
              >
                Services
              </a>
              <a 
                href="#pricing" 
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-pricing-mobile"
              >
                Pricing
              </a>
              <a 
                href="#faq" 
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-faq-mobile"
              >
                FAQ
              </a>
              <div className="pt-4 space-y-3">
                <Button variant="ghost" className="w-full justify-center" asChild data-testid="button-waitlist-mobile">
                  <a href={WHATSAPP_INVITE} target="_blank" rel="noopener noreferrer">
                    Join Waitlist
                  </a>
                </Button>
                <Button className="w-full justify-center" asChild data-testid="button-reserve-mobile">
                  <a href={PAYSTACK_FOUNDER} target="_blank" rel="noopener noreferrer">
                    Reserve Slot
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6" data-testid="badge-label">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">AI-Powered Local Services</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]" data-testid="text-headline">
                <span className="bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">
                  GidiGo
                </span>{" "}
                <span className="text-foreground">— AI-powered access to trusted local services</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0" data-testid="text-subheadline">
                Find verified barbers, plumbers, tutors and more — fast. Book, chat, and get matched by our AI assistant, Nia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Button 
                  size="lg" 
                  className="gap-2 text-base h-12 px-8"
                  asChild
                  data-testid="button-reserve-hero"
                >
                  <a href={PAYSTACK_FOUNDER} target="_blank" rel="noopener noreferrer" title="Secure payment — Paystack">
                    Reserve Founder Slot — ₦2,000
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-base h-12 px-8 backdrop-blur-sm bg-background/50"
                  asChild
                  data-testid="button-join-waitlist"
                >
                  <a href={WHATSAPP_INVITE} target="_blank" rel="noopener noreferrer">
                    Join Waitlist (Free)
                  </a>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground max-w-md mx-auto lg:mx-0" data-testid="text-microcopy">
                Limited founder slots. Secure your spot now — full refund within 48 hours before launch.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/50 border border-accent-border">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium" data-testid="text-slot-counter">
                  <span className="text-primary font-bold">{founderSlots}</span> founder slots remaining
                </span>
              </div>
            </div>

            <div className="relative flex flex-col items-center lg:items-end gap-6">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl rounded-full" />
                <img 
                  src={phoneMockup} 
                  alt="GidiGo app interface showing Nia AI assistant and verified provider cards" 
                  className="relative w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  data-testid="img-hero-mockup"
                />
              </motion.div>

              <motion.div
                className="relative max-w-md w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="overflow-hidden cursor-pointer group hover-elevate" onClick={() => setShowVideoModal(true)} data-testid="card-founder-video">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={founderImage} 
                      alt="Timi - GidiGo Founder" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                      <p className="text-sm font-medium text-foreground drop-shadow-lg">Watch Founder Story (30s)</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-scroll-down">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 lg:py-32 relative" data-testid="section-benefits">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Core Benefits</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose GidiGo?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to find, book, and trust local service providers
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection delay={0.1}>
              <Card className="p-8 hover:-translate-y-1 transition-all duration-300 border-card-border hover-elevate" data-testid="card-benefit-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
                <h3 className="text-xl font-bold mb-3">Smarter matches</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nia finds the right provider for the job, not just the loudest listing.
                </p>
              </Card>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <Card className="p-8 hover:-translate-y-1 transition-all duration-300 border-card-border hover-elevate" data-testid="card-benefit-2">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
                <h3 className="text-xl font-bold mb-3">Verified providers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  ID + review checks reduce scams; real profiles, real ratings.
                </p>
              </Card>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <Card className="p-8 hover:-translate-y-1 transition-all duration-300 border-card-border hover-elevate" data-testid="card-benefit-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
                <h3 className="text-xl font-bold mb-3">Faster bookings & safer payments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Local-friendly payments, confirmations, and reminders.
                </p>
              </Card>
            </FadeInSection>
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Built for Nigeria — optimized for local payments (USSD, cards, bank transfer, POS)
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 lg:py-32 bg-muted/30 relative" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Services</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What GidiGo Does</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All-in-one app for barbers, plumbers, tutors, electricians, cleaners, and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover-elevate" data-testid="card-service-1">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">AI Matching (Nia)</h3>
              <p className="text-sm text-muted-foreground">
                Describe problem, get matched with the right pro.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-service-2">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Booking & Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Confirmed slots, reminders, no more "ghosting."
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-service-3">
              <MessageSquare className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">In-app messaging</h3>
              <p className="text-sm text-muted-foreground">
                Chat with provider + Nia assistance.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-service-4">
              <BarChart3 className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Provider tools</h3>
              <p className="text-sm text-muted-foreground">
                Availability, performance, payment reminders, earnings dashboard.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-service-5">
              <CreditCard className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Payments</h3>
              <p className="text-sm text-muted-foreground">
                In-app payments through Paystack/Flutterwave; offline POS acceptance.
              </p>
            </Card>

            <Card className="p-6 hover-elevate" data-testid="card-service-6">
              <Star className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Ratings & reviews</h3>
              <p className="text-sm text-muted-foreground">
                Trusted reviews build community reliability.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden" data-testid="section-code">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Notable Artifact</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">AI Matching Logic</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simplified demo of the AI matching logic powering Nia
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl" />
            <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl">
              <div className="bg-card/50 backdrop-blur-sm px-6 py-3 border-b border-border/50 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <span className="text-sm text-muted-foreground ml-4">MatchAgent.js</span>
              </div>
              <SyntaxHighlighter 
                language="javascript" 
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: 'hsl(var(--card))',
                  fontSize: '0.875rem',
                }}
                showLineNumbers
                data-testid="code-snippet"
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Real system uses more signals (history, reliability, payment success)
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Process</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to find and book trusted providers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Tell Nia what you need</h3>
              <p className="text-muted-foreground">
                Describe your problem via text or voice
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Get matched & book</h3>
              <p className="text-muted-foreground">
                Choose time and pay securely
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Rate & repeat</h3>
              <p className="text-muted-foreground">
                Trusted reviews build community reliability
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-primary/10 border border-primary/20 max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium text-primary">
              Founders shape Nia — top feedback items become product features
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32" data-testid="section-providers">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Example Providers</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Providers</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover-elevate" data-testid="card-provider-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={salonImage} alt="Kiki & Kudi's Hair Salon interior" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">Kiki & Kudi's Hair Salon</h3>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Verified</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Fast, quality fades</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">5.0</span>
                </div>
                <Button className="w-full" disabled data-testid="button-notify-1">
                  Notify Me
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover-elevate" data-testid="card-provider-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={plumberImage} alt="Nedu's Plumbing professional" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">Nedu's Plumbing</h3>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Verified</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Emergency repairs & installs</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.9</span>
                </div>
                <Button className="w-full" disabled data-testid="button-notify-2">
                  Notify Me
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover-elevate" data-testid="card-provider-3">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={tutorImage} alt="Emmy's Math Tutoring teacher" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">Emmy's Maths Tuts</h3>
                  <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Affordable & flexible</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <Star className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground ml-2">4.5</span>
                </div>
                <Button className="w-full" disabled data-testid="button-notify-3">
                  Notify Me
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30" data-testid="section-case-studies">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Success Stories</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Real Results</h2>
          </div>

          <div className="space-y-12">
            <Card className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Kiki & Kudi's Hair Salon</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Problem:</p>
                      <p className="text-foreground">Irregular bookings, too many no-shows</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Result:</p>
                      <p className="text-foreground">+40% consistent bookings in 60 days (founder cohort)</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="text-center">
                    <div className="text-6xl lg:text-7xl font-bold text-primary mb-2">+40%</div>
                    <p className="text-muted-foreground">Increase in bookings</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                  <div className="text-center">
                    <div className="text-6xl lg:text-7xl font-bold text-primary mb-2">-30%</div>
                    <p className="text-muted-foreground">Fewer cancellations</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold mb-4">Nedu Plumbing</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Problem:</p>
                      <p className="text-foreground">Low trust, payment delays</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Result:</p>
                      <p className="text-foreground">25% faster confirmations and 30% fewer cancellations</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Social Proof</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What People Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 hover-elevate" data-testid="card-testimonial-1">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg italic mb-6 leading-relaxed">
                "Saved me time and money — found a great plumber same day."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  A
                </div>
                <div>
                  <p className="font-semibold">Ada</p>
                  <p className="text-sm text-muted-foreground">Lagos</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover-elevate" data-testid="card-testimonial-2">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg italic mb-6 leading-relaxed">
                "Founders' pricing kept my salon alive during slow weeks."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  K
                </div>
                <div>
                  <p className="font-semibold">Kiki</p>
                  <p className="text-sm text-muted-foreground">Salon Owner</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground">Paystack</div>
            <div className="text-2xl font-bold text-muted-foreground">WhatsApp</div>
            <div className="text-2xl font-bold text-muted-foreground">Google Maps</div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 lg:py-32 bg-muted/30" data-testid="section-pricing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Pricing</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, Feel-Good Pricing</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your needs
            </p>

            <div className="inline-flex items-center gap-3 p-1 rounded-lg bg-card border border-border">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="button-monthly"
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "yearly" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="button-yearly"
              >
                Yearly
                <span className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:scale-105 transition-transform duration-300" data-testid="card-pricing-founder">
              <div className="mb-6">
                <Badge className="mb-4 bg-primary text-primary-foreground">Limited 300</Badge>
                <h3 className="text-xl font-bold mb-2">Founders Presale</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">₦2,000</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority access</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Private founders group</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Lifetime founder price (1st year)</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Influence roadmap</span>
                </li>
              </ul>
              <Button className="w-full" asChild data-testid="button-get-founder">
                <a href={PAYSTACK_FOUNDER} target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Refundable within 48 hours pre-launch
              </p>
            </Card>

            <Card className="p-6 hover:scale-105 transition-transform duration-300" data-testid="card-pricing-beta">
              <div className="mb-6">
                <Badge variant="outline" className="mb-4">Limited 100</Badge>
                <h3 className="text-xl font-bold mb-2">Beta Access</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">₦10,000</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>3 months free subscription</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority booking</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Onboarding session</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild data-testid="button-get-beta">
                <a href={PAYSTACK_BETA} target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Refundable within 48 hours pre-launch
              </p>
            </Card>

            <Card className="p-6 hover:scale-105 transition-transform duration-300" data-testid="card-pricing-starter">
              <div className="mb-6">
                <div className="h-6 mb-4" />
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">₦500</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Basic booking & search</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>In-app payments</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" disabled data-testid="button-get-starter">
                Coming Soon
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Available post-launch
              </p>
            </Card>

            <Card className="p-6 hover:scale-105 transition-transform duration-300" data-testid="card-pricing-pro">
              <div className="mb-6">
                <div className="h-6 mb-4" />
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">₦2,500</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Provider dashboard</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority placement</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Performance reports</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" disabled data-testid="button-get-pro">
                Coming Soon
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Available post-launch
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 lg:py-32" data-testid="section-faq">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg px-6" data-testid="faq-item-1">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                How do I pay?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Secure Paystack pay links — cards, USSD, bank transfer; offline POS at xplus.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-lg px-6" data-testid="faq-item-2">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                What happens after I pay?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Send your Paystack success screenshot to {WHATSAPP_NUMBER} → receive Founder Code + WhatsApp invite.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-lg px-6" data-testid="faq-item-3">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Is my money safe?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Full refund within 48 hours; payments processed via Paystack.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border rounded-lg px-6" data-testid="faq-item-4">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Where will GidiGo operate?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Launching Lagos & Southwestern states first — expanding based on demand.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border rounded-lg px-6" data-testid="faq-item-5">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Can providers join?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes — provider onboarding is via the Provider Signup on the site. Verification required.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-muted/30" data-testid="section-team">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Team</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet the Founder</h2>
          </div>

          <div className="max-w-sm mx-auto">
            <Card className="p-6 text-center hover-elevate" data-testid="card-team-member">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img src={founderImage} alt="Timi - Founder & Product" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1">Timi</h3>
              <p className="text-sm text-muted-foreground mb-3">Founder & Product Lead</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Phone repair engineer, builder, community roots in Ota
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32" data-testid="section-comparison">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Comparison</p>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose GidiGo?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">GidiGo</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Verified providers + AI matching</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Local payments (USSD, POS, cards)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Faster bookings, fewer scams</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Built-in chat & reminders</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-muted/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-muted-foreground">Others</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">Unverified listings, manual search</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">Limited payment options</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">Messy social DMs, no guarantees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm text-muted-foreground">No structured communication</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the founders shaping the future of local services in Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2 text-base h-12 px-8"
              asChild
              data-testid="button-reserve-cta"
            >
              <a href={PAYSTACK_FOUNDER} target="_blank" rel="noopener noreferrer">
                Reserve Founder Slot — ₦2,000
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 text-base h-12 px-8"
              asChild
              data-testid="button-waitlist-cta"
            >
              <a href={WHATSAPP_INVITE} target="_blank" rel="noopener noreferrer">
                Join Waitlist (Free)
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12 lg:py-16 bg-muted/30" data-testid="footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <a href="/" className="flex items-center gap-2">
                  <img src={logo} alt="GidiGo Logo" className="w-10 h-10 object-contain" />
                  <span className="text-xl font-bold">GidiGo</span>
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered access to trusted local services. Built for Nigeria.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>WhatsApp: {WHATSAPP_NUMBER}</li>
                <li>Email: hello@gidigo.com</li>
                <li>Address: Sango Ota, Ogun State</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground text-center">
              GidiGo is an early-stage product. Founder/beta payments refundable within 48 hours prior to public launch.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
