let mongoose = require('mongoose')

let trademarkSchema = new mongoose.Schema({
  trademark: {type: String, index: true},
  lowercaseTrademark: {type: String, index: true},
  data: mongoose.Schema.Types.Mixed,
})
trademarkSchema.index({trademark: 'text'});

module.exports = mongoose.model('Trademark', trademarkSchema)