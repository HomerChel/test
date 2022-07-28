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
      const trademark = await Trademark.find({trademark: 'NOMAD'});
      let responseBody = trademark.length > 0 ? trademark : {error: 'Trademark not found'};
      res.send(responseBody);
    });

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
	})