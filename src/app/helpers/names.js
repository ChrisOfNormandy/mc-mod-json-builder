const {mod_id} = require('../vars/mod');

const regex = {
    dye: /\{dye\}/,
    mod_id: /\{mod_id\}/
};

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

 function getDyedName(str, dye) {
    return str.replace(regex.dye, dye);
}

function getDyeItemName(dye) {
    return `minecraft:${dye}_dye`;
}

module.exports = {
    capitalize,
    getDisplayName,
    getRegistryName,
    getShortName,
    getDyedName,
    getDyeItemName
}