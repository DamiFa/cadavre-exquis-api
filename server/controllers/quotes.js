const Quote = require("../models").Quotes;
const Word = require("../models").Words;
const Author = require("../models").Authors;
const Sequelize = require("../models").Sequelize;
const labels = ["sujet", "adj1", "verbe", "adverbe", "complement", "adj2"];

module.exports = {
  async create(req, res) {
    let quote = await Quote.create();
    return res.status(200).send(quote);
  },

  async list(req, res) {
    let quote = await Quote.findAll({
      include:[
        {
          model: Word,
          as: 'words'
        },
        {
          model: Author,
          as: 'authors'
        }
      ]
    });
    return res.status(200).send(quote);
  },

  getOne: function (req, res) {
    return Quote
        .findById(req.params.id, {
          include: [
            {
              model: Word,
              as: 'words'
            },
            {
              model: Author,
              as: 'authors'
            }
          ]
        })
        .then(quote => {
          let orderedWords = quote.words.sort((a, b) => labels.indexOf(a.label) - labels.indexOf(b.label));
          let finalQuote = orderedWords.map(word => word.word).join(' ');
          return res.status(200).send({quote, sentence: finalQuote});
        })
        .catch(err => res.status(400).send(err));
  },

  addWords(req, res) {
    return Word
        .create({
          label: req.body.label,
          word: req.body.word,
          quoteId: req.params.id
        })
        .then(word => {
          return Author
              .create({
                name: req.body.name,
                quoteId: req.params.id
              })
              .then(author => res.status(200).send({ word, author }))
              .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
  },

  retrieveIncomplete(req, res) {
    return Quote
        .find({
          where: {completed: false},
          order: [Sequelize.fn('RANDOM')],
          limit: 1,
          include:[{ model: Word, as: 'words' }]
        })
        .then(quote => res.status(200).send(quote))
        .catch(err => res.status(400).send(err));
  },

  retrieveRandom(req, res) {
    return res.send({message: "random"});
  }
};