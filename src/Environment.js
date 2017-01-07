const fs = require('fs');

const key = fs.readFileSync(__dirname + '/../config/api.key');
const Environment = {key: key.toString().trim()};
module.exports = Environment;
