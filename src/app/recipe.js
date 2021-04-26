const { getRegistryName, getShortName, getDyedName, getDyeItemName } = require('./helpers/names');
const getCraftingType = require('./helpers/crafting');
const { mod_id } = require('./vars/mod');
const dyes = require('./vars/dyes');
const regex = require('./vars/regex');

const recipeMap = new Map();

/**
 * Options
    6:       Stonecutting
    5:       Compacted
    4:       Dyed
    3:       2 x 2
    2:       Smelted
    1:       Mossy
 * @param {*} r 
 */
function build(r) {
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

function convert(json) {
    let arr = build(json);

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
                            "item": getDyeItemName(recipe.dye)
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
 * @param {string} type wall | slab | stairs | fence
 * @param {string} material rock = add stonecutting recipe. Wall type adds automatically.
 */
function create(registryName, type, material) {
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

module.exports = {
    create,
    convert,
    recipeMap
};