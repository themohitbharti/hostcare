#!/usr/bin/env node

const { checkServerHealth } = require('./src/healthCheck.js');
const { getSystemMetrics } = require('./src/metrics.js');
const { simulateLoad } = require('./src/loadTest.js');

const [,, command, ...args] = process.argv;

async function run() {
    try {
        switch (command) {
            case 'healthcheck':
                if (args.length < 1) {
                    console.log('Usage: hostcare check-server <url>');
                    return;
                }
                const url = args[0];
                const health = await checkServerHealth(url);
                break;

            case 'loadtest':
                if (args.length < 2) {
                    console.log('Usage: hostcare simulate-load <url> <requestCount>');
                    return;
                }
                const [loadUrl, requestCount] = args;
                const loadResult = await simulateLoad(loadUrl, Number(requestCount));
                break;

            case 'metrics':
                const metrics = getSystemMetrics();
                break;

            default:
                console.log('Usage: hostcare <command>\n');
                console.log('Commands:');
                console.log('  healthcheck <url>               Check the health of a server');
                console.log('  loadtest <url> <count>          Simulate load with multiple requests');
                console.log('  metrics                         Display system metrics');
                break;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

run();
