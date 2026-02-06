import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Mail, Lock, User, ChevronRight, Shield, ChevronLeft } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const role = 'user';
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(name, email, password, role);
            navigate('/home');
        } catch (err) {
            setError(err || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center p-6 font-sans selection:bg-neon-purple/30 noise-bg overflow-hidden relative">
            <div className="mesh-bg opacity-50" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Brand */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-12 h-12 bg-neon-purple rounded-xl flex items-center justify-center font-orbitron font-bold text-white shadow-[0_0_20px_rgba(155,92,255,0.4)] group-hover:scale-110 transition-transform">J</div>
                        <span className="font-grotesk font-bold text-2xl tracking-tight text-white">JPRINT<span className="text-neon-purple">.</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tighter">Join JPRINT</h1>
                    <p className="text-sm text-text-secondary font-medium uppercase tracking-widest">Create your account.</p>
                </div>

                {/* Card */}
                <div className="glass-card p-1">
                    <div className="bg-[#0A0A0F]/60 backdrop-blur-2xl p-8 rounded-xl border border-white/5 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Rahul Sharma"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/50 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/50 transition-all placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-purple transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-neon-purple/20 focus:border-neon-purple/50 transition-all placeholder:text-white/20"
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
                                        <Shield size={14} className="text-red-500" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="neon-button w-full flex items-center justify-center gap-2 group disabled:opacity-50 py-4"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                                    <>
                                        <span>Sign Up</span>
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <p className="text-text-secondary text-sm font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-neon-purple font-bold hover:neon-glow transition-all">
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>

            <button
                onClick={() => navigate('/')}
                className="absolute top-10 left-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-text-secondary hover:text-white z-20"
            >
                <ChevronLeft size={20} />
            </button>
        </div>
    );
}

