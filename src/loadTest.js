const http = require('http');
const https = require('https');
const { table } = require('table');

async function simulateLoad(url, requestCount) {
    const chalk = await import('chalk');

    const promises = [];
    for (let i = 0; i < requestCount; i++) {
        promises.push(
            new Promise((resolve, reject) => {
                const request = url.startsWith('https://') ? https.get : http.get;

                const req = request(url, (res) => {
                    res.on('data', () => {});
                    res.on('end', () => resolve({ statusCode: res.statusCode }));
                });

                req.on('error', (err) => reject(new Error(`Request error: ${err.message}`)));
                req.setTimeout(15000, () => {
                    req.destroy();
                    reject(new Error('Request timed out'));
                });
            })
        );
    }

    return Promise.allSettled(promises).then((results) => {
        const summary = results.reduce(
            (acc, result) => {
                if (result.status === 'fulfilled' && result.value.statusCode === 200) {
                    acc.successful += 1;
                } else {
                    acc.failed += 1;
                    acc.errors.push(result.reason?.message || `Status: ${result.value?.statusCode}`);
                }
                return acc;
            },
            { successful: 0, failed: 0, errors: [] }
        );

        const summaryTable = [
            ['Total Requests', requestCount],
            ['Successful Requests', summary.successful],
            ['Failed Requests', summary.failed],
        ];

        if (summary.errors.length) {
            summaryTable.push(['Errors', summary.errors.join(', ')]);
        }

        console.log(chalk.default.blue('Load Test Summary:'));
        console.log(table(summaryTable.map(row => row.map(cell => chalk.default.white(cell)))));
    });
}

module.exports = { simulateLoad };
