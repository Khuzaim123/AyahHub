import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchSurah } from '../services/api';
import VerseCard from '../components/VerseCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function SurahDetail() {
    const { surahNumber } = useParams();
    const { language } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = () => {
        setLoading(true);
        setError(null);
        fetchSurah(surahNumber, language)
            .then((res) => setData(res))
            .catch((err) => setError(err.message || 'Failed to load surah'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [surahNumber, language]);

    if (loading) return <div className="pt-24"><LoadingSpinner message="Loading Surah..." /></div>;
    if (error) return <div className="pt-24"><ErrorMessage message={error} onRetry={loadData} /></div>;
    if (!data) return null;

    const prevSurah = parseInt(surahNumber) > 1 ? parseInt(surahNumber) - 1 : null;
    const nextSurah = parseInt(surahNumber) < 114 ? parseInt(surahNumber) + 1 : null;

    return (
        <div className="page-wrapper">
            {/* Header */}
            <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 px-4 overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center gap-2 text-xs text-white/30 mb-8"
                    >
                        <Link to="/" className="hover:text-white/50 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-gold-400/60">Surah {data.id}</span>
                    </motion.div>

                    {/* Surah Number Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                        className="mx-auto mb-6 w-16 h-16 flex items-center justify-center"
                    >
                        <div className="absolute w-16 h-16 rotate-45 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/25" />
                        <span className="relative text-gold-400 text-lg font-bold">{data.id}</span>
                    </motion.div>

                    {/* Arabic Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="arabic-text text-5xl md:text-7xl text-white mb-3 text-glow"
                    >
                        {data.name}
                    </motion.h1>

                    {/* Transliteration */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-2xl md:text-3xl font-display font-semibold text-gold-400/80 mb-2"
                    >
                        {data.transliteration}
                    </motion.h2>

                    {/* Translation */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/40 text-base mb-6"
                    >
                        {data.translation}
                    </motion.p>

                    {/* Meta */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="flex items-center justify-center gap-4 text-sm"
                    >
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${data.type === 'meccan' ? 'badge-meccan' : 'badge-medinan'
                                }`}
                        >
                            {data.type}
                        </span>
                        <span className="text-white/25">•</span>
                        <span className="text-white/40">{data.total_verses} Verses</span>
                    </motion.div>
                </div>
            </section>

            {/* Gold divider */}
            <div className="max-w-4xl mx-auto px-4">
                <div className="gold-shimmer w-full" />
            </div>

            {/* Bismillah (except for Surah 1 and 9) */}
            {data.id !== 1 && data.id !== 9 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl mx-auto px-4 py-10 text-center"
                >
                    <p className="arabic-text text-3xl md:text-4xl text-gold-400/60 text-glow">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                    </p>
                </motion.div>
            )}

            {/* Verses */}
            <section className="max-w-4xl mx-auto px-4 py-8 space-y-4">
                {data.verses?.map((verse, index) => (
                    <VerseCard
                        key={verse.id}
                        verse={verse}
                        surahNumber={data.id}
                        index={index}
                    />
                ))}
            </section>

            {/* Navigation */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between">
                    {prevSurah ? (
                        <Link
                            to={`/surah/${prevSurah}`}
                            id="prev-surah"
                            className="glass-card glass-card-hover rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Previous Surah</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextSurah ? (
                        <Link
                            to={`/surah/${nextSurah}`}
                            id="next-surah"
                            className="glass-card glass-card-hover rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all"
                        >
                            <span>Next Surah</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </section>
        </div>
    );
}
