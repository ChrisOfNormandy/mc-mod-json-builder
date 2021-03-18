const fs = require('fs');
const { mod_id, mod_name, author } = require('../../src/app/vars/mod');

let content = [
    `# The name of the mod loader type to load - for regular FML @Mod mods it should be javafml`,
    `modLoader="javafml" #mandatory`,
    `# A version range to match for said mod loader - for regular FML @Mod it will be the forge version`,
    `loaderVersion="[34,)" #mandatory This is typically bumped every Minecraft version by Forge. See our download page for lists of versions.`,
    `# The license for you mod. This is mandatory metadata and allows for easier comprehension of your redistributive properties.`,
    `# Review your options at https://choosealicense.com/. All rights reserved is the default copyright stance, and is thus the default here.`,
    `license="All rights reserved"`,
    `# A URL to refer people to when problems occur with this mod`,
    `issueTrackerURL="http://my.issue.tracker/" #optional`,
    `# A list of mods - how many allowed here is determined by the individual mod loader`,
    `[[mods]] #mandatory`,
    `# The modid of the mod`,
    `modId="${mod_id}" #mandatory`,
    `# The version number of the mod - there's a few well known \${} variables useable here or just hardcode it`,
    `version="\${file.jarVersion}" #mandatory`,
    ` # A display name for the mod`,
    `displayName="${mod_name} Mod" #mandatory`,
    `# A URL to query for updates for this mod. See the JSON update specification <here>`,
    `updateJSONURL="http://myurl.me/" #optional`,
    `# A URL for the "homepage" for this mod, displayed in the mod UI`,
    `displayURL="http://www.syren-dev.tech" #optional`,
    `# A file name (in the root of the mod JAR) containing a logo for display`,
    `logoFile="examplemod.png" #optional`,
    `# A text field displayed in the mod UI`,
    `credits="Thanks for this example mod goes to Java" #optional`,
    `# A text field displayed in the mod UI`,
    `authors="${author}" #optional`,
    `# The description text for the mod (multi line!) (#mandatory)`,
    `description='''`,
    `Here, have a mod description... Grr.`,
    `'''`,
    `# A dependency - use the . to indicate dependency for a specific modid. Dependencies are optional.`,
    `[[dependencies.${mod_id}]] #optional`,
    `    # the modid of the dependency`,
    `    modId="forge" #mandatory`,
    `    # Does this dependency have to exist - if not, ordering below must be specified`,
    `    mandatory=true #mandatory`,
    `    # The version range of the dependency`,
    `    versionRange="[34,)" #mandatory`,
    `    # An ordering relationship for the dependency - BEFORE or AFTER required if the relationship is not mandatory`,
    `    ordering="NONE"`,
    `    # Side this dependency is applied on - BOTH, CLIENT or SERVER`,
    `    side="BOTH"`,
    `[[dependencies.${mod_id}]] #optional`,
    `    # the modid of the dependency`,
    `    modId="conlib" #mandatory`,
    `    # Does this dependency have to exist - if not, ordering below must be specified`,
    `    mandatory=true #mandatory`,
    `    # The version range of the dependency`,
    `    versionRange="[1,)" #mandatory`,
    `    # An ordering relationship for the dependency - BEFORE or AFTER required if the relationship is not mandatory`,
    `    ordering="AFTER"`,
    `    # Side this dependency is applied on - BOTH, CLIENT or SERVER`,
    `    side="BOTH"`
];

module.exports = (path) => {
    let data = '';
    content.forEach((line, index) => {
        data += `${line}`;
        if (index < content.length - 1)
            data += '\n';
    });

    return new Promise((resolve, reject) => {
        fs.writeFile(`${path}/mods.toml`, data, (err) => {
            if (err)
                reject(err);
            else
                resolve(true);
        });
    });
}