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
var nextNumber = undefined // we don't yet know what the number is since it is stored in another file

function addNextOne() {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    nextNumber = parseInt(fileContents)
    nextNumber++
  })
}
addNextOne()
console.log(nextNumber) // logs out undefined -- this line gets run before readFile is done
console.log()

/*
When we run this program all of the functions are immediately defined, but they don't all execute immediately.
This is a fundamental thing to understand about asynchronous programming.
When addNextOne() is called, it kicks off a readFile and then moves on to the next thing that is ready to execute.
If there is nothing to execute, node will either wait for pending fs/network operations to finish
or it will stop running and exit the command line.

When readFile is done, it will run the doneReading() function.
If there is an error, an exception will be thrown; if not, the file contents will be printed out.

The reason our output is 'undefined' is that nowhere in our code exists logic that tells the console.log()
statement to wait until the readFile statement finishes before it prints out the number.

********************
Callbacks are just functions that get executed at a later time.
The key to understanding callbacks is to realize that they are used when youu don't know when some async operation
will complete, but you do know where the operation will complete -- the last line of the async function.
The top-to-bottom order that you declare callbacks in does not necessarily matter, only the logical/
hierarchical nesting of them.
First you split your code up into functions, and then use the callbacks to declare if one function depends
on another function finishing.
********************
*/
// Let's put our console.log() statment into a function and pass it in as a callback.
var fs = require('fs')
var anotherNumber = undefined

function addAnother(callback) {
  fs.readFile('number.txt', function finishedReading(err, fileContents) {
    anotherNumber = parseInt(fileContents)
    anotherNumber++
    callback()
  })
}
function logAnotherNumber() {
  console.log(anotherNumber)
}
addAnother(logAnotherNumber) // logs out NaN
console.log()
