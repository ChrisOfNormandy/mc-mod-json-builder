const fs = require('fs');
const dirs = require('./src/app/vars/dirs');

function reset() {
    fs.rm(dirs.blockstates, {recursive: true}, (err) => {
        if (err)
            console.error(err);
    });
    fs.rm(dirs.block_models, {recursive: true}, (err) => {
        if (err)
            console.error(err);
    });
    fs.rm(dirs.item_models, {recursive: true}, (err) => {
        if (err)
            console.error(err);
    });
    fs.rm(dirs.loot_tables, {recursive: true}, (err) => {
        if (err)
            console.error(err);
    });
    fs.rm(dirs.recipes, {recursive: true}, (err) => {
        if (err)
            console.error(err);
    });
    fs.rm(dirs.tags, {recursive: true}, (err) => {
        if (err)
            console.error(err);
    });
    fs.rm(dirs.lang, {recursive: true}, (err) => {
        if (err)
            console.error(err);
    });
}

reset();