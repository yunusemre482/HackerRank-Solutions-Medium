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
 * Complete the 'surfaceArea' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY A as parameter.
 */

function handleDirectionAre(A, row, col, num_rows, num_cols) {
    return {
        calculater: (x, y) => {
            if (x >= 0 && x < num_rows && y >= 0 && y < num_cols) return Math.min(A[row][col], A[x][y]);
            return 0
        },
        calculateArea: (size) => {
            return 4 * size + 2;
        }
    }
}

//Main function to calculate the surface area
function surfaceArea(A) {
    const num_rows = A.length;
    const num_cols = A[0].length;

    let area = 0;

    for (let row = 0; row < num_rows; row++) {
        for (let col = 0; col < num_cols; col++) {
            const { calculater, calculateArea } = handleDirectionAre(A, row, col, num_rows, num_cols);     
            
            let currentArea=calculateArea(A[row][col]);
            
            currentArea -= calculater(row, col - 1);
            currentArea -= calculater(row, col + 1);
            currentArea -= calculater(row - 1, col);
            currentArea -= calculater(row + 1, col);
            
            area += currentArea;
            //Check if the current cell has a neighbour in any direction

        }
    }

    return area;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const H = parseInt(firstMultipleInput[0], 10);

    const W = parseInt(firstMultipleInput[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    const result = surfaceArea(A);

    ws.write(result + '\n');

    ws.end();
}
