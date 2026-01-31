if (process.env.NODE_ENV === "production") {
  // In production, use sqlite3
  const sqlite3 = require("sqlite3").verbose();
  db = new sqlite3.Database("./database.db");

  db.run(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount REAL
    )
  `);
} else {
  // In development, fake db in memory
  const data = [];
  db = {
    all: (query, params, cb) => cb(null, data),
    run: (query, params, cb) => {
      data.push({ id: data.length + 1, title: params[0], amount: params[1] });
      if (cb) cb();
    },
  };
}

module.exports = db;
