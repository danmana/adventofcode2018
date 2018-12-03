const fs = require('fs');

fs.readFile('./input/input1.txt', 'utf8', (err, data) => {
    const numbers = data.trim().split('\n').map(line => Number(line));
    let total = 0;

    numbers.forEach(n => total += n);

    console.log('Total:', total);


    let seen = { 0: true };
    let i = 0;
    total = 0;

    while (true) {
        total += numbers[i];

        if (seen[total]) {
            console.log('First Duplicate:', total);
            break;
        }

        seen[total] = true;

        i = (i + 1) % numbers.length;
    }
});