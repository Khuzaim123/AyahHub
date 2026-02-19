import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fetchAllSurahs } from '../services/api';
import SurahCard from '../components/SurahCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
    const { language } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all' | 'meccan' | 'medinan'

    const loadData = () => {
        setLoading(true);
        setError(null);
        fetchAllSurahs(language)
            .then((res) => setData(res))
            .catch((err) => setError(err.message || 'Failed to load surahs'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
    }, [language]);

    const filteredSurahs = useMemo(() => {
        if (!data?.surahs) return [];
        return data.surahs.filter((surah) => {
            const matchesSearch =
                !searchQuery ||
                surah.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                surah.name.includes(searchQuery) ||
                surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                surah.id.toString() === searchQuery;

            const matchesType = filterType === 'all' || surah.type === filterType;

            return matchesSearch && matchesType;
        });
    }, [data, searchQuery, filterType]);

    return (
        <div className="page-wrapper">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-primary-400/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Bismillah */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="arabic-text text-gold-400/80 text-2xl md:text-3xl mb-6"
                    >
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-4"
                    >
                        Read the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                            Quran
                        </span>{' '}
                        Online
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-white/45 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
                    >
                        Explore all 114 Surahs, verses, and translations in a beautifully crafted reading experience
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex items-center justify-center gap-8 md:gap-12"
                    >
                        {[
                            { label: 'Surahs', value: '114' },
                            { label: 'Verses', value: '6,236' },
                            { label: 'Languages', value: '12+' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-gold-400 font-display">{stat.value}</p>
                                <p className="text-white/30 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Search & Filter */}
            <section className="max-w-7xl mx-auto px-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search surahs by name or number..."
                            id="home-search"
                            className="search-input w-full pl-11 pr-4 py-3 text-sm rounded-xl"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                        {[
                            { value: 'all', label: 'All' },
                            { value: 'meccan', label: 'Meccan' },
                            { value: 'medinan', label: 'Medinan' },
                        ].map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilterType(f.value)}
                                id={`filter-${f.value}`}
                                className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 ${filterType === f.value
                                        ? 'bg-gold-400/15 text-gold-400'
                                        : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Surah Grid */}
            <section className="max-w-7xl mx-auto px-4 pb-8">
                {loading ? (
                    <LoadingSpinner message="Loading Surahs..." />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={loadData} />
                ) : filteredSurahs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-white/30 text-sm">No surahs found</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSurahs.map((surah, index) => (
                            <SurahCard key={surah.id} surah={surah} index={index} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
