const chalk = require('chalk')

module.exports = (...x) => {
    for (let i = 0; i < x.length; i++) {
        console.log(chalk.blue(JSON.stringify(x[i], null, 2)))
    }
}
