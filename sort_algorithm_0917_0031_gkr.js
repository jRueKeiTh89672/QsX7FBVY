// 代码生成时间: 2025-09-17 00:31:31
const bubbleSort = (arr) => {
  "use strict";
  // 冒泡排序算法实现
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换位置
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

const quickSort = (arr, left = 0, right = arr.length - 1) => {
  "use strict";
  // 快速排序算法实现
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    // 递归排序左半部分
    quickSort(arr, left, pivotIndex - 1);
    // 递归排序右半部分
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
};

const partition = (arr, left, right) => {
  let pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
};

// 测试函数
const testSortAlgorithms = () => {
  const arr = [64, 34, 25, 12, 22, 11, 90];
  console.log('Original array:', arr);

  console.log('Sorted array using bubble sort:', bubbleSort([...arr]));
  console.log('Sorted array using quick sort:', quickSort([...arr]));
};

// 执行测试函数
testSortAlgorithms();