import { createContext, useContext, useState, useEffect } from 'react';
import { fetchLanguages } from '../services/api';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('ayahhub-lang') || 'ur';
    });
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLanguages()
            .then((data) => {
                setLanguages(data.languages || []);
            })
            .catch(() => {
                // Fallback languages
                setLanguages([
                    { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
                    { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr' },
                    { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl' },
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        localStorage.setItem('ayahhub-lang', language);
    }, [language]);

    const currentLanguage = languages.find((l) => l.code === language) || {
        code: language,
        name: language,
        direction: 'ltr',
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, languages, currentLanguage, loading }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
