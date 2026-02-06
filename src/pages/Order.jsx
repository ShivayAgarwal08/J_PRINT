import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Check,
    ChevronRight,
    Loader2,
    Upload,
    File,
    X,
    FileImage,
    CreditCard,
    PenTool,
    Printer,
    Smartphone,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    FileText,
    Zap,
    Cpu,
    RefreshCw,
    ArrowRight,
    Database,
    Lock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import { clsx } from 'clsx';

export default function Order() {
    const { currentOrder, orders, addFile, removeFile, updateFilePageCount, updateSettings, calculateTotal, placeOrder } = useOrder();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Upload, 2: Settings, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null);
    const [debugError, setDebugError] = useState(null);

    const total = calculateTotal();
    const hasFiles = currentOrder.files.length > 0;
    const isAllStationery = hasFiles && currentOrder.files.every(f => f.type === 'stationery');

    // Get live status of completed order
    const liveOrder = completedOrder ? orders.find(o => o.id === completedOrder.id) : null;
    const currentStatus = liveOrder?.status || 'paid';

    const handleNext = () => {
        if (step === 1 && hasFiles) setStep(2);
    };

    const handlePay = async () => {
        setIsProcessing(true);
        try {
            const result = await placeOrder(total);
            if (result && result.success) {
                setCompletedOrder({ otp: result.otp, id: result.id });
                setStep(3);
            } else {
                setDebugError(`Order failed: ${result?.error || "Unknown Error"}`);
            }
        } catch (e) {
            console.error(e);
            setDebugError(`Connection Error: ${e.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    if (step === 3 && completedOrder) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center font-sans selection:bg-neon-purple/30 noise-bg relative overflow-hidden">
                <div className="mesh-bg opacity-30 fixed inset-0 pointer-events-none" />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={clsx(
                        "w-28 h-28 rounded-3xl flex items-center justify-center text-white mb-10 relative z-10 transition-all duration-500",
                        currentStatus === 'collected' ? "bg-white/10 text-white/20 border border-white/10" :
                            currentStatus === 'printed' ? "bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan shadow-[0_0_30px_#00F5FF]" :
                                "bg-neon-purple/20 border border-neon-purple/50 text-neon-purple shadow-[0_0_30px_#9B5CFF]"
                    )}
                >
                    {currentStatus === 'collected' ? <CheckCircle2 size={56} strokeWidth={1.5} /> :
                        currentStatus === 'printed' ? <Printer size={56} strokeWidth={1.5} /> :
                            <Zap size={56} strokeWidth={1.5} className="animate-pulse" />}
                </motion.div>

                <div className="max-w-md w-full relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-grotesk font-extrabold text-white mb-3 tracking-tighter">
                            {currentStatus === 'collected' ? 'Order Collected' :
                                currentStatus === 'printed' ? 'Ready to Collect' :
                                    'Order Placed'}
                        </h2>
                        <p className="text-text-secondary font-medium mb-12 uppercase tracking-[0.2em] text-xs">
                            {currentStatus === 'collected' ? 'You have collected your order.' :
                                currentStatus === 'printed' ? 'Your documents are ready for pickup.' :
                                    'Your order is being processed.'}
                        </p>
                    </motion.div>

                    <div className="glass-card p-[1px] mb-12">
                        <div className="bg-[#12121A]/80 backdrop-blur-2xl rounded-[32px] p-12 relative overflow-hidden transition-all duration-500 border border-white/5">

                            {/* Status Glow Bar */}
                            <div className={clsx(
                                "absolute top-0 left-0 w-full h-[2px] transition-all duration-700",
                                currentStatus === 'collected' ? "bg-white/10" :
                                    currentStatus === 'printed' ? "bg-neon-cyan shadow-[0_0_15px_#00F5FF]" :
                                        "bg-neon-purple shadow-[0_0_15px_#9B5CFF]"
                            )} />

                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mb-6">Order OTP</p>
                                <div className={clsx(
                                    "text-7xl font-orbitron font-bold tracking-[0.2em] flex gap-2 justify-center transition-all duration-500",
                                    currentStatus === 'collected' ? "text-white/10 line-through decoration-white/20" :
                                        currentStatus === 'printed' ? "text-neon-cyan neon-glow" : "text-neon-purple neon-glow"
                                )}>
                                    {completedOrder.otp}
                                </div>

                                <div className="mt-12 flex items-center justify-center gap-4">
                                    <div className={clsx("w-2 h-2 rounded-full transition-all duration-500", currentStatus === 'paid' ? "bg-neon-purple shadow-[0_0_10px_#9B5CFF]" : "bg-white/10")} />
                                    <div className={clsx("h-[1px] w-10 transition-all duration-500", currentStatus === 'printed' || currentStatus === 'collected' ? "bg-neon-cyan shadow-[0_0_10px_#00F5FF]" : "bg-white/10")} />
                                    <div className={clsx("w-2 h-2 rounded-full transition-all duration-500", currentStatus === 'printed' ? "bg-neon-cyan shadow-[0_0_10px_#00F5FF]" : currentStatus === 'collected' ? "bg-neon-cyan/20" : "bg-white/10")} />
                                    <div className={clsx("h-[1px] w-10 transition-all duration-500", currentStatus === 'collected' ? "bg-white/40" : "bg-white/10")} />
                                    <div className={clsx("w-2 h-2 rounded-full transition-all duration-500", currentStatus === 'collected' ? "bg-white/40" : "bg-white/10")} />
                                </div>

                                <p className={clsx("text-[10px] font-bold uppercase tracking-[0.4em] mt-5 transition-all duration-500",
                                    currentStatus === 'paid' ? "text-neon-purple" :
                                        currentStatus === 'printed' ? "text-neon-cyan" :
                                            "text-white/20"
                                )}>
                                    {currentStatus === 'paid' ? 'Printing...' :
                                        currentStatus === 'printed' ? 'Ready for Pickup' :
                                            'Collected'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/home')}
                        className="w-full bg-white/5 border border-white/10 text-white font-bold py-5 rounded-2xl hover:bg-white/10 hover:border-neon-purple/50 transition-all shadow-xl active:scale-95 uppercase tracking-[0.2em] text-xs"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text-primary pb-44 font-sans selection:bg-neon-purple/30 noise-bg relative overflow-hidden">
            <div className="mesh-bg opacity-20 fixed inset-0 pointer-events-none" />

            {/* Header */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0F]/60 backdrop-blur-xl border-b border-white/5 py-5">
                <div className="max-w-xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => step === 1 ? navigate('/home') : setStep(step - 1)} className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-text-secondary hover:text-white border border-transparent hover:border-white/10">
                        <ArrowLeft size={22} />
                    </button>
                    <div className="text-center">
                        <h1 className="font-grotesk font-bold text-white tracking-widest uppercase text-sm">
                            {step === 1 ? 'Upload Files' : 'Print Settings'}
                        </h1>
                        <div className="flex items-center justify-center gap-1.5 mt-1.5">
                            <div className={clsx("h-1 w-6 rounded-full transition-all duration-500", step === 1 ? "bg-neon-purple shadow-[0_0_10px_#9B5CFF]" : "bg-white/10")} />
                            <div className={clsx("h-1 w-6 rounded-full transition-all duration-500", step === 2 ? "bg-neon-cyan shadow-[0_0_10px_#00F5FF]" : "bg-white/10")} />
                        </div>
                    </div>
                    <div className="w-10 flex justify-end">
                        <Database size={20} className="text-white/10" />
                    </div>
                </div>
            </nav>

            <div className="max-w-xl mx-auto px-6 pt-36 relative z-10">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-10"
                        >
                            <div className="glass-card p-[1px] group">
                                <label className="relative overflow-hidden block w-full bg-[#12121B]/40 backdrop-blur-xl rounded-[40px] p-16 text-center border border-white/5 hover:border-neon-purple/50 transition-all cursor-pointer">
                                    <div className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,application/pdf"
                                        onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="w-20 h-20 bg-neon-purple/10 border border-neon-purple/20 text-neon-purple rounded-[28px] flex items-center justify-center mx-auto mb-8 transition-all group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(155,92,255,0.3)]">
                                        <Upload size={32} />
                                    </div>
                                    <h3 className="font-grotesk font-bold text-2xl mb-2 text-white tracking-tight">Upload Documents</h3>
                                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-[0.2em]">PDF, JPEG, or PNG up to 50MB</p>

                                    <div className="mt-10 flex justify-center gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
                                            <span className="text-[9px] font-bold text-text-secondary tracking-widest uppercase">Secure</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                            <div className="w-1.5 h-1.5 bg-neon-purple rounded-full animate-pulse" />
                                            <span className="text-[9px] font-bold text-text-secondary tracking-widest uppercase">Fast</span>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <div className="space-y-6">
                                <AnimatePresence initial={false}>
                                    {currentOrder.files.map((file) => (
                                        <motion.div
                                            key={file.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-[#0A0A0F] border border-white/5 flex items-center justify-center text-text-secondary group-hover:text-neon-purple transition-colors relative">
                                                    {file.type === 'stationery' ? <PenTool size={24} /> :
                                                        file.type.startsWith('image/') ? <FileImage size={24} /> : <FileText size={24} />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold truncate text-base text-white tracking-tight">{file.name}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                                                            {file.type === 'stationery' ? `Price: ₹${file.price}` : `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFile(file.id)} className="w-10 h-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center justify-center text-white/20 border border-transparent hover:border-red-500/20">
                                                    <X size={20} />
                                                </button>
                                            </div>

                                            {file.type !== 'stationery' && (
                                                <div className="mt-5 flex items-center justify-between bg-black/40 px-5 py-3 rounded-2xl border border-white/5">
                                                    <div className="flex items-center gap-2">
                                                        <Cpu size={14} className="text-neon-purple" />
                                                        <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider">Analysis</span>
                                                    </div>
                                                    {file.pageCount === 0 ? (
                                                        <div className="flex items-center gap-2 text-neon-purple font-bold text-[9px] uppercase tracking-widest">
                                                            <RefreshCw className="animate-spin" size={12} />
                                                            <span>Calculating...</span>
                                                        </div>
                                                    ) : (
                                                        <div className="font-grotesk font-bold text-xs text-white">
                                                            {file.pageCount || 1} <span className="text-text-secondary ml-1 lowercase font-normal tracking-normal">pages</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            {!isAllStationery && (
                                <div className="bg-[#12121B]/60 backdrop-blur-2xl p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-10">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-neon-purple/10 text-neon-purple flex items-center justify-center border border-neon-purple/20 shadow-[0_0_15px_rgba(155,92,255,0.1)]">
                                                <Printer size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-0.5">Color Mode</p>
                                                <span className="font-bold text-white tracking-tight">Select Color</span>
                                            </div>
                                        </div>
                                        <div className="flex bg-black/50 p-1.5 rounded-2xl border border-white/5">
                                            <button
                                                onClick={() => updateSettings('color', false)}
                                                className={clsx("px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all", !currentOrder.settings.color ? "bg-neon-purple text-white shadow-[0_0_15px_rgba(155,92,255,0.3)]" : "text-text-secondary hover:text-white")}
                                            >B&W</button>
                                            <button
                                                onClick={() => updateSettings('color', true)}
                                                className={clsx("px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all", currentOrder.settings.color ? "bg-neon-purple text-white shadow-[0_0_15px_rgba(155,92,255,0.3)]" : "text-text-secondary hover:text-white")}
                                            >Color</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 text-text-secondary flex items-center justify-center border border-white/10">
                                                <FileText size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-0.5">Sides</p>
                                                <span className="font-bold text-white tracking-tight">Select Sides</span>
                                            </div>
                                        </div>
                                        <div className="flex bg-black/50 p-1.5 rounded-2xl border border-white/5">
                                            <button
                                                onClick={() => updateSettings('doubleSided', false)}
                                                className={clsx("px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all", !currentOrder.settings.doubleSided ? "bg-white/10 text-white" : "text-text-secondary hover:text-white")}
                                            >Single</button>
                                            <button
                                                onClick={() => updateSettings('doubleSided', true)}
                                                className={clsx("px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all", currentOrder.settings.doubleSided ? "bg-white/10 text-white" : "text-text-secondary hover:text-white")}
                                            >Double</button>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 text-text-secondary flex items-center justify-center border border-white/10">
                                                <RefreshCw size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-0.5">Copies</p>
                                                <span className="font-bold text-white tracking-tight">Number of Copies</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))}
                                                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold text-2xl border border-white/5 transition-colors"
                                            >-</button>
                                            <span className="font-grotesk font-bold text-2xl w-8 text-center tabular-nums text-white">{currentOrder.settings.copies}</span>
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies + 1))}
                                                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center font-bold text-2xl border border-white/5 transition-colors"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Summary Card */}
                            <div className="bg-[#12121A] text-white p-12 rounded-[40px] border border-neon-purple/20 shadow-[0_0_50px_rgba(155,92,255,0.05)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-neon-purple/20 transition-all duration-1000" />
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse shadow-[0_0_5px_#9B5CFF]" />
                                    <h3 className="font-bold text-[10px] uppercase tracking-[0.4em] text-neon-purple">Order Summary</h3>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total Pages</span>
                                        <span className="font-grotesk font-bold text-white uppercase">{currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Rate per Page</span>
                                        <span className="font-grotesk font-bold text-white">₹{currentOrder.settings.color ? '10.00' : '2.00'}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-8 border-b border-white/5">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Copies</span>
                                        <span className="font-grotesk font-bold text-white">x {currentOrder.settings.copies}</span>
                                    </div>

                                    <div className="flex justify-between items-end pt-5">
                                        <div>
                                            <p className="text-[9px] font-bold text-neon-purple uppercase tracking-[0.3em] mb-2">Total Amount</p>
                                            <p className="text-5xl font-grotesk font-extrabold tracking-tighter text-white tabular-nums">₹{total}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-3 transition-opacity">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-xl border border-green-500/20">
                                                <Lock size={12} className="text-green-500" />
                                                <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Secure</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full z-50 p-8 bg-gradient-to-t from-background via-background/95 to-transparent">
                <div className="max-w-xl mx-auto">
                    {step === 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!hasFiles}
                            className="w-full bg-white text-background p-6 rounded-2xl font-bold flex items-center justify-between px-10 disabled:opacity-20 transition-all hover:bg-neon-purple hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
                        >
                            <span className="text-xs uppercase tracking-[0.2em]">{hasFiles ? `Proceed with ${currentOrder.files.length} Files` : 'Upload Files First'}</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100">Next</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-neon-purple text-white p-6 rounded-2xl font-bold flex items-center justify-between px-10 disabled:opacity-50 transition-all hover:shadow-[0_0_40px_rgba(155,92,255,0.4)] shadow-2xl group active:scale-[0.98]"
                        >
                            <span className="text-2xl font-grotesk">₹{total}</span>
                            <span className="flex items-center gap-3">
                                {isProcessing ? (
                                    <>
                                        <span className="text-[10px] uppercase tracking-widest italic animate-pulse">Processing Order</span>
                                        <RefreshCw className="animate-spin" size={20} />
                                    </>
                                ) : (
                                    <>
                                        <span className="text-[10px] uppercase tracking-widest">Pay & Print</span>
                                        <Zap size={20} className="group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Error Overlay */}
            <AnimatePresence>
                {debugError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-8"
                    >
                        <div className="max-w-md w-full text-center">
                            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                <AlertCircle size={48} />
                            </div>
                            <h3 className="text-white font-grotesk font-bold text-3xl mb-4 tracking-tight">Error</h3>
                            <div className="bg-black/40 border border-white/5 p-6 rounded-2xl mb-10 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                                <pre className="text-xs text-red-400/80 whitespace-pre-wrap font-mono uppercase tracking-widest leading-loose">
                                    Error: {debugError}
                                </pre>
                            </div>
                            <button
                                onClick={() => setDebugError(null)}
                                className="w-full bg-white text-background py-5 rounded-2xl font-bold hover:bg-neon-purple hover:text-white transition-all uppercase tracking-[0.2em] text-xs"
                            >
                                Dismiss
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

