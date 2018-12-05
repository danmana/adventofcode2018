const fs = require('fs');

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

function reactOld(data) {
    let chars = data.split('');
    let i = 0;

    function context() {
        let size = 5;
        let before = chars.slice(Math.max(i - size, 0), Math.max(0, i)).join('');
        let after = chars.slice(Math.min(i + 2, chars.length - 1), Math.min(i + 2 + size, chars.length - 1)).join('');
        let focus = chars[i] + chars[i + 1];
        return `${before}-${focus}-${after}`;
    }


    while (i < chars.length - 1) {
        if (chars[i].toLowerCase() === chars[i + 1].toLowerCase() && chars[i] !== chars[i + 1]) {
            chars.splice(i, 2);
            if (i > 0) {
                i--;
            }
        } else {
            i++;
        }
    }

    return chars.join('');
}

function react(data) {
    let lastLenght = data.length;
    let polymers = '';

    for (let i = 0; i < letters.length; i++) {
        let ch = letters[i];
        polymers += '|' + ch + ch.toUpperCase() + '|' + ch.toUpperCase() + ch;
    }
    polymers = new RegExp(polymers.slice(1), 'g');

    do {
        lastLenght = data.length;
        data = data.replace(polymers, '');
    } while (data.length !== lastLenght);

    return data;
}




fs.readFile('./input/input5.txt', 'utf8', (err, data) => {
    data = data.trim();

    const polymer = react(data);

    console.log('Solution 1:', polymer.length);

    let minLength = data.length;
    let problem = '';

    for (let i = 0; i < letters.length; i++) {
        let testData = data.replace(new RegExp(letters[i], 'gi'), '');
        let testLength = react(testData).length;
        if (testLength < minLength) {
            minLength = testLength;
            problem = letters[i];
        }
    }

    console.log('Problem:', problem, minLength);

});