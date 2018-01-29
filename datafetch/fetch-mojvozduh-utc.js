let fetchRange = require('./general-fetch').fetchRange

let main = async () => {

  let results = await fetchRange({
    endTimestamp: Date.now(),
    days: 30,
    url: date => `https://mojvozduh.eu/returnNewDataWeb.php?date=${date}&location=Karpos&type=pm10`,
    transform: dayData => dayData.map(item => ({
      data: parseFloat(item.data),
      datetime: new Date(item.datetime + ' +0100').toISOString()
    }))
  })

  console.log(JSON.stringify(results, null, 2))
}

main();


