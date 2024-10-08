const my = require('./myFirstModule');
const mymod = require('./myModule');

function printMyName(){
    console.log("chama");
}
printMyName();
my.printMyName();
mymod.greetUser("chamath");
let sum = mymod.getSum(10,15);
console.log(sum);