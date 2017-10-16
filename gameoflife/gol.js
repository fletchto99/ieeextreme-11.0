var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let first = true;

let board = [];
let c = 0;
let row = 0;
let width = -1;
let height = -1;

rl.on('line', line => {
    if(first) {
        first = false;
        let split = line.split(" ");
        width = parseInt(split[1])
        height = parseInt(split[0])
        c = parseInt(split[2]);
        return;
    }
    board.push(line.split("").map(item => item == '*' ? 1 : 0));
    row++;
});

rl.on('close', () => main(board, c));

let main = (board, iterations) => {

    for(let i = 0; i < iterations; i++) {
        // let nextGenBoard = board.map(function (arr) {
        //     return arr.slice(0);
        // });

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {

                // let count = 0;

                // let col_left = col-1 < 0 ? width-1 : col-1;
                // let col_right = col+1 == width ? 0 : col+1;
                // let row_above = row-1 < 0 ? height-1 : row-1;
                // let row_below = row+1 == height ? 0 : row+1;

                // board[row_above][col_left] === 1 && count++;
                // board[row_above][col] === 1 && count++;
                // board[row_above][col_right] === 1 && count++;
                // board[row][col_left] === 1 && count++;
                // board[row][col_right] === 1 && count++;
                // board[row_below][col_left] === 1 && count++;
                // board[row_below][col] === 1 && count++;
                // board[row_below][col_right] === 1 && count++;

                // if (count < 2 && board[row][col] === 1) {
                //     nextGenBoard[row][col] = 0;
                // } else if (count > 3 && board[row][col] === 1) {
                //     nextGenBoard[row][col] = 0;
                // } else if (count == 3 && board[row][col] === 0) {
                //     nextGenBoard[row][col] = 1;
                // }
            }
        }

        // board = nextGenBoard;
    }
    board.forEach(row => console.log(row.map(item => item == 1 ? '*' : '-').join('')))

};
