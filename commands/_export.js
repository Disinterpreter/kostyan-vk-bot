const fs = require('fs');

let path = 'commands/';

let commands = [];

let counter = 0;
let fcounter = 0;
let icounter = 0;

console.log('\nCollecting files ...')
let files = fs.readdirSync(path)

files.forEach( file => {
    if (!file.match('^_')) {
        if (file.match('.\\w+$')[0] === '.js') {
            commands.push(require(`../${path}${file}`))
            counter++
            console.log(`Loading ${file} ...`)
        } else {
            fcounter++
            console.log(`Warning: Found non-js file: ${file}`)
        }
    } else {
        icounter++
        console.log(`Ignoring ${file}`)
    }
});

console.log(`\nLoaded ${counter} commands!\nFailed to load ${fcounter} files.\nIgnored ${icounter} files.\n`);

module.exports = commands