const fs = require('fs');

fs.readFile('./input/input3.txt', 'utf8', (err, data) => {
    const claims = data.trim().split('\n').map(line => {
        let [, id, x, y, w, h] = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/.exec(line);
        return [id, x, y, w, h].map(str => Number(str));
    });

    const fabric = [];
    for (let i = 0; i < 1000; i++) {
        let row = [];
        for (let j = 0; j < 1000; j++) {
            row.push(0);
        }
        fabric.push(row);
    }

    

    claims.forEach(([id, x, y, w, h]) => {
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + h; j++) {
                fabric[i][j]++;
            }
        }
    });

    let overlap = 0;

    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            if (fabric[i][j] > 1) {
                overlap++;
            }
        }
    }

    console.log('Overlap', overlap);

    let noOverlap = null;

    claims.forEach(([id, x, y, w, h]) => {
        for (let i = x; i < x + w; i++) {
            for (let j = y; j < y + h; j++) {
                if (fabric[i][j] > 1) {
                    return;
                }
            }
        }
        noOverlap = id;
    });




    console.log('No Overlap', noOverlap);



});