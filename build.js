const fs = require('fs');
const main = require('./main');
const path = main.path;
const mod_id = main.mod_id;
const dirs = main.dirs;
const dyes = main.dyes;

let tagValues = new Map();
let recipes = new Map();

function create_blockstate(name, type) {
    let blockstate;
    let fileName;

    switch (type) {
        case 'wall': {
            blockstate = {
                "multipart": [
                    {
                        "when": {
                            "up": "true"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_post`
                        }
                    },
                    {
                        "when": {
                            "north": "low"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side`,
                            "uvlock": true
                        }
                    },
                    {
                        "when": {
                            "east": "low"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side`,
                            "y": 90,
                            "uvlock": true
                        }
                    },
                    {
                        "when": {
                            "south": "low"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side`,
                            "y": 180,
                            "uvlock": true
                        }
                    },
                    {
                        "when": {
                            "west": "low"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side`,
                            "y": 270,
                            "uvlock": true
                        }
                    },
                    {
                        "when": {
                            "north": "tall"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side_tall`,
                            "uvlock": true
                        }
                    },
                    {
                        "when": {
                            "east": "tall"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side_tall`,
                            "y": 90,
                            "uvlock": true
                        }
                    },
                    {
                        "when": {
                            "south": "tall"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side_tall`,
                            "y": 180,
                            "uvlock": true
                        }
                    },
                    {
                        "when": {
                            "west": "tall"
                        },
                        "apply": {
                            "model": `${mod_id}:block/${name}_wall_side_tall`,
                            "y": 270,
                            "uvlock": true
                        }
                    }
                ]
            }

            fileName = `${name}_wall`;

            let arr = tagValues.get('walls');

            if (!arr) arr = [];

            arr.push(`${name}_wall`);

            tagValues.set('walls', arr);

            break;
        }
        case 'slab': {
            blockstate = {
                "variants": {
                    "type=bottom": { "model": `${mod_id}:block/${name}_slab` },
                    "type=top": { "model": `${mod_id}:block/${name}_slab_top` },
                    "type=double": { "model": `${mod_id}:block/${name}` }
                }
            }

            fileName = `${name}_slab`;

            let arr = tagValues.get('slabs');

            if (!arr) arr = [];

            arr.push(`${name}_slab`);

            tagValues.set('slabs', arr);

            break;
        }
        case 'stairs': {
            blockstate = {
                "variants": {
                    "facing=east,half=bottom,shape=straight": { "model": `${mod_id}:block/${name}_stairs` },
                    "facing=west,half=bottom,shape=straight": { "model": `${mod_id}:block/${name}_stairs`, "y": 180, "uvlock": true },
                    "facing=south,half=bottom,shape=straight": { "model": `${mod_id}:block/${name}_stairs`, "y": 90, "uvlock": true },
                    "facing=north,half=bottom,shape=straight": { "model": `${mod_id}:block/${name}_stairs`, "y": 270, "uvlock": true },
                    "facing=east,half=bottom,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer` },
                    "facing=west,half=bottom,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer`, "y": 180, "uvlock": true },
                    "facing=south,half=bottom,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer`, "y": 90, "uvlock": true },
                    "facing=north,half=bottom,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer`, "y": 270, "uvlock": true },
                    "facing=east,half=bottom,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer`, "y": 270, "uvlock": true },
                    "facing=west,half=bottom,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer`, "y": 90, "uvlock": true },
                    "facing=south,half=bottom,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer` },
                    "facing=north,half=bottom,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer`, "y": 180, "uvlock": true },
                    "facing=east,half=bottom,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner` },
                    "facing=west,half=bottom,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner`, "y": 180, "uvlock": true },
                    "facing=south,half=bottom,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner`, "y": 90, "uvlock": true },
                    "facing=north,half=bottom,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner`, "y": 270, "uvlock": true },
                    "facing=east,half=bottom,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner`, "y": 270, "uvlock": true },
                    "facing=west,half=bottom,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner`, "y": 90, "uvlock": true },
                    "facing=south,half=bottom,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner` },
                    "facing=north,half=bottom,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner`, "y": 180, "uvlock": true },
                    "facing=east,half=top,shape=straight": { "model": `${mod_id}:block/${name}_stairs`, "x": 180, "uvlock": true },
                    "facing=west,half=top,shape=straight": { "model": `${mod_id}:block/${name}_stairs`, "x": 180, "y": 180, "uvlock": true },
                    "facing=south,half=top,shape=straight": { "model": `${mod_id}:block/${name}_stairs`, "x": 180, "y": 90, "uvlock": true },
                    "facing=north,half=top,shape=straight": { "model": `${mod_id}:block/${name}_stairs`, "x": 180, "y": 270, "uvlock": true },
                    "facing=east,half=top,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "y": 90, "uvlock": true },
                    "facing=west,half=top,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "y": 270, "uvlock": true },
                    "facing=south,half=top,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "y": 180, "uvlock": true },
                    "facing=north,half=top,shape=outer_right": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "uvlock": true },
                    "facing=east,half=top,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "uvlock": true },
                    "facing=west,half=top,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "y": 180, "uvlock": true },
                    "facing=south,half=top,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "y": 90, "uvlock": true },
                    "facing=north,half=top,shape=outer_left": { "model": `${mod_id}:block/${name}_stairs_outer`, "x": 180, "y": 270, "uvlock": true },
                    "facing=east,half=top,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "y": 90, "uvlock": true },
                    "facing=west,half=top,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "y": 270, "uvlock": true },
                    "facing=south,half=top,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "y": 180, "uvlock": true },
                    "facing=north,half=top,shape=inner_right": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "uvlock": true },
                    "facing=east,half=top,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "uvlock": true },
                    "facing=west,half=top,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "y": 180, "uvlock": true },
                    "facing=south,half=top,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "y": 90, "uvlock": true },
                    "facing=north,half=top,shape=inner_left": { "model": `${mod_id}:block/${name}_stairs_inner`, "x": 180, "y": 270, "uvlock": true }
                }
            }

            fileName = `${name}_stairs`;

            let arr = tagValues.get('stairs');

            if (!arr) arr = [];

            arr.push(`${name}_stairs`);

            tagValues.set('stairs', arr);

            break;
        }
        case 'fence': {
            blockstate = {
                "multipart": [
                    { "apply": { "model": `block/${name}_fence_post` } },
                    {
                        "when": { "north": "true" },
                        "apply": { "model": `block/${name}_fence_side`, "uvlock": true }
                    },
                    {
                        "when": { "east": "true" },
                        "apply": { "model": `block/${name}_fence_side`, "y": 90, "uvlock": true }
                    },
                    {
                        "when": { "south": "true" },
                        "apply": { "model": `block/${name}_fence_side`, "y": 180, "uvlock": true }
                    },
                    {
                        "when": { "west": "true" },
                        "apply": { "model": `block/${name}_fence_side`, "y": 270, "uvlock": true }
                    }
                ]
            }

            fileName = `${name}_fence`;

            let arr = tagValues.get('fences');

            if (!arr) arr = [];

            arr.push(`${name}_fence`);

            tagValues.set('fences', arr);

            break;
        }
        default: {
            blockstate = {
                "variants": {
                    "": {
                        "model": `${mod_id}:block/${name}`
                    }
                }
            }
            fileName = name;
            break;
        }
    }

    writeToFile(dirs.blockstates, `${fileName}.json`, JSON.stringify(blockstate))
        .catch(err => console.log(err));
}

