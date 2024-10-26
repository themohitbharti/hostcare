const http = require('http');

function simulateLoad(url, requestCount) {
    const promises = [];
    for (let i = 0; i < requestCount; i++) {
        promises.push(
            new Promise((resolve, reject) => {
                const req = http.get(url, (res) => {
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

        console.log('Load Test Summary:');
        console.log(`Total Requests: ${requestCount}`);
        console.log(`Successful Requests: ${summary.successful}`);
        console.log(`Failed Requests: ${summary.failed}`);
        if (summary.errors.length) {
            console.log('Errors:', summary.errors);
        }
    });
}

module.exports = { simulateLoad };
