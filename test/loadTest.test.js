
const { simulateLoad } = require('../src/loadTest');
const http = require('http');

jest.mock('http');

describe('simulateLoad', () => {
    it('should send the specified number of requests and return their status codes', async () => {
        const mockResponses = [
            { statusCode: 200 },
            { statusCode: 200 },
            { statusCode: 500 }
        ];
        
        http.get.mockImplementation((url, callback) => {
            const res = mockResponses.shift();
            callback(res);
            return { on: () => {} };
        });

        const url = 'http://example.com';
        const requestCount = 3;

        const results = await simulateLoad(url, requestCount);

        expect(results).toEqual([
            { statusCode: 200 },
            { statusCode: 200 },
            { statusCode: 500 }
        ]);
    });
});
