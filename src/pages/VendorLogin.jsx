import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, Lock, Mail, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';

export default function VendorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password, 'vendor');
            navigate('/vendor');
        } catch (err) {
            setError(err || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center p-6 font-sans selection:bg-neon-cyan/30 noise-bg overflow-hidden relative">
            <div className="mesh-bg opacity-30" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Brand */}
                <div className="text-center mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-12 h-12 bg-neon-cyan rounded-xl flex items-center justify-center font-orbitron font-bold text-background shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform">J</div>
                        <span className="font-grotesk font-bold text-2xl tracking-tight text-white italic">JPRINT<span className="text-neon-cyan">.</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-3">Operator Core</h1>
                    <p className="text-sm text-text-secondary font-medium uppercase tracking-[0.2em]">Authorized station access only.</p>
                </div>

                {/* Card */}
                <div className="glass-card p-1 border-neon-cyan/20">
                    <div className="bg-[#0A0A0F]/80 backdrop-blur-2xl p-8 rounded-xl border border-neon-cyan/10 shadow-[0_0_40px_rgba(0,229,255,0.05)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neon-cyan uppercase tracking-widest ml-1">Operator ID</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="operator@jprint.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 focus:border-neon-cyan/50 transition-all placeholder:text-white/10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neon-cyan uppercase tracking-widest ml-1">Secure Protocol</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-neon-cyan transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 focus:border-neon-cyan/50 transition-all placeholder:text-white/10"
                                    />
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-red-500/10 text-red-400 text-[11px] font-bold p-4 rounded-xl border border-red-500/20 flex items-center gap-3"
                                    >
                                        <AlertCircle size={14} />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-neon-cyan text-background py-4 rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:bg-neon-cyan/90 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                                    <>
                                        <span>Authenticate Portal</span>
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <button
                        onClick={() => navigate('/')}
                        className="text-xs font-bold text-text-secondary hover:text-white transition-colors flex items-center gap-2 mx-auto uppercase tracking-widest"
                    >
                        <ArrowLeft size={14} /> Back to Public Grid
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

