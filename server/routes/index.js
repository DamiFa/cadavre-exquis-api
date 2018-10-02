const quotesController = require("../controllers").quotes;

module.exports = (app) => {
  app.get('/api/quote', quotesController.list);
  app.post('/api/quote', quotesController.create);

  app.get('/api/quote/incomplete', quotesController.retrieveIncomplete);
  app.get('/api/quote/random', quotesController.retrieveRandom);

  app.get('/api/quote/:id', quotesController.getOne);
  app.put('/api/quote/:id', quotesController.addWords);

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Quote API!',
  }));
};