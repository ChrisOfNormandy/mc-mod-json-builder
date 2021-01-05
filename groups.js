const main = require('./main');
const mod_id = main.mod_id;

const groups = [
    { registryName: `itemGroup.${mod_id}_blocks`, name: "Redemption | Blocks" },
    { registryName: `itemGroup.${mod_id}_slabs`, name: "Redemption | Slabs" },
    { registryName: `itemGroup.${mod_id}_stairs`, name: "Redemption | Stairs" },
    { registryName: `itemGroup.${mod_id}_walls`, name: "Redemption | Walls" },
    { registryName: `itemGroup.${mod_id}_items`, name: "Redemption | Items" }
];

module.exports = groups;