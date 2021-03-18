const fs = require('fs');
const { mod_name } = require('../../src/app/vars/mod');

const content = {
    "pack": {
        "description": `${mod_name} resources.`,
        "pack_format": 6,
        "_comment": "Wow! A comment! >:T"
    }
};

module.exports = (path) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${path}/pack.mcmeta`, JSON.stringify(content), (err) => {
            if (err)
                reject(err);
            else
                resolve(true);
        });
    });
}