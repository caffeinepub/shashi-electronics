import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

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

export default function App() {
  const { actor } = useActor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    customerName: "",
    phoneNumber: "",
    tvBrand: "",
    issueDescription: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Service unavailable. Please try again.");
      return;
    }
    setSubmitStatus("loading");
    try {
      await actor.submitBooking(
        formState.customerName,
        formState.phoneNumber,
        formState.tvBrand,
        formState.issueDescription,
      );
      setSubmitStatus("success");
      toast.success("Booking submitted! We'll call you within the hour.");
      setFormState({
        customerName: "",
        phoneNumber: "",
        tvBrand: "",
        issueDescription: "",
      });
    } catch {
      setSubmitStatus("error");
      toast.error("Something went wrong. Please call us directly.");
    }
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
      desc: "Trusted by thousands of households across the city since 2010.",
    },
    {
      icon: Clock,
      title: "Same-Day Service",
      desc: "Most repairs completed the same day you bring in your TV.",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
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
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-12-at-2.11.50-PM-1.jpeg"
              alt="Shashi Electronics Logo"
              className="h-10 w-10 object-cover rounded-full"
            />
            <span className="font-display font-bold text-white text-lg leading-tight">
              Shashi Electronics
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.key}
                data-ocid={`nav.${link.key}.link`}
                onClick={() => scrollTo(link.key)}
                className="px-4 py-2 text-sm text-navy-200 hover:text-amber-400 transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              data-ocid="nav.book_repair.button"
              onClick={() => scrollTo("contact")}
              className="hidden md:inline-flex bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold amber-glow transition-all"
            >
              Book Repair
            </Button>
            <button
              type="button"
              data-ocid="nav.mobile_menu.toggle"
              className="md:hidden p-2 text-white"
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
                  className="text-left px-3 py-2 text-navy-100 hover:text-amber-400 hover:bg-navy-800 rounded-md transition-colors font-medium text-sm"
                >
                  {link.label}
                </button>
              ))}
              <Button
                data-ocid="nav.mobile.book_repair.button"
                onClick={() => scrollTo("contact")}
                className="mt-2 bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold"
              >
                Book Repair
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center pt-16"
        style={{
          backgroundImage:
            "url('/assets/uploads/WhatsApp-Image-2026-03-12-at-12.01.39-PM-1.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container mx-auto px-4 lg:px-8 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6"
            >
              Expert TV & Electronics Repair
              <br />
              <span className="text-amber-400">You Can Trust.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Same-day diagnostics. Transparent pricing. Certified technicians
              with over 15 years of experience fixing every major TV brand.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                data-ocid="hero.book_repair.primary_button"
                size="lg"
                onClick={() => scrollTo("contact")}
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-base h-12 px-8 amber-glow"
              >
                Book a Repair
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                data-ocid="hero.call_now.secondary_button"
                size="lg"
                variant="outline"
                asChild
                className="border-white/40 text-white hover:bg-white/10 h-12 px-8 text-base font-semibold"
              >
                <a href="tel:9426340603">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us: 9426340603
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap gap-6"
            >
              {["Samsung", "LG", "Sony", "TCL", "Hisense", "Vizio"].map(
                (brand) => (
                  <span
                    key={brand}
                    className="text-navy-300 text-sm font-medium"
                  >
                    {brand}
                  </span>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
        className="py-24 bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              What We Fix
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4"
            >
              Our Repair Services
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg max-w-xl mx-auto"
            >
              We repair all makes and models of LCD, LED, OLED, and QLED TVs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                data-ocid={`services.item.${i + 1}`}
                className="group bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-navy-100 group-hover:bg-amber-500 flex items-center justify-center mb-5 transition-colors">
                  <svc.icon className="w-6 h-6 text-navy-700 group-hover:text-navy-950 transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
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
      <section className="py-24 bg-navy-950">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Why Shashi Electronics
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              The Shashi Difference
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                variants={fadeUp}
                data-ocid={`highlights.item.${i + 1}`}
                className="text-center p-8 rounded-2xl bg-navy-900 border border-navy-800"
              >
                <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
                  <h.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {h.title}
                </h3>
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
        className="py-24 bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Simple Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg max-w-xl mx-auto"
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
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.6%+1.5rem)] right-[calc(16.6%+1.5rem)] h-px bg-border" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                data-ocid={`steps.item.${i + 1}`}
                className="relative text-center"
              >
                <div className="w-24 h-24 rounded-full bg-navy-950 border-4 border-amber-500 flex flex-col items-center justify-center mx-auto mb-6 shadow-card">
                  <span className="font-display text-amber-400 text-xs font-bold tracking-widest">
                    {step.num}
                  </span>
                  <step.icon className="w-7 h-7 text-white mt-1" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
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
        className="py-24 bg-navy-950"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Customer Reviews
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4"
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
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-navy-300 text-sm ml-2">
                4.9/5 from 300+ reviews
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                data-ocid={`reviews.item.${i + 1}`}
                className="bg-navy-900 border border-navy-800 rounded-2xl p-7"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }, (_, s) => s + 1).map((n) => (
                    <Star
                      key={n}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-navy-100 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
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
        className="py-24 bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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
                className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-5"
              >
                Book Your Repair Today
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-lg leading-relaxed mb-10"
              >
                Fill out the form and we'll get back to you within the hour.
                Free diagnosis. No fix, no fee.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                <motion.a
                  variants={fadeUp}
                  href="tel:9426340603"
                  data-ocid="contact.phone1.link"
                  className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-card transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy-950" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Call Us Anytime
                    </p>
                    <p className="font-display font-bold text-foreground text-lg group-hover:text-amber-600 transition-colors">
                      9426340603
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contact: Hitesh Patel
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  variants={fadeUp}
                  href="tel:7859838847"
                  data-ocid="contact.phone2.link"
                  className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-amber-500/40 hover:shadow-card transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-navy-950" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Call Us Anytime
                    </p>
                    <p className="font-display font-bold text-foreground text-lg group-hover:text-amber-600 transition-colors">
                      7859838847
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contact: Samarth Patel
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-navy-700" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      Visit Our Shop
                    </p>
                    <p className="font-semibold text-foreground">
                      263, Sardar Patel Super Market, Petlad - 388450
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mon–Sat 8am–6pm
                    </p>
                  </div>
                </motion.div>
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
                className="bg-card border border-border rounded-2xl p-8 shadow-card"
                data-ocid="contact.form.panel"
              >
                <h3 className="font-display font-bold text-2xl text-foreground mb-6">
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
                      className="flex flex-col items-center text-center py-10 gap-4"
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
                      <Button
                        data-ocid="contact.form.reset.button"
                        variant="outline"
                        onClick={() => setSubmitStatus("idle")}
                        className="mt-2"
                      >
                        Submit Another Request
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {submitStatus === "error" && (
                        <div
                          data-ocid="contact.form.error_state"
                          className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          Submission failed. Please call us directly at
                          9426340603.
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tvBrand">TV Brand & Model</Label>
                        <Input
                          id="tvBrand"
                          data-ocid="contact.tv_brand.input"
                          placeholder="e.g. Samsung QN65Q80C"
                          value={formState.tvBrand}
                          onChange={(e) =>
                            setFormState((p) => ({
                              ...p,
                              tvBrand: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="issueDescription">
                          Describe the Issue
                        </Label>
                        <Textarea
                          id="issueDescription"
                          data-ocid="contact.issue.textarea"
                          placeholder="Tell us what's wrong with your TV — the more detail, the better!"
                          rows={4}
                          value={formState.issueDescription}
                          onChange={(e) =>
                            setFormState((p) => ({
                              ...p,
                              issueDescription: e.target.value,
                            }))
                          }
                          required
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        data-ocid="contact.form.submit_button"
                        disabled={submitStatus === "loading"}
                        className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-base amber-glow"
                      >
                        {submitStatus === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            <span data-ocid="contact.form.loading_state">
                              Submitting...
                            </span>
                          </>
                        ) : (
                          <>
                            Book My Repair
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </Button>

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
      <footer className="bg-navy-950 border-t border-navy-800 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-12-at-2.11.50-PM-1.jpeg"
                  alt="Shashi Electronics Logo"
                  className="h-12 w-12 object-cover rounded-full"
                />
                <span className="font-display font-bold text-white text-lg leading-tight">
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
              <div className="space-y-2 text-sm text-navy-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
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
                  <Phone className="w-4 h-4 text-amber-400" />
                  <a
                    href="tel:7859838847"
                    data-ocid="footer.phone2.link"
                    className="hover:text-amber-400 transition-colors"
                  >
                    7859838847
                  </a>
                  <span className="text-navy-500">— Samarth Patel</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>263, Sardar Patel Super Market, Petlad - 388450</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
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
                    className="block text-sm text-navy-300 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-navy-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-navy-400">
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
