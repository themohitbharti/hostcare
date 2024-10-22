
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
            reject(err);
        });
    });
    }


    module.exports = {
        checkServerHealth
    };