function create_block_model(name, type) {
    let models = new Map();
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
        writeToFile(dirs.block_models, `${k}.json`, JSON.stringify(v))
            .catch(err => console.log(err));
    });
}

function create_item_model(name, type) {
    let model;
    let fileName;

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
        default: {
            model = {
                "parent": `${mod_id}:block/${name}`
            };
            fileName = name;
            break;
        }
    }

    writeToFile(dirs.item_models, `${fileName}.json`, JSON.stringify(model))
        .catch(err => console.log(err));
}

function getCraftingType(type) {
    switch (type) {
        case "shaped": return "minecraft:crafting_shaped"
    }
    return "minecraft:crafting_shaped"
}

const regex = {
    dyeItem: /\{dyeItem\}/g,
    dye: /\{dye\}/g,
    mod_id: /\{mod_id\}/g
};

/*
    Options
    4       2 x 2       Use pattern as item, makes 2 x 2 recipe (no type needed).
    3       Smelted     Use pattern as item, makes smeltable to result (no type needed).
    2       Mossy       Use pattern as item, adds vine item (no type needed).
    1       Dyed        Use pattern as item, change {dyeItem}/{dye} to appropriate item/name
*/
function convert_recipe(recipe) {   
    const name = recipe.result.includes('minecraft:')
        ? recipe.result
        : `${mod_id}:${recipe.result}`;
        
    const block = recipe.pattern.includes('minecraft:')
        ? recipe.pattern
        : `${mod_id}:${recipe.pattern}`;

    switch (recipe.options) {
        case 1: {
            for (let i in dyes) {
                create_dye_recipe(
                    recipe.result.replace(regex.dye, dyes[i]),
                    recipe.pattern,
                    dyes[i]
                );
            }
            return;
        }
        case 2: {
            recipes.set({ path: `crafting/blocks`, name: recipe.result.replace('minecraft:', '') }, {
                "type": "minecraft:crafting_shapeless",
                "pattern": [
                    "Xv"
                ],
                "key": {
                    "X": {
                        "item": block
                    },
                    "v": {
                        "item": `minecraft:vine`
                    }
                },
                "result": {
                    "item": name,
                    "count": 1
                }
            });
            return;
        }
        case 3: {
            recipes.set({ path: `smelting/blocks`, name: recipe.result.replace('minecraft:', '') },
            {
                "type": "minecraft:smelting",
                "ingredient": {
                  "item": block
                },
                "result": name,
                "experience": 0.3,
                "cookingtime": 200
            });
            return;
        }
        case 4: {
            recipes.set({ path: `crafting/blocks`, name: recipe.result.replace('minecraft:', '') }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "XX",
                    "XX"
                ],
                "key": {
                    "X": {
                        "item": block
                    }
                },
                "result": {
                    "item": name,
                    "count": 4
                }
            });
            return;
        }
    }
}

