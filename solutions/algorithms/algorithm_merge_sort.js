
// create the array to sort
var arr = createArrayToSort(1000, 0, 10000)

// create a sorted version of the array for validation
var validationArr = [].concat(arr).sort(function (a, b){ return a - b })

// sort the array
var sortedArr = mergeSort([].concat(arr))

// compare the native and custom sorts
try {
  compareArrays(validationArr, sortedArr)
  console.log("THE ARRAYS MATCHED!")
} catch (e) {
  console.error(e.message)
}

/**
 * Sort an array w/ merge sort
 * @param  {Array.<number>} sortArr the array to sort
 * @return {Array.<number>} returns the array to be sorted
 */
function mergeSort(sortArr) {
  if (sortArr.length == 1) return sortArr

  var midPoint = Math.floor(sortArr.length / 2)
  var arr1 = mergeSort(sortArr.slice(0, midPoint))
  var arr2 = mergeSort(sortArr.slice(midPoint))

  return mergeArrays(arr1, arr2)
}

/**
 * Merge 2 arrays in sorted order
 * @param  {Array.<number>} arr1 the first array
 * @param  {Array.<number>} arr2 the second array
 * @return {Array.<number>}      the merged array
 */
function mergeArrays(arr1, arr2) {
  var arr1Ptr = 0, arr2Ptr = 0, newArr = [], newVal
  while (arr1Ptr < arr1.length || arr2Ptr < arr2.length) {
    if (arr1Ptr == arr1.length || (arr2Ptr < arr2.length && arr2[arr2Ptr] < arr1[arr1Ptr])) {
      newVal = arr2[arr2Ptr]
      arr2Ptr++
    } else {
      newVal = arr1[arr1Ptr]
      arr1Ptr++
    }
    newArr.push(newVal)
  }
  return newArr
}

/**
 * Compare 2 arrays and make sure each element matches
 *
 * @param  {Array.<number>} arr1 the first array
 * @param  {Array.<number>} arr2 the second array
 */
function compareArrays(arr1, arr2) {
  if (arr1.length != arr2.length) throw new Error("The array lengths did not match")
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) throw new Error("The arrays did not match")
  }
}

/**
 * Create an array of numbers to sort
 *
 * @param  {number} length the number of items to insert into the array
 * @param  {number} min    the minimium value for each item
 * @param  {number} max    the maximum value for each item (non-inclusive)
 * @return {Array.<number>} The array of numbers
 */
function createArrayToSort(length, min, max) {
  var rangeSize = max - min
  var items = []
  for (var i = 0; i < length; i++) {
    items.push(Math.floor(Math.random() * rangeSize) + min)
  }
  return items
}