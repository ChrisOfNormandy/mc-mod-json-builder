const add = require('./helpers/files/add');
const { mod_id } = require('./vars/mod');
const dirs = require('./vars/dirs');

module.exports = (map) => {
    map.forEach((v, k, m) => {
        let json = { "replace": false, "values": [] }

        for (let i in v)
            if (!json.values.includes(`${mod_id}:${v[i]}`))
                json.values.push(`${mod_id}:${v[i]}`);

        add(`${dirs.tags}/blocks`, `${k}.json`, JSON.stringify(json));
        add(`${dirs.tags}/items`, `${k}.json`, JSON.stringify(json));
    });
}