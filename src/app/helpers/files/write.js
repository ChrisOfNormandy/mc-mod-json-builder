const fs = require('fs');

function write(path, fileName, str) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${path}/${fileName}`, str, (err, result) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    if (!fs.existsSync(path))
                        fs.mkdirSync(path, { recursive: true });

                    write(path, fileName, str)
                        .then(result => resolve(null))
                        .catch(err => {
                            console.log(err);
                            resolve(err)
                        });
                }
                else {
                    console.log(err);
                    resolve(err);
                }
            }
            else
                resolve(null);
        });
    });
}

module.exports = write;