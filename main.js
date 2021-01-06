const config = require('./config.json');

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

function getDyeItem(dye) {
    return `minecraft:${dye}_dye`;
}

module.exports = {
    path,
    mod_id,
    dirs,
    dyes,
    getDyeItem
}