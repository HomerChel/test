const Trademark = require('../models/trademarkModel');
const { searchResultFormatter } = require('../utils/responseFormatter');

let trademarkSearch = async (searchPhrase, fuzzy = false, caseSensitive = false) => {
  let searchQuery = '';
  if (fuzzy) {
    searchQuery = {$text: {$search: searchPhrase}};
  } else {
    searchQuery = caseSensitive ? {trademark: searchPhrase} : {lowercaseTrademark: searchPhrase.toLowerCase()};
  }
  return await Trademark.find(searchQuery);
}

exports.trademarkSearch = async (req, res, fuzzy = false) => {
  let result = await trademarkSearch(req.query.search, fuzzy, !fuzzy && req.query.case_sensitive === 'true');
  if (result.length > 0) {
    let responseBody = searchResultFormatter(result);
    res.send(responseBody);
    return;
  }

  res.send({message: 'Trademark not found'});
};