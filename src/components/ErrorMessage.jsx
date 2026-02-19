import { motion } from 'framer-motion';

export default function ErrorMessage({ message = 'Something went wrong', onRetry }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-4"
        >
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            </div>
            <p className="text-white/50 text-sm">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-2 px-5 py-2 rounded-lg bg-gold-400/10 text-gold-400 text-sm font-medium border border-gold-400/20 hover:bg-gold-400/20 transition-all duration-300"
                >
                    Try Again
                </button>
            )}
        </motion.div>
    );
}
