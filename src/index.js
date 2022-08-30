require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const { trademarkSearch } = require('./controllers/trademarkController');
const { validateSearch } = require('./middlewares/validators');

mongoose
  .connect(`mongodb://${process.env.DB_SERVER}/${process.env.DB}`, { useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.get('/', (req, res) => {
      res.send('Solution for test task');
    });

    app.get('/trademark', validateSearch(), (req, res) => {
      trademarkSearch(req, res);
    });

    app.get('/trademark/fuzzy', validateSearch(), (req, res) => {
      trademarkSearch(req, res, true);
    });

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  })