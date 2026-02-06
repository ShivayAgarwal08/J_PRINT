import { useCallback, useState } from 'react';
import { Upload, File, X, FileImage, Check, FileText, Zap, Cpu, Activity } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function FileUpload() {
    const { addFile, removeFile, currentOrder } = useOrder();
    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            Array.from(e.dataTransfer.files).forEach(file => addFile(file));
        }
    }, [addFile]);

    const onFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            Array.from(e.target.files).forEach(file => addFile(file));
        }
    };

    return (
        <div className="w-full space-y-8 font-sans">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={clsx(
                    "relative border-2 border-dashed rounded-[40px] p-16 transition-all duration-500 ease-out text-center cursor-pointer overflow-hidden backdrop-blur-md group",
                    isDragging
                        ? "border-neon-purple bg-neon-purple/5 shadow-[0_0_30px_rgba(155,92,255,0.2)] scale-[1.02]"
                        : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                )}
            >
                <div className="absolute inset-0 mesh-bg opacity-5 pointer-events-none" />

                <input
                    type="file"
                    multiple
                    onChange={onFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="flex flex-col items-center gap-6 relative z-0">
                    <div className={clsx(
                        "w-20 h-20 rounded-[24px] flex items-center justify-center transition-all duration-500 shadow-2xl border",
                        isDragging
                            ? "bg-neon-purple border-neon-purple/50 text-white shadow-[0_0_20px_#9B5CFF]"
                            : "bg-white/5 text-text-secondary border-white/10 group-hover:border-neon-purple/30 group-hover:text-neon-purple"
                    )}>
                        <Upload size={32} className={clsx(isDragging && "animate-bounce")} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-orbitron font-bold text-white tracking-widest uppercase">Neural Uplink</h3>
                        <p className="text-[10px] font-bold text-text-secondary mt-2 tracking-[0.3em] uppercase opacity-70">
                            Drop assets or tap to bridge
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        {['PDF', 'DOCX', 'JPG', 'PNG'].map(type => (
                            <span key={type} className="px-4 py-1.5 bg-black/40 border border-white/5 rounded-xl text-[8px] font-bold text-text-secondary uppercase tracking-[0.3em] group-hover:border-white/10 transition-colors">{type}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode='popLayout'>
                    {currentOrder.files.filter(f => f.type !== 'stationery').map((file) => (
                        <motion.div
                            key={file.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-5 p-5 rounded-[24px] bg-[#12121A]/80 border border-white/5 group hover:border-neon-purple/30 shadow-2xl transition-all backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 blur-3xl pointer-events-none" />

                            <div className="w-14 h-14 rounded-2xl bg-white/5 text-neon-purple flex items-center justify-center border border-white/10 group-hover:border-neon-purple/20 shrink-0 transition-all">
                                {file.type.startsWith('image/') ? <FileImage size={24} /> : <FileText size={24} />}
                            </div>

                            <div className="flex-1 min-w-0 z-10">
                                <div className="flex items-center gap-3">
                                    <p className="font-orbitron font-bold text-xs text-white truncate tracking-tight uppercase">{file.name}</p>
                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-bold uppercase tracking-widest">
                                        <Check size={8} strokeWidth={4} /> Verified
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <div className="w-1 h-1 bg-white/10 rounded-full" />
                                    <p className="text-[9px] font-bold text-neon-purple uppercase tracking-[0.2em] animate-pulse">Encoded</p>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFile(file.id)}
                                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-500/10 text-white/20 hover:text-red-500 transition-all border border-white/5 hover:border-red-500/20 z-10"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {currentOrder.files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-4 pt-6"
                    >
                        <div className="h-px w-12 bg-white/5" />
                        <p className="text-[9px] font-bold text-text-secondary uppercase tracking-[0.4em]">
                            {currentOrder.files.length} Manifest {currentOrder.files.length === 1 ? 'Asset' : 'Assets'} Bridged
                        </p>
                        <div className="h-px w-12 bg-white/5" />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

