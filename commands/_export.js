const fs = require('fs');
const colors = require('colors')

let path = 'commands/';

let commands = [];

let counter = 0;
let fcounter = 0;
let icounter = 0;

console.log('\nCollecting files ...\n'.bold.blue)
let files = fs.readdirSync(path)

files.forEach( file => {
    if (!file.match('^_')) {
        if (file.match('.\\w+$')[0] === '.js') {
            commands.push(require(`../${path}${file}`))
            counter++
            console.log(`Loading ${file} ...`.green)
        } else {
            fcounter++
            console.log(`Warning: Found non-js file: ${file}`.red)
        }
    } else {
        icounter++
        console.log(`Ignoring ${file}`.yellow)
    }
});

console.log(`\nLoaded ${counter} commands!`.bold.underline.green);
console.log(`Failed to load ${fcounter} files.`.bold.underline.red)
console.log(`Ignored ${icounter} files.\n`.bold.underline.yellow)

module.exports = commands