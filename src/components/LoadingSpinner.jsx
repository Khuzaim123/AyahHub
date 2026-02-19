import { motion } from 'framer-motion';

export default function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 gap-6"
        >
            <div className="relative">
                <div className="spinner" />
                <div className="absolute inset-0 spinner opacity-30" style={{ animationDuration: '1.6s', animationDirection: 'reverse' }} />
            </div>
            <p className="text-white/40 text-sm font-medium tracking-wide">{message}</p>
        </motion.div>
    );
}
