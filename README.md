# Documentation

You must create the following files in root:

`config.json`
```
{
    "mod_id": "examplemod",
    "author": "ExampleAuthor",
    "path": "C:/MyDirectory/ExampleMod/"
}
```

`blocks.json`
This includes the pattern. An empty JSON Array works too.
[
    { "name": "Concrete", "options": 15 }
]

`groups.js`
```
const main = require('./main');
const mod_id = main.mod_id;

// This includes the pattern. An empty JSON Array works too.
const groups = [
    { registryName: `itemGroup.${mod_id}_blocks`, name: "Redemption | Blocks" }
];

module.exports = groups;
```

`recipes.json`
This includes the pattern. An empty JSON Array works too.
```
[
    {
        "options": 1,
        "type": "shaped",
        "pattern": "xxx;xdx;xxx",
        "key": {
            "x": "minecraft:brick",
            "d": "{dyeItem}"
        },
        "result": "{mod_id}:{dye}_brick;8"
    }
]
```