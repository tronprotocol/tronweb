const sleep = require('sleep')

let counter

class Wait {

  constructor(_counter) {
    counter = _counter
  }

  async wait(secs) {
    secs = secs || 1
    console.log(`Sleeping for ${secs} second${secs === 1 ? '' : 's'}`)
    sleep.sleep(secs || 1)
    await counter.incCounter()
  }
}

module.exports = Wait
