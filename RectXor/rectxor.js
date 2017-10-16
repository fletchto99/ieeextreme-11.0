var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let grids = [];
let first = false;

rl.on('line', line => {
    if (!first) {
        first = true;
        return;
    }
    let vals = line.split(' ');
    grids.push({
        l: parseInt(vals[0]),
        h: parseInt(vals[1]),
        n: parseInt(vals[2]),
        d1: parseInt(vals[3]),
        d2: parseInt(vals[4])
    });
})

rl.on('close', ()=>main(grids));

let f = (a) => {
     let res = [a,1,a+1,0];
     return res[a%4];
}

let getXor = (a, b) => {
     return f(b)^f(a-1);
}


let main = () => {
    grids.forEach(grid => {
        //start and end X values must be computed after since we don't know where either is in the row
        let mb_start_x = (grid.d1-grid.n) % grid.l;
        let mb_end_x = (grid.d2-grid.n) % grid.l;

        //Find the start and end x's
        let start_x = Math.min(mb_start_x, mb_end_x);
        let end_x = Math.max(mb_start_x, mb_end_x);

        //find where the inner rectangle rows start
        let start_y = Math.floor((grid.d1-grid.n) / grid.l);
        let end_y = Math.floor((grid.d2-grid.n) / grid.l);

        //compute the length of the grid
        let len = grid.l * grid.h;

        //compute all rows before & after the middle rectangle
        let a = grid.n;
        let b = grid.n+start_y*grid.l-1;
        let c = grid.n + ((end_y+1) * grid.l);
        let d = grid.n + len -1;

        let xor = 0;

        //only xor the top partition if inner rectangle isn't in the first row
        if (start_y != 0)
            xor ^= getXor(a,b);


        for(let i = start_y; i <= end_y; i++) {

            //some maths to compute start & end of xor
            let start_left = grid.n + (i*grid.l);
            let end_left = start_left + start_x - 1;
            let start_right = start_left + end_x + 1;
            let end_right = start_left + grid.l - 1;

            //xor left partition, row by row
            if (start_x != 0) {
                xor ^= getXor(start_left, end_left)
            }

            //xor right partition,  row by row
            if (end_x != grid.l) {
                xor ^= getXor(start_right, end_right)
            }

        }

        //xor bottom partition
        if (end_y != len / grid.l)
            xor ^= getXor(c,d);



        console.log(xor);
    })
};
