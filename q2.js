'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function twoPluses(grid) {
    // Write your code here

    const n = grid.length;
    const m = grid[0].length;

    function getPlusSizes(x, y) {
        let sizes = [];
        let size = 0;
        while (x + size < n && grid[x + size][y] === 'G' &&
               x - size >= 0 && grid[x - size][y] === 'G' &&
               y + size < m && grid[x][y + size] === 'G' &&
               y - size >= 0 && grid[x][y - size] === 'G') {
            sizes.push(size);
            size++;
        }
        return sizes;
    }

    // visualization for this condition : https://visualize.darshanacharya.repl.co/
    function overlap(x1, y1, s1, x2, y2, s2) {
        for (let i = 0; i <= s1; i++) {
            if ((Math.abs(x1 + i - x2) <= s2 && y1 === y2) ||
                (Math.abs(x1 - i - x2) <= s2 && y1 === y2) ||
                (Math.abs(y1 + i - y2) <= s2 && x1 === x2) ||
                (Math.abs(y1 - i - y2) <= s2 && x1 === x2) ||
                (x1 + i === x2 && Math.abs(y1 - y2) <= s2) ||
                (x1 - i === x2 && Math.abs(y1 - y2) <= s2) ||
                (y1 + i === y2 && Math.abs(x1 - x2) <= s2) ||
                (y1 - i === y2 && Math.abs(x1 - x2) <= s2)) {
                return true;
            }
        }
        return false;
    }

    const pluses = [];
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            if (grid[x][y] === 'G') {
                const sizes = getPlusSizes(x, y);
                for (const size of sizes) {
                    pluses.push({ x, y, size });
                }
            }
        }
    }

    pluses.sort((a, b) => b.size - a.size);

    let result = 0;
    for (let i = 0; i < pluses.length; i++) {
        for (let j = i + 1; j < pluses.length; j++) {
            if (!overlap(pluses[i].x, pluses[i].y, pluses[i].size, pluses[j].x, pluses[j].y, pluses[j].size)) {
                result = Math.max(result, (4 * pluses[i].size + 1) * (4 * pluses[j].size + 1));
            }
        }
    }

    return result;
}





function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = twoPluses(grid);

    ws.write(result + '\n');

    ws.end();
}
