const fs = require('fs');

function checksum(lines) {
    let twos = 0;
    let threes = 0;

    lines.forEach(line => {
        const letters = {};
        line.split('').forEach(ch => letters[ch] = (letters[ch] || 0) + 1);
        let hasTwo = false;
        let hasThree = false;
        for (ch in letters) {
            if (letters[ch] === 2) {
                hasTwo = true;
            }
            if (letters[ch] === 3) {
                hasThree = true;
            }
        }

        if (hasTwo) {
            twos++;
        }

        if (hasThree) {
            threes++;
        }
    });

    console.log(`${twos} twos, ${threes} threes => checksum = ${twos * threes}`);
}

function diff(a, b) {
    let diff = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            diff.push(i);
        }
    }
    return diff;
}

function checkdiff(lines) {
    for (let i=0;i<lines.length-1;i++) {
        for (let j=i+1;j<lines.length;j++) {
            let diffPos = diff(lines[i], lines[j]);
            if (diffPos.length === 1) {
                let id = lines[i].split('');
                id.splice(diffPos[0], 1);
                id = id.join('');
                console.log('Box id:', id);
                return;
            }
        }
    }
}

fs.readFile('./input/input2.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n');

    checksum(lines);

    checkdiff(lines);
    
});