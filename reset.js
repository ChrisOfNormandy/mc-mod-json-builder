const fs = require('fs');
const dirs = require('./main').dirs;

function reset() {
    fs.rm(dirs.blockstates, {recursive: true}, (err, result) => {
        if (err)
            console.log(err);
    });
    fs.rm(dirs.block_models, {recursive: true}, (err, result) => {
        if (err)
            console.log(err);
    });
    fs.rm(dirs.item_models, {recursive: true}, (err, result) => {
        if (err)
            console.log(err);
    });
    fs.rm(dirs.loot_tables, {recursive: true}, (err, result) => {
        if (err)
            console.log(err);
    });
    fs.rm(dirs.recipes, {recursive: true}, (err, result) => {
        if (err)
            console.log(err);
    });
    fs.rm(dirs.tags, {recursive: true}, (err, result) => {
        if (err)
            console.log(err);
    });
    fs.rm(dirs.lang, {recursive: true}, (err, result) => {
        if (err)
            console.log(err);
    });
}

reset();