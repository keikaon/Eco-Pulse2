/**
 * Netlify Serverless Function - NewsData.io API proxy
 * API anahtarı Netlify Environment Variables'da NEWSDATA_API_KEY olarak tanımlanmalı
 */
exports.handler = async () => {
  const API_KEY = process.env.NEWSDATA_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'API key not configured', results: [] }),
    };
  }

  try {
    const url = `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(API_KEY)}&category=environment&language=tr,en,fr,de`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`NewsData API: ${res.status}`);
    }

    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'News service unavailable', results: [] }),
    };
  }
};
