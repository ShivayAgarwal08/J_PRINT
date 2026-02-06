import { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { Search, CheckCircle, Clock, Download, Printer, Check, X, Bell, RefreshCw, FileText, User, LogOut, Shield, Database, LayoutGrid, AlertCircle, Zap, Activity, Cpu, Terminal, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Vendor() {
    const { orders: ordersList, markAsPrinted, markAsCollected } = useOrder();
    const orders = ordersList || [];
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [otpInput, setOtpInput] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [activeTab, setActiveTab] = useState('queue');
    const [searchQuery, setSearchQuery] = useState('');
    const audioRef = useRef(null);
    const prevOrdersRef = useRef(orders.length);

    useEffect(() => {
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    }, []);

    useEffect(() => {
        const prevCount = prevOrdersRef.current;
        if (orders.length > prevCount) {
            if (audioRef.current) {
                audioRef.current.play().catch(() => { });
            }
        }
        prevOrdersRef.current = orders.length;
    }, [orders]);

    const handleVerify = (e) => {
        e.preventDefault();
        if (otpInput.length < 4) return;
        const matchingOrder = orders.find(o => o.otp === otpInput && o.status !== 'collected');
        if (matchingOrder) {
            setVerificationResult({ success: true, message: `OTP VERIFIED: SEQUENCE #${matchingOrder.id.slice(-6).toUpperCase()}` });
            setOtpInput('');
            setTimeout(() => setVerificationResult(null), 3000);
        } else {
            setVerificationResult({ success: false, message: 'CRITICAL ERROR: INVALID TOKEN' });
            setTimeout(() => setVerificationResult(null), 2000);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const queueOrders = orders.filter(o => o.status === 'paid' || o.status === 'printed');
    const completedOrders = orders.filter(o => o.status === 'collected');

    const displayedOrders = searchQuery
        ? orders.filter(o =>
            o.otp.includes(searchQuery) ||
            o.id.includes(searchQuery) ||
            (o.userEmail && o.userEmail.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : (activeTab === 'queue' ? queueOrders : completedOrders);

    const totalEarnings = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            navigate('/vendor-login');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'vendor') return null;

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-neon-cyan/30 noise-bg relative">
            <div className="mesh-bg opacity-10 fixed inset-0 pointer-events-none" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5 px-6 py-5 shadow-2xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-orbitron font-bold text-background shadow-[0_0_20px_rgba(255,255,255,0.3)]">V</div>
                        <div className="hidden sm:block">
                            <h1 className="font-orbitron font-bold text-lg text-white tracking-[0.2em] uppercase">System Command</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_#00F5FF]" />
                                <span className="text-[9px] font-bold text-neon-cyan uppercase tracking-[0.3em]">Operational Phase Alpha</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden lg:flex items-center gap-6 px-6 py-2 bg-white/5 rounded-2xl border border-white/5 mr-4">
                            <div className="flex items-center gap-3">
                                <Activity size={14} className="text-neon-cyan" />
                                <div className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">Uplink: <span className="text-white">Active</span></div>
                            </div>
                            <div className="w-px h-3 bg-white/10" />
                            <div className="flex items-center gap-3">
                                <Globe size={14} className="text-neon-purple" />
                                <div className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">Nodes: <span className="text-white">JIIT-01</span></div>
                            </div>
                        </div>

                        <Link to="/database" target="_blank" className="p-3 rounded-xl bg-white/5 text-text-secondary hover:text-neon-cyan border border-white/5 hover:border-neon-cyan/20 transition-all">
                            <Database size={20} />
                        </Link>
                        <button onClick={() => window.location.reload()} className="p-3 rounded-xl bg-white/5 text-text-secondary hover:text-white border border-white/5 hover:border-white/20 transition-all">
                            <RefreshCw size={20} />
                        </button>
                        <div className="w-px h-8 bg-white/10 mx-1" />
                        <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-3 bg-white text-background rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neon-cyan hover:text-white transition-all shadow-xl">
                            <LogOut size={16} />
                            Disconnect
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8 lg:p-12 space-y-12 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Left Panel - Control Systems */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* OTP Check - Terminal Mode */}
                        <div className="bg-[#12121A]/80 backdrop-blur-xl p-10 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 blur-3xl pointer-events-none" />
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <Terminal size={18} className="text-neon-cyan" />
                                    <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary">Token Validation</h2>
                                </div>
                                <Shield size={18} className="text-white/10" />
                            </div>

                            <form onSubmit={handleVerify} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em] block pl-1">Input Auth Token</label>
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value)}
                                        maxLength={4}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-8 text-center text-5xl font-orbitron font-bold tracking-[0.3em] focus:outline-none focus:ring-4 focus:ring-neon-cyan/10 focus:border-neon-cyan/30 transition-all text-white placeholder:text-white/5 shadow-inner"
                                    />
                                </div>

                                <AnimatePresence mode='wait'>
                                    {verificationResult && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={clsx(
                                                "p-5 rounded-2xl font-bold text-[10px] flex items-center justify-center gap-4 border text-center uppercase tracking-[0.2em] shadow-2xl",
                                                verificationResult.success ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}
                                        >
                                            {verificationResult.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                            {verificationResult.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={otpInput.length !== 4}
                                    className="w-full bg-white text-background font-bold py-5 rounded-2xl text-[11px] uppercase tracking-[0.3em] hover:bg-neon-cyan hover:text-white transition-all disabled:opacity-5 shadow-2xl group animate-glow cursor-pointer"
                                >
                                    Authorize Retrieve
                                </button>
                            </form>
                        </div>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 gap-6">
                            <StatCard label="Total Revenue" value={`₹${totalEarnings}`} icon={<Zap size={20} />} color="text-neon-cyan" border="border-neon-cyan/20" bg="bg-neon-cyan/5" />
                            <StatCard label="Active Manifests" value={queueOrders.length} icon={<Activity size={20} />} color="text-neon-purple" border="border-neon-purple/20" bg="bg-neon-purple/5" />
                            <StatCard label="Archived Logs" value={completedOrders.length} icon={<Cpu size={20} />} color="text-text-secondary" border="border-white/5" bg="bg-white/5" />
                        </div>
                    </div>

                    {/* Right Panel - Grid Manifest */}
                    <div className="lg:col-span-8">
                        <div className="bg-[#12121A]/40 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl flex flex-col h-full overflow-hidden">

                            {/* Navbar */}
                            <div className="px-10 py-8 flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 gap-6">
                                <div className="flex gap-10">
                                    <button
                                        onClick={() => { setActiveTab('queue'); setSearchQuery(''); }}
                                        className={clsx("pb-8 text-[11px] font-bold tracking-[0.3em] transition-all relative uppercase border-b-2 -mb-8 flex items-center gap-3",
                                            activeTab === 'queue' ? "text-neon-cyan border-neon-cyan neon-glow" : "text-text-secondary border-transparent hover:text-white")}
                                    >
                                        Active Stream
                                        {queueOrders.length > 0 && <span className="px-2 py-0.5 bg-neon-cyan text-background text-[9px] rounded-full font-bold shadow-[0_0_10px_#00F5FF]">{queueOrders.length}</span>}
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab('completed'); setSearchQuery(''); }}
                                        className={clsx("pb-8 text-[11px] font-bold tracking-[0.3em] transition-all relative uppercase border-b-2 -mb-8 flex items-center gap-3",
                                            activeTab === 'completed' ? "text-neon-cyan border-neon-cyan neon-glow" : "text-text-secondary border-transparent hover:text-white")}
                                    >
                                        Historical Logs
                                    </button>
                                </div>

                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-neon-cyan transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="TRACE MANIFEST..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-3.5 text-[10px] font-bold tracking-[0.1em] focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 focus:border-neon-cyan/30 w-full md:w-72 transition-all text-white placeholder:text-text-secondary"
                                    />
                                </div>
                            </div>

                            {/* List Content */}
                            <div className="flex-1 p-8 lg:p-10 overflow-y-auto custom-scrollbar min-h-[600px]">
                                <AnimatePresence mode='popLayout'>
                                    {displayedOrders.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-32 text-center">
                                            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-8 text-white/5 border border-dashed border-white/10">
                                                <LayoutGrid size={40} />
                                            </div>
                                            <h3 className="text-2xl font-grotesk font-bold text-white tracking-tight">Stream Depleted</h3>
                                            <p className="text-[10px] text-text-secondary mt-3 font-bold uppercase tracking-[0.3em]">System clear. Monitoring for incoming manifests...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {displayedOrders.map((order) => (
                                                <OrderCard
                                                    key={order.id}
                                                    order={order}
                                                    onPrint={() => markAsPrinted(order.id)}
                                                    onCollect={() => markAsCollected(order.id)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ label, value, icon, color, border, bg }) {
    return (
        <div className={clsx("p-8 rounded-[32px] border backdrop-blur-md flex items-center justify-between transition-all hover:scale-[1.02] duration-500 group relative overflow-hidden shadow-2xl", border, bg)}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.02] blur-3xl pointer-events-none" />
            <div className="flex items-center gap-6">
                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:shadow-[0_0_20px_currentColor]", color, border)}>
                    {icon}
                </div>
                <div>
                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em] mb-1.5">{label}</p>
                    <p className="text-3xl font-orbitron font-bold text-white">{value}</p>
                </div>
            </div>
            <div className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", color.replace('text-', 'bg-'))} />
        </div>
    );
}

function OrderCard({ order, onPrint, onCollect }) {
    const handleDownloadAll = () => {
        order.files.forEach(file => {
            if (file.dataVal) {
                const link = document.createElement('a');
                link.href = file.dataVal;
                link.download = file.name || `manifest_asset_${Date.now()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    const statusConfig = {
        paid: { label: 'AWAITING UPLINK', color: 'text-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/30' },
        printed: { label: 'MANIFEST READY', color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/30' },
        collected: { label: 'LOG RETRIEVED', color: 'text-white/20', bg: 'bg-white/5', border: 'border-white/5' }
    };

    const status = statusConfig[order.status] || statusConfig.paid;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 bg-[#12121A]/80 backdrop-blur-xl rounded-[32px] border border-white/5 shadow-2xl hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
        >
            {order.status !== 'collected' && (
                <div className={clsx("absolute top-0 left-0 w-1 h-full", status.color.replace('text-', 'bg-'))} />
            )}

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative z-10">

                <div className="flex items-start gap-8">
                    <div className={clsx("w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-orbitron font-bold text-white shadow-2xl border transition-all duration-500",
                        order.status === 'paid' ? "bg-neon-purple/20 border-neon-purple/40 shadow-[0_0_20px_rgba(155,92,255,0.2)]" :
                            order.status === 'printed' ? "bg-neon-cyan/20 border-neon-cyan/40 shadow-[0_0_20px_rgba(0,245,255,0.2)]" : "bg-white/5 border-white/5"
                    )}>
                        <span className="text-3xl tracking-tighter">{order.otp}</span>
                        <span className="text-[7px] uppercase tracking-[0.3em] opacity-70 mt-1 font-bold">TOKEN</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <h3 className="font-orbitron font-bold text-white tracking-[0.1em] text-sm uppercase">Sequence #{order.id.slice(-6).toUpperCase()}</h3>
                            <span className="text-[9px] font-bold text-text-secondary bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2">
                                <User size={10} className="text-neon-cyan" />
                                {order.userEmail?.split('@')[0] || 'NODE-GUEST'}
                            </span>
                        </div>

                        <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-2 text-neon-cyan">
                                <Clock size={14} className="opacity-50" />
                                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                            <div className="text-white">Credits: ₹{order.totalAmount}</div>
                            <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                            <div className={clsx("px-3 py-1 rounded-full border transition-all duration-500", status.bg, status.color, status.border)}>
                                {status.label}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2">
                            {order.files.map((file, i) => (
                                <div key={i} className="flex items-center gap-2.5 bg-black/40 border border-white/5 px-4 py-1.5 rounded-xl text-text-secondary text-[9px] font-bold uppercase tracking-widest hover:border-white/20 transition-all cursor-default">
                                    <FileText size={11} className="text-neon-purple" />
                                    {file.name.length > 20 ? file.name.slice(0, 18) + '...' : file.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleDownloadAll}
                        className="p-4 rounded-2xl bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all shadow-xl group/dl"
                        title="DOWNLOAD ASSETS"
                    >
                        <Download size={24} className="group-hover/dl:scale-110 transition-transform" />
                    </button>

                    {order.status === 'paid' && (
                        <button onClick={onPrint} className="flex-1 xl:flex-none px-10 py-5 bg-white text-background rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-neon-purple hover:text-white transition-all shadow-2xl cursor-pointer">
                            Execute Manifest
                        </button>
                    )}
                    {order.status === 'printed' && (
                        <button onClick={onCollect} className="flex-1 xl:flex-none px-10 py-5 bg-neon-cyan text-background rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl cursor-pointer">
                            Signals Ready
                        </button>
                    )}
                    {order.status === 'collected' && (
                        <div className="px-8 py-5 rounded-2xl bg-white/5 text-white/20 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 border border-white/5">
                            <CheckCircle size={18} /> Processed
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

