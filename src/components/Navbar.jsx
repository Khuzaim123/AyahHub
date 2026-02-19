import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import { HomeIcon, SearchIcon } from './Icons';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { language, setLanguage, languages } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const langRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { to: '/', label: 'Home', icon: <HomeIcon size={18} /> },
        { to: '/search', label: 'Search', icon: <SearchIcon size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-blur shadow-2xl shadow-black/20' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-18">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo">
                        <Logo size={40} />
                        <span className="text-xl font-bold font-display tracking-tight">
                            <span className="text-gold-400">Ayah</span>
                            <span className="text-white">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                id={`nav-${link.label.toLowerCase()}`}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(link.to)
                                    ? 'text-gold-400'
                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.to) && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}

                        {/* Language Selector */}
                        <div ref={langRef} className="relative ml-3">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                id="lang-selector"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-white/20"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3c2.5 2.8 3.9 6.3 3.9 9s-1.4 6.2-3.9 9c-2.5-2.8-3.9-6.3-3.9-9s1.4-6.2 3.9-9z"
                                    />
                                </svg>
                                <span className="uppercase">{language}</span>
                                <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-52 glass-card rounded-xl shadow-2xl shadow-black/40 overflow-hidden py-1 max-h-80 overflow-y-auto"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setLangOpen(false);
                                                }}
                                                id={`lang-${lang.code}`}
                                                className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 flex items-center justify-between ${language === lang.code
                                                    ? 'bg-gold-400/10 text-gold-400'
                                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <span>{lang.name}</span>
                                                <span className="text-xs opacity-60">{lang.nativeName}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        id="mobile-menu-btn"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden navbar-blur"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(link.to)
                                        ? 'bg-gold-400/10 text-gold-400'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="text-gold-400/70">{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                            <div className="pt-2 border-t border-white/5">
                                <p className="px-4 py-2 text-xs text-white/40 uppercase tracking-wider">Language</p>
                                <div className="max-h-48 overflow-y-auto">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setMobileOpen(false);
                                            }}
                                            className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all ${language === lang.code
                                                ? 'bg-gold-400/10 text-gold-400'
                                                : 'text-white/70 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <span>{lang.name}</span>
                                            <span className="text-xs opacity-50">{lang.nativeName}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
