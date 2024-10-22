
const { checkServerHealth } = require('../src/healthCheck.js');
const http = require('http');

jest.mock('http');

describe('checkServerHealth', () => {
    it('should return healthy status for a valid server', async () => {
 
        const mockResponse = { statusCode: 200 };
        http.get.mockImplementation((url, callback) => {
            callback(mockResponse);
            return { on: () => {} };
        });

        const result = await checkServerHealth('http://example.com');


        expect(result).toEqual({
            isHealthy: true,
            duration: expect.any(Number),
            statusCode: 200,
        });
    });

    it('should return unhealthy status for an invalid server', async () => {

        const mockResponse = { statusCode: 500 };
        http.get.mockImplementation((url, callback) => {
            callback(mockResponse);
            return { on: () => {} };
        });


        const result = await checkServerHealth('http://example.com');


        expect(result).toEqual({
            isHealthy: false,
            duration: expect.any(Number),
            statusCode: 500,
        });
    });

    it('should handle errors and reject the promise', async () => {

        const errorMessage = 'Network Error';
        http.get.mockImplementation((url, callback) => {
            const req = {
                on: (event, cb) => {
                    if (event === 'error') cb(new Error(errorMessage));
                },
            };
            return req;
        });


        await expect(checkServerHealth('http://example.com')).rejects.toThrow(errorMessage);
    });
});
