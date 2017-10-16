var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = [];

rl.on('line', line => {
    lines.push(line);
})

rl.on('close', ()=>main(lines))

let main = (lines) => {
    let books = []
    let topics = {}
    lines.forEach(line => {
        let vals = line.split(" ");
        let t = vals.splice(1);
        books.push({
            cost: vals[0],
            topics: t
        })
        t.forEach(topic => {
            if (!topics[topic]) {
                topics[topic] = {
                    cost: 1000000000000
                }
            }
        })
    })
    books.forEach(book => {
        let localCost = book.cost / book.topics.length;
        let passes = true;
        let topicsCost = 0;
        book.topics.forEach(topic => {
            topicsCost += topics[topic].cost;
        });
        console.log(topicsCost)
        if (topicsCost > book.cost) {
          book.topics.forEach(topic => (topics[topic].cost = localCost));
        }

    });
    let totalCost = 0;
    for (let [key, val] of Object.entries(topics)) {
      console.log(`${key}: ${val.cost}`)
      totalCost += val.cost;
    }
    console.log(totalCost);
}
