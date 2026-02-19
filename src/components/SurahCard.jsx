import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SurahCard({ surah, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.02, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                to={`/surah/${surah.id}`}
                id={`surah-card-${surah.id}`}
                className="block glass-card glass-card-hover rounded-2xl p-5 group relative overflow-hidden"
            >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/0 to-gold-400/0 group-hover:from-gold-400/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                <div className="relative flex items-start justify-between gap-4">
                    {/* Left: Number + Info */}
                    <div className="flex items-start gap-4 min-w-0">
                        {/* Surah Number */}
                        <div className="relative flex-shrink-0">
                            <div className="w-11 h-11 flex items-center justify-center">
                                {/* Diamond shape */}
                                <div className="absolute w-11 h-11 rotate-45 rounded-md bg-gradient-to-br from-gold-400/15 to-gold-400/5 border border-gold-400/20 group-hover:from-gold-400/25 group-hover:border-gold-400/35 transition-all duration-300" />
                                <span className="relative text-gold-400 text-sm font-semibold">{surah.id}</span>
                            </div>
                        </div>

                        {/* Surah Info */}
                        <div className="min-w-0 pt-0.5">
                            <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-gold-400 transition-colors duration-300 truncate">
                                {surah.transliteration}
                            </h3>
                            <p className="text-white/40 text-xs mt-0.5 truncate">{surah.translation}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span
                                    className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${surah.type === 'meccan' ? 'badge-meccan' : 'badge-medinan'
                                        }`}
                                >
                                    {surah.type}
                                </span>
                                <span className="text-white/25 text-[10px]">
                                    {surah.total_verses} verses
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Arabic Name */}
                    <div className="text-right flex-shrink-0">
                        <p className="arabic-text text-2xl text-white/80 group-hover:text-gold-400/80 transition-colors duration-300 leading-relaxed">
                            {surah.name}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
