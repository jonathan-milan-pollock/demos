const https = require('https');
const parseString = require('xml2js').parseString;
const apiKey = process.env["GOODREADS_API_KEY"]

const getRatingFromGoodreads = (bookTitle) => {
  return new Promise((resolve, reject) => {
    const url = `https://www.goodreads.com/book/title.xml?key=${apiKey}&title=${encodeURIComponent(bookTitle)}`;
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status code: ${res.statusCode}`));
      } else {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          parseString(body, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.GoodreadsResponse.book[0].average_rating[0]);
            }
          });
        });
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}
