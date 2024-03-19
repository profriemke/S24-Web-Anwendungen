const Database = require('better-sqlite3');
const db = new Database('database.db');
let ort = 'Köln'

const getAllKunden = db.prepare("SELECT * FROM kunde WHERE ort=? LIMIT ?")
const data = getAllKunden.all(ort, 5)
//console.log(data)

console.log(data[1].vorname)