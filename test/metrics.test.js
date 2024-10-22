
const { getSystemMetrics } = require('../src/metrics.js');

describe('getSystemMetrics', () => {
    it('should return the current system metrics', () => {
        const metrics = getSystemMetrics();

        expect(metrics).toHaveProperty('uptime');
        expect(metrics).toHaveProperty('loadAvg');
        expect(metrics).toHaveProperty('memoryUsage');
        expect(metrics).toHaveProperty('freeMemory');
        expect(metrics).toHaveProperty('totalMemory');


        expect(typeof metrics.uptime).toBe('number');
        expect(Array.isArray(metrics.loadAvg)).toBe(true);
        expect(typeof metrics.memoryUsage).toBe('object');
        expect(typeof metrics.freeMemory).toBe('number');
        expect(typeof metrics.totalMemory).toBe('number');
    });
});
