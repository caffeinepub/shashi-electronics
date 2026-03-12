import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  DollarSign,
  Loader2,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Star,
  Tv,
  Volume2,
  Wifi,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=262+Sardar+Patel+Super+Market+Petlad+388450";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const brands = [
  { name: "Samsung", color: "text-blue-400" },
  { name: "LG", color: "text-blue-400" },
  { name: "Sony", color: "text-blue-400" },
  { name: "TCL", color: "text-blue-400" },
  { name: "Hisense", color: "text-blue-400" },
  { name: "Vizio", color: "text-blue-400" },
];

/* ── Animated counter component ── */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1400,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function App() {
  const { actor, isFetching: actorFetching } = useActor();
  const actorRef = useRef(actor);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    customerName: "",
    phoneNumber: "",
    serviceType: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const sectionsRef = {
    services: useRef<HTMLElement>(null),
    howItWorks: useRef<HTMLElement>(null),
    reviews: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const scrollTo = (key: keyof typeof sectionsRef) => {
    sectionsRef[key].current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    // Save to localStorage as primary storage - always reliable
    try {
      const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
      saved.push({
        id: Date.now(),
        customerName: formState.customerName,
        phoneNumber: formState.phoneNumber,
        serviceType: formState.serviceType,
        message: formState.message,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("bookings", JSON.stringify(saved));
      setSubmitStatus("success");
      toast.success("Booking submitted! We'll call you within the hour.");
      setFormState({
        customerName: "",
        phoneNumber: "",
        serviceType: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    }
    // Also try backend in background (optional, non-blocking)
    try {
      const a = actorRef.current;
      if (a) {
        a.submitBooking(
          formState.customerName,
          formState.phoneNumber,
          formState.serviceType,
          formState.message,
        ).catch(() => {});
      }
    } catch {}
  };

  const navLinks = [
    { label: "Services", key: "services" as const },
    { label: "How It Works", key: "howItWorks" as const },
    { label: "Reviews", key: "reviews" as const },
    { label: "Contact", key: "contact" as const },
  ];

  const services = [
    {
      icon: Monitor,
      title: "Screen Repair",
      desc: "Cracked, shattered, or dead pixels? We restore your display to factory perfection.",
    },
    {
      icon: Zap,
      title: "Power Issues",
      desc: "TV won't turn on or keeps shutting off? Our techs diagnose and fix power board failures.",
    },
    {
      icon: Volume2,
      title: "Sound Problems",
      desc: "No audio, distorted sound, or blown speakers — we restore crystal-clear sound.",
    },
    {
      icon: Tv,
      title: "Picture Quality",
      desc: "Blurry image, color issues, or no display? We fix backlights, panels, and T-con boards.",
    },
    {
      icon: Wifi,
      title: "Remote & Input Issues",
      desc: "HDMI ports, smart TV connectivity, and remote pairing problems solved quickly.",
    },
    {
      icon: Cpu,
      title: "Circuit Board Repair",
      desc: "Main board, power supply, and logic board micro-soldering by certified technicians.",
    },
  ];

  const highlights = [
    {
      icon: Award,
      title: "15+ Years Experience",
      isCounter: true,
      counterTarget: 15,
      counterSuffix: "+ Years",
      counterLabel: "Experience",
      desc: "Trusted by thousands of households across the city since 2010.",
    },
    {
      icon: Clock,
      title: "Same-Day Service",
      isCounter: false,
      counterTarget: 0,
      counterSuffix: "",
      counterLabel: "",
      desc: "Most repairs completed the same day you bring in your TV.",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      isCounter: false,
      counterTarget: 0,
      counterSuffix: "",
      counterLabel: "",
      desc: "Transparent quotes upfront. You only pay if we fix it successfully.",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: Phone,
      title: "Contact Us",
      desc: "Call, text, or fill out our booking form. We'll confirm your appointment within the hour.",
    },
    {
      num: "02",
      icon: Wrench,
      title: "Free Diagnosis",
      desc: "Our certified technician inspects your TV and provides a clear, no-obligation quote.",
    },
    {
      num: "03",
      icon: CheckCircle2,
      title: "Fast Repair",
      desc: "We fix your TV using genuine parts. Most repairs done same-day so you're back to watching.",
    },
  ];

  const testimonials = [
    {
      name: "Margaret Holloway",
      location: "Riverside District",
      stars: 5,
      quote:
        "Brought in my 65-inch Samsung with a completely cracked screen. They had it fixed in 4 hours for half what Samsung quoted me. Absolutely amazing service!",
    },
    {
      name: "David Chen",
      location: "Eastside",
      stars: 5,
      quote:
        "My LG OLED went black suddenly. Shashi Electronics diagnosed a failed main board, ordered the part, and had it repaired in 2 days. Picture looks incredible again.",
    },
    {
      name: "Sandra Torres",
      location: "North Park",
      stars: 5,
      quote:
        "Super professional and honest. They told me upfront what was wrong and what it would cost. No hidden fees. My TV works perfectly now — highly recommend!",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster richColors position="top-right" />

      {/* ── NAVIGATION ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-sm border-b border-navy-800">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo + Name */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-12-at-2.11.50-PM-1.jpeg"
              alt="Shashi Electronics Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain"
            />
            <span className="font-display font-bold text-white text-base sm:text-lg leading-tight">
              Shashi Electronics
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.button
                type="button"
                key={link.key}
                data-ocid={`nav.${link.key}.link`}
                onClick={() => scrollTo(link.key)}
                whileHover={{ y: -1, color: "oklch(72% 0.19 62)" }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 text-sm text-navy-200 hover:text-amber-400 transition-colors font-medium"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex"
            >
              <Button
                data-ocid="nav.book_repair.button"
                onClick={() => scrollTo("contact")}
                className="bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold btn-shimmer amber-glow"
              >
                Book Repair
              </Button>
            </motion.div>
            <button
              type="button"
              data-ocid="nav.mobile_menu.toggle"
              className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white rounded-lg hover:bg-navy-800 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-900 border-t border-navy-800 px-4 py-3 flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.key}
                  data-ocid={`nav.mobile.${link.key}.link`}
                  onClick={() => scrollTo(link.key)}
                  className="text-left px-3 py-3 min-h-[44px] text-navy-100 hover:text-amber-400 hover:bg-navy-800 rounded-md transition-colors font-medium text-base"
                >
                  {link.label}
                </button>
              ))}
              <Button
                data-ocid="nav.mobile.book_repair.button"
                onClick={() => scrollTo("contact")}
                className="mt-2 w-full h-12 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-base"
              >
                Book Repair
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative min-h-[90vh] md:min-h-screen flex items-center pt-16"
        style={{
          backgroundImage:
            "url('/assets/uploads/WhatsApp-Image-2026-03-12-at-2.44.33-PM-1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container mx-auto px-4 lg:px-8 py-14 md:py-24">
          {/* SEO hidden headings */}
          <h1 className="sr-only">
            Shashi Electronics – TV Repair Service in Petlad
          </h1>
          <p className="sr-only">LED TV, LCD, Smart TV Repair</p>
          <p className="sr-only">TV Repair, Home Electronics Service</p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-4 md:mb-6"
            >
              <span className="text-orange-400">
                Expert TV &amp; Electronics Repair
              </span>
              <br />
              <span style={{ color: "#FFD700" }}>You Can Trust.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed"
            >
              Same-day diagnostics. Transparent pricing. Certified technicians
              with over 15 years of experience fixing every major TV brand.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  data-ocid="hero.book_repair.primary_button"
                  size="lg"
                  onClick={() => scrollTo("contact")}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-white font-bold text-base h-12 px-8 btn-shimmer btn-pulse-anim"
                >
                  Book a Repair
                  <ChevronRight className="w-4 h-4 ml-1 shrink-0" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  data-ocid="hero.call_us1.button"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-white hover:bg-gray-100 text-navy-950 font-bold text-base h-12 px-6 border-2 border-white"
                >
                  <a href="tel:9426340603">
                    <Phone className="w-4 h-4 mr-2 shrink-0" />
                    9426340603
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  data-ocid="hero.call_us2.button"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-white hover:bg-gray-100 text-navy-950 font-bold text-base h-12 px-6 border-2 border-white"
                >
                  <a href="tel:9925200162">
                    <Phone className="w-4 h-4 mr-2 shrink-0" />
                    9925200162
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  data-ocid="hero.call_us3.button"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-white hover:bg-gray-100 text-navy-950 font-bold text-base h-12 px-6 border-2 border-white"
                >
                  <a href="tel:9377748200">
                    <Phone className="w-4 h-4 mr-2 shrink-0" />
                    9377748200
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Brand names */}
            <motion.div
              variants={fadeUp}
              className="mt-8 md:mt-12 flex flex-wrap gap-4 md:gap-6 items-center"
            >
              {brands.map((brand) => (
                <motion.span
                  key={brand.name}
                  whileHover={{ y: -3, scale: 1.08 }}
                  className={`${brand.color} text-sm sm:text-base md:text-lg font-bold cursor-default transition-colors drop-shadow-sm`}
                >
                  {brand.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        ref={sectionsRef.services}
        id="services"
        className="py-14 md:py-24 bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10 md:mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              What We Fix
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4"
            >
              Our Repair Services
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
            >
              We repair all makes and models of LCD, LED, OLED, and QLED TVs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -4 }}
                data-ocid={`services.item.${i + 1}`}
                className="group bg-card border border-border rounded-2xl p-5 md:p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-default"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-navy-100 group-hover:bg-amber-500 flex items-center justify-center mb-4 md:mb-5 transition-colors">
                  <svc.icon className="w-5 h-5 md:w-6 md:h-6 text-navy-700 group-hover:text-navy-950 transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-2">
                  {svc.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-14 md:py-24 bg-navy-950">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10 md:mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Why Shashi Electronics
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              The Shashi Difference
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -3 }}
                data-ocid={`highlights.item.${i + 1}`}
                className="text-center p-6 md:p-8 rounded-2xl bg-navy-900 border border-navy-800 cursor-default"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 md:mb-5">
                  <h.icon className="w-6 h-6 md:w-7 md:h-7 text-amber-400" />
                </div>
                {h.isCounter ? (
                  <>
                    <div className="font-display font-extrabold text-amber-400 text-3xl md:text-4xl mb-1">
                      <AnimatedCounter
                        target={h.counterTarget}
                        suffix={h.counterSuffix}
                      />
                    </div>
                    <p className="font-display font-bold text-white text-base mb-2">
                      {h.counterLabel}
                    </p>
                  </>
                ) : (
                  <h3 className="font-display font-bold text-white text-base md:text-lg mb-2">
                    {h.title}
                  </h3>
                )}
                <p className="text-navy-300 text-sm leading-relaxed">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        ref={sectionsRef.howItWorks}
        id="how-it-works"
        className="py-14 md:py-24 bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10 md:mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Simple Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
            >
              From first contact to fixed TV — we make the process stress-free.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-12 left-[calc(16.6%+1.5rem)] right-[calc(16.6%+1.5rem)] h-px bg-border" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                data-ocid={`steps.item.${i + 1}`}
                className="relative text-center cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-navy-950 border-4 border-amber-500 flex flex-col items-center justify-center mx-auto mb-5 md:mb-6 shadow-card"
                >
                  <span className="font-display text-amber-400 text-xs font-bold tracking-widest">
                    {step.num}
                  </span>
                  <step.icon className="w-6 h-6 md:w-7 md:h-7 text-white mt-1" />
                </motion.div>
                <h3 className="font-display font-bold text-lg md:text-xl text-foreground mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        ref={sectionsRef.reviews}
        id="reviews"
        className="py-14 md:py-24 bg-navy-950"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-10 md:mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Customer Reviews
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              What Our Customers Say
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-1 mb-2"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-navy-300 text-xs sm:text-sm ml-2">
                4.9/5 from 300+ reviews
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -3 }}
                data-ocid={`reviews.item.${i + 1}`}
                className="bg-navy-900 border border-navy-800 rounded-2xl p-5 md:p-7 cursor-default"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }, (_, s) => s + 1).map((n) => (
                    <Star
                      key={n}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-navy-100 text-sm leading-relaxed mb-5 md:mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-amber-400 text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-navy-400 text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT / BOOKING FORM ── */}
      <section
        ref={sectionsRef.contact}
        id="contact"
        className="py-14 md:py-24 bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left: Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Get In Touch
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 md:mb-5"
              >
                Book Your Repair Today
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 md:mb-10"
              >
                Fill out the form and we'll get back to you within the hour.
                Free diagnosis. No fix, no fee.
              </motion.p>

              <motion.div variants={stagger} className="space-y-3 md:space-y-4">
                <motion.a
                  variants={fadeUp}
                  whileHover={{ x: 6, borderColor: "oklch(72% 0.19 62 / 0.6)" }}
                  href="tel:9426340603"
                  data-ocid="contact.phone1.link"
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-card transition-all group min-h-[64px]"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy-950" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Call Us Anytime
                    </p>
                    <p className="font-display font-bold text-foreground text-base md:text-lg group-hover:text-amber-600 transition-colors">
                      9426340603
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contact: Hitesh Patel
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>

                <motion.a
                  variants={fadeUp}
                  whileHover={{ x: 6, borderColor: "oklch(72% 0.19 62 / 0.6)" }}
                  href="tel:9925200162"
                  data-ocid="contact.phone2.link"
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-card transition-all group min-h-[64px]"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy-950" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Call Us Anytime
                    </p>
                    <p className="font-display font-bold text-foreground text-base md:text-lg group-hover:text-amber-600 transition-colors">
                      9925200162
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>

                <motion.a
                  variants={fadeUp}
                  whileHover={{ x: 6, borderColor: "oklch(72% 0.19 62 / 0.6)" }}
                  href="tel:7859838847"
                  data-ocid="contact.phone3.link"
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-card transition-all group min-h-[64px]"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy-950" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Call Us Anytime
                    </p>
                    <p className="font-display font-bold text-foreground text-base md:text-lg group-hover:text-amber-600 transition-colors">
                      7859838847
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contact: Samarth Patel
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>

                <motion.a
                  variants={fadeUp}
                  whileHover={{ x: 6, borderColor: "oklch(72% 0.19 62 / 0.6)" }}
                  href="tel:9377748200"
                  data-ocid="contact.phone4.link"
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-card transition-all group min-h-[64px]"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy-950" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Call Us Anytime
                    </p>
                    <p className="font-display font-bold text-foreground text-base md:text-lg group-hover:text-amber-600 transition-colors">
                      9377748200
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contact: Shashi Patel
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>

                {/* Address — links to Google Maps */}
                <motion.a
                  variants={fadeUp}
                  whileHover={{ x: 6, borderColor: "oklch(72% 0.19 62 / 0.6)" }}
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.address.link"
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-card transition-all group min-h-[64px]"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-navy-100 group-hover:bg-amber-500 flex items-center justify-center shrink-0 transition-colors">
                    <MapPin className="w-5 h-5 text-navy-700 group-hover:text-navy-950 transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Visit Our Shop
                    </p>
                    <p className="font-semibold text-foreground group-hover:text-amber-600 transition-colors text-sm md:text-base">
                      262, Sardar Patel Super Market, Petlad - 388450
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mon–Sat 8am–6pm
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <div
                className="bg-card border border-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-card"
                data-ocid="contact.form.panel"
              >
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-5 md:mb-6">
                  Book a Repair
                </h3>

                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      data-ocid="contact.form.success_state"
                      className="flex flex-col items-center text-center py-8 md:py-10 gap-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-display font-bold text-xl text-foreground">
                        Booking Submitted!
                      </h4>
                      <p className="text-muted-foreground text-sm max-w-xs">
                        We've received your request and will call you within the
                        hour to confirm your appointment.
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          data-ocid="contact.form.reset.button"
                          variant="outline"
                          onClick={() => setSubmitStatus("idle")}
                          className="mt-2"
                        >
                          Submit Another Request
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4 md:space-y-5"
                    >
                      {submitStatus === "error" && (
                        <div
                          data-ocid="contact.form.error_state"
                          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>
                            Submission failed. Please call us directly at{" "}
                            <a
                              href="tel:9426340603"
                              className="underline font-bold"
                            >
                              9426340603
                            </a>
                            .
                          </span>
                        </div>
                      )}

                      {/* Name + Phone — stack on mobile, 2 cols on sm+ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Your Name</Label>
                          <Input
                            id="customerName"
                            data-ocid="contact.name.input"
                            placeholder="Jane Smith"
                            value={formState.customerName}
                            onChange={(e) =>
                              setFormState((p) => ({
                                ...p,
                                customerName: e.target.value,
                              }))
                            }
                            required
                            className="h-11 text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input
                            id="phoneNumber"
                            data-ocid="contact.phone.input"
                            type="tel"
                            placeholder="98XXXXXXXX"
                            value={formState.phoneNumber}
                            onChange={(e) =>
                              setFormState((p) => ({
                                ...p,
                                phoneNumber: e.target.value,
                              }))
                            }
                            required
                            className="h-11 text-base"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Select
                          value={formState.serviceType}
                          onValueChange={(val) =>
                            setFormState((p) => ({ ...p, serviceType: val }))
                          }
                          required
                        >
                          <SelectTrigger
                            id="serviceType"
                            data-ocid="contact.service.select"
                            className="h-11 text-base"
                          >
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Screen Repair">
                              Screen Repair
                            </SelectItem>
                            <SelectItem value="Power Issues">
                              Power Issues
                            </SelectItem>
                            <SelectItem value="Sound Problems">
                              Sound Problems
                            </SelectItem>
                            <SelectItem value="Picture Quality">
                              Picture Quality
                            </SelectItem>
                            <SelectItem value="Remote & Input Issues">
                              Remote &amp; Input Issues
                            </SelectItem>
                            <SelectItem value="Circuit Board Repair">
                              Circuit Board Repair
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Describe the Issue</Label>
                        <Textarea
                          id="message"
                          data-ocid="contact.message.textarea"
                          placeholder="Tell us what's wrong with your TV — the more detail, the better!"
                          rows={4}
                          value={formState.message}
                          onChange={(e) =>
                            setFormState((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          required
                          className="resize-none text-base"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          data-ocid="contact.form.submit_button"
                          disabled={
                            submitStatus === "loading" ||
                            (actorFetching && !actor)
                          }
                          className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-base amber-glow btn-shimmer"
                        >
                          {submitStatus === "loading" ||
                          (actorFetching && !actor) ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />
                              <span data-ocid="contact.form.loading_state">
                                {actorFetching && !actor
                                  ? "Connecting..."
                                  : "Submitting..."}
                              </span>
                            </>
                          ) : (
                            <>
                              Book My Repair
                              <ChevronRight className="w-4 h-4 ml-1 shrink-0" />
                            </>
                          )}
                        </Button>
                      </motion.div>

                      <p className="text-xs text-muted-foreground text-center">
                        No fix, no fee — 100% satisfaction guaranteed.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy-950 border-t border-navy-800 py-10 md:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-8 md:mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-12-at-2.11.50-PM-1.jpeg"
                  alt="Shashi Electronics Logo"
                  className="h-12 w-12 md:h-16 md:w-16 object-contain"
                />
                <span className="font-display font-bold text-white text-base md:text-lg leading-tight">
                  Shashi Electronics
                </span>
              </div>
              <p className="text-navy-300 text-sm leading-relaxed">
                Your neighborhood TV repair experts. Honest work, guaranteed
                results, fair prices.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-white mb-4">
                Contact
              </h4>
              <div className="space-y-2.5 text-sm text-navy-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href="tel:9426340603"
                    data-ocid="footer.phone1.link"
                    className="hover:text-amber-400 transition-colors"
                  >
                    9426340603
                  </a>
                  <span className="text-navy-500">— Hitesh Patel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href="tel:9925200162"
                    data-ocid="footer.phone2.link"
                    className="hover:text-amber-400 transition-colors"
                  >
                    9925200162
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href="tel:7859838847"
                    data-ocid="footer.phone3.link"
                    className="hover:text-amber-400 transition-colors"
                  >
                    7859838847
                  </a>
                  <span className="text-navy-500">— Samarth Patel</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href="tel:9377748200"
                    data-ocid="footer.phone4.link"
                    className="hover:text-amber-400 transition-colors"
                  >
                    9377748200
                  </a>
                  <span className="text-navy-500">— Shashi Patel</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="footer.address.link"
                    className="hover:text-amber-400 transition-colors"
                  >
                    262, Sardar Patel Super Market, Petlad - 388450
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Mon–Sat 8am–6pm</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-white mb-4">
                Quick Links
              </h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.key}
                    data-ocid={`footer.${link.key}.link`}
                    onClick={() => scrollTo(link.key)}
                    className="block text-sm text-navy-300 hover:text-amber-400 transition-colors min-h-[36px] flex items-center"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-navy-800 pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-navy-400">
            <p>&copy; {currentYear} Shashi Electronics. All rights reserved.</p>
            <p>
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
