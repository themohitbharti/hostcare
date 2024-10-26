const os = require('os');
const { table } = require('table');

async function formatBytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function formatUptime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

async function getSystemMetrics() {
    const chalk = await import('chalk');

    const metrics = {
        uptime: await formatUptime(process.uptime()),
        loadAvg: os.loadavg().map(avg => avg.toFixed(2)),
        memoryUsage: {
            rss: await formatBytes(process.memoryUsage().rss),
            heapTotal: await formatBytes(process.memoryUsage().heapTotal),
            heapUsed: await formatBytes(process.memoryUsage().heapUsed),
            external: await formatBytes(process.memoryUsage().external),
            arrayBuffers: await formatBytes(process.memoryUsage().arrayBuffers),
        },
        freeMemory: await formatBytes(os.freemem()),
        totalMemory: await formatBytes(os.totalmem())
    };

    const metricsTable = [
        ['Metric', 'Value'],
        ['Uptime', chalk.default.green(metrics.uptime)],
        ['Load Average (1 min)', chalk.default.cyan(metrics.loadAvg[0])],
        ['Load Average (5 min)', chalk.default.cyan(metrics.loadAvg[1])],
        ['Load Average (15 min)', chalk.default.cyan(metrics.loadAvg[2])],
        ['RSS Memory Usage', chalk.default.magenta(metrics.memoryUsage.rss)],
        ['Heap Total Memory', chalk.default.magenta(metrics.memoryUsage.heapTotal)],
        ['Heap Used Memory', chalk.default.magenta(metrics.memoryUsage.heapUsed)],
        ['External Memory Usage', chalk.default.magenta(metrics.memoryUsage.external)],
        ['Array Buffers Memory Usage', chalk.default.magenta(metrics.memoryUsage.arrayBuffers)],
        ['Free Memory', chalk.default.yellow(metrics.freeMemory)],
        ['Total Memory', chalk.default.yellow(metrics.totalMemory)]
    ];

    console.log(chalk.default.blue('System Metrics:'));
    console.log(table(metricsTable.map(row => row.map(cell => chalk.default.white(cell)))));
}

module.exports = {
    getSystemMetrics
};
