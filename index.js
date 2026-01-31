const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount REAL
  )
`);

app.get("/expenses", (req, res) => {
  db.all("SELECT * FROM expenses", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/expenses", (req, res) => {
  const { title, amount } = req.body;
  db.run(
    "INSERT INTO expenses (title, amount) VALUES (?, ?)",
    [title, amount],
    () => res.sendStatus(201)
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

