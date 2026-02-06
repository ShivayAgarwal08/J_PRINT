import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Zap,
  FileText,
  Image as ImageIcon,
  PenTool,
  TrendingUp,
  ArrowRight,
  ShoppingCart,
  LayoutGrid,
  Bell,
  Printer,
  ChevronRight,
  HelpCircle,
  Clock,
  History,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useOrder } from "../context/OrderContext";
import FeedbackForm from "../components/FeedbackForm";
import { getApiUrl } from "../config";

export default function Home() {
  const { user, logout } = useAuth();
  const { addStationeryItem, currentOrder } = useOrder();
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await fetch(getApiUrl("api/inventory"));
      if (res.ok) {
        const data = await res.json();
        // Only show active items
        setInventory(data.filter((item) => item.status === "active"));
      }
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    } finally {
      setLoadingInventory(false);
    }
  };

  const handleAddToCart = (name, price) => {
    addStationeryItem({ name, price });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const cartCount = currentOrder.files.length;

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans pb-20 selection:bg-neon-purple/30 noise-bg">
      <div className="mesh-bg opacity-20 fixed inset-0 pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0F]/60 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-neon-purple rounded-xl flex items-center justify-center font-orbitron font-bold text-white shadow-[0_0_15px_rgba(155,92,255,0.3)] group-hover:scale-110 transition-transform">
              J
            </div>
            <h1 className="font-grotesk font-bold text-xl tracking-tight text-white">
              JPRINT<span className="text-neon-purple">.</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8 translate-x-12">
            <Link
              to="/home"
              className="text-sm font-bold text-white tracking-widest uppercase hover:text-neon-purple transition-colors"
            >
              Home
            </Link>
            <Link
              to="/order"
              className="text-sm font-bold text-text-secondary tracking-widest uppercase hover:text-neon-purple transition-colors"
            >
              Order
            </Link>
            <Link
              to="/profile"
              className="text-sm font-bold text-text-secondary tracking-widest uppercase hover:text-neon-purple transition-colors"
            >
              History
            </Link>
            <Link
              to="/admin"
              className="text-sm font-bold text-neon-purple tracking-widest uppercase hover:text-white transition-colors border border-neon-purple/50 px-3 py-1 rounded-lg"
            >
              Admin
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors relative text-text-secondary hover:text-white">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-neon-purple rounded-full shadow-[0_0_10px_#9B5CFF]" />
            </button>

            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-4">
              <Link to="/profile" className="group">
                <div className="flex items-center gap-3 p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-neon-purple/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center text-white font-bold shadow-[0_0_10px_#9B5CFF]">
                    {user?.name?.[0].toUpperCase() || <User size={16} />}
                  </div>
                  <span className="text-xs font-bold mr-3 text-text-secondary group-hover:text-white hidden sm:block uppercase tracking-wider">
                    Profile
                  </span>
                </div>
              </Link>
              <Link
                to="/admin"
                className="md:hidden p-2 rounded-xl text-neon-purple hover:bg-neon-purple/10 border border-neon-purple/30"
              >
                <Shield size={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 space-y-16 relative z-10">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(155,92,255,0.1)]"
            >
              <Zap size={12} /> Connected: JIIT 128
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-grotesk font-extrabold tracking-tighter text-white leading-[0.9]"
            >
              Start <br />
              <span className="text-neon-purple neon-glow">Printing.</span>
            </motion.h2>
          </div>

          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
              size={18}
            />
            <input
              type="text"
              placeholder="Search services, history, items..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/50 transition-all font-medium text-sm text-white placeholder:text-white/20"
            />
          </div>
        </section>

        {/* Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/order"
            className="md:col-span-2 group relative overflow-hidden bg-[#12121A] rounded-[32px] p-12 flex flex-col justify-between h-[400px] border border-white/5 transition-all hover:border-neon-purple/50"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 blur-[100px] rounded-full -mr-40 -mt-20 group-hover:bg-neon-purple/20 transition-all duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-neon-purple/20 backdrop-blur-md border border-neon-purple/30 flex items-center justify-center text-neon-purple mb-8 shadow-[0_0_20px_rgba(155,92,255,0.2)]">
                <Printer size={32} />
              </div>
              <h3 className="text-5xl font-grotesk font-bold text-white tracking-tighter mb-4 leading-tight">
                Document <br />
                Printing
              </h3>
              <p className="text-text-secondary font-medium text-lg max-w-sm">
                Upload PDFs, Docs or Images easily.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-white font-bold text-base tracking-widest uppercase group-hover:gap-5 transition-all group-hover:text-neon-purple">
              Print Now <ArrowRight size={20} />
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-8">
            <Link
              to="/profile"
              className="block group glass-card p-[1px] hover:neon-glow-border transition-all h-[184px]"
            >
              <div className="bg-[#12121A]/80 backdrop-blur-xl rounded-[30px] p-8 h-full flex flex-col justify-between border border-white/5 group-hover:border-neon-purple/30">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-text-secondary flex items-center justify-center group-hover:bg-neon-purple group-hover:text-white transition-all shadow-xl">
                    <Clock size={24} />
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-white/10 group-hover:text-neon-purple transition-all group-hover:translate-x-1"
                  />
                </div>
                <div className="font-bold text-base text-white tracking-widest uppercase">
                  Order History
                </div>
              </div>
            </Link>
            <Link
              to="/order"
              className="block group glass-card p-[1px] hover:neon-glow-border transition-all h-[184px]"
            >
              <div className="bg-[#12121A]/80 backdrop-blur-xl rounded-[30px] p-8 h-full flex flex-col justify-between border border-white/5 group-hover:border-neon-purple/30">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-text-secondary flex items-center justify-center group-hover:bg-neon-cyan group-hover:text-background transition-all shadow-xl">
                    <FileText size={24} />
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-white/10 group-hover:text-neon-cyan transition-all group-hover:translate-x-1"
                  />
                </div>
                <div className="font-bold text-base text-white tracking-widest uppercase">
                  Quick Order
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Quick Links */}
        <section className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide py-2">
          {["Services", "Stationery", "Help", "Gallery", "Coupons"].map(
            (label, i) => (
              <button
                key={i}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-text-secondary hover:border-neon-purple hover:text-neon-purple hover:bg-neon-purple/5 transition-all whitespace-nowrap uppercase tracking-widest"
              >
                {label}
              </button>
            ),
          )}
        </section>

        {/* Stationery Section */}
        <section className="space-y-10 glass-card p-[1px]">
          <div className="bg-[#12121A]/60 backdrop-blur-2xl rounded-[40px] p-10 md:p-14 border border-white/5 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-cyan/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-grotesk font-bold text-white tracking-tighter">
                  Stationery Store
                </h3>
                <p className="text-base text-text-secondary font-medium">
                  Buy essential stationery items for your studies.
                </p>
              </div>
              <button className="text-xs font-bold text-text-secondary hover:text-neon-cyan transition-colors uppercase tracking-[0.2em] border-b border-text-secondary/20 pb-1">
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 relative z-10">
              {loadingInventory ? (
                <div className="col-span-full py-12 text-center text-white/40">
                  Loading Inventory...
                </div>
              ) : inventory.length === 0 ? (
                <div className="col-span-full py-12 text-center text-white/40">
                  Out of Stock.
                </div>
              ) : (
                inventory.map((item) => (
                  <ProductCard
                    key={item.id}
                    title={item.name}
                    desc={`${item.category || "General"}`}
                    price={item.price}
                    isOutOfStock={item.stock <= 0}
                    icon={
                      (item.category || "").toLowerCase().includes("files") ? (
                        <FileText size={22} className="text-neon-cyan" />
                      ) : (
                        <PenTool size={22} className="text-neon-purple" />
                      )
                    }
                    onClick={() => {
                      if (item.stock > 0)
                        handleAddToCart(item.name, item.price);
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Operator Support */}
        <section className="relative group overflow-hidden bg-background rounded-[40px] border border-neon-purple/30 p-1">
          <div className="bg-[#12121A] rounded-[39px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden transition-all duration-700 group-hover:bg-black/40">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 blur-[120px] rounded-full -mr-40 -mt-20 group-hover:bg-neon-purple/20 transition-all duration-1000" />

            <div className="space-y-4 text-center md:text-left relative z-10">
              <div className="inline-block px-3 py-1 bg-neon-purple/20 text-neon-purple text-[10px] font-bold uppercase tracking-[0.3em] rounded mb-2">
                Support
              </div>
              <h4 className="text-4xl md:text-5xl font-grotesk font-bold tracking-tighter text-white">
                Need Help?
              </h4>
              <p className="text-text-secondary font-medium text-lg max-w-lg">
                Contact our support team for complex orders or any queries.
              </p>
            </div>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-neon-purple text-white rounded-2xl font-bold text-sm flex items-center gap-4 hover:shadow-[0_0_30px_rgba(155,92,255,0.4)] transition-all shadow-xl active:scale-95 uppercase tracking-widest relative z-10"
            >
              Contact Support <ChevronRight size={20} />
            </a>
          </div>
        </section>

        <FeedbackForm />
      </main>

      {/* Floating Cart */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6"
          >
            <button
              onClick={() => navigate("/order")}
              className="w-full bg-[#12121A]/90 backdrop-blur-2xl text-white p-6 rounded-[32px] font-bold shadow-[0_0_50px_rgba(155,92,255,0.2)] border border-neon-purple/30 flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-neon-purple rounded-2xl flex items-center justify-center font-orbitron font-bold text-xl shadow-[0_0_20px_rgba(155,92,255,0.4)]">
                  {cartCount}
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-neon-purple font-bold uppercase tracking-[0.2em]">
                    Cart
                  </p>
                  <p className="text-lg font-grotesk tracking-tight">
                    Checkout
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-neon-purple group-hover:border-neon-purple transition-all">
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Floating Action Button - Always Visible */}
      <Link
        to="/admin"
        className="fixed bottom-8 right-8 z-[9999] w-20 h-20 bg-gradient-to-br from-neon-purple to-purple-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(155,92,255,0.8)] hover:scale-110 text-white transition-all border-4 border-white"
        title="Admin Access"
      >
        <Shield size={32} className="mb-1" />
        <span className="text-[8px] font-bold uppercase tracking-wider">
          ADMIN
        </span>
      </Link>

      <footer className="py-24 text-center border-t border-white/5 mt-20 relative z-10">
        <div className="w-12 h-12 bg-white/5 rounded-xl mx-auto flex items-center justify-center font-orbitron font-bold text-text-secondary mb-8">
          J
        </div>
        <p className="text-sm font-bold text-white tracking-[0.3em] uppercase mb-4">
          JPRINT Student Portal
        </p>
        <p className="text-[10px] font-medium text-text-secondary uppercase tracking-widest">
          © 2026 Sector 128 • JIIT Noida
        </p>

        <div className="flex justify-center gap-8 mt-12 mb-8">
          {["Terms", "Security", "Privacy"].map((item) => (
            <span
              key={item}
              className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] hover:text-neon-purple cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ title, desc, price, icon, onClick, isOutOfStock }) {
  return (
    <div
      onClick={onClick}
      className={`group bg-white/5 backdrop-blur-sm p-6 rounded-[28px] border border-white/5 flex items-center gap-6 cursor-pointer hover:border-neon-cyan/30 hover:bg-white/[0.08] transition-all relative overflow-hidden ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan/10 transition-all border border-white/5 shadow-xl relative z-10">
        {icon}
      </div>
      <div className="flex-1 relative z-10">
        <h4 className="font-bold text-base text-white tracking-tight">
          {title}
        </h4>
        <p className="text-xs font-medium text-text-secondary mt-1">{desc}</p>
        <div className="mt-3 flex items-center gap-2">
          {isOutOfStock ? (
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              OUT OF STOCK
            </span>
          ) : (
            <>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                Cost:
              </span>
              <span className="text-sm font-bold text-neon-cyan">₹{price}</span>
            </>
          )}
        </div>
      </div>
      <button
        disabled={isOutOfStock}
        className={`w-11 h-11 rounded-full border border-white/10 flex items-center justify-center transition-all font-bold relative z-10 ${isOutOfStock ? "cursor-not-allowed opacity-50" : "group-hover:bg-neon-cyan group-hover:text-background group-hover:border-neon-cyan"}`}
      >
        +
      </button>
    </div>
  );
}
