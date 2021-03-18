const add = require('./helpers/files/add');
const {getShortName} = require('./helpers/names');
const dirs = require('./vars/dirs');
const {mod_id} = require('./vars/mod');

/**
 * 
 * @param {string} registryName Parent item - do not include "_stairs" or other endings.
 * @param {string} type wall | slab | stairs | fence | default = Block
 */
function block(registryName, type) {
    const models = new Map();
    const name = getShortName(registryName);

    switch (type) {
        case 'wall': {
            models.set(`${name}_wall_inventory`, {
                "parent": "minecraft:block/wall_inventory",
                "textures": {
                    "wall": `${mod_id}:block/${name}`
                }
            });
            models.set(`${name}_wall_post`, {
                "parent": "minecraft:block/template_wall_post",
                "textures": {
                    "wall": `${mod_id}:block/${name}`
                }
            });
            models.set(`${name}_wall_side`, {
                "parent": "minecraft:block/template_wall_side",
                "textures": {
                    "wall": `${mod_id}:block/${name}`
                }
            });
            models.set(`${name}_wall_side_tall`, {
                "parent": "minecraft:block/template_wall_side_tall",
                "textures": {
                    "wall": `${mod_id}:block/${name}`
                }
            });
            break;
        }
        case 'slab': {
            models.set(`${name}_slab`, {
                "parent": "minecraft:block/slab",
                "textures": {
                    "bottom": `${mod_id}:block/${name}`,
                    "top": `${mod_id}:block/${name}`,
                    "side": `${mod_id}:block/${name}`
                }
            });
            models.set(`${name}_slab_top`, {
                "parent": "minecraft:block/slab_top",
                "textures": {
                    "bottom": `${mod_id}:block/${name}`,
                    "top": `${mod_id}:block/${name}`,
                    "side": `${mod_id}:block/${name}`
                }
            });
            break;
        }
        case 'stairs': {
            models.set(`${name}_stairs_inner`, {
                "parent": "minecraft:block/inner_stairs",
                "textures": {
                    "bottom": `${mod_id}:block/${name}`,
                    "top": `${mod_id}:block/${name}`,
                    "side": `${mod_id}:block/${name}`
                }
            });
            models.set(`${name}_stairs_outer`, {
                "parent": "minecraft:block/outer_stairs",
                "textures": {
                    "bottom": `${mod_id}:block/${name}`,
                    "top": `${mod_id}:block/${name}`,
                    "side": `${mod_id}:block/${name}`
                }
            });
            models.set(`${name}_stairs`, {
                "parent": "minecraft:block/stairs",
                "textures": {
                    "bottom": `${mod_id}:block/${name}`,
                    "top": `${mod_id}:block/${name}`,
                    "side": `${mod_id}:block/${name}`
                }
            });
            break;
        }
        case 'fence': {
            models.set(`${name}_fence_post`, {
                "parent": "minecraft:block/fence_post",
                "textures": {
                    "fence": `${mod_id}:block/${name}`
                }
            });
            models.set(`${name}_fence_side`, {
                "parent": "minecraft:block/fence_side",
                "textures": {
                    "fence": `${mod_id}:block/${name}`
                }
            });
            break;
        }
        default: {
            models.set(name, {
                "parent": "minecraft:block/cube_all",
                "textures": {
                    "all": `${mod_id}:block/${name}`
                }
            });
            break;
        }
    }

    models.forEach((v, k, m) => {
        add(dirs.block_models, `${k}.json`, JSON.stringify(v));
    });
}

/**
 * 
 * @param {string} registryName Parent item - do not include "_stairs" or other endings.
 * @param {string} type Wall | Slab | Stairs | Fence | Item | Default = Block
 */
function item(registryName, type) {
    let model;
    let fileName;

    const name = getShortName(registryName);

    switch (type) {
        case 'wall': {
            model = {
                "parent": `${mod_id}:block/${name}_wall_inventory`
            };
            fileName = `${name}_wall`;
            break;
        }
        case 'slab': {
            model = {
                "parent": `${mod_id}:block/${name}_slab`
            };
            fileName = `${name}_slab`;
            break;
        }
        case 'stairs': {
            model = {
                "parent": `${mod_id}:block/${name}_stairs`
            };
            fileName = `${name}_stairs`;
            break;
        }
        case 'fence': {
            model = {
                "parent": `${mod_id}:block/${name}_fence_inventory`
            };
            fileName = `${name}_fence`;
            break;
        }
        case 'item': {
            model = {
                "parent": "minecraft:item/generated",
                "textures": {
                    "layer0": `${mod_id}:item/${name}`
                }
            };
            fileName = name;
            break;
        }
        default: {
            model = {
                "parent": `${mod_id}:block/${name}`
            };
            fileName = name;
            break;
        }
    }

    add(dirs.item_models, `${fileName}.json`, JSON.stringify(model));
}

module.exports = {
    block,
    item
}