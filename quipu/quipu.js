var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let first = true;

let t = -1;
let a = -1;
let b = -1;
let ds = [];

rl.on('line', line => {
    if (first) {
        line.split(" ").forEach((num, idx) => {
            if (idx == 0) {
                t = parseInt(num);
            } else if (idx == 1) {
                a = parseInt(num)
            } else {
                b = parseInt(num);
            }
        })
        first = false;
    } else {
       ds.push(parseInt(line));
    }
    if (ds.length == t) {
        main(a, b, ds);
    }
})

let main = (a, b, ds) => {
    ds.forEach(d => {
        console.log(quipu(a,b,d));
    });
}

let quipu = (a,b, d) => {
    let count = 0;
    for (let i = 1; i < b+2; ++i) {
        for (let j = i; j < b+2; j += i) {
            if (j % d == 0 && i % d == 0) {
               continue;
            }
            if (j >= a && j <= b) {
                count++;
            }
        }
    }
    return count;
}
