// 代码生成时间: 2025-08-26 22:43:01
// sorting_algorithm.js

// 使用 Gatsby 创建一个页面组件，该组件包含排序算法的实现
# 扩展功能模块

/**
 * 排序算法工具类
# 改进用户体验
 * 提供不同的排序方法
 */
class SortingUtils {
  
  /**
   * 冒泡排序算法实现
   * @param {Array} arr 需要排序的数组
   */
  static bubbleSort(arr) {
    if (!Array.isArray(arr)) {
# TODO: 优化性能
      throw new Error('Input must be an array');
    }
    
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // 交换两个元素的位置
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
# 扩展功能模块
      }
    }
    return arr;
# 优化算法效率
  }

  /**
# 优化算法效率
   * 选择排序算法实现
   * @param {Array} arr 需要排序的数组
   */
  static selectionSort(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Input must be an array');
    }

    for (let i = 0; i < arr.length - 1; i++) {
      // 找到最小值
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
# FIXME: 处理边界情况
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      // 交换当前索引和最小值索引的元素
      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
  }
}

// 使用 Gatsby 创建一个页面组件，展示排序算法的效果
export default function SortingAlgorithmPage() {
# NOTE: 重要实现细节
  // 示例数组，用于排序
  const unsortedArray = [64, 34, 25, 12, 22, 11, 90];

  // 冒泡排序后的结果
  const bubbleSortedArray = SortingUtils.bubbleSort([...unsortedArray]);

  // 选择排序后的结果
  const selectionSortedArray = SortingUtils.selectionSort([...unsortedArray]);

  return (
    <>
      <h1>Sorting Algorithm Example</h1>
      <h2>Original Array:</h2>
      <pre>{JSON.stringify(unsortedArray, null, 2)}</pre>
      <h2>Bubble Sorted Array:</h2>
      <pre>{JSON.stringify(bubbleSortedArray, null, 2)}</pre>
# TODO: 优化性能
      <h2>Selection Sorted Array:</h2>
      <pre>{JSON.stringify(selectionSortedArray, null, 2)}</pre>
    </>
  );
}
