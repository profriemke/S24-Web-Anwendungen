const fs = require('fs');

const data = fs.readFileSync('text.txt', 'utf8');

console.log(data);