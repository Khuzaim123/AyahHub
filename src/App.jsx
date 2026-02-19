import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const SurahDetail = lazy(() => import('./pages/SurahDetail'));
const VerseDetail = lazy(() => import('./pages/VerseDetail'));
const Search = lazy(() => import('./pages/Search'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Suspense fallback={<div className="pt-24"><LoadingSpinner /></div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/surah/:surahNumber" element={<SurahDetail />} />
                    <Route path="/surah/:surahNumber/verse/:verseNumber" element={<VerseDetail />} />
                    <Route path="/search" element={<Search />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
