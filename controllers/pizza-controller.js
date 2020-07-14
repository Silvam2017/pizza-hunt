const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
      Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // get one pizza by id, destructure req into params
    getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
        .then(dbPizzaData => {
          // If no pizza is found, send 404
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id.' });
            return;
          }
          res.json(dbPizzaData)
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    //create pizza, destructures body out of req object
    createPizza({ body }, res) {
        Pizza.create(body)
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.status(400).json(err));
      },
    //update pizza by ID, { new: true } returns the new updated document
    updatePizza({ params, body }, res) {
        // .updateOne() and .updateMany() would update document without returning new document
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id.' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
      },
      // delete pizza by ID
      deletePizza({ params }, res) {
        // .deleteOne() and .deleteMany() would delete document too
        Pizza.findOneAndDelete({ _id: params.id })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id.' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
      }
  }

module.exports = pizzaController;