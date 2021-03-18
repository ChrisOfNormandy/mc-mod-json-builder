const { getDisplayName, getRegistryName, getShortName } = require('../helpers/names');
const { mod_id } = require('../vars/mod');
const regex = require('../vars/regex');
const dyes = require('../vars/dyes.json');
const model = require('../model').item;

module.exports = (name) => {
    const json = {};

    if (regex.dye.test(name)) {
        for (let i in dyes) {
            const displayName = getDisplayName(name.replace(regex.dye, dyes[i]));
            const registryName = getRegistryName(displayName);

            model(registryName, 'item');

            json[`item.${mod_id}.${getShortName(displayName)}`] = displayName;
        }
    }
    else {
        const registryName = getRegistryName(name);

        model(registryName, 'item');

        json[`item.${mod_id}.${getShortName(registryName)}`] = getDisplayName(name);
    }

    return json;
}