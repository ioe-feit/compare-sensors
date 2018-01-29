let fetchRange = require('./general-fetch').fetchRange

let main = async () => {


  // See api docs: https://uk.mathworks.com/help/thingspeak/get-a-channel-feed.html
  // We are getting a 60 minute median over one day

  let urlBase = "https://api.thingspeak.com/channels/357146/feeds?median=60"

  let results = await fetchRange({
    endTimestamp: Date.now(),
    days: 30,
    url: date => `${urlBase}&start=${date}%2000:00:00&end=${date}%2023:59:59`,
    transform: sf => sf.feeds.map(f => ({
      datetime: f.created_at,
      data: parseFloat(f.field2)
     }))
  })

  console.log(JSON.stringify(results, null, 2))
}

main();
