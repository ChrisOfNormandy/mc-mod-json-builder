const fs = require('fs');
const {
    path,
    mod_id,
    dirs,
    dyes,
    regex,

    getCraftingType,
    getDyedName,
    getDyeItem,

    getRegistryName,
    getDisplayName,
    getShortName
} = require('./main');

let tagValues = new Map();
let recipeMap = new Map();

let writeQueue = new Map();

const debug = false;

/**
 * 
 * @param {string} registryName Parent item - do not include "_stairs" or other endings.
 * @param {string} type 
 */
function create_blockstate(registryName, type) {
    const name = getShortName(registryName);

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

    queueFile(dirs.blockstates, `${fileName}.json`, JSON.stringify(blockstate));
}

/**
 * 
 * @param {string} registryName Parent item - do not include "_stairs" or other endings.
 * @param {string} type 
 */
function create_block_model(registryName, type) {
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
        queueFile(dirs.block_models, `${k}.json`, JSON.stringify(v));
    });
}

/**
 * 
 * @param {string} registryName Parent item - do not include "_stairs" or other endings.
 * @param {string} type 
 */
function create_item_model(registryName, type) {
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

    queueFile(dirs.item_models, `${fileName}.json`, JSON.stringify(model));
}

/*
    Options
    6       Stonecutting    Use pattern as item (no type needed).
    5       Compacted       Use pattern as item, makes 3x3 recipe (no type needed).
    4       Dyed            Use pattern as item, makes 3;1{item}1;3 recipe (no type needed).
    3       2 x 2           Use pattern as item, makes 2 x 2 recipe (no type needed).
    2       Smelted         Use pattern as item, makes smeltable to result (no type needed).
    1       Mossy           Use pattern as item, adds vine item (no type needed).
*/
function build_recipe_jsons(r) {
    let arr = [];

    let res = r.result.split(';');

    let key = {};
    for (let k in r.key) {
        key[k] = getRegistryName(r.key[k]);
    }

    if (regex.dye.test(r.pattern) || regex.dye.test(r.result)) {
        let json;

        for (let i in dyes) {
            json = {
                options: r.options,
                block: !!r.block,
                pattern: getDyedName(r.pattern, dyes[i]),
                result: getDyedName(res[0], dyes[i]),
                count: res.length == 1 ? null : Number(res[1]),
                dye: dyes[i],
                key,
                type: r.type,
                experience: r.options == 2
                    ? Number(r.experience) || 0.3
                    : null,
                cookingtime: r.options == 2
                    ? Number(r.cookingtime) || 200
                    : null,
                complement: !!r.complement,
                ingredientName: '',
                productName: '',
                fileName: '',
                fileName_comp: ''
            }

            json.ingredientName = getRegistryName(json.pattern);
            json.productName = getRegistryName(json.result);
            json.fileName = getShortName(json.result);

            if (json.complement)
                json.fileName_comp = getShortName(json.pattern);

            arr.push(json);
        }
    }
    else {
        const json = {
            options: r.options,
            block: !!r.block,
            pattern: r.pattern,
            result: res[0],
            count: res.length == 1 ? null : Number(res[1]),
            dye: null,
            key,
            type: r.type,
            experience: r.options == 2
                ? Number(r.experience) || 0.3
                : null,
            cookingtime: r.options == 2
                ? Number(r.cookingtime) || 200
                : null,
            complement: !!r.complement,
            ingredientName: '',
            productName: '',
            fileName: '',
            fileName_comp: ''
        }

        json.ingredientName = getRegistryName(json.pattern);
        json.productName = getRegistryName(json.result);
        json.fileName = getShortName(json.result);

        if (json.complement)
            json.fileName_comp = getShortName(json.pattern);

        arr.push(json);
    }

    return arr;
}

