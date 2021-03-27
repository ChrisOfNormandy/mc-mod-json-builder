const { path, mod_id } = require('./mod');

module.exports = {
    blockstates: `${path}assets/${mod_id}/blockstates`,
    block_models: `${path}assets/${mod_id}/models/block`,
    item_models: `${path}assets/${mod_id}/models/item`,
    loot_tables: `${path}data/${mod_id}/loot_tables/blocks`,
    recipes: `${path}data/${mod_id}/recipes`,
    tags: `${path}data/minecraft/tags`,
    lang: `${path}assets/${mod_id}/lang`,
    meta_inf: `${path}`
};