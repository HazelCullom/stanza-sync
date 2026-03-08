// Simple cache module using SQLite or in-memory fallback
const sqlite3 = require('sqlite3').verbose();
let db;

function init(databaseFile = 'cache.db') {
  db = new sqlite3.Database(databaseFile);
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS analysis (
      poem_hash TEXT PRIMARY KEY,
      style TEXT,
      result TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });
}

function saveAnalysis(poemHash, style, result) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO analysis(poem_hash, style, result)
    VALUES(?, ?, ?)
  `);
  stmt.run(poemHash, style, JSON.stringify(result));
  stmt.finalize();
}

function getAnalysis(poemHash) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT style, result FROM analysis WHERE poem_hash = ?`,
      [poemHash],
      (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        try {
          resolve({ style: row.style, result: JSON.parse(row.result) });
        } catch (e) {
          reject(e);
        }
      });
  });
}

module.exports = { init, saveAnalysis, getAnalysis };
