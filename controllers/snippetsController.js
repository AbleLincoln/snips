const Snippet = require('../db/Snippet');

// TODO: validation

/* Create */
exports.create = async (request, response) => {
  try {
    const createdSnippet = await Snippet.insert(request.body);
    response.status(201);
    response.json(createdSnippet);
  } catch (err) {
    response.status(400);
    response.send('Error');
  }
};

/* Read */
exports.getAll = async ({ params }, response) => {
  try {
    const snippets = await Snippet.select(params);
    response.json(snippets);
  } catch (error) {
    response.status(400).send('Error');
  }
};

exports.getOne = async ({ params: { id } }, response) => {
  try {
    const snippets = await Snippet.select({ id });
    if (snippets.length === 0) throw Error('Not found');
    response.json(snippets[0]);
  } catch (error) {
    response.status(400).send(error.message);
  }
};

/* Update */
exports.update = async ({ params: { id }, body }, response) => {
  try {
    await Snippet.update(id, body);
    response.status(204); // No content
    response.send();
  } catch (error) {
    response.status(400);
    response.send(error.message);
  }
};

/* Delete */
exports.delete = async ({ params: { id } }, response) => {
  try {
    await Snippet.delete(id);
    response.status(204);
    response.send();
  } catch (error) {
    response.status(404);
    response.send('Snippet not found, invalid ID');
  }
};
