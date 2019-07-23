const Snippet = require('./db/Snippet');

async function test() {
  const data = await Snippet.getAll();
  console.log(data);
}

console.log(process.cwd());

test();
