require('dotenv/config');
const express = require('express');
const mongoose = require("mongoose");
const Trademark = require('../src/models/trademark');

mongoose
	.connect(`mongodb://${process.env.DB_SERVER}/${process.env.DB}`, { useNewUrlParser: true })
	.then(() => {
    const app = express();

    app.get('/', (req, res) => {
      res.send('Solution for Vacuumlabs test task');
    });

    app.get('/trademark', async (req, res) => {
      if (!req.query || !req.query.search) {
        res.status(400);
        res.send({error: 'Empty query, please use parameter "search"'});
        return;
      };

      const trademark = await Trademark.find({trademark: req.query.search});
      if (trademark.length > 0) {
        let responseBody = trademark;
        res.send(responseBody);
        return;
      }

      res.status(400);
      res.send({error: 'Trademark not found'});
    });

    app.get('/trademark/fuzzy', async (req, res) => {
      if (!req.query || !req.query.search) {
        res.status(400);
        res.send({error: 'Empty query, please use parameter "search"'});
        return;
      };

      const trademark = await Trademark.find({$text: {$search: req.query.search}});
      if (trademark.length > 0) {
        let responseBody = trademark;
        res.send(responseBody);
        return;
      }

      res.status(400);
      res.send({error: 'Trademark not found'});
    });

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
	})