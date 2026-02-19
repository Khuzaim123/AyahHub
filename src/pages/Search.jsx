import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { searchQuran } from '../services/api';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Search() {
    const { language } = useLanguage();
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchedQuery, setSearchedQuery] = useState('');

    const handleSearch = useCallback(
        async (query) => {
            setLoading(true);
            setError(null);
            setSearchedQuery(query);
            try {
                const data = await searchQuran(query, language);
                setResults(data);
            } catch (err) {
                setError(err.message || 'Search failed');
                setResults(null);
            } finally {
                setLoading(false);
            }
        },
        [language]
    );

    const resultItems = results?.results || results?.verses || [];

    return (
        <div className="page-wrapper">
            {/* Header */}
            <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 px-4 overflow-hidden">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative max-w-3xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold font-display text-white mb-4"
                    >
                        Search the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                            Quran
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-white/40 mb-10"
                    >
                        Find verses, surahs, and translations
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <SearchBar onSearch={handleSearch} isLoading={loading} />
                    </motion.div>
                </div>
            </section>

            {/* Results */}
            <section className="max-w-4xl mx-auto px-4 pb-12">
                {loading && <LoadingSpinner message="Searching..." />}

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <p className="text-red-400/60 text-sm">{error}</p>
                    </motion.div>
                )}

                {!loading && !error && results && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Results count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-white/30 text-sm">
                                {resultItems.length} result{resultItems.length !== 1 ? 's' : ''} for{' '}
                                <span className="text-gold-400/60">"{searchedQuery}"</span>
                            </p>
                        </div>

                        {resultItems.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-5xl mb-4 opacity-20">🔍</div>
                                <p className="text-white/30 text-sm">No results found</p>
                                <p className="text-white/15 text-xs mt-2">Try a different search term</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {resultItems.map((item, index) => (
                                        <motion.div
                                            key={`${item.surah?.id || item.surahId}-${item.verse?.id || item.verseId || index}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={`/surah/${item.surah?.id || item.surahId}/verse/${item.verse?.id || item.verseId}`}
                                                className="block glass-card glass-card-hover rounded-2xl p-6 group"
                                                id={`search-result-${index}`}
                                            >
                                                {/* Surah + Verse info */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="verse-badge">
                                                            {item.verse?.id || item.verseId}
                                                        </div>
                                                        <div>
                                                            <p className="text-white/70 text-sm font-medium group-hover:text-gold-400 transition-colors">
                                                                {item.surah?.transliteration || item.surahName || `Surah ${item.surah?.id || item.surahId}`}
                                                            </p>
                                                            <p className="text-white/30 text-xs">
                                                                Verse {item.verse?.id || item.verseId}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="arabic-text text-lg text-white/40 group-hover:text-gold-400/60 transition-colors">
                                                        {item.surah?.name || ''}
                                                    </p>
                                                </div>

                                                {/* Arabic text */}
                                                <p className="arabic-text text-xl md:text-2xl text-white/80 leading-[2.2] text-right mb-4 group-hover:text-white transition-colors">
                                                    {item.verse?.text || item.text}
                                                </p>

                                                {/* Translation */}
                                                <div className="gold-shimmer w-full mb-3 opacity-20" />
                                                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/55 transition-colors">
                                                    {item.verse?.translation || item.translation}
                                                </p>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Initial state */}
                {!loading && !error && !results && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center py-24"
                    >
                        <div className="text-6xl mb-6 opacity-10">📖</div>
                        <p className="text-white/20 text-sm">
                            Start typing to search through the Quran
                        </p>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