function convert_recipe(json) {
    let arr = build_recipe_jsons(json);

    for (let i in arr) {
        const recipe = arr[i];

        const product = recipe.productName;
        const ingredient = recipe.ingredientName;

        switch (recipe.options) {
            case 1: {
                recipeMap.set({ path: `crafting/blocks`, name: recipe.fileName }, {
                    "type": "minecraft:crafting_shapeless",
                    "pattern": [
                        "Xv"
                    ],
                    "key": {
                        "X": {
                            "item": ingredient
                        },
                        "v": {
                            "item": `minecraft:vine`
                        }
                    },
                    "result": {
                        "item": product,
                        "count": recipe.count === null ? 1 : recipe.count
                    }
                });
                break;
            }
            case 2: {
                recipeMap.set({ path: `smelting/${recipe.block ? 'blocks' : 'items'}`, name: recipe.fileName },
                    {
                        "type": "minecraft:smelting",
                        "ingredient": {
                            "item": ingredient
                        },
                        "result": product,
                        "experience": recipe.experience,
                        "cookingtime": recipe.cookingtime
                    });
                break;
            }
            case 3: {
                recipeMap.set({ path: `crafting/${recipe.block ? 'blocks' : 'items'}`, name: recipe.fileName }, {
                    "type": "minecraft:crafting_shaped",
                    "pattern": [
                        "XX",
                        "XX"
                    ],
                    "key": {
                        "X": {
                            "item": ingredient
                        }
                    },
                    "result": {
                        "item": product,
                        "count": recipe.count === null ? 4 : recipe.count
                    }
                });
                break;
            }
            case 4: {
                recipeMap.set({ path: `crafting/${recipe.block ? 'blocks' : 'items'}`, name: recipe.fileName }, {
                    "type": "minecraft:crafting_shaped",
                    "pattern": [
                        "XXX",
                        "XdX",
                        "XXX"
                    ],
                    "key": {
                        "X": {
                            "item": ingredient
                        },
                        "d": {
                            "item": getDyeItem(recipe.dye)
                        }
                    },
                    "result": {
                        "item": product,
                        "count": recipe.count === null ? 8 : recipe.count
                    }
                });
                break;
            }
            case 5: {
                recipeMap.set({ path: `crafting/${recipe.block ? 'blocks' : 'items'}`, name: recipe.fileName }, {
                    "type": "minecraft:crafting_shaped",
                    "pattern": [
                        "XXX",
                        "XXX",
                        "XXX"
                    ],
                    "key": {
                        "X": {
                            "item": ingredient
                        }
                    },
                    "result": {
                        "item": product,
                        "count": recipe.count === null ? 1 : recipe.count
                    }
                });

                if (recipe.complement) {
                    recipeMap.set({ path: `crafting/${recipe.block ? 'blocks' : 'items'}`, name: recipe.fileName_comp }, {
                        "type": "minecraft:crafting_shapeless",
                        "pattern": [
                            "X"
                        ],
                        "key": {
                            "X": {
                                "item": product
                            }
                        },
                        "result": {
                            "item": ingredient,
                            "count": 9
                        }
                    });
                }
                break;
            }
            case 6: {
                recipeMap.set({ path: `stonecutting/${recipe.type}`, name: recipe.fileName }, {
                    "type": "minecraft:stonecutting",
                    "ingredient": {
                        "item": ingredient
                    },
                    "result": product,
                    "count": 1
                });
                break;
            }
            default: {
                recipeMap.set({ path: `crafting/${recipe.block ? 'blocks' : 'items'}`, name: recipe.fileName }, {
                    "type": getCraftingType(recipe.type),
                    "pattern": recipe.pattern.split(';'),
                    "key": recipe.key,
                    "result": {
                        "item": product,
                        "count": recipe.count === null ? 1 : recipe.count
                    }
                });
                break;
            }
        }
    }
}

/**
 * The item provided with the registryName will be used as the item for crafting.
 * 
 * This should be rewritten to adapt to convert_recipe.
 * @param {string} registryName Parent item - do not include "_stairs" or other endings.
 * @param {string} type 
 * @param {string} material 
 */
