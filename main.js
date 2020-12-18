const fs = require('fs');
const config = require('./config.json');

const path = `${config.path}/src/main/resources/`;
const mod_id = config.mod_id;

const dirs = {
    blockstates: `${path}assets/${mod_id}/blockstates/`,
    block_models: `${path}assets/${mod_id}/models/block/`,
    item_models: `${path}assets/${mod_id}/models/item/`,
    loot_tables: `${path}data/${mod_id}/loot_tables/blocks/`,
    recipes: `${path}data/${mod_id}/recipes/`,
    tags: `${path}data/minecraft/tags/`,
    lang: `${path}assets/${mod_id}/lang/en_us.json`
};

const dyes = ['red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'light_blue', 'blue', 'magenta', 'purple', 'pink', 'white', 'light_gray', 'gray', 'black', 'brown'];

let tagValues = new Map();

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

    fs.writeFile(`${dirs.blockstates}${fileName}.json`, JSON.stringify(blockstate), (err, result) => {
        if (err) console.log(err);
    });
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
        fs.writeFile(`${dirs.block_models}${k}.json`, JSON.stringify(v), (err, result) => {
            if (err) console.log(err);
        })
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
            fileName = `${name}_slab`
            break;
        }
        case 'stairs': {
            model = {
                "parent": `${mod_id}:block/${name}_stairs`
            };
            fileName = `${name}_stairs`
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

    fs.writeFile(`${dirs.item_models}${fileName}.json`, JSON.stringify(model), (err, result) => {
        if (err) console.log(err);
    })
}

