const os = require('os');

function getSystemMetrics() {
    return {
        uptime: process.uptime(),
        loadAvg: os.loadavg(),
        memoryUsage: process.memoryUsage(),
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
    };
}

module.exports ={
    getSystemMetrics
}