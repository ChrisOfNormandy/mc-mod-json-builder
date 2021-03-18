# Documentation

You must create the following files in a directory one higher than this project, in `/build_configs`:

# Config
`config.json`
```json
{
    "mod_id": "MODNAME",
    "author": "Your Name",
    "path": "../path",
    "build_path": "./build_configs"
}
```

# Blocks
`blocks.json`
```json
[
    { "name": "Test Block", "options": 15 }
]
```

Should be an array of items following the structure exampled above.

`Options` is defined as:
```js
    16 | Fence
     8 | Wall
     4 | Stairs
     2 | Slab
     1 | Block
```

# Items

`items.json`
```json
[
    "Test Item"
]
```

# Groups
`groups.js`
```js
const { mod_id, mod_name } = require('./config.json');

module.exports = [
    {
        registryName: `itemGroup.${mod_id}_blocks`,
        name: `${mod_name} | Blocks`
    }
];
```

# Recipes
`recipes.json`
This includes the pattern. An empty JSON Array works too.
```json
[
    {
        "options": 6,
        "type": "blocks",
        "pattern": "stone",
        "result": "stone_slab"
    }
]
```

**Paterns**
> 1
```json
{
    "options": 1,
    "pattern": "bricks",
    "result": "mossy_bricks"
}
```

> 2
```json
{
    "options": 2,
    "pattern": "clay_ball",
    "result": "brick",
    "experience": 0.3,
    "cookingtime": 200
}
```

> 3
```json
{
    "options": 3,
    "block": true,
    "pattern": "stone",
    "result": "stone_bricks"
}
```

> 4
```json
{
    "options": 4,
    "pattern": "glass",
    "result": "{dye}_stained_glass"
}
```

> 5
```json
{
    "options": 5,
    "block": true,
    "pattern": "cobblestone",
    "result": "compressed_cobblestone"
}
```

> 6
```json
{
    "options": 6,
    "type": "blocks",
    "pattern": "stone",
    "result": "stone_slab"
}
```

`Options` is defined as:
```js
    6 | Stonecutting    // Stonecutting recipe
    5 | Compacted       // 3x3 recipe of 1 item
    4 | Dyed            // 8 items surrounding dye item
    3 | 2x2             // 2x2 recipe of 1 item
    2 | Smelted         // Furnace recipe 
    1 | Mossy           // Item combined with vines (shapeless)
```

Using `{dye}` in a name will generate a recipe for each dye type - 16 recipes total.

When no mod ID is provided, the id defined in `config.json` will be used. Else, the one provided - Ex: `minecraft:` - will be used.