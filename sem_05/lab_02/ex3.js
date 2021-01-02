"use strict";

let exec = function(cnt, delay) {
    console.log(++cnt);

    if (cnt === 10) {
        delay = 2000;
    }

    if (cnt === 20) {
        cnt = 0;
        delay = 1000;
    }

    setTimeout(exec, delay, cnt, delay);
}

function main() {
    exec(0, 1000);
}

main();
