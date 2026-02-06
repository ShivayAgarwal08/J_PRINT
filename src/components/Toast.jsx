import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Zap, Activity } from 'lucide-react';
import { createContext, useContext, useState, useCallback } from 'react';
import { clsx } from 'clsx';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 4000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 pointer-events-none">
                <AnimatePresence mode='popLayout'>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const Toast = ({ message, type, onClose }) => {
    const icons = {
        success: <CheckCircle size={20} className="text-neon-cyan shadow-[0_0_10px_#00F5FF]" />,
        error: <AlertCircle size={20} className="text-red-500 shadow-[0_0_10px_#EF4444]" />,
        info: <Info size={20} className="text-neon-purple shadow-[0_0_10px_#9B5CFF]" />
    };

    const config = {
        success: { border: 'border-neon-cyan/30', glow: 'shadow-[0_0_30px_rgba(0,245,255,0.1)]' },
        error: { border: 'border-red-500/30', glow: 'shadow-[0_0_30px_rgba(239,68,68,0.1)]' },
        info: { border: 'border-neon-purple/30', glow: 'shadow-[0_0_30px_rgba(155,92,255,0.1)]' }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className={clsx(
                "flex items-center gap-5 p-6 rounded-[24px] backdrop-blur-2xl bg-[#0A0A0F]/90 border shadow-2xl min-w-[340px] pointer-events-auto group relative overflow-hidden",
                config[type]?.border,
                config[type]?.glow
            )}
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.02] blur-2xl pointer-events-none" />

            <div className="shrink-0">
                {icons[type]}
            </div>

            <div className="flex-1">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-1 opacity-50">System Broadcast</p>
                <p className="text-xs font-bold text-white tracking-wide uppercase">{message}</p>
            </div>

            <button
                onClick={onClose}
                className="text-white/20 hover:text-white transition-all p-1 hover:bg-white/5 rounded-lg"
            >
                <X size={16} />
            </button>

            {/* Progress bar simulation */}
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className={clsx("absolute bottom-0 left-0 h-0.5",
                    type === 'success' ? 'bg-neon-cyan' : type === 'error' ? 'bg-red-500' : 'bg-neon-purple'
                )}
            />
        </motion.div>
    );
};

