const http = require('http');

function simulateLoad(url , requestCount){
    const promises = [];
    for(let i = 0; i < requestCount; i++){
        promises.push( new Promise((resolve, reject) => {
            http.get(url , (res) => {
                resolve({statusCode: res.statusCode});
            }).on('error', reject);
        }))
    }

    return Promise.all(promises);
}


module.exports = { simulateLoad };