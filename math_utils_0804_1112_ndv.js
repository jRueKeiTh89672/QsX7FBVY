// 代码生成时间: 2025-08-04 11:12:08
const MathUtils = {

  /**
   * Adds two numbers.
   * @param {number} a - First number to add.
   * @param {number} b - Second number to add.
   * @returns {number} - The sum of the two numbers.
   */
  add: function (a, b) {
    return a + b;
  },

  /**
   * Subtracts two numbers.
   * @param {number} a - The number to subtract from.
   * @param {number} b - The number to subtract.
   * @returns {number} - The result of the subtraction.
   */
  subtract: function (a, b) {
    return a - b;
  },

  /**
   * Multiplies two numbers.
   * @param {number} a - The first number to multiply.
   * @param {number} b - The second number to multiply.
   * @returns {number} - The product of the two numbers.
   */
  multiply: function (a, b) {
    return a * b;
  },

  /**
   * Divides two numbers.
   * @param {number} a - The number to divide.
   * @param {number} b - The number by which to divide.
   * @returns {number} - The quotient of the division.
   * @throws {Error} - If b is 0, throws an error.
   */
  divide: function (a, b) {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    } else {
      return a / b;
    }
  },

  /**
   * Calculates the power of a number.
   * @param {number} base - The base number.
   * @param {number} exponent - The exponent to which to raise the base.
   * @returns {number} - The result of raising the base to the power of the exponent.
   */
  power: function (base, exponent) {
    return base ** exponent;
  },

  /**
   * Calculates the square root of a number.
   * @param {number} num - The number to take the square root of.
   * @returns {number} - The square root of the number.
   * @throws {Error} - If num is negative, throws an error.
   */
  sqrt: function (num) {
    if (num < 0) {
      throw new Error('Cannot calculate the square root of a negative number.');
    } else {
      return Math.sqrt(num);
    }
  }

};

module.exports = MathUtils;