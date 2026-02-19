import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="relative z-10 mt-20">
            <div className="gold-shimmer w-full" />
            <div className="py-10 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2.5">
                        <Logo size={36} />
                        <span className="text-lg font-bold font-display tracking-tight">
                            <span className="text-gold-400">Ayah</span>
                            <span className="text-white/90">Hub</span>
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-sm text-white/50 hover:text-white/80 transition-colors duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            to="/search"
                            className="text-sm text-white/50 hover:text-white/80 transition-colors duration-300"
                        >
                            Search
                        </Link>
                    </div>

                    {/* Credits */}
                    <div className="text-center md:text-right space-y-1">
                        <p className="text-xs text-white/30">
                            Built with{' '}
                            <span className="text-red-400">♥</span> using React
                        </p>
                        <p className="text-xs text-white/20">
                            Powered by{' '}
                            <a
                                href="https://alquran-api.pages.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold-400/50 hover:text-gold-400 transition-colors"
                            >
                                Al-Quran API
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
