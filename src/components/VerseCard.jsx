import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function VerseCard({ verse, surahNumber, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                to={`/surah/${surahNumber}/verse/${verse.id}`}
                id={`verse-card-${surahNumber}-${verse.id}`}
                className="block glass-card glass-card-hover rounded-2xl p-6 md:p-8 group relative overflow-hidden"
            >
                {/* Hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/0 group-hover:bg-gold-400/5 blur-3xl rounded-full transition-all duration-700" />

                <div className="relative">
                    {/* Verse Number */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="verse-badge group-hover:bg-gradient-to-br group-hover:from-gold-400/30 group-hover:to-gold-400/10 transition-all duration-300">
                            {verse.id}
                        </div>
                        <svg className="w-4 h-4 text-white/15 group-hover:text-gold-400/40 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>

                    {/* Arabic Text */}
                    <p className="arabic-text text-2xl md:text-3xl text-white/90 leading-[2.4] text-right mb-5 group-hover:text-white transition-colors duration-300 text-glow">
                        {verse.text}
                    </p>

                    {/* Divider */}
                    <div className="gold-shimmer w-full mb-4 opacity-30" />

                    {/* Translation */}
                    <p className="text-white/45 text-sm md:text-base leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                        {verse.translation}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
