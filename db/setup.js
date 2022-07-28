const AdmZip = require('adm-zip');
const xml2js = require('xml2js');
const mongoose = require('mongoose');
const TrademarkModel = require('../src/models/trademark');

const database = 'trademarks';
const server = '127.0.0.1:27017';
const scriptArgs = process.argv.slice(2);

run().catch(error => console.log(error));

async function run() {
  await mongoose.connect(`mongodb://${server}/${database}`)
    .then(() => {
      console.log('Database connection successful')
    })
    .catch(err => {
      console.error(`Database connection error: ${err}`)
    })
  
  addToDB = (data) => {
    let trademark = data.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionData[0].TradeMarkDetails[0].TradeMark[0].WordMarkSpecification[0].MarkVerbalElementText[0];
    // console.log(trademark);

    let tm = new TrademarkModel({
      trademark: trademark,
      data: data,
    });

    return tm.save();
  }

  readZipArchive = async (filepath) => {
    try {
      const zip = new AdmZip(filepath);

      for (const zipEntry of zip.getEntries()) {
        if (!zipEntry.isDirectory) {
          let xmlData = zipEntry.getData().toString();
          await xml2js.parseStringPromise(xmlData).then(async function (result) {
            if (result.Transaction.TradeMarkTransactionBody[0].TransactionContentDetails[0].TransactionData[0].TradeMarkDetails[0].TradeMark[0].MarkFeature[0] === 'Word') {
              await addToDB(result).catch(err => console.log(`Error inserting in mongodb: ${err}`));
            }
          });
        }
      }
    } catch (e) {
      console.log(`Error reading zip file: ${e}`);
    }

  }

  for (const arg of scriptArgs) {
    if (arg.match(/^([\.]{0,2})(\/[\w]+)+(\.zip)$/i)) {
      console.log(arg);
      await readZipArchive(arg);
    }
  };
  console.log('All done!');
  process.exit();
}