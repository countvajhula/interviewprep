var problem = new (require('./problem.js')).Problem()
var sortData = require('./data/sort.js')

problem.describe('Radix sort is another efficient, linear-time sorting algorithm. It works by sorting data in pieces called digits, one digit at a time, from the digit in the least significant position to the most significant. Using radix sort to sort the set of radix-10 numbers {15, 12, 49, 16, 36, 40}, for example, produces {40, 12, 15, 16, 36, 49} after sorting on the least significant digit, and {12, 15, 16, 36, 40, 49} after sorting on the most significant digit.')

problem.setData(sortData.sets, sortData.solutions)
exports.problem = problem
