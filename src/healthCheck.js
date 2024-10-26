const http = require('http');
const { table } = require('table');

async function checkServerHealth(url) {
    const chalk = await import('chalk');

    return new Promise((resolve, reject) => {
        const start = Date.now();
        let isResolved = false;

        const req = http.get(url, (res) => {
            const duration = Date.now() - start;
            const isHealthy = res.statusCode === 200;

            const healthCheckReport = {
                Status: isHealthy ? chalk.default.green('Healthy') : chalk.default.red('Unhealthy'),
                'HTTP Status Code': res.statusCode,
                'Response Time': `${duration} ms`,
                Timestamp: new Date().toISOString(),
            };

            const outputTable = table([Object.keys(healthCheckReport), Object.values(healthCheckReport)]);
            console.log(outputTable);

            if (!isResolved) {
                isResolved = true;
                resolve({ isHealthy, duration, statusCode: res.statusCode });
            }
        });

        req.on('error', (err) => {
            req.destroy();
            if (!isResolved) {
                isResolved = true; 
                reject(new Error(`Network Error: ${err.message}`));
            }
        });

        req.on('timeout', () => {
            req.destroy();
            if (!isResolved) {
                isResolved = true; 
                reject(new Error('Server is not responding: Request timed out'));
            }
        });

        req.on('close', () => {
            const duration = Date.now() - start;
            if (!isResolved) {
                isResolved = true; 
                const healthCheckReport = {
                    Status: chalk.default.red('Unhealthy'),
                    'HTTP Status Code': 0,
                    'Response Time': `${duration} ms`,
                    Timestamp: new Date().toISOString(),
                };

                const outputTable = table([Object.keys(healthCheckReport), Object.values(healthCheckReport)]);
                console.log(outputTable);

                resolve({ isHealthy: false, duration, statusCode: 0 });
            }
        });
    });
}

module.exports = {
    checkServerHealth
};
