
const http = require('http');

checkServerHealth = (url) => {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        http.get(url, (res) => {
            const duration = Date.now() - start;
            const isHealthy = res.statusCode === 200;
            resolve({ isHealthy, duration, statusCode: res.statusCode });
        }).on('error', (err) => {
            reject(err);
        });
    });
    }


    module.exports = {
        checkServerHealth
    }