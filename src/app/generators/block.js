const { getDisplayName, getDyedName, getRegistryName, getShortName } = require('../helpers/names');
const getBlockstate = require('../blockstate');
const getModel = require('../model');
const getRecipe = require('../recipe');
const getLootTable = require('../lootTable');
const { mod_id } = require('../vars/mod');
const dyes = require('../vars/dyes.json');
const regex = require('../vars/regex');

/**
 * 
 * @param {string} name Display name, not registry name.
 * @param {number} options 
 * @param {{name: string, count: number}} drops Name should be a registry name - "mod_id:registryName." Will use config mod_id if not provided.
 */
function generateBlock(name, options = 1, drops = { name: 'self', count: 1 }) {
    const displayName = getDisplayName(name);
    const registryName = getRegistryName(name);

    let map = new Map();

    let json = {};

    if (regex.dye.test(registryName)) {
        let arr = [];
        let dye;
        for (let i in dyes) {
            dye = dyes[i];

            const _displayName = getDisplayName(getDyedName(name, dye));
            const _drops = {
                name: drops.name === 'self' ? getRegistryName(getDyedName(name, dye)) : getRegistryName(getDyedName(drops.name, dye)),
                count: drops.count
            };

            arr.push(generateBlock(_displayName, options, _drops));
        }

        for (let i in arr) {
            for (let item in arr[i]) {
                json[item] = arr[i][item];
            }
        }
    }
    else {
        if (drops.name === 'self')
            drops.name = registryName;

        if (options >= 16) {
            getBlockstate(registryName, 'fence').forEach((v, k, m) => {if (!map.has(k)) map.set(k, []); map.set(k, v)});
            getModel.block(registryName, 'fence');
            getModel.item(registryName, 'fence');
            if (options % 2 == 1) {
                drops.name += '_fence';
                getRecipe.create(registryName, 'fence', 'wood');
                getLootTable(`${registryName}_fence`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_fence`] = `${displayName} Fence`;

            options -= 16;
        }
        if (options >= 8) {
            getBlockstate(registryName, 'wall').forEach((v, k, m) => {if (!map.has(k)) map.set(k, []); map.set(k, v)});
            getModel.block(registryName, 'wall');
            getModel.item(registryName, 'wall');
            if (options % 2 == 1) {
                drops.name += '_wall';
                getRecipe.create(registryName, 'wall', 'rock');
                getLootTable(`${registryName}_wall`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_wall`] = `${displayName} Wall`;

            options -= 8;
        }
        if (options >= 4) {
            getBlockstate(registryName, 'stairs').forEach((v, k, m) => {if (!map.has(k)) map.set(k, []); map.set(k, v)});
            getModel.block(registryName, 'stairs');
            getModel.item(registryName, 'stairs');
            if (options % 2 == 1) {
                drops.name += '_stairs';
                getRecipe.create(registryName, 'stairs', 'rock');
                getLootTable(`${registryName}_stairs`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_stairs`] = `${displayName} Stairs`;

            options -= 4;
        }
        if (options >= 2) {
            getBlockstate(registryName, 'slab').forEach((v, k, m) => {if (!map.has(k)) map.set(k, []); map.set(k, v)});
            getModel.block(registryName, 'slab');
            getModel.item(registryName, 'slab');
            if (options % 2 == 1) {
                drops.name += '_slab';
                getRecipe.create(registryName, 'slab', 'rock');
                getLootTable(`${registryName}_slab`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_slab`] = `${displayName} Slab`;

            options -= 2;
        }
        if (options === 1) {
            getBlockstate(registryName, 'block').forEach((v, k, m) => {if (!map.has(k)) map.set(k, []); map.set(k, v)});
            getModel.block(registryName, null);
            getModel.item(registryName, null);
            getLootTable(registryName, drops);
            json[`block.${mod_id}.${getShortName(registryName)}`] = displayName;
        }
    }

    return {
        json,
        map
    };
}

module.exports = generateBlock;