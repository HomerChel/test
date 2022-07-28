const Trademark = require('../models/trademarkModel');

let trademarkSearch = async (searchPhrase, fuzzy = false) => {
  let searchQuery = fuzzy ? {$text: {$search: searchPhrase}} : {trademark: searchPhrase};
  return await Trademark.find(searchQuery);
}

exports.trademarkSearch = async function(req, res, fuzzy = false) {
  let result = await trademarkSearch(req.query.search, fuzzy);
  if (result.length > 0) {
    let responseBody = result;
    res.send(responseBody);
    return;
  }

  res.status(400);
  res.send({error: 'Trademark not found'});
};