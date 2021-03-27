const queue = require('./queue');
const write = require('./write');

module.exports = () => {
    let arr = [];
    queue.forEach(dataArr => dataArr.forEach(data => arr.push(write(data.path, data.fileName, data.str))));

    return new Promise((resolve, reject) => {
        Promise.all(arr)
            .then(results => {
                const passed = results.filter(m => m === null).length;
                const failed = results.length - passed;

                resolve({
                    passed,
                    failed
                });
            })
            .catch(err => reject(err));
    });
}