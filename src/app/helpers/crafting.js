module.exports = (type) => {
    switch (type) {
        case "shaped": return "minecraft:crafting_shaped";
        case "shapeless": return "minecraft:crafting_shapeless";
    }
    return "minecraft:crafting_shaped"
}