function create_recipe(registryName, type, material) {
    const name = getShortName(registryName);

    switch (type) {
        case 'wall': {
            recipeMap.set({ path: `crafting/walls`, name: `${name}_wall` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "bbb",
                    "bbb"
                ],
                "key": {
                    "b": {
                        "item": registryName
                    }
                },
                "result": {
                    "item": `${mod_id}:${name}_wall`,
                    "count": 6
                }
            });
            recipeMap.set({ path: `stonecutting/walls`, name: `${name}_wall` }, {
                "type": "minecraft:stonecutting",
                "ingredient": {
                    "item": registryName
                },
                "result": `${mod_id}:${name}_wall`,
                "count": 1
            });
            break;
        }
        case 'slab': {
            recipeMap.set({ path: `crafting/slabs`, name: `${name}_slab` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "bbb"
                ],
                "key": {
                    "b": {
                        "item": registryName
                    }
                },
                "result": {
                    "item": `${mod_id}:${name}_slab`,
                    "count": 6
                }
            });
            if (material == 'rock')
                recipeMap.set({ path: `stonecutting/slabs`, name: `${name}_slab` }, {
                    "type": "minecraft:stonecutting",
                    "ingredient": {
                        "item": registryName
                    },
                    "result": `${mod_id}:${name}_slab`,
                    "count": 2
                });
            break;
        }
        case 'stairs': {
            recipeMap.set({ path: `crafting/stairs`, name: `${name}_stairs` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "b  ",
                    "bb ",
                    "bbb"
                ],
                "key": {
                    "b": {
                        "item": registryName
                    }
                },
                "result": {
                    "item": `${mod_id}:${name}_stairs`,
                    "count": 4
                }
            });
            if (material == 'rock')
                recipeMap.set({ path: `stonecutting/stairs`, name: `${name}_stairs` }, {
                    "type": "minecraft:stonecutting",
                    "ingredient": {
                        "item": registryName
                    },
                    "result": `${mod_id}:${name}_stairs`,
                    "count": 1
                });
            break;
        }
        case 'fence': {
            recipeMap.set({ path: `crafting/fences`, name: `${name}_fence` }, {
                "type": "minecraft:crafting_shaped",
                "pattern": [
                    "bsb",
                    "bsb"
                ],
                "key": {
                    "b": {
                        "item": registryName
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

/**
 * 
 * @param {string} registryName
 * @param {{name: string, count: number}} drops 
 */
function create_loot_table(registryName, drops = { name: 'self', count: 1 }) {
    const name = getShortName(registryName);
    let table = {};

    if (drops.name === registryName) {
        table = {
            "type": "minecraft:block",
            "pools": [
                {
                    "rolls": drops.count,
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "name": registryName
                        }
                    ],
                    "conditions": [
                        {
                            "condition": "minecraft:survives_explosion"
                        }
                    ]
                }
            ]
        }
    }
    else {
        table = {
            "type": "minecraft:block",
            "pools": [
                {
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "minecraft:alternatives",
                            "children": [
                                {
                                    "type": "minecraft:item",
                                    "conditions": [
                                        {
                                            "condition": "minecraft:match_tool",
                                            "predicate": {
                                                "enchantments": [
                                                    {
                                                        "enchantment": "minecraft:silk_touch",
                                                        "levels": {
                                                            "min": 1
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "name": registryName
                                },
                                {
                                    "type": "minecraft:item",
                                    "functions": [
                                        {
                                            "function": "minecraft:set_count",
                                            "count": drops.count
                                        },
                                        {
                                            "function": "minecraft:explosion_decay"
                                        }
                                    ],
                                    "name": drops.name
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    queueFile(dirs.loot_tables, `${name}.json`, JSON.stringify(table));
}

function addTags(map) {
    map.forEach((v, k, m) => {
        let json = {"replace": false,"values": []}
        
        for (let i in v)
            if (!json.values.includes(`${mod_id}:${v[i]}`))
                json.values.push(`${mod_id}:${v[i]}`);

        queueFile(`${dirs.tags}/blocks`, `${k}.json`, JSON.stringify(json));
        queueFile(`${dirs.tags}/items`, `${k}.json`, JSON.stringify(json));
    });
}

function addrecipeMap(map) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let name = '';
        let count = null;
        map.forEach((v, k, m) => {
            name = k.name;
            if (fs.existsSync(`${dirs.recipeMap}/${k.path}/${name}.json`)) {
                count = 0;
                name = `${k.name}_${count}`;
                while (fs.existsSync(`${dirs.recipeMap}/${k.path}/${name}.json`)) {
                    count++;
                    name = `${k.name}_${count}`;
                }
            }
            queueFile(`${dirs.recipes}/${k.path}`, `${name}.json`, JSON.stringify(v));
        });
        resolve(map);
    });
}

/*
    16      Fence
    8       Wall
    4       Stairs
    2       Slab
    1       Self
*/

/**
 * 
 * @param {string} name Display name, not registry name.
 * @param {number} options 
 * @param {{name: string, count: number}} drops Name should be a registry name - "mod_id:registryName." Will use config mod_id if not provided.
 */
function generateBlock(name, options = 1, drops = {name: 'self', count: 1}) {
    const displayName = getDisplayName(name);
    const registryName = getRegistryName(name);

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
            create_blockstate(registryName, 'fence');
            create_block_model(registryName, 'fence');
            create_item_model(registryName, 'fence');
            if (options % 2 == 1) {
                drops.name += '_fence';
                create_recipe(registryName, 'fence', 'wood');
                create_loot_table(`${registryName}_fence`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_fence`] = `${displayName} Fence`;

            options -= 16;
        }
        if (options >= 8) {
            create_blockstate(registryName, 'wall');
            create_block_model(registryName, 'wall');
            create_item_model(registryName, 'wall');
            if (options % 2 == 1) {
                drops.name += '_wall';
                create_recipe(registryName, 'wall', 'rock');
                create_loot_table(`${registryName}_wall`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_wall`] = `${displayName} Wall`;

            options -= 8;
        }
        if (options >= 4) {
            create_blockstate(registryName, 'stairs');
            create_block_model(registryName, 'stairs');
            create_item_model(registryName, 'stairs');
            if (options % 2 == 1) {
                drops.name += '_stairs';
                create_recipe(registryName, 'stairs', 'rock');
                create_loot_table(`${registryName}_stairs`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_stairs`] = `${displayName} Stairs`;

            options -= 4;
        }
        if (options >= 2) {
            create_blockstate(registryName, 'slab');
            create_block_model(registryName, 'slab');
            create_item_model(registryName, 'slab');
            if (options % 2 == 1) {
                drops.name += '_slab';
                create_recipe(registryName, 'slab', 'rock');
                create_loot_table(`${registryName}_slab`, drops);
            }
            json[`block.${mod_id}.${getShortName(registryName)}_slab`] = `${displayName} Slab`;

            options -= 2;
        }
        if (options === 1) {
            create_blockstate(registryName, 'block');
            create_block_model(registryName, null);
            create_item_model(registryName, null);
            create_loot_table(registryName, drops);
            json[`block.${mod_id}.${getShortName(registryName)}`] = displayName;
        }
    }
    return json;
}

function generateItem(name) {
    const json = {};

    if (regex.dye.test(name)) {
        for (let i in dyes) {
            const displayName = getDisplayName(name.replace(regex.dye, dyes[i]));
            const registryName = getRegistryName(displayName);

            create_item_model(registryName, 'item');

            json[`item.${mod_id}.${getShortName(displayName)}`] = displayName;
        }
    }
    else {
        const registryName = getRegistryName(name);

        create_item_model(registryName, 'item');

        json[`item.${mod_id}.${getShortName(registryName)}`] = getDisplayName(name);
    }

    return json;
}

function readFile(path, fileName, defaultText = '') {
    return new Promise((resolve, reject) => {
        if (debug)
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

function queueFile(path, fileName, str) {
    if (debug)
        console.log(`${path}/${fileName}`);
    const data = {
        path, fileName, str
    };
    let fullPath = `${path}/${fileName}`;
    if (writeQueue.has(fullPath))
        writeQueue.get(fullPath).push(data);
    else
        writeQueue.set(fullPath, [data]);
}

function runWriteQueue() {
    let arr = [];
    writeQueue.forEach((dataArr, path, m) => {
        for (let i in dataArr) {
            const data = dataArr[i];
            arr.push(writeToFile(data.path, data.fileName, data.str));
        }
    });

    return new Promise((resolve, reject) => {
    Promise.all(arr)
        .then(results => {
            const passed = results.filter(m => m === null).length;
            const failed = results.length - passed;

            resolve({
                passed,
                failed
            });
        })
        .catch(err => reject(err));
    });
}

function writeToFile(path, fileName, str) {
    return new Promise((resolve, reject) => {
        if (debug)
            console.log(`Writing file: `, `${path}/${fileName}`)
        fs.writeFile(`${path}/${fileName}`, str, (err, result) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    if (!fs.existsSync(path))
                        fs.mkdirSync(path, { recursive: true });

                    writeToFile(path, fileName, str)
                        .then(result => resolve(null))
                        .catch(err => {
                            console.log(err);
                            resolve(err)
                        });
                }
                else {
                    console.log(err);
                    resolve(err);
                }
            }
            else
                resolve(null);
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

                queueFile(dirs.lang, `en_us.json`, JSON.stringify(json));
                resolve(json);
            })
            .catch(err => reject(err));
    });
}

function generateBlocks(list) {
    let jsons = [];
    for (let item in list)
        jsons.push(generateBlock(list[item].name, list[item].options, list[item].drops));

    return jsons;
}

function generateItems(list) {
    let jsons = [];
    for (let item in list)
        jsons.push(generateItem(list[item]));

    return jsons;
}

function etcLangs(list) {
    let json = {};
    for (let i in list) {
        json[list[i].registryName] = list[i].name;
    }
    return [json];
}
const blocks = require('../build_configs/blocks.json');
const items = require('../build_configs/items.json');
const groups = require('../build_configs/groups');
const recipes = require('../build_configs/recipes.json');

function generateAll() {
    let jsons = [];
    
    const b = generateBlocks(blocks);
    const i = generateItems(items);
    const e = etcLangs(groups);

    for (let _ in b)
        jsons.push(b[_]);
    for (let _ in i)
        jsons.push(i[_]);
    for (let _ in e)
        jsons.push(e[_]);

    return langs(jsons);
}

/*
    32      Dyed
    16      Fence
    8       Wall
    4       Stairs
    2       Slab
    1       Self
*/

function _() {
    let start = Date.now();
    let old, now;
    let ellapsed = 0;

    if (!fs.existsSync(`${path}/META-INF`)) {
        console.log('Copying META-INF and pack.mcmeta, as they were not found.');

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
        old = Date.now();
        generateAll()
            .then(jsons => {
                now = Date.now();
                old = now;
                ellapsed = Math.abs(now - old);
                console.log(`Finished composing data and langs for ${jsons.length} blocks, items and groups.`);
                
                addTags(tagValues);
                now = Date.now();
                old = now;
                ellapsed = Math.abs(now - old);
                console.log(`Finished tag generation in ${ellapsed} ms.`);

                current = Date.now();
                for (let i in recipes)
                    convert_recipe(recipes[i]);
                now = Date.now();
                old = now;
                ellapsed = Math.abs(now - old);
                console.log(`Finished recipe conversions in ${ellapsed} ms.`);

                current = Date.now();
                addrecipeMap(recipeMap)
                    .then(() => {
                        now = Date.now();
                        old = now;
                        ellapsed = Math.abs(now - old);
                        console.log(`Finished recipe data generation in ${ellapsed} ms.`);

                        current = Date.now();
                        runWriteQueue()
                            .then(data => {
                                let end = Date.now();
                                now = Date.now();
                                ellapsed = Math.abs(now - old);
                                console.log(`Finished writing files in ${ellapsed} ms.`);

                                ellapsed = Math.abs(end - start);
                                console.log(`Finished resource build in ${ellapsed} ms.`);
                                console.log(`Passed: ${data.passed}\nFailed: ${data.failed}`);
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
    }
}

_();