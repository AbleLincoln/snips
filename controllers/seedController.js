const fs = require('fs');
const snippets = require('../data/snippets');

module.exports = (request, response) => {
  fs.writeFileSync('db/snippets.json', JSON.stringify(snippets));
  response.json({
    message: 'Seeded',
  });
};
