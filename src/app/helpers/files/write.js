const fs = require('fs');

function write(path, fileName, str) {
    return new Promise((resolve, reject) => {
        let data;

        try {
            data = (/\w+.json/.test(fileName))
                ? JSON.stringify(JSON.parse(str))
                : str;
        }
        catch (err) {
            reject(err);
        }

        fs.writeFile(`${path}/${fileName}`, data, (err) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    if (!fs.existsSync(path))
                        fs.mkdirSync(path, { recursive: true });

                    write(path, fileName, data)
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }
                else
                    reject(err);
            }
            else
                resolve(null);
        });
    });
}

module.exports = write;