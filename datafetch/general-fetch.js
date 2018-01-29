let ps = require('promise-streams');
let req = require('request-promise')

function timestampToDate(t) {
  return new Date(t).toISOString().slice(0, 10)
}

/**
 *
 * @param {*} opts.endTimestamp - start backwards from here
 * @param {*} opts.days - number of days to fetch
 * @param {*} opts.url - url formatter, gets a date string and returns a fetch url
 * @param {*} opts.transform - data transformer, gets the fetched JSON, should return array
 *                             [{data:number, datetime:ISOString}]
 */
exports.fetchRange = async function fetchRange(opts) {

  let dayLen = 24*60*60*1000 // miliseconds

  let allDaysData = []

  for (var k = 0; k < opts.days; ++k) {
    let fetchDate = timestampToDate(opts.endTimestamp - dayLen * k);

    let dayUrl = opts.url(fetchDate);
    let rawData = await req.get(dayUrl);
    let dayData = JSON.parse(rawData.toString('utf8'))

    allDaysData = opts.transform(dayData).concat(allDaysData)
  }


  return allDaysData;
}
