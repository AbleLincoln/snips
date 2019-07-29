/* eslint-disable no-prototype-builtins */
const shortid = require('shortid');
const { getJsonFromDB, writeJsonToDB } = require('./utils');
const ErrorWithHttpStatus = require('../ErrorWithStatus');

// TODO: error handling

const SnippetModel = {
  id: String,
  author: String,
  code: String,
  description: String,
  language: String,
  comments: [String],
  favorites: Number,
};

/* Create */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHttpStatus(
        'Missing properties on Snippet.create',
        400
      );

    const snippets = await getJsonFromDB('snippets.json');
    const newSnippet = {
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    };
    snippets.push(newSnippet);

    await writeJsonToDB(snippets, 'snippets.json');
    return newSnippet;
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else console.log(err);
  }
};

/* Read */
exports.select = async (query = {}) => {
  const snippets = await getJsonFromDB('snippets.json');
  return snippets.filter(snippet =>
    Object.keys(query).every(key => query[key] === snippet[key])
  );
};

/* Update */

exports.update = async (id, newData) => {
  /* const validData = Object.keys(newData)
    .filter(key => SnippetModel.hasOwnProperty(key))
    .reduce((obj, key) => ({ ...obj, [key]: newData[key] }), {});

  const snippets = await getJsonFromDB('snippets.json');
  const index = snippets.findIndex(s => s.id === id);
  snippets[index] = {
    ...snippets[index],
    ...validData,
  };
  return writeJsonToDB(snippets, 'snippets.json'); */

  const snippets = await getJsonFromDB('snippets.json');
  const index = snippets.findIndex(snippet => snippet.id === id);
  Object.keys(newData).forEach(key => {
    if (snippets[index].hasOwnProperty(key))
      snippets[index][key] = newData[key];
  });
};

/* Delete */

exports.delete = async id => {
  const snippets = await getJsonFromDB('snippets.json');
  const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
  return writeJsonToDB(updatedSnippets, 'snippets.json');
};
