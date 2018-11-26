const sleep = require('sleep')
const chalk = require('chalk')

function log(x) {
    process.stdout.write(chalk.yellow(x))
}

module.exports = function (secs) {
    secs = secs || 1
    log(`Sleeping for ${secs} second${secs === 1 ? '' : 's'}...`)
    sleep.sleep(secs || 1)
    log(' Slept.\n')
}
