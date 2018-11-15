const sleep = require('sleep')
const chalk = require('chalk')

module.exports = function (secs) {
    secs = secs || 1
    console.log(chalk.cyan(`      Sleeping for ${secs} second${secs === 1 ? '' : 's'}`))
    sleep.sleep(secs || 1)
}
