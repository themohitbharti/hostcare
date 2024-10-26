
const http = require('http');

function checkServerHealth(url){
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const req = http.get(url, (res) => {
            const duration = Date.now() - start;
            const isHealthy = res.statusCode === 200;
            resolve({ isHealthy, duration, statusCode: res.statusCode });
        });

        req.on('error', (err) => {
            req.destroy();
            if (err.code === 'ENOTFOUND') {
                reject(new Error('Invalid URL: Unable to resolve hostname'));
            } else {
                reject(new Error(`Network Error: ${err.message}`));
            }
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Server is not responding: Request timed out'));
        });

        req.on('close', () => {
            resolve({ isHealthy: false, duration: Date.now() - start, statusCode: 0 });
        });
    });
    }


    module.exports = {
        checkServerHealth
    };