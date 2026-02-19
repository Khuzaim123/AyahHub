import axios from 'axios';

// Dev: Vite proxy forwards /api/quran → external API (avoids CORS on localhost)
// Prod: Call the API directly (Cloudflare Pages has CORS enabled)
const BASE_URL = import.meta.env.DEV
    ? '/api/quran'
    : 'https://alquran-api.pages.dev/api/quran';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
});

/**
 * Fetch all surahs
 * @param {string} lang - Language code
 */
export const fetchAllSurahs = async (lang = 'ur') => {
    const { data } = await api.get(`?lang=${lang}`);
    return data;
};

/**
 * Fetch a single surah with all its verses
 * @param {number} surahNumber
 * @param {string} lang
 */
export const fetchSurah = async (surahNumber, lang = 'ur') => {
    const { data } = await api.get(`/surah/${surahNumber}?lang=${lang}`);
    return data;
};

/**
 * Fetch a single verse
 * @param {number} surahNumber
 * @param {number} verseNumber
 * @param {string} lang
 */
export const fetchVerse = async (surahNumber, verseNumber, lang = 'ur') => {
    const { data } = await api.get(`/surah/${surahNumber}/verse/${verseNumber}?lang=${lang}`);
    return data;
};

/**
 * Search the Quran
 * @param {string} query
 * @param {string} lang
 */
export const searchQuran = async (query, lang = 'ur') => {
    const { data } = await api.get(`/search?q=${encodeURIComponent(query)}&lang=${lang}`);
    return data;
};

/**
 * Fetch available languages
 */
export const fetchLanguages = async () => {
    const { data } = await api.get('/languages');
    return data;
};

export default api;
