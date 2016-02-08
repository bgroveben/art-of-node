/*
This is the most important topic to understand if you want to understand how to use node.
Nearly everything in node uses callbacks.
They weren't invented by node, they are just part of the JavaScript language.

Callbacks are functions that are executed asynchronously, or at a later time.
Instead of the code reading top to bottom procedurally, async programs may execute different functions at different times
based on the order and speed that earlier functions like http requests or file system reads happen.

The difference can be confusing since determining if a function is asynchronous or not depends a lot on context.
Here is a simple synchronous example, meaning you can read the code top to bottom just like a book:
*/
var myNumber = 1
function addOne() { myNumber++ } // define the function
addOne() // run the function
console.log(myNumber) // logs out 2
console.log()
/*
The code here defines a function and then on the next line calls that function, without waiting for anything.
When the function is called it immediately adds 1 to the number, so we can expect that after we call the function
the number should be 2.
This is the ex;ectation of synchronous code - it sequentially runs top to bottom.
*/
// Node , however, uses mostly asynchronous code.
// Let's use node to read our number from a file called number.txt:

var fs = require('fs') // require is a special function provided by node
var nextNumber = undefined // we don't know what the number is yet since it is stored in a file

function addNextOne() {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    nextNumber = parseInt(fileContents)
    nextNumber++
  })
}

addNextOne()

console.log(nextNumber) // logs out undefined -- this line gets run before readFile is done
console.log()