function create_recipe(name, type, material) {
    switch (type) {
        case 'wall': {
            recipes.set({ path: `crafting/walls`, name: `${name}_wall` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "bbb",
                    "bbb"
                ],
                "key": {
                    "b": {
                        "item": `${mod_id}:${name}`
                    }
                },
                "result": {
                    "item": `${mod_id}:${name}_wall`,
                    "count": 6
                }
            });
            recipes.set({ path: `stonecutting/walls`, name: `${name}_wall` }, {
                "type": "minecraft:stonecutting",
                "ingredient": {
                    "item": `${mod_id}:${name}`
                },
                "result": `${mod_id}:${name}_wall`,
                "count": 1
            });
            break;
        }
        case 'slab': {
            recipes.set({ path: `crafting/slabs`, name: `${name}_slab` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "bbb"
                ],
                "key": {
                    "b": {
                        "item": `${mod_id}:${name}`
                    }
                },
                "result": {
                    "item": `${mod_id}:${name}_slab`,
                    "count": 6
                }
            });
            if (material == 'rock')
                recipes.set({ path: `stonecutting/slabs`, name: `${name}_slab` }, {
                    "type": "minecraft:stonecutting",
                    "ingredient": {
                        "item": `${mod_id}:${name}`
                    },
                    "result": `${mod_id}:${name}_slab`,
                    "count": 2
                });
            break;
        }
        case 'stairs': {
            recipes.set({ path: `crafting/stairs`, name: `${name}_stairs` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "b  ",
                    "bb ",
                    "bbb"
                ],
                "key": {
                    "b": {
                        "item": `${mod_id}:${name}`
                    }
                },
                "result": {
                    "item": `${mod_id}:${name}_stairs`,
                    "count": 4
                }
            });
            if (material == 'rock')
                recipes.set({ path: `stonecutting/stairs`, name: `${name}_stairs` }, {
                    "type": "minecraft:stonecutting",
                    "ingredient": {
                        "item": `${mod_id}:${name}`
                    },
                    "result": `${mod_id}:${name}_stairs`,
                    "count": 1
                });
            break;
        }
        case 'fence': {
            recipes.set({ path: `crafting/fences`, name: `${name}_fence` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "bsb",
                    "bsb"
                ],
                "key": {
                    "b": {
                        "item": `${mod_id}:${name}`
                    },
                    "s": {
                        "item": `minecraft:stick`
                    }
                },
                "result": {
                    "item": `${mod_id}:${name}_fence`,
                    "count": 6
                }
            });
            break;
        }
    }
}

