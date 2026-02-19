import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar({ onSearch, isLoading }) {
    const [query, setQuery] = useState('');
    const [debounceTimer, setDebounceTimer] = useState(null);

    const debouncedSearch = useCallback(
        (value) => {
            if (debounceTimer) clearTimeout(debounceTimer);
            const timer = setTimeout(() => {
                if (value.trim().length >= 2) {
                    onSearch(value.trim());
                }
            }, 500);
            setDebounceTimer(timer);
        },
        [onSearch, debounceTimer]
    );

    useEffect(() => {
        return () => {
            if (debounceTimer) clearTimeout(debounceTimer);
        };
    }, [debounceTimer]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length >= 2) {
            if (debounceTimer) clearTimeout(debounceTimer);
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
        if (debounceTimer) clearTimeout(debounceTimer);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>

                {/* Input */}
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search the Quran..."
                    id="search-input"
                    className="search-input w-full pl-12 pr-20 py-4 text-base rounded-2xl"
                    autoComplete="off"
                />

                {/* Right side: clear + loading */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <AnimatePresence>
                        {query && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                type="button"
                                onClick={handleClear}
                                className="p-1 rounded-full text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {isLoading && (
                        <div className="w-5 h-5 border-2 border-gold-400/20 border-t-gold-400 rounded-full animate-spin" />
                    )}
                </div>
            </div>

            {/* Helper text */}
            <p className="text-center text-white/20 text-xs mt-3">
                Type at least 2 characters to search
            </p>
        </form>
    );
}
