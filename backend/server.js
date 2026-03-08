const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
const cache = require('./cache');

const app = express();
app.use(express.json());
app.use(cors());

// initialize cache (creates SQLite file)
cache.init();

// helper to hash poem text for caching
function hashPoem(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// POST /analyze - accepts poem text, returns style analysis and magazine suggestions
app.post('/analyze', async (req, res) => {
  const { poem } = req.body;
  if (!poem) return res.status(400).json({ error: 'poem text required' });

  const poemHash = hashPoem(poem);
  try {
    const cached = await cache.getAnalysis(poemHash);
    if (cached) {
      return res.json({ source: 'cache', ...cached });
    }
  } catch (err) {
    console.error('cache read error', err);
  }

  // Placeholder: call AI service to determine style
  const style = await fakeAnalyzeStyle(poem);

  // Placeholder: query Duotrope API for matching magazines
  const matches = await fakeFetchMagazines(style);

  const result = { style, magazines: matches };
  cache.saveAnalysis(poemHash, style, result);

  res.json({ source: 'ai', ...result });
});

// static frontend
app.use(express.static('../frontend'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// ----- fake helpers for boilerplate -----
async function fakeAnalyzeStyle(poem) {
  // In real code, call your AI model/service here
  return 'lyrical';
}

async function fakeFetchMagazines(style) {
  // In real code, query Duotrope with API key
  return [
    { name: 'Poetry Journal', editor: 'Jane Doe', url: 'https://example.com' },
    { name: 'Verse', editor: 'John Smith', url: 'https://example.org' }
  ];
}
