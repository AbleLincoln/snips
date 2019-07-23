const Snippet = require('../Snippet');
const utils = require('../utils');

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
        code: '// Welcome to JS!',
        title: 'single-line.js',
        description: 'single line comment in JS',
        language: 'JavaScript',
      },
      {
        id: '2',
        code: 'code code code',
        title: 'var-challenge.js',
        description: 'scoping challenge problem',
        language: 'JavaScript',
      },
      {
        id: '3',
        code: 'code code code',
        title: 'switch.js',
        description: 'Switch statement',
        language: 'JavaScript',
      },
      {
        id: '4',
        code: 'code code code',
        title: 'inheritance.js',
        description: 'OOP inheritance',
        language: 'JavaScript',
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
        code: '// Welcome to JS!',
        title: 'single-line.js',
        description: 'single line comment in JS',
        language: 'JavaScript',
      });
    });

    it('gets some with a single query', async () => {
      const snippets = await Snippet.select({ language: 'JavaScript' });
      expect(snippets.length).toBe(4);
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
        description: 'single line comment in JS',
        language: 'JavaScript',
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
