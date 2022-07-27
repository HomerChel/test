let mongoose = require('mongoose')

let trademarkSchema = new mongoose.Schema({
  trademark: String,
  data: mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model('Trademark', trademarkSchema)