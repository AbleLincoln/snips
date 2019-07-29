const Snippet = require('../Snippet');
const utils = require('../utils');
const ErrorWithHttpStatus = require('../../ErrorWithStatus');

/* This is how we can test the fs 
const fs = require('fs').promises;
const path = require('path');
beforeEach(async () => {
  await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
  await fs.writeFile(
    path.join(__dirname, 'data', 'snippets.json'),
    JSON.stringify(mockData['snippets.json'])
    );
  });
  */

let mockData;

beforeEach(() => {
  // reset mock data
  mockData = {
    'snippets.json': [
      {
        id: '1',
        author: 'Andrew',
        code: '// Welcome to JS!',
        title: 'single-line.js',
        description: 'This is how you do a single line comment in JS',
        language: 'javascript',
        comments: [],
        favorites: 0,
      },
      {
        id: '2',
        author: 'Andrew',
        code:
          'for (var i = 0; i < 5; i++) {\n  setTimeout(function() {\n    console.log(i);\n  }, 1000);\n}',
        title: 'var-challenge.js',
        description: 'scoping challenge problem',
        language: 'javascript',
        comments: [],
        favorites: 0,
      },
      {
        id: '3',
        author: 'Scott',
        code:
          'switch (numOfStudents) {\n  case 1:\n    // do something;\n    break;\n  case 2:\n  case 3:\n    // do something;\n    break;\n  default:\n  // do some default behavior.\n}',
        title: 'switch.js',
        description: 'Switch statement',
        language: 'javascript',
        comments: [],
        favorites: 0,
      },
      {
        id: '4',
        author: 'Andrew',
        code: '<link rel="stylesheet" type="text/css" href="theme.css">',
        title: 'link.html',
        description: 'How to link a stylesheet',
        language: 'HTML',
        comments: [],
        favorites: 0,
      },
    ],
  };
});

jest.mock('../utils');
utils.getJsonFromDB.mockImplementation(file => mockData[file]);
utils.writeJsonToDB.mockImplementation((data, file) => {
  mockData[file] = data;
});

describe('Snippet', () => {
  describe('create', () => {
    it('creates a new snippet', async () => {
      const newSnippet = await Snippet.insert({
        author: 'Mr. Test',
        code: '// new code',
        title: 'newsnippet.js',
        description: 'a new snippet',
        language: 'JavaScript',
      });

      expect(newSnippet).toMatchObject({
        id: expect.any(String),
        author: 'Mr. Test',
        code: '// new code',
        title: 'newsnippet.js',
        description: 'a new snippet',
        language: 'JavaScript',
        comments: [],
        favorites: 0,
      });
    });

    it('creates a new snippet that we can access with id', async () => {
      // create a new snippet
      const newSnippet = await Snippet.insert({
        author: 'Mr. Test',
        code: '// new code',
        title: 'newsnippet.js',
        description: 'a new snippet',
        language: 'JavaScript',
      });
      // then access it with its id
      const snippets = await Snippet.select({ id: newSnippet.id });
      expect(snippets[0]).toMatchObject({
        author: 'Mr. Test',
        code: '// new code',
        title: 'newsnippet.js',
        description: 'a new snippet',
        language: 'JavaScript',
      });
    });

    it('throws ErrorWithHttpStatus 400 on invalid sytnax', async () => {
      expect.assertions(2);
      // create a new snippet
      try {
        await Snippet.insert({
          author: 'Mr. Test',
          code: '// new code',
          title: 'newsnippet.js',
          description: 'a new snippet',
        });
      } catch (err) {
        expect(err).toBeInstanceOf(ErrorWithHttpStatus);
        expect(err.status).toBe(400);
      }
    });
  });

  describe('read', () => {
    it('gets all with no query', async () => {
      const snippets = await Snippet.select();
      expect(snippets.length).toBe(4);
    });

    it('gets one by id', async () => {
      const snippet = await Snippet.select({ id: '1' });
      expect(snippet.length).toBe(1);
      expect(snippet[0]).toMatchObject({
        id: '1',
        author: 'Andrew',
        code: '// Welcome to JS!',
        title: 'single-line.js',
        description: 'This is how you do a single line comment in JS',
        language: 'javascript',
        comments: [],
        favorites: 0,
      });
    });

    it('gets some with a single query', async () => {
      const snippets = await Snippet.select({ language: 'javascript' });
      expect(snippets.length).toBe(3);
    });

    it('gets some with a double query', async () => {
      await Snippet.insert({
        author: 'Mr. Test',
        code: '// new code',
        title: 'newsnippet.js',
        description: 'a new snippet',
        language: 'JavaScript',
      });

      const snippets = await Snippet.select({
        language: 'JavaScript',
        author: 'Mr. Test',
      });
      expect(snippets.length).toBe(1);
    });

    it('gets none with a broken query', async () => {
      const snippets = await Snippet.select({
        language: 'Spanish',
      });
      expect(snippets.length).toBe(0);
    });
  });

  describe('update', () => {
    it('updates a snippet', async () => {
      await Snippet.update('1', {
        author: 'Me',
      });
      const snippets = await Snippet.select();
      expect(snippets.length).toBe(4);
      const snippet = (await Snippet.select({ id: '1' }))[0];
      expect(snippet).toMatchObject({
        id: '1',
        author: 'Me',
        code: '// Welcome to JS!',
        title: 'single-line.js',
        description: 'This is how you do a single line comment in JS',
        language: 'javascript',
        comments: [],
        favorites: 0,
      });
    });
  });

  describe('delete', () => {
    it('deletes a snippet', async () => {
      await Snippet.delete('1');

      const snippets = await Snippet.select();
      expect(snippets.length).toBe(3);

      const deletedSnippet = (await Snippet.select({ id: '1' }))[0];
      expect(deletedSnippet).toBeUndefined();
    });
  });
});
