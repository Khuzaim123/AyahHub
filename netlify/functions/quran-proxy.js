// Netlify Serverless Function — proxies Quran API requests server-side
// This avoids CORS because the browser never talks to the external API directly.

exports.handler = async (event) => {
    // event.path = original request path, e.g. /api/quran/surah/1
    // Strip the /api/quran prefix to get the sub-path
    const subPath = event.path.replace(/^\/api\/quran\/?/, '') || '';

    // Rebuild query string
    let qs = '';
    if (event.rawQuery) {
        qs = `?${event.rawQuery}`;
    } else if (event.queryStringParameters) {
        const params = new URLSearchParams(event.queryStringParameters).toString();
        if (params) qs = `?${params}`;
    }

    const apiUrl = `https://alquran-api.pages.dev/api/quran/${subPath}${qs}`;

    try {
        const response = await fetch(apiUrl);
        const body = await response.text();

        return {
            statusCode: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body,
        };
    } catch (error) {
        return {
            statusCode: 502,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to fetch from Quran API' }),
        };
    }
};
