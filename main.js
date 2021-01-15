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

const dyes = [
    'red',          //1
    'orange',       //2
    'yellow',       //4
    'lime',         //8
    'green',        //16
    'cyan',         //32
    'light_blue',   //64
    'blue',         //128
    'magenta',      //256
    'purple',       //512
    'pink',         //1024
    'white',        //2048
    'light_gray',   //4096
    'gray',         //8192
    'black',        //16384
    'brown'         //32768
];

function dyeCombo(dye1, dye2) {
    if (dye1 == dye2)
        return dye1;
    
    let d1 = Math.pow(2, dyes.indexOf(dye1));
    let d2 = Math.pow(2, dyes.indexOf(dye2));

    switch (d1 + d2) {
        // Red combos
        case 5: return dyes[1];
        case 17: return dyes[15];
        case 129: return dyes[9];
        case 2049: return dyes[10];
        
    }
}

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