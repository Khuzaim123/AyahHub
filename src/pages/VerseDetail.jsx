import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchVerse } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import AudioPlayer from '../components/AudioPlayer';

export default function VerseDetail() {
    const { surahNumber, verseNumber } = useParams();
    const { language } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = () => {
        setLoading(true);
        setError(null);
        fetchVerse(surahNumber, verseNumber, language)
            .then((res) => setData(res))
            .catch((err) => setError(err.message || 'Failed to load verse'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [surahNumber, verseNumber, language]);

    if (loading) return <div className="pt-24"><LoadingSpinner message="Loading Verse..." /></div>;
    if (error) return <div className="pt-24"><ErrorMessage message={error} onRetry={loadData} /></div>;
    if (!data) return null;

    const surah = data.surah;
    const verse = data.verse;
    const prevVerse = parseInt(verseNumber) > 1 ? parseInt(verseNumber) - 1 : null;
    // We don't know total_verses on this endpoint, but we still allow navigation forward
    const nextVerse = parseInt(verseNumber) + 1;

    return (
        <div className="page-wrapper">
            {/* Header */}
            <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 px-4 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold-400/5 rounded-full blur-[130px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-300/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative max-w-3xl mx-auto text-center">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center gap-2 text-xs text-white/30 mb-10"
                    >
                        <Link to="/" className="hover:text-white/50 transition-colors">Home</Link>
                        <span>/</span>
                        <Link to={`/surah/${surahNumber}`} className="hover:text-white/50 transition-colors">
                            {surah.transliteration}
                        </Link>
                        <span>/</span>
                        <span className="text-gold-400/60">Verse {verse.id}</span>
                    </motion.div>

                    {/* Surah Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-4"
                    >
                        <p className="text-white/40 text-sm font-medium uppercase tracking-wider mb-1">
                            {surah.transliteration}
                        </p>
                        <p className="arabic-text text-2xl text-white/50">{surah.name}</p>
                    </motion.div>

                    {/* Verse Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.15, type: 'spring' }}
                        className="mx-auto mb-12 w-20 h-20 flex items-center justify-center relative"
                    >
                        <div className="absolute w-20 h-20 rotate-45 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/25" />
                        <div className="relative text-center">
                            <p className="text-gold-400 text-2xl font-bold font-display">{verse.id}</p>
                            <p className="text-gold-400/40 text-[9px] uppercase tracking-widest">Ayah</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Verse Content */}
            <section className="max-w-3xl mx-auto px-4 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="glass-card rounded-3xl p-8 md:p-12 glow-gold"
                >
                    {/* Arabic Text */}
                    <p className="arabic-text text-3xl md:text-4xl lg:text-5xl text-white leading-[2.4] text-center mb-8 text-glow">
                        {verse.text}
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 gold-shimmer" />
                        <div className="w-2 h-2 rotate-45 bg-gold-400/30 rounded-sm" />
                        <div className="flex-1 gold-shimmer" />
                    </div>

                    {/* Translation */}
                    <p className="text-white/50 text-base md:text-lg leading-relaxed text-center">
                        {verse.translation}
                    </p>
                </motion.div>

                {/* Audio Players (if available) */}
                {data.audio && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 space-y-3"
                    >
                        <h3 className="text-white/30 text-xs uppercase tracking-wider text-center mb-4">
                            Listen to this verse
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {Object.values(data.audio).map((audioItem, idx) => (
                                <AudioPlayer
                                    key={idx}
                                    src={audioItem.url}
                                    reciter={audioItem.reciter}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Navigation */}
            <section className="max-w-3xl mx-auto px-4 pb-12">
                <div className="flex items-center justify-between">
                    {prevVerse ? (
                        <Link
                            to={`/surah/${surahNumber}/verse/${prevVerse}`}
                            id="prev-verse"
                            className="glass-card glass-card-hover rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Verse {prevVerse}</span>
                        </Link>
                    ) : (
                        <Link
                            to={`/surah/${surahNumber}`}
                            className="glass-card glass-card-hover rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Back to Surah</span>
                        </Link>
                    )}

                    <Link
                        to={`/surah/${surahNumber}/verse/${nextVerse}`}
                        id="next-verse"
                        className="glass-card glass-card-hover rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all"
                    >
                        <span>Verse {nextVerse}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
}
