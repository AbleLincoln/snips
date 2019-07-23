const router = require('express').Router(); // create Router
const seed = require('./controllers/seedController');
const snippetsController = require('./controllers/snippetsController');

router.post('/api/seed', seed);

router.get('/api/snippets', snippetsController.getAll);
router.get('/api/snippets/:id', snippetsController.getOne);
router.post('/api/snippets', snippetsController.create);
router.patch('/api/snippets/:id', snippetsController.update);
router.delete('/api/snippets/:id', snippetsController.delete);

module.exports = router;
