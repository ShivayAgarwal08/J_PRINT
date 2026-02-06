import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Wallet, History, ChevronRight, LogOut, FileText, CheckCircle, Clock, Shield, CreditCard, Zap, ChevronLeft, Database, Cpu, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function Profile() {
    const { user, logout } = useAuth();
    const { orders } = useOrder();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const myOrders = (orders || []).filter(o => o.userId === user?.id || o.userId === user?.uid);

    return (
        <div className="min-h-screen bg-background text-text-primary pb-32 font-sans selection:bg-neon-purple/30 noise-bg relative">
            <div className="mesh-bg opacity-20 fixed inset-0 pointer-events-none" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0A0A0F]/60 backdrop-blur-xl border-b border-white/5 py-5">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2.5 rounded-xl hover:bg-white/5 transition-all text-text-secondary hover:text-white border border-transparent hover:border-white/10">
                        <ChevronLeft size={22} />
                    </button>
                    <h1 className="font-grotesk font-bold text-white tracking-[0.2em] uppercase text-sm">My Profile</h1>
                    <div className="w-10 flex justify-end">
                        <Database size={20} className="text-white/10" />
                    </div>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-6 mt-16 space-y-12 relative z-10">

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-28 h-28 rounded-[36px] bg-neon-purple/20 p-[1px] mb-8 relative group"
                    >
                        <div className="absolute inset-0 bg-neon-purple/20 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="w-full h-full bg-[#12121A] rounded-[35px] flex items-center justify-center border border-neon-purple/30 overflow-hidden relative z-10">
                            {user?.name?.[0]?.toUpperCase() ? (
                                <span className="text-5xl font-orbitron font-bold text-white neon-glow">{user.name[0]}</span>
                            ) : <User size={48} className="text-white/20" />}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-background border border-neon-purple/50 rounded-lg flex items-center justify-center text-neon-purple shadow-lg z-20">
                            <Zap size={14} />
                        </div>
                    </motion.div>

                    <div className="space-y-2">
                        <h2 className="text-4xl font-grotesk font-extrabold text-white tracking-tighter">{user?.name || 'User'}</h2>
                        <div className="flex items-center gap-3 justify-center text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">
                            <span className="text-white/40">{user?.email || 'No Email'}</span>
                            <div className="w-1 h-1 bg-neon-purple rounded-full shadow-[0_0_5px_#9B5CFF]" />
                            <span className="text-neon-purple neon-glow">Active</span>
                        </div>
                    </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#12121A]/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/5 blur-3xl" />
                        <div className="w-12 h-12 bg-neon-purple/10 text-neon-purple rounded-2xl flex items-center justify-center border border-neon-purple/20 mb-4 group-hover:scale-110 transition-transform">
                            <Zap size={24} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-1">Total Orders</p>
                            <p className="text-3xl font-orbitron font-bold text-white">{myOrders.length}</p>
                        </div>
                    </div>
                    <div className="bg-[#12121A]/80 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 blur-3xl" />
                        <div className="w-12 h-12 bg-white/5 text-text-secondary rounded-2xl flex items-center justify-center border border-white/10 mb-4 group-hover:scale-110 transition-transform">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-1">Balance</p>
                            <p className="text-3xl font-orbitron font-bold text-white">₹0.00</p>
                        </div>
                    </div>
                </div>

                {/* Control Menu */}
                <div className="glass-card p-[1px]">
                    <div className="bg-[#12121A]/60 backdrop-blur-2xl rounded-[32px] border border-white/5 overflow-hidden">
                        <ListItem
                            icon={<FileText size={20} />}
                            label="New Order"
                            onClick={() => navigate('/order')}
                        />
                        <ListItem
                            icon={<CreditCard size={20} />}
                            label="Order History"
                            onClick={() => navigate('/orders')}
                        />
                        <ListItem
                            icon={<Shield size={20} />}
                            label="Settings"
                        />
                        <button onClick={handleLogout} className="w-full">
                            <ListItem
                                icon={<LogOut size={20} />}
                                label="Logout"
                                isLast
                                danger
                            />
                        </button>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="space-y-8">
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.4em]">Recent Orders</h3>
                        </div>
                        <Link to="/orders" className="text-[10px] font-bold text-neon-purple hover:neon-glow transition-all uppercase tracking-widest border-b border-neon-purple/20 pb-0.5">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {myOrders.length === 0 ? (
                            <div className="text-center py-16 bg-white/5 rounded-[32px] border border-dashed border-white/10">
                                <History size={40} className="mx-auto mb-4 text-white/5" />
                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">No Order History</p>
                            </div>
                        ) : (
                            <AnimatePresence mode='popLayout'>
                                {myOrders.slice(0, 3).map((order) => (
                                    <motion.div
                                        key={order.id}
                                        className="bg-[#12121A]/80 backdrop-blur-md p-6 rounded-[28px] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all shadow-xl"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={clsx(
                                                "w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold border transition-all",
                                                order.status === 'collected' ? "bg-white/5 text-white/20 border-white/5" : "bg-neon-purple/10 text-neon-purple border-neon-purple/30 shadow-[0_0_15px_rgba(155,92,255,0.1)]"
                                            )}>
                                                <span className="text-xl font-orbitron leading-none tracking-tighter">{order.otp}</span>
                                                <span className="text-[7px] uppercase tracking-[0.2em] mt-1 opacity-70 font-bold">OTP</span>
                                            </div>

                                            <div>
                                                <h4 className="font-orbitron font-bold text-sm text-white tracking-[0.1em] uppercase">Order #{order.id.slice(-6).toUpperCase()}</h4>
                                                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                                    <Clock size={10} className="text-neon-purple/50" />
                                                    {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-grotesk font-bold text-base text-white">₹{order.totalAmount}</p>
                                            <span className={clsx("text-[8px] font-bold uppercase tracking-[0.2em] mt-1 block",
                                                order.status === 'collected' ? "text-white/20" :
                                                    order.status === 'printed' ? "text-neon-cyan" : "text-neon-purple"
                                            )}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}

function ListItem({ icon, label, onClick, isLast, danger }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-7 hover:bg-white/[0.03] transition-colors text-left group border-b border-white/5 last:border-0"
        >
            <div className="flex items-center gap-6">
                <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center border transition-all",
                    danger ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "bg-white/5 text-text-secondary border-white/10 group-hover:bg-neon-purple group-hover:text-white group-hover:border-neon-purple group-hover:shadow-[0_0_20px_rgba(155,92,255,0.4)]"
                )}>
                    {icon}
                </div>
                <span className={clsx("font-bold text-xs uppercase tracking-[0.2em] transition-colors",
                    danger ? "text-red-500" : "text-text-secondary group-hover:text-white"
                )}>{label}</span>
            </div>
            <ChevronRight size={18} className={clsx("transition-all group-hover:translate-x-1", danger ? "text-red-500/30" : "text-white/10 group-hover:text-white")} />
        </button>
    );
}

