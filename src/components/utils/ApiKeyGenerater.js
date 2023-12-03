const crypto = require('crypto');

function generateApiKey() {
  return crypto.randomBytes(20).toString('hex');
}

const apiKey = generateApiKey();
console.log('Generated API Key:', apiKey);