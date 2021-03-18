const fs = require('fs');
const write = require('./write');

module.exports = (path, fileName, defaultText = '') => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${path}/${fileName}`, 'utf8', (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    write(path, fileName, defaultText)
                        .then(() => resolve(defaultText))
                        .catch(err => reject(err));
                }
                else
                    reject(err);
            }
            else
                resolve(data);
        })
    })
}