function create_dye_recipe(name, block, dye) {
    recipes.set({ path: `crafting/blocks`, name }, {
        "type": "minecraft:crafting_shaped",
        "pattern": [
            "bbb",
            "bXb",
            "bbb"
        ],
        "key": {
            "b": {
                "item": block.includes('minecraft:')
                    ? block
                    : `${mod_id}:${block}`
            },
            "X": {
                "item": `minecraft:${dye}_dye`
            }
        },
        "result": {
            "item": name.includes('minecraft:')
                ? name
                : `${mod_id}:${name}`,
            "count": 8
        }
    });
}

function create_loot_table(name, drops = 'self') {
    let table = {
        "type": "minecraft:block",
        "pools": [
            {
                "rolls": 1,
                "entries": [
                    {
                        "type": "minecraft:item",
                        "name": (drops == 'self') ? `${mod_id}:${name}` : drops
                    }
                ],
                "conditions": [
                    {
                        "condition": "minecraft:survives_explosion"
                    }
                ]
            }
        ]
    };

    writeToFile(dirs.loot_tables, `${name}.json`, JSON.stringify(table))
        .catch(err => console.log(err));
}

function addTags(map) {
    map.forEach((v, k, m) => {
        readFile(`${dirs.tags}/blocks`, `${k}.json`, `{"replace": false,"values": []}`)
            .then(data => {
                let json = JSON.parse(data);

                for (let i in v)
                    if (!json.values.includes(`${mod_id}:${v[i]}`))
                        json.values.push(`${mod_id}:${v[i]}`);

                writeToFile(`${dirs.tags}/blocks`, `${k}.json`, JSON.stringify(json))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

        readFile(`${dirs.tags}/items`, `${k}.json`, `{"replace": false,"values": []}`)
            .then(data => {
                let json = JSON.parse(data);

                for (let i in v)
                    if (!json.values.includes(`${mod_id}:${v[i]}`))
                        json.values.push(`${mod_id}:${v[i]}`);

                writeToFile(`${dirs.tags}/items`, `${k}.json`, JSON.stringify(json))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });
}

function addRecipes(map) {
    return new Promise((resolve, reject) => {
        let arr = [];
        map.forEach((v, k, m) => {
            arr.push(writeToFile(`${dirs.recipes}/${k.path}`, `${k.name}.json`, JSON.stringify(v)));
        });

        Promise.all(arr)
            .then(r => resolve(r))
            .catch(err => reject(err));
    });
}

/*
    32      Dyed
    16      Fence
    8       Wall
    4       Stairs
    2       Slab
    1       Self
*/

/**
 * 
 * @param {string} name 
 * @param {number} options 
 * @param {string} drops 
 */
function generate(name, options = 1, drops = 'self') {
    const registryName = name.replace(/\s/g, '_').toLowerCase();
    let json = {};

    if (options >= 32) {
        let arr = [];
        for (let i in dyes) {
            let a = dyes[i].split('_');

            for (let b in a) {
                a[b] = `${a[b][0].toUpperCase()}${a[b].slice(1)}`;
            }

            arr.push(generate(`${a.join(' ')} Stained ${name}`, options, drops));
            create_dye_recipe(`${dyes[i]}stained${registryName}`, registryName, dyes[i]);
        }

        for (let i in arr) {
            for (let item in arr[i]) {
                json[item] = arr[i][item];
            }
        }
    }
    if (options >= 16) {
        create_blockstate(registryName, 'fence');
        create_block_model(registryName, 'fence');
        create_item_model(registryName, 'fence');
        if (options % 2 == 1) {
            create_recipe(registryName, 'fence', 'wood');
            create_loot_table(`${registryName}_fence`);
        }
        json[`block.${mod_id}.${registryName}_fence`] = `${name} Fence`;

        options -= 16;
    }
    if (options >= 8) {
        create_blockstate(registryName, 'wall');
        create_block_model(registryName, 'wall');
        create_item_model(registryName, 'wall');
        if (options % 2 == 1) {
            create_recipe(registryName, 'wall', 'rock');
            create_loot_table(`${registryName}_wall`);
        }
        json[`block.${mod_id}.${registryName}_wall`] = `${name} Wall`;

        options -= 8;
    }
    if (options >= 4) {
        create_blockstate(registryName, 'stairs');
        create_block_model(registryName, 'stairs');
        create_item_model(registryName, 'stairs');
        if (options % 2 == 1) {
            create_recipe(registryName, 'stairs', 'rock');
            create_loot_table(`${registryName}_stairs`);
        }
        json[`block.${mod_id}.${registryName}_stairs`] = `${name} Stairs`;

        options -= 4;
    }
    if (options >= 2) {
        create_blockstate(registryName, 'slab');
        create_block_model(registryName, 'slab');
        create_item_model(registryName, 'slab');
        if (options % 2 == 1) {
            create_recipe(registryName, 'slab', 'rock');
            create_loot_table(`${registryName}_slab`);
        }
        json[`block.${mod_id}.${registryName}_slab`] = `${name} Slab`;

        options -= 2;
    }
    if (options === 1) {
        create_blockstate(registryName, 'block');
        create_block_model(registryName, null);
        create_item_model(registryName, null);
        create_loot_table(registryName, drops);
        json[`block.${mod_id}.${registryName}`] = name;
    }

    return json;
}

function readFile(path, fileName, defaultText = '') {
    return new Promise((resolve, reject) => {
        console.log('Reading file: ', `${path}/${fileName}`)

        fs.readFile(`${path}/${fileName}`, 'utf8', (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    writeToFile(path, fileName, defaultText)
                        .then(() => resolve(defaultText))
                        .catch(err => reject(err));
                }
                else
                    reject(err);
            }
            else
                resolve(data);
        })
    })
}

function writeToFile(path, fileName, str) {
    return new Promise((resolve, reject) => {
        console.log(`Writing file: `, `${path}/${fileName}`)
        fs.writeFile(`${path}/${fileName}`, str, (err, result) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    if (!fs.existsSync(path))
                        fs.mkdirSync(path, { recursive: true });

                    writeToFile(path, fileName, str)
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                }
                else
                    reject(err);
            }
            else
                resolve(result);
        });
    });
}

