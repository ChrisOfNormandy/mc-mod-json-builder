const add = require('./helpers/files/add');
const { mod_id } = require('./vars/mod');
const dirs = require('./vars/dirs');

module.exports = (map) => {
    let arr1, arr2, block;
    map.forEach((v, k, m) => {
        let json = { "replace": false, "values": [] }

        for (let a in v) {
            arr1 = v[a];
            for (let i in arr1) {
                arr2 = arr1[i];
                for (let i in arr2) {
                    block = arr2[i];
                    if (!json.values.includes(`${mod_id}:${block}`))
                        json.values.push(`${mod_id}:${block}`);
                }
            }
        }

        add(`${dirs.tags}/blocks`, `${k}.json`, JSON.stringify(json));
        add(`${dirs.tags}/items`, `${k}.json`, JSON.stringify(json));
    });
}