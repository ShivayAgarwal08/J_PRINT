import { useState } from 'react';
import { Star, Send, Zap, Cpu, Activity, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from './Toast';

export default function FeedbackForm() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            addToast('Please select a star rating', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://sheetdb.io/api/v1/n484xera5odpb', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        {
                            rating: rating,
                            feedback: feedback,
                            timestamp: new Date().toISOString()
                        }
                    ]
                })
            });

            if (response.ok) {
                addToast('Thank you for your feedback!', 'success');
                setRating(0);
                setFeedback('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit feedback');
            }
        } catch (error) {
            console.error('Feedback error:', error);
            addToast(error.message || 'Something went wrong. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#12121A]/40 backdrop-blur-2xl rounded-[40px] p-12 shadow-2xl border border-white/5 mb-10 font-sans relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-neon-purple/5 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-cyan/5 blur-[80px] pointer-events-none" />

            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-background shadow-xl">
                    <Activity size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-orbitron font-bold tracking-[0.2em] uppercase text-white">Rate & Feedback</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse shadow-[0_0_8px_#9B5CFF]" />
                        <span className="text-[9px] font-bold text-neon-purple uppercase tracking-[0.3em]">Help us improve</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="flex justify-center gap-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 transition-transform hover:scale-125 focus:outline-none group/star"
                        >
                            <Star
                                size={44}
                                className={`transition-all duration-500 ${star <= rating
                                    ? 'text-neon-purple fill-neon-purple drop-shadow-[0_0_15px_rgba(155,92,255,0.6)]'
                                    : 'text-white/10 fill-white/[0.02] group-hover/star:text-neon-purple/30'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    <label className="text-[9px] font-bold text-text-secondary ml-1 uppercase tracking-[0.4em]">Your Message</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        rows="4"
                        className="w-full p-8 bg-black/40 border border-white/5 rounded-[32px] focus:ring-4 focus:ring-neon-purple/10 focus:border-neon-purple/30 transition-all resize-none text-[11px] font-bold uppercase tracking-widest placeholder:text-white/10 outline-none text-white shadow-inner"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-background py-6 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-neon-purple hover:text-white transition-all disabled:opacity-50 shadow-2xl group animate-glow cursor-pointer"
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-3">
                            <Loader2 size={16} className="animate-spin" />
                            Submitting...
                        </div>
                    ) : (
                        <>
                            Submit Review <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

