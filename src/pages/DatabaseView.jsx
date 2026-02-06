import { useState, useEffect } from 'react';
import { Search, RefreshCw, Database, Table, User, FileText, ChevronRight, Activity, ShieldCheck, ArrowLeft, Users, Package, Zap, Cpu, Terminal, Globe } from 'lucide-react';
import { getApiUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

export default function DatabaseView() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('users');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, ordersRes] = await Promise.all([
                fetch(getApiUrl('api/users')),
                fetch(getApiUrl('api/orders'))
            ]);

            if (usersRes.ok) setUsers(await usersRes.json());
            if (ordersRes.ok) setOrders(await ordersRes.json());
            setError(null);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-neon-purple/30 noise-bg relative">
            <div className="mesh-bg opacity-20 fixed inset-0 pointer-events-none" />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0A0A0F]/60 backdrop-blur-xl border-b border-white/5 py-5 shadow-2x">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2.5 rounded-xl hover:bg-white/5 transition-all text-text-secondary hover:text-white border border-transparent hover:border-white/10">
                        <ArrowLeft size={22} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-background shadow-xl">
                            <Database size={20} />
                        </div>
                        <h1 className="font-grotesk font-bold text-lg tracking-[0.2em] uppercase text-white">Central Data Lattice</h1>
                    </div>
                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className="flex items-center gap-3 px-6 py-3 bg-white text-background rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-neon-purple hover:text-white transition-all disabled:opacity-20 shadow-xl"
                    >
                        <RefreshCw size={14} className={clsx(loading && "animate-spin")} />
                        Resync Lattice
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8 lg:p-12 space-y-12 relative z-10">

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatBox icon={<Users size={22} />} label="Total Entities" value={users.length} color="text-neon-purple" border="border-neon-purple/20" bg="bg-neon-purple/5" />
                    <StatBox icon={<Package size={22} />} label="Active Manifests" value={orders.length} color="text-neon-cyan" border="border-neon-cyan/20" bg="bg-neon-cyan/5" />
                    <StatBox icon={<ShieldCheck size={22} />} label="Lattice Health" value="OPTIMIZED" color="text-green-500" border="border-green-500/20" bg="bg-green-500/5" />
                </div>

                {/* Main Content */}
                <div className="bg-[#12121A]/40 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
                    <div className="px-10 border-b border-white/5 flex items-center gap-12 bg-black/20">
                        <TabButton
                            active={activeTab === 'users'}
                            onClick={() => setActiveTab('users')}
                            label="Entity Registry"
                        />
                        <TabButton
                            active={activeTab === 'orders'}
                            onClick={() => setActiveTab('orders')}
                            label="Historical Ledger"
                        />
                    </div>

                    <div className="flex-1 overflow-x-auto custom-scrollbar">
                        {error ? (
                            <div className="p-32 text-center">
                                <p className="text-red-500 font-bold text-sm uppercase tracking-[0.2em]">{error}</p>
                                <button onClick={fetchData} className="mt-8 px-8 py-3 bg-white text-background rounded-xl font-bold text-[10px] uppercase tracking-[0.2em]">Retry Sync</button>
                            </div>
                        ) : loading && users.length === 0 ? (
                            <div className="p-32 text-center space-y-4">
                                <div className="w-16 h-16 bg-white/5 rounded-full border border-dashed border-white/20 animate-spin mx-auto" />
                                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.3em]">Extracting data from neural nodes...</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-black/40">
                                    <tr className="border-b border-white/5">
                                        {activeTab === 'users' ? (
                                            <>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Designation</th>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Uplink Address</th>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Access Protocol</th>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">First Connection</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Sequence ID</th>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Entity Uplink</th>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Auth Token</th>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Credits</th>
                                                <th className="px-10 py-6 text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">Status Phase</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {activeTab === 'users' ?
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-white/[0.02] transition-all duration-300">
                                                <td className="px-10 py-6">
                                                    <div className="font-orbitron font-bold text-sm text-white tracking-tight">{user.name || 'ANONYMOUS'}</div>
                                                    <div className="text-[9px] text-text-secondary font-mono mt-1 opacity-50 uppercase tracking-widest">{user.id.slice(0, 12)}</div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="text-[11px] font-medium text-text-secondary lowercase tracking-tight border-b border-white/5 pb-1 inline-block">{user.email}</div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <span className={clsx(
                                                        "px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.3em] backdrop-blur-md",
                                                        user.role === 'vendor' ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,245,255,0.1)]" : "bg-white/5 text-text-secondary border border-white/10"
                                                    )}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-6 text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                                                    {new Date(user.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                            </tr>
                                        )) :
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-white/[0.02] transition-all duration-300">
                                                <td className="px-10 py-6 font-mono text-[9px] text-white/20 tracking-widest">{order.id.slice(0, 16).toUpperCase()}...</td>
                                                <td className="px-10 py-6">
                                                    <div className="font-bold text-[11px] text-white tracking-tight">{order.userEmail}</div>
                                                    <div className="text-[8px] text-text-secondary font-mono mt-1 opacity-30 uppercase tracking-widest">{order.userId.slice(0, 12)}</div>
                                                </td>
                                                <td className="px-10 py-6 font-orbitron font-bold text-2xl text-neon-purple tracking-[0.2em] neon-glow italic">{order.otp}</td>
                                                <td className="px-10 py-6 font-grotesk font-bold text-sm text-white">₹{order.totalAmount}</td>
                                                <td className="px-10 py-6">
                                                    <span className={clsx(
                                                        "px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] backdrop-blur-md",
                                                        order.status === 'collected' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                                                    )}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatBox({ icon, label, value, color, border, bg }) {
    return (
        <div className={clsx("p-8 rounded-[32px] border backdrop-blur-xl flex items-center gap-7 shadow-2xl hover:scale-[1.02] transition-all duration-500 group", border, bg)}>
            <div className={clsx("w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border group-hover:shadow-[0_0_20px_currentColor]", color, border)}>
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em] mb-2">{label}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-orbitron font-bold text-white">{value}</p>
                    {typeof value === 'number' && <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-50">Units</span>}
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "py-8 text-[11px] font-bold uppercase tracking-[0.3em] border-b-2 transition-all relative",
                active ? "text-white border-neon-purple neon-glow" : "text-text-secondary border-transparent hover:text-white"
            )}
        >
            {label}
        </button>
    );
}

