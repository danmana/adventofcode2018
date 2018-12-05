const fs = require('fs');

fs.readFile('./input/input4.txt', 'utf8', (err, data) => {
    const lines = data.trim().split('\n').sort();

    function newMinutesArray() {
        const minutes = [];
        for (let i=0;i<60;i++) {
            minutes.push(0);
        }
        return minutes;
    }

    const guards = {};
    let guardId = null;
    let asleepSince = null;

    lines.forEach(line => {
        let [, id] = /.* Guard #(\d+) begins shift/.exec(line) || [];
        if (id) {
            guardId = Number(id);
        } else {
            guard = guards[guardId];
            if (!guard) {
                guard = newMinutesArray();
                guards[guardId] = guard;
            } 

            let [, hour, minute, action] = /\[.* (\d+):(\d+)\] (falls asleep|wakes up)/.exec(line);
            if (hour === '00') {
                if (action === 'falls asleep') {
                    asleepSince = minute;
                } else {
                    for (let i=Number(asleepSince);i<Number(minute);i++) {
                        guard[i]++;
                    }
                }

            }
        }
    });

    function getSleepiestMinute(guard) {
        let sleepiestMinute = 0;
        for (let i = 0; i < 60; i++) {
            if (guard[i] > guard[sleepiestMinute]) {
                sleepiestMinute = i;
            }
        }
        return sleepiestMinute;
    }

    let maxAsleep = 0;
    let sleepiestGuardId = null;
    for (let guardId in guards) {
        let guard = guards[guardId];
        let sleepTime = 0;
        for (let i = 0; i < 60; i++) {
            sleepTime += guard[i];
        }

        if (sleepTime > maxAsleep) {
            maxAsleep = sleepTime;
            sleepiestGuardId = guardId;
        }
    }
    
    let sleepiestMinute = getSleepiestMinute(guards[sleepiestGuardId]);

    console.log('Strategy 1:', sleepiestGuardId * sleepiestMinute);

    for (let guardId in guards) {
        let guard = guards[guardId];
        let min = getSleepiestMinute(guard);
        if (guard[min] > guards[sleepiestGuardId][sleepiestMinute]) {
            sleepiestMinute = min;
            sleepiestGuardId = guardId;
        }
    }

    console.log('Strategy 2:', sleepiestGuardId * sleepiestMinute);
});