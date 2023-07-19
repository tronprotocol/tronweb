import chalk from 'chalk';

function sleep(millis: number) {
    return new Promise((resolve) => setTimeout(resolve, millis));
}

function log(x: string) {
    if (process.stdout !== undefined) {
        process.stdout.write(chalk.yellow(x));
    } else {
        console.log(chalk.yellow(x)); // used for karma
    }
}

export default async function (secs: number) {
    secs = secs || 1;
    log(`Sleeping for ${secs} second${secs === 1 ? '' : 's'}...`);
    await sleep(1000 * (secs || 1));
    log(' Slept.\n');
}
