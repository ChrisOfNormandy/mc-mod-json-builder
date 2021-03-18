const add = require('./helpers/files/add');
const { getShortName } = require('./helpers/names');
const dirs = require('./vars/dirs');
const { mod_id } = require('./vars/mod')

function getWall(name) {
    return {
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
}

function getSlab(name) {
    return {
        "variants": {
            "type=bottom": { "model": `${mod_id}:block/${name}_slab` },
            "type=top": { "model": `${mod_id}:block/${name}_slab_top` },
            "type=double": { "model": `${mod_id}:block/${name}` }
        }
    }
}

function getStairs(name) {
    return {
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
}

function getFence(name) {
    return {
        "multipart": [
            { "apply": { "model": `${mod_id}:block/${name}_fence_post` } },
            {
                "when": { "north": "true" },
                "apply": { "model": `${mod_id}:block/${name}_fence_side`, "uvlock": true }
            },
            {
                "when": { "east": "true" },
                "apply": { "model": `${mod_id}:block/${name}_fence_side`, "y": 90, "uvlock": true }
            },
            {
                "when": { "south": "true" },
                "apply": { "model": `${mod_id}:block/${name}_fence_side`, "y": 180, "uvlock": true }
            },
            {
                "when": { "west": "true" },
                "apply": { "model": `${mod_id}:block/${name}_fence_side`, "y": 270, "uvlock": true }
            }
        ]
    }
}

/**
 * 
 * @param {string} registryName Parent item - do not include "_stairs" or other endings.
 * @param {string} type wall | slab | stairs | fence | default = Block
 */
function create(registryName, type) {
    const tagValues = new Map();
    const name = getShortName(registryName);

    let blockstate, fileName;

    switch (type) {
        case 'wall': {
            blockstate = getWall(name);
            fileName = `${name}_wall`;
            tagValues.set('walls', [`${name}_wall`]);
            break;
        }
        case 'slab': {
            blockstate = getSlab(name);
            fileName = `${name}_slab`;
            tagValues.set('slabs', [`${name}_slab`]);
            break;
        }
        case 'stairs': {
            blockstate = getStairs(name);
            fileName = `${name}_stairs`;
            tagValues.set('stairs', [`${name}_stairs`]);
            break;
        }
        case 'fence': {
            blockstate = getFence(name);
            fileName = `${name}_fence`;
            tagValues.set('fences', [`${name}_fence`]);
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

    add(dirs.blockstates, `${fileName}.json`, JSON.stringify(blockstate));
    
    return tagValues;
}

module.exports = create;