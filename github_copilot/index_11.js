const https = require('https');
const parseString = require('xml2js').parseString;
const apiKey = process.env["GOODREADS_API_KEY"]

const getRatingFromGoodreads = 