function create_recipe(name, type, material) {
    let recipes = new Map();
    switch (type) {
        case 'wall': {
            recipes.set(`crafting/walls/${name}_wall`, {
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
            recipes.set(`stonecutting/walls/${name}_wall`, {
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
            recipes.set(`crafting/slabs/${name}_slab`, {
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
                recipes.set(`stonecutting/slabs/${name}_slab`, {
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
            recipes.set(`crafting/stairs/${name}_stairs`, {
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
                recipes.set(`stonecutting/stairs/${name}_stairs`, {
                    "type": "minecraft:stonecutting",
                    "ingredient": {
                        "item": `${mod_id}:${name}`
                    },
                    "result": `${mod_id}:${name}_stairs`,
                    "count": 1
                });
            break;
        }
    }

    recipes.forEach((v, k, m) => {
        fs.writeFile(`${dirs.recipes}${k}.json`, JSON.stringify(v), (err, result) => {
            if (err) console.log(err);
        });
    });
}

function create_dye_recipe(name, block, dye) {
    let recipes = new Map();
    recipes.set(`crafting/blocks/${name}`, {
        "type": "minecraft:crafting_shaped",
        "pattern": [
            "bbb",
            "bXb",
            "bbb"
        ],
        "key": {
            "b": {
                "item": `${mod_id}:${block}`
            },
            "X": {
                "item": `minecraft:${dye}_dye`
            }
        },
        "result": {
            "item": `${mod_id}:${name}`,
            "count": 8
        }
    });

    recipes.forEach((v, k, m) => {
        fs.writeFile(`${dirs.recipes}crafting/blocks/${name}.json`, JSON.stringify(v), (err, result) => {
            if (err) console.log(err);
        })
    })
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
                        "name": (drops == 'self') ? `${mod_id}:${name}` : `${mod_id}:${drops}`
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

    fs.writeFile(`${dirs.loot_tables}${name}.json`, JSON.stringify(table), (err, result) => {
        if (err) console.log(err);
    });
}

function addTags(map) {
    map.forEach((v, k, m) => {
        readFile(`${dirs.tags}blocks/${k}.json`, `{"replace": false,"values": []}`)
            .then(data => {
                let json = JSON.parse(data);

                for (let i in v)
                    if (!json.values.includes(`${mod_id}:${v[i]}`))
                        json.values.push(`${mod_id}:${v[i]}`);

                writeToFile(`${dirs.tags}blocks/${k}.json`, JSON.stringify(json))
                    .catch(err => console.log(err));            
            })
            .catch(err => console.log(err));
        
        readFile(`${dirs.tags}items/${k}.json`, `{"replace": false,"values": []}`)
            .then(data => {
                let json = JSON.parse(data);

                for (let i in v)
                    if (!json.values.includes(`${mod_id}:${v[i]}`))
                        json.values.push(`${mod_id}:${v[i]}`);

                writeToFile(`${dirs.tags}items/${k}.json`, JSON.stringify(json))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });
}

/**
 * 
 * @param {String} name 
 * @param {{wall:boolean,slab:boolean,stairs:boolean,dyed:boolean,drops:string}} options 
 */
function generate(name, options = {}) {
    console.log(name);
    console.log(options);

    const registryName = name.replace(/\s/g, '').toLowerCase();
    let json = {};

    create_blockstate(registryName, 'block');
    create_block_model(registryName, null);
    create_item_model(registryName, null);

    if (!!options.drops)
        create_loot_table(registryName, options.drops);
    else
        create_loot_table(registryName);

    json[`block.${mod_id}.${registryName}`] = name;

    if (!!options.wall) {
        create_blockstate(registryName, 'wall');
        create_block_model(registryName, 'wall');
        create_item_model(registryName, 'wall');
        create_recipe(registryName, 'wall', 'rock');
        create_loot_table(`${registryName}_wall`);
        json[`block.${mod_id}.${registryName}_wall`] = `${name} Wall`;
    }
    if (!!options.slab) {
        create_blockstate(registryName, 'slab');
        create_block_model(registryName, 'slab');
        create_item_model(registryName, 'slab');
        create_recipe(registryName, 'slab', 'rock');
        create_loot_table(`${registryName}_slab`);
        json[`block.${mod_id}.${registryName}_slab`] = `${name} Slab`;
    }
    if (!!options.stairs) {
        create_blockstate(registryName, 'stairs');
        create_block_model(registryName, 'stairs');
        create_item_model(registryName, 'stairs');
        create_recipe(registryName, 'stairs', 'rock');
        create_loot_table(`${registryName}_stairs`);
        json[`block.${mod_id}.${registryName}_stairs`] = `${name} Stairs`;
    }

    if (!!options.dyed) {
        options.dyed = false;
        let arr = [];
        for (let i in dyes) {
            let a = dyes[i].split('_');

            for (let b in a) {
                a[b] = `${a[b][0].toUpperCase()}${a[b].slice(1)}`;
            }

            arr.push(generate(`${a.join(' ')} Stained ${name}`, options));
            create_dye_recipe(`${dyes[i].replace('_', '')}stained${registryName}`, registryName, dyes[i]);
        }

        for (let i in arr) {
            for (let item in arr[i]) {
                json[item] = arr[i][item];
            }
        }
    }

    return json;
}

function readFile(path, defaultText = '') {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    writeToFile(path, defaultText)
                        .then(() => resolve({}))
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

function writeToFile(path, str) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, str, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function langs(jsonArr) {
    return new Promise((resolve, reject) => {
        fs.readFile(dirs.lang, 'utf8', (err, data) => {
            if (err)
                reject(err);
            else {
                let json = (data)
                    ? JSON.parse(data)
                    : {};

                for (let i in jsonArr) {
                    for (let item in jsonArr[i]) {
                        json[item] = jsonArr[i][item];
                    }
                }

                resolve(writeToFile(dirs.lang, JSON.stringify(json)));
            }
        });
    });
}

function generateBlocks(list) {
    let jsons = [];
    for (let item in list) {
        jsons.push(generate(list[item].name, list[item].options));
    }

    return langs(jsons);
}

function generateOres(list) {
    let jsons = [];
    for (let item in list) {
        jsons.push(generate(list[item].name, list[item].options));
    }

    return langs(jsons);
}

function etcLangs(list) {
    let json = {};
    for (let i in list) {
        json[list[i].registryName] = list[i].name;
    }
    console.log(json);
    langs([json]);
}

const blocks = [
    { name: "Test Block", options: { slab: true, stairs: true, wall: true } }
];

const ores = [
    { name: "Test Ore", options: { drops: 'testitem' } }
]

const groups = [
    { registryName: `itemGroup.${mod_id}_blocks`, name: "Redemption | Blocks" },
    { registryName: `itemGroup.${mod_id}_items`, name: "Redemption | Items" }
];

generateBlocks(blocks)
    .then(() => {
        generateOres(ores)
            .then(() => {
                etcLangs(groups);
                addTags(tagValues);
            })
            .catch(e => console.log(e));
    })
    .catch(e => console.log(e));