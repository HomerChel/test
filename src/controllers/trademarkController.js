const Trademark = require('../models/trademarkModel');
const { searchResultFormatter } = require('../utils/responseFormatter');

let trademarkSearch = async (searchPhrase, fuzzy = false) => {
  let searchQuery = fuzzy ? {$text: {$search: searchPhrase}} : {trademark: searchPhrase};
  return await Trademark.find(searchQuery);
}

exports.trademarkSearch = async (req, res, fuzzy = false) => {
  let result = await trademarkSearch(req.query.search, fuzzy);
  if (result.length > 0) {
    let responseBody = searchResultFormatter(result);
    res.send(responseBody);
    return;
  }

  res.send({message: 'Trademark not found'});
};