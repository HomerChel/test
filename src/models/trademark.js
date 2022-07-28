let mongoose = require('mongoose')

let trademarkSchema = new mongoose.Schema({
  trademark: String,
  data: mongoose.Schema.Types.Mixed,
})
trademarkSchema.index({trademark: 'text'});

module.exports = mongoose.model('Trademark', trademarkSchema)