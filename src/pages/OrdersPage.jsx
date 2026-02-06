import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Clock, CheckCircle, Printer, FileText, ChevronRight, LayoutGrid, Sparkles, Zap, Database, History, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function OrdersPage() {
    const { orders } = useOrder();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Filter orders (AuthContext/OrderContext already filters by user, but safety check)
    const myOrders = orders.filter(o => o.userId === user?.id || o.userId === user?.uid);

    const activeOrders = myOrders.filter(o => o.status !== 'collected');
    const pastOrders = myOrders.filter(o => o.status === 'collected');

    return (
        <div className="min-h-screen bg-background pb-32 font-sans text-text-primary overflow-x-hidden selection:bg-neon-purple/30 noise-bg relative">
            <div className="mesh-bg opacity-20 fixed inset-0 pointer-events-none" />

            {/* Header */}
            <header className="bg-[#0A0A0F]/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 px-6 py-5">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2.5 rounded-xl hover:bg-white/5 transition-all text-text-secondary hover:text-white border border-transparent hover:border-white/10">
                        <ChevronLeft size={22} />
                    </button>
                    <div className="text-center">
                        <h1 className="font-grotesk font-bold text-white tracking-[0.2em] uppercase text-sm">Order History</h1>
                        <p className="text-[10px] text-neon-purple font-bold uppercase tracking-[0.3em] mt-1.5 flex items-center justify-center gap-2">
                            <Database size={10} /> Database
                        </p>
                    </div>
                    <div className="w-10 flex justify-end">
                        <Search size={20} className="text-white/10 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </header>

            <div className="max-w-2xl mx-auto p-6 space-y-14 mt-6 relative z-10">

                {/* Active Orders */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse shadow-[0_0_10px_#9B5CFF]" />
                            <h2 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Active Orders</h2>
                        </div>
                        {activeOrders.length > 0 && (
                            <span className="px-3 py-1 bg-neon-purple/10 text-neon-purple text-[9px] font-bold rounded-full border border-neon-purple/20 uppercase tracking-widest">
                                In Progress
                            </span>
                        )}
                    </div>

                    {activeOrders.length === 0 ? (
                        <div className="glass-card p-[1px]">
                            <div className="bg-[#12121A]/40 backdrop-blur-xl rounded-[40px] p-20 text-center border border-white/5">
                                <History size={48} className="mx-auto mb-6 text-white/5" />
                                <h3 className="font-grotesk font-bold text-xl text-white tracking-tight">No Active Orders</h3>
                                <p className="text-xs text-text-secondary mt-2 mb-10 font-medium tracking-wide uppercase">You have no active orders at the moment.</p>
                                <Link to="/order" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-background rounded-2xl text-[10px] font-bold hover:bg-neon-purple hover:text-white transition-all uppercase tracking-[0.2em] shadow-xl">
                                    Place Order <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {activeOrders.map(order => (
                                <OrderCard key={order.id} order={order} active />
                            ))}
                        </div>
                    )}
                </section>

                {/* Past Orders */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3 px-2 border-b border-white/5 pb-4">
                        <div className="w-2 h-2 bg-text-secondary/20 rounded-full" />
                        <h2 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Collected Orders</h2>
                    </div>

                    {pastOrders.length === 0 ? (
                        <div className="text-center py-20 text-white/10 font-bold text-[10px] uppercase tracking-[0.5em]">No Past Orders</div>
                    ) : (
                        <div className="space-y-5 opacity-50 hover:opacity-100 transition-all duration-500">
                            {pastOrders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}

function OrderCard({ order, active }) {
    const statusConfig = {
        paid: { color: 'text-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/20', icon: <Clock size={16} />, label: 'Processing' },
        printed: { color: 'text-neon-cyan', bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/20', icon: <Printer size={16} />, label: 'Ready' },
        collected: { color: 'text-white/20', bg: 'bg-white/5', border: 'border-white/5', icon: <CheckCircle size={16} />, label: 'Collected' }
    };

    const status = statusConfig[order.status] || statusConfig.paid;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "glass-card p-[1px] group transition-all duration-500",
                active ? "hover:neon-glow-border" : "hover:border-white/10"
            )}
        >
            <div className="bg-[#12121A]/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden">
                {active && (
                    <div className="absolute top-0 right-0 w-48 h-48 bg-neon-purple/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-neon-purple/10 transition-all duration-700" />
                )}

                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center font-bold border transition-all duration-500 shadow-xl",
                            status.bg, status.color, status.border,
                            order.status === 'printed' && "shadow-[0_0_20px_rgba(0,245,255,0.2)]",
                            order.status === 'paid' && "shadow-[0_0_20px_rgba(155,92,255,0.2)]"
                        )}>
                            {status.icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1.5">
                                <h3 className="font-orbitron font-bold text-white tracking-[0.1em] text-sm uppercase">Order #{order.id.slice(-6).toUpperCase()}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                    <Clock size={11} className="text-neon-purple/50" />
                                    {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                </p>
                                <div className="w-1 h-1 bg-white/10 rounded-full" />
                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="font-grotesk font-bold text-white block mb-1 text-lg">₹{order.totalAmount}</span>
                        <div className="flex items-center justify-end gap-2 px-2 py-0.5 bg-white/5 rounded-md border border-white/5">
                            <FileText size={10} className="text-text-secondary" />
                            <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest">{order.files.length} Files</span>
                        </div>
                    </div>
                </div>

                {/* OTP Key - Terminal Style */}
                {active && (
                    <div className="bg-black/50 rounded-2xl p-6 flex justify-between items-center border border-white/5 mb-8 relative group/otp overflow-hidden">
                        <div className="absolute inset-0 bg-neon-purple/[0.02] opacity-0 group-hover/otp:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <p className="text-[9px] font-bold text-neon-purple uppercase tracking-[0.3em] mb-2 truncate">Order OTP</p>
                            <p className="text-[10px] font-medium text-text-secondary max-w-[140px] leading-relaxed uppercase tracking-widest">Show this OTP to the vendor.</p>
                        </div>
                        <div className="relative z-10 text-4xl font-orbitron font-bold text-white tracking-[0.2em] bg-white/5 px-6 py-3 rounded-xl border border-white/10 shadow-2xl neon-glow">
                            {order.otp}
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center pt-6 border-t border-white/5 relative z-10">
                    <div className={clsx("text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-500", status.bg, status.color, status.border)}>
                        <div className={clsx("w-1.5 h-1.5 rounded-full",
                            order.status === 'collected' ? "bg-white/10" : "bg-current animate-pulse shadow-[0_0_8px_currentColor]"
                        )} />
                        {status.label}
                    </div>
                    <button className="text-[10px] font-bold text-text-secondary hover:text-white transition-all flex items-center gap-2 group/btn uppercase tracking-widest border-b border-transparent hover:border-white/20 pb-0.5">
                        View Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
