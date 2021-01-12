const config = require('../build_configs/config.json');

const path = `${config.path}/src/main/resources/`;
const mod_id = config.mod_id;

const dirs = {
    blockstates: `${path}assets/${mod_id}/blockstates`,
    block_models: `${path}assets/${mod_id}/models/block`,
    item_models: `${path}assets/${mod_id}/models/item`,
    loot_tables: `${path}data/${mod_id}/loot_tables/blocks`,
    recipes: `${path}data/${mod_id}/recipes`,
    tags: `${path}data/minecraft/tags`,
    lang: `${path}assets/${mod_id}/lang`
};

const dyes = ['red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'light_blue', 'blue', 'magenta', 'purple', 'pink', 'white', 'light_gray', 'gray', 'black', 'brown'];

const regex = {
    dye: /\{dye\}/,
    mod_id: /\{mod_id\}/
};

function getDyeItem(dye) {
    return `minecraft:${dye}_dye`;
}


function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function getDisplayName(str) {
    let a = str.replace(regex.mod_id, mod_id).split(/[\s_]/g);
    let s = [];
    for (let i in a)
        s.push(capitalize(a[i]));
    return s.join(' ');
}

function getRegistryName(str) {
    let a = str.replace(/\s/g, "_").replace(regex.mod_id, mod_id).toLowerCase();

    let b = (!(/\w+:/.test(a)))
        ? `${mod_id}:${a}`
        : a;

    return b;
}

function getShortName(str) {
    return getRegistryName(str).replace(/\w+:/, '');
}

function getCraftingType(type) {
    switch (type) {
        case "shaped": return "minecraft:crafting_shaped";
        case "shapeless": return "minecraft:crafting_shapeless";
    }
    return "minecraft:crafting_shaped"
}

/**
 * Does not format, only replaces placeholder with name.
 * @param {string} str 
 * @param {string} dye 
 */
function getDyedName(str, dye) {
    return str.replace(regex.dye, dye);
}



module.exports = {
    path,
    mod_id,
    dirs,
    dyes,
    regex,
    getDyeItem,
    capitalize,
    getDisplayName,
    getRegistryName,
    getShortName,
    getCraftingType,
    getDyedName
}