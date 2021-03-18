const add = require('./helpers/files/add');
const { getShortName } = require('./helpers/names');
const dirs = require('./vars/dirs');

/**
 * 
 * @param {string} registryName
 * @param {{name: string, count: number}} drops 
 */
function create(registryName, drops = { name: 'self', count: 1 }) {
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

    add(dirs.loot_tables, `${name}.json`, JSON.stringify(table));
}

module.exports = create;