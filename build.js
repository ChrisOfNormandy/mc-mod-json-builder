const fs = require('fs');

const add = require('./src/app/helpers/files/add');
const read = require('./src/app/helpers/files/read');
const writeQueue = require('./src/app/helpers/files/writeQueue');

const config = require('./build_configs/config.json');
const { path } = require('./build_configs/config.json');
const generateBlock = require('./src/app/generators/block');
const generateItem = require('./src/app/generators/item');
const addTags = require('./src/app/tags');
const recipe = require('./src/app/recipe');
const recipeMap = recipe.recipeMap;
const dirs = require('./src/app/vars/dirs');

let tagValues = new Map();

function addrecipeMap(map) {
    return new Promise((resolve, reject) => {
        let name = '', count = null;

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

            add(`${dirs.recipes}/${k.path}`, `${name}.json`, JSON.stringify(v));
        });

        resolve(map);
    });
}

function langs(jsonArr) {
    return new Promise((resolve, reject) => {
        read(dirs.lang, `en_us.json`, '{}')
            .then(data => {
                let json = JSON.parse(data);

                for (let i in jsonArr) {
                    for (let item in jsonArr[i])
                        json[item] = jsonArr[i][item];
                }

                add(dirs.lang, `en_us.json`, JSON.stringify(json));

                resolve(json);
            })
            .catch(err => reject(err));
    });
}

function generateBlocks(list) {
    let jsons = [];

    for (let item in list) {
        const v = generateBlock(list[item].name, list[item].options, list[item].drops);
        jsons.push(v.json);

        v.map.forEach((v, k, m) => {
            if (!tagValues.has(k))
                tagValues.set(k, []);
            tagValues.get(k).push(v);
        });
    }

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
    for (let i in list)
        json[list[i].registryName] = list[i].name;
    return [json];
}

const buildPath = config.build_path;
const blocks = require(`${buildPath}/blocks.json`);
const items = require(`${buildPath}/items.json`);
const groups = require(`${buildPath}/groups`);
const recipes = require(`${buildPath}/recipes.json`);

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

    return new Promise((resolve, reject) => {
        langs(jsons)
            .then(res => resolve({
                blocks: b,
                items: i,
                groups: e,
                langs: res
            }))
            .catch(err => reject(err));
    });
}

function _() {
    let start = Date.now();
    let old, now;
    let ellapsed = 0;

    if (!fs.existsSync(`${path}/META-INF`)) {
        console.log('Creating missing dir for META-INF.');
        fs.mkdir(`${path}/META-INF`, { recursive: true }, (err) => {
            if (err)
                console.error(err);
            else 
                _();
        });        
    }
    else if (!fs.existsSync(`${path}/META-INF/mods.toml`)) {
        console.log('Creating missing file: mods.toml');
        require('./src/app/toml')(`${path}/META-INF`)
            .then(() => _())
            .catch(err => console.error(err));   
    }
    else if (!fs.existsSync(`${path}/pack.mcmeta`)) {
        console.log('Creating missing file: pack.mcmeta');
        require('./src/app/mcmeta')(path)
            .then(() => _())
            .catch(err => console.error(err));
    }
    else {
        old = Date.now();
        generateAll()
            .then(res => {
                now = Date.now();
                old = now;
                ellapsed = Math.abs(now - old);
                console.log(`Finished composing data and langs for ${res.blocks.length} blocks, ${res.items.length} items and ${res.groups.length} groups.`);
                console.log(tagValues);
                addTags(tagValues);
                now = Date.now();
                old = now;
                ellapsed = Math.abs(now - old);
                console.log(`Finished tag generation in ${ellapsed} ms.`);

                current = Date.now();
                for (let i in recipes)
                    recipe.convert(recipes[i]);
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
                        writeQueue()
                            .then(data => {
                                let end = Date.now();
                                now = Date.now();
                                ellapsed = Math.abs(now - old);
                                console.log(`Finished writing files in ${ellapsed} ms.`);

                                ellapsed = Math.abs(end - start);
                                console.log(`Finished resource build in ${ellapsed} ms.`);
                                console.log(`Passed: ${data.passed}\nFailed: ${data.failed}`);
                            })
                            .catch(err => console.error(err));
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }
}

_();