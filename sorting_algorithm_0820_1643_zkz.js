// 代码生成时间: 2025-08-20 16:43:39
 * @returns {Array} The sorted array.
 */
function bubbleSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array.');
  }

  let len = array.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < len; i++) {
      if (array[i - 1] > array[i]) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        swapped = true;
      }
    }
    len--;
  } while (swapped);
  return array;
}

/**
 * Quick Sort Algorithm
 * @param {Array} array - The array to be sorted.
 * @param {number} [start] - The start index for the partitioning.
 * @param {number} [end] - The end index for the partitioning.
 * @returns {Array} The sorted array.
 */
function quickSort(array, start = 0, end = array.length - 1) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array.');
  }

  if (start < end) {
    let pivotIndex = partition(array, start, end);
    quickSort(array, start, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, end);
  }
  return array;
}

/**
 * Helper function to partition the array for Quick Sort.
 * @param {Array} array - The array to partition.
 * @param {number} start - The start index for the partitioning.
 * @param {number} end - The end index for the partitioning.
 * @returns {number} The pivot index.
 */
function partition(array, start, end) {
  let pivot = array[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  [array[i + 1], array[end]] = [array[end], array[i + 1]];
  return i + 1;
}

/**
 * Program entry point to demonstrate the sorting algorithms.
 */
try {
  const sampleArray = [64, 34, 25, 12, 22, 11, 90];
  console.log('Original array:', sampleArray);
  console.log('Sorted array using Bubble Sort:', bubbleSort(sampleArray.slice()));
  console.log('Sorted array using Quick Sort:', quickSort(sampleArray.slice()));
} catch (error) {
  console.error('An error occurred:', error.message);
}
