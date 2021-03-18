const dyes = require('../vars/dyes.json');

function dyeCombo(dye1, dye2) {
    if (dye1 == dye2)
        return dye1;
    
    let d1 = Math.pow(2, dyes.indexOf(dye1));
    let d2 = Math.pow(2, dyes.indexOf(dye2));

    switch (d1 + d2) {
        // Red combos
        case 5: return dyes[1];
        case 17: return dyes[15];
        case 129: return dyes[9];
        case 2049: return dyes[10];
        
    }
}

module.exports = {
    dyeCombo
}