const chalk = require('chalk')

module.exports = (...x) => {
    for(let i = 0; i < x.length; i++) {
        console.log(chalk.blue(typeof x[i] === 'object' ? JSON.stringify(x[i], null, 2) : x[i]))
    }
}
