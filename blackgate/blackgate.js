var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let crews = {};
let count = 0;
let max = -1;

rl.on('line', line => {
    if (count !== 0) {
        items = line.split(" ");

        //super hax to optimize sorting
        if (crews[items[1]]) {
            crews[items[1]].members.push(items[0]);
        } else {
            crews[items[1]] = {
                members: [items[0]]
            }
        }
        if (count == max) {
            main(crews);
        }
    } else {
        max = parseInt(line)
    }
    count++;
})


let main = crews => {
    start = 1;
    for (let [_, crew] of Object.entries(crews)) {
        console.log(`${crew.members.sort().join(" ")} ${start} ${start + crew.members.length -1}`);
        start += crew.members.length;
    }
}