function langs(jsonArr) {
    return new Promise((resolve, reject) => {
        readFile(dirs.lang, `en_us.json`, '{}')
            .then(data => {
                let json = JSON.parse(data);

                for (let i in jsonArr) {
                    for (let item in jsonArr[i])
                        json[item] = jsonArr[i][item];
                }

                resolve(writeToFile(dirs.lang, `en_us.json`, JSON.stringify(json)))
            })
            .catch(err => reject(err));
    });
}

function generateBlock(list) {
    let jsons = [];
    for (let item in list) {
        jsons.push(generate(list[item].name, list[item].options, list[item].drops));
    }

    return langs(jsons);
}

function etcLangs(list) {
    let json = {};
    for (let i in list) {
        json[list[i].registryName] = list[i].name;
    }

    langs([json]);
}

/*
    32      Dyed
    16      Fence
    8       Wall
    4       Stairs
    2       Slab
    1       Self
*/
const blocks = require('./blocks.json');

const groups = require('./groups');

function _() {
    if (!fs.existsSync(`${path}/META-INF`)) {
        fs.mkdirSync(`${path}/META-INF`, { recursive: true });

        fs.copyFile(`./mods.toml`, `${path}/META-INF/mods.toml`, (err, result) => {
            if (err)
                console.log(err);
        });
        fs.copyFile(`./pack.mcmeta`, `${path}/pack.mcmeta`, (err, result) => {
            if (err)
                console.log(err);
        });

        _();
    }
    else {
        generateBlock(blocks)
            .then(() => {
                etcLangs(groups);
                addTags(tagValues);

                const list = require('./recipes.json');
                for (let i in list)
                    convert_recipe(list[i]);

                addRecipes(recipes)
                    .catch(err => console.log(err));

            })
            .catch(e => console.log(e));
    }
}

_();