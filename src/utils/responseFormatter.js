exports.searchResultFormatter = (rawData) => {
  let data = {
    count: 0,
    results: []
  };
  for (const entry of rawData) {
    data.results.push({
      trademark: entry.trademark,
      TransactionIdentifier: entry.data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionIdentifier[0],
      TransactionCode: entry.data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionCode[0],
      ApplicationDate: entry.data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionData[0].TradeMarkDetails[0].TradeMark[0].ApplicationDate[0],
      ApplicationLanguageCode: entry.data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionData[0].TradeMarkDetails[0].TradeMark[0].ApplicationLanguageCode[0],
      SecondLanguageCode: entry.data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionData[0].TradeMarkDetails[0].TradeMark[0].SecondLanguageCode[0],
      KindMark: entry.data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionData[0].TradeMarkDetails[0].TradeMark[0].KindMark[0],
      TradeDistinctivenessIndicator: entry.data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionData[0].TradeMarkDetails[0].TradeMark[0].TradeDistinctivenessIndicator[0],
    });
  }
  data.count = data.results.length;
  return data;
}