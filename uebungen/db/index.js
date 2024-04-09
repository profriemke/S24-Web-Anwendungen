const Database = require('better-sqlite3')

// Datenbankverbindung herstellen
const db = new Database('./database.db')

// Query
const kunden = db.prepare('SELECT * FROM kunde LIMIT 2').all()

console.log(kunden);
console.log(kunden[0].vorname + " " + kunden[0].nachname);
db.close();