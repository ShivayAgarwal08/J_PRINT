import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Lock,
  School,
  Zap,
  Shield,
  CheckCircle2,
  FileText,
  Clock,
  Printer,
  ChevronDown,
  LayoutDashboard,
  Truck,
  CreditCard,
  MapPin,
  Star,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [show128Options, setShow128Options] = useState(false);
  const [show62Popup, setShow62Popup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.9]);

  const handle128Click = () => {
    setShow128Options(true);
  };

  const handle62Click = () => {
    setShow62Popup(true);
    setTimeout(() => setShow62Popup(false), 3000);
  };

  const services = [
    {
      icon: <FileText className="text-neon-purple" size={32} />,
      title: "Document Printing",
      desc: "High-quality B&W and color prints for your assignments and notes.",
      color: "purple"
    },
    {
      icon: <Printer className="text-neon-cyan" size={32} />,
      title: "Bulk Printing",
      desc: "Economical solutions for large sets of notes and study materials.",
      color: "cyan"
    },
    {
      icon: <Zap className="text-neon-magenta" size={32} />,
      title: "Express Delivery",
      desc: "Get your prints ready within minutes for last-minute submissions.",
      color: "magenta"
    },
    {
      icon: <LayoutDashboard className="text-neon-purple" size={32} />,
      title: "Stationery Store",
      desc: "Order notebooks, pens, and other essentials with your prints.",
      color: "purple"
    }
  ];

  const steps = [
    { number: "01", title: "Upload Files", desc: "Drag and drop your PDFs or images directly." },
    { number: "02", title: "Customize", desc: "Select color, duplex, and layout options." },
    { number: "03", title: "Pay Securely", desc: "UPI, Cards, or Wallet – fast and encrypted." },
    { number: "04", title: "Get OTP", desc: "Receive a unique code for your order." },
    { number: "05", title: "Collect", desc: "Pick up instantly from your chosen vendor." }
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans noise-bg selection:bg-neon-purple/30 overflow-x-hidden">
      <div className="mesh-bg" />

      {/* Nav */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-neon-purple rounded-xl flex items-center justify-center font-orbitron font-bold text-white shadow-[0_0_15px_rgba(155,92,255,0.5)] group-hover:scale-110 transition-transform">J</div>
            <span className="font-grotesk font-bold text-2xl tracking-tighter">JPRINT<span className="text-neon-purple">.</span></span>
          </motion.div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-text-secondary">
            <a href="#services" className="hover:text-white transition-colors hover:neon-glow">Services</a>
            <a href="#how-it-works" className="hover:text-white transition-colors hover:neon-glow">How It Works</a>
            <button onClick={() => navigate('/vendor-login')} className="bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all flex items-center gap-2">
              <Lock size={14} className="text-neon-purple" /> Vendor Login
            </button>
            <button onClick={() => navigate('/admin')} className="bg-neon-purple/20 border border-neon-purple/50 px-4 py-2 rounded-full hover:bg-neon-purple/30 transition-all flex items-center gap-2 text-neon-purple font-bold">
              <Shield size={14} /> Admin
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 bg-neon-purple text-white rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(155,92,255,0.3)] hover:shadow-[0_0_30px_rgba(155,92,255,0.5)] transition-all"
          >
            Print Now
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            style={{ opacity, scale }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neon-purple/10 border border-neon-purple/20 rounded-full text-neon-purple text-xs font-bold mb-8 uppercase tracking-widest"
            >
              <Zap size={14} className="animate-pulse" /> Smart Campus Printing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
            >
              Print Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-violet to-neon-cyan neon-glow">
                Faster. Seamless.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-12 leading-relaxed max-w-xl font-medium"
            >
              The ultimate smart printing platform for JIIT. Upload files, customize settings, and pick up instantly with a secure OTP.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button
                onClick={() => document.getElementById('selection')?.scrollIntoView({ behavior: 'smooth' })}
                className="neon-button flex items-center justify-center gap-3 text-lg"
              >
                Upload & Print <ArrowRight size={22} />
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="neon-button-outline flex items-center justify-center gap-3 text-lg"
              >
                View Services <ChevronDown size={20} />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-20 glass-card p-1 border-white/5">
              <img
                src="3d-printing-geometric-shape.jpg"
                alt="JPRINT Dashboard"
                className="w-full h-auto rounded-lg grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-purple/20 blur-[60px] animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-cyan/20 blur-[60px] animate-pulse-slow" />
            </div>

            {/* Floating cards mockup */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-20 -right-10 glass-card p-6 shadow-neon-purple/20 border-neon-purple/20"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neon-purple/20 rounded-lg text-neon-purple">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs text-text-secondary font-bold uppercase tracking-wider">Order Status</p>
                  <p className="font-bold text-white">Printing Complete</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary opacity-50"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-text-secondary to-transparent" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our <span className="text-neon-cyan neon-glow">Services</span>
            </motion.h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg font-medium">
              Experience futuristic printing solutions designed for the modern-day JIIT student.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-neon-purple/20 transition-all duration-500`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-purple transition-colors">{service.title}</h3>
                <p className="text-text-secondary leading-relaxed font-medium">{service.desc}</p>

                <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-2 text-neon-purple font-bold text-sm">
                    Learn More <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
                The <span className="text-neon-purple neon-glow">Simplest Way</span> <br /> to Print on Campus.
              </h2>

              <div className="space-y-6">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-orbitron font-bold text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all shadow-lg group-hover:shadow-neon-purple/50">
                        {step.number}
                      </div>
                      {i < steps.length - 1 && <div className="w-px h-full bg-white/5 my-2" />}
                    </div>
                    <div className="pb-8">
                      <h4 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{step.title}</h4>
                      <p className="text-text-secondary font-medium">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="glass-card p-4 border-neon-purple/20 bg-neon-purple/5">
                <div className="relative aspect-square md:aspect-video rounded-lg overflow-hidden flex items-center justify-center p-8">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-full h-full border border-dashed border-neon-purple/20 rounded-full"
                  />
                  <div className="text-center z-10">
                    <div className="inline-block p-6 bg-neon-purple/20 rounded-full mb-8 text-neon-purple">
                      <Zap size={64} className="animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Smooth Experience</h3>
                    <p className="text-text-secondary font-medium">Zero lag. 60 FPS motion. <br />Optimized for the next generation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Dashboard Preview */}
      <section className="py-32 overflow-hidden">
        <div className="max-width-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#12121A] to-[#0A0A0F] rounded-[40px] p-12 lg:p-24 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <LayoutDashboard size={400} />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-neon-cyan text-[10px] font-bold mb-6 uppercase tracking-widest">
                  Vendor Dashboard
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Empowering <span className="text-neon-cyan neon-glow">Vendors</span> with Smart Analytics.
                </h2>
                <ul className="space-y-6">
                  {[
                    { icon: <CheckCircle2 className="text-neon-cyan" />, text: "Real-time order monitoring" },
                    { icon: <CheckCircle2 className="text-neon-cyan" />, text: "Instant OTP verification system" },
                    { icon: <CheckCircle2 className="text-neon-cyan" />, text: "Inventory and sales tracking" },
                    { icon: <CheckCircle2 className="text-neon-cyan" />, text: "Automated payout management" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-text-secondary font-medium">
                      {item.icon} {item.text}
                    </li>
                  ))}
                </ul>
                <button className="mt-12 group flex items-center gap-3 font-bold text-neon-cyan">
                  Partner with us <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="glass-card bg-[#0A0A0F] p-4 shadow-neon-cyan/10 border-neon-cyan/10"
              >
                <img src="https://thumbs.dreamstime.com/b/d-printer-setup-laptop-display-additive-manufacturing-technology-isometric-view-modern-printing-concept-innovation-355395248.jpg" alt="Dashboard" className="rounded-xl opacity-80" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Orders Printed", value: "25k+", icon: <Printer /> },
            { label: "Active Students", value: "5k+", icon: <Users /> },
            { label: "Verified Shops", value: "10+", icon: <Shield /> },
            { label: "Efficiency Rate", value: "99.9%", icon: <Zap /> },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-neon-purple mb-4 flex justify-center transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2 font-orbitron neon-glow">{stat.value}</div>
              <div className="text-text-secondary text-sm font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="mesh-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Student <span className="text-neon-magenta neon-glow">Experiences</span></h2>
            <p className="text-text-secondary font-medium">Join thousands of students who have upgraded their campus life.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", role: "3rd Year, JIIT", text: "JPRINT saved me from long queues during exams. The OTP system is brilliant and so easy to use!", stars: 5 },
              { name: "Priya Varma", role: "2nd Year, JIIT", text: "The UI feels so premium, almost like using a high-end tech app. Plus, the print quality is always top-notch.", stars: 5 },
              { name: "Armaan Malik", role: "Final Year, JIIT", text: "Best startup in campus. Everything from uploading files to pickup is buttery smooth. Highly recommended!", stars: 5 }
            ].map((test, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 bg-white/[0.03] border-white/5 group"
              >
                <div className="flex gap-1 mb-6 text-neon-magenta">
                  {[...Array(test.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg text-text-secondary mb-10 italic leading-relaxed">"{test.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan p-0.5">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-sm">
                      {test.name[0]}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-white group-hover:text-neon-purple transition-colors">{test.name}</h5>
                    <p className="text-xs text-text-secondary uppercase tracking-widest font-bold">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Selection - THE ACTION SECTION */}
      <section id="selection" className="py-40 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="glass-card p-12 lg:p-20 border-neon-purple/30 bg-neon-purple/5 relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to <span className="text-neon-purple neon-glow">Print?</span></h2>
            <p className="text-xl text-text-secondary mb-16 font-medium max-w-2xl mx-auto leading-relaxed">Select your campus and get your documents printed in the fastest possible way.</p>

            <div className="grid gap-8 max-w-lg mx-auto">
              {!show128Options ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handle128Click}
                    className="w-full glass-card p-8 border-white/10 flex items-center justify-between hover:border-neon-purple hover:bg-neon-purple/10 transition-all text-left group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-text-secondary group-hover:bg-neon-purple group-hover:text-white transition-all shadow-lg">
                        <School size={32} />
                      </div>
                      <div>
                        <h3 className="font-bold text-2xl text-white">JIIT Sector 128</h3>
                        <p className="text-sm text-text-secondary font-bold uppercase tracking-widest">Wish Town Campus</p>
                      </div>
                    </div>
                    <ArrowRight size={24} className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                  </motion.button>

                  <button
                    onClick={handle62Click}
                    className="w-full glass-card p-8 border-white/5 opacity-40 grayscale pointer-events-none flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
                        <Lock size={32} />
                      </div>
                      <div>
                        <h3 className="font-bold text-2xl text-white/20">JIIT Sector 62</h3>
                        <p className="text-sm text-white/20 font-bold uppercase tracking-widest">Main Campus</p>
                      </div>
                    </div>
                    <span className="bg-white/5 text-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5">Coming Soon</span>
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <button onClick={() => setShow128Options(false)} className="text-sm font-bold text-text-secondary hover:text-white transition-colors mb-4 flex items-center gap-2 mx-auto justify-center">
                    <ChevronDown size={16} className="rotate-90" /> Change Campus
                  </button>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => navigate('/login')}
                      className="neon-button-outline w-full h-40 flex flex-col items-center justify-center gap-4 border-white/10"
                    >
                      <Users size={32} className="text-neon-purple" />
                      <span className="text-lg">Student Login</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => navigate('/register')}
                      className="neon-button w-full h-40 flex flex-col items-center justify-center gap-4"
                    >
                      <Zap size={32} />
                      <span className="text-lg">Sign Up</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-neon-purple rounded-lg flex items-center justify-center font-orbitron font-bold text-white shadow-[0_0_10px_rgba(155,92,255,0.4)]">J</div>
                <span className="font-grotesk font-bold text-xl tracking-tight">JPRINT<span className="text-neon-purple">.</span></span>
              </div>
              <p className="text-text-secondary font-medium max-w-sm mb-10 leading-relaxed">
                A futuristic AI-powered printing platform that feels premium, fast, reliable, and effortless — like the Google of college printing.
              </p>
              <div className="flex gap-6 grayscale hover:grayscale-0 transition-all">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-neon-purple/20 border border-white/5">
                  <Users size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-neon-cyan/20 border border-white/5">
                  <CheckCircle2 size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-neon-magenta/20 border border-white/5">
                  <Star size={18} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Resources</h4>
              <ul className="space-y-4 text-sm font-medium text-text-secondary">
                <li className="hover:text-neon-purple cursor-pointer transition-colors">Order Status</li>
                <li className="hover:text-neon-purple cursor-pointer transition-colors">Pricing Guide</li>
                <li className="hover:text-neon-purple cursor-pointer transition-colors">Vendor Partners</li>
                <li className="hover:text-neon-purple cursor-pointer transition-colors">App Download</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Legal</h4>
              <ul className="space-y-4 text-sm font-medium text-text-secondary">
                <li className="hover:text-neon-purple cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-neon-purple cursor-pointer transition-colors">Terms of Use</li>
                <li className="hover:text-neon-purple cursor-pointer transition-colors">Cookie Policy</li>
                <li className="hover:text-neon-purple cursor-pointer transition-colors">Compliance</li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
            <p className="text-sm text-text-secondary font-medium">© 2026 JPRINT Systems. Handcrafted for JIIT Students.</p>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5 text-[10px] font-bold text-text-secondary">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> v3.0.4
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {show62Popup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-card border-neon-cyan/30 bg-neon-cyan/10 px-8 py-5 flex items-center gap-6 z-[100] shadow-[0_0_50px_rgba(0,229,255,0.2)]"
          >
            <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">
              <Lock size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Main Campus Expansion</p>
              <p className="text-xs text-neon-cyan/80 font-medium">Sector 62 services will be online next semester!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
