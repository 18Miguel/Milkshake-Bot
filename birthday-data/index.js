const { existsSync, readFileSync, writeFileSync } = require('fs');

/* Loads JSON data into a string */
function loadJSON(filename = ''){
    return JSON.parse(
        existsSync(filename)
            ? readFileSync(filename).toString()
            : '""'
    );
}

/* Save json data in filename */
function saveJSON(filename = '', json = '""'){
    return writeFileSync(filename, JSON.stringify(json, null, 4));
}

/* [input] dd/mm/yyyy, dd.mm.yyyy or dd-mm-yyyy */
function isValidDate(stringdate){
    let separators = ['\\.', '\\-', '\\/'];
    let bits = stringdate.split(new RegExp(separators.join('|'), 'g'));
    let date = new Date(bits[2], bits[1] - 1, bits[0]);
    return date.getFullYear() == bits[2] && date.getMonth() + 1 == bits[1];
};

module.exports = { loadJSON, saveJSON, isValidDate };