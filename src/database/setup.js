const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./marlin.db');

// Create Vessel and Event tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS vessels (
      id INTEGER PRIMARY KEY,
      name TEXT,
      longitude REAL,
      latitude REAL,
      speed_knots REAL,
      heading INTEGER,
      status TEXT,
      last_event TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY,
      vessel TEXT,
      latitude REAL,
      longitude REAL,
      date TEXT,
      time TEXT,
      severity TEXT,
      bycatch_type TEXT,
      thumbnail TEXT
    )
  `);

  console.log("Tables created successfully.");
});

db.close();

// To run this script, use the command:
// node src/database/setup.js
