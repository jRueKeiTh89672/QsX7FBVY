// 代码生成时间: 2025-08-24 09:07:22
 * A Gatsby program to calculate hash values for strings.
 *
 * Features:
 * - Supports SHA-256 hashing algorithm.
 * - Includes error handling for invalid inputs.
 * - Follows JavaScript best practices for maintainability and scalability.
 */

// Import necessary modules
import { createHash } from 'crypto';
import React, { useState } from 'react';

// Define the HashCalculator component
const HashCalculator = () => {
  // State hooks to store input value and hash result
  const [inputValue, setInputValue] = useState('');
  const [hashResult, setHashResult] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to calculate hash
  const calculateHash = () => {
    try {
      // Check if the input value is empty
      if (!inputValue) {
        throw new Error('Input cannot be empty.');
      }

      // Create a new SHA-256 hash instance
      const hash = createHash('sha256');

      // Update the hash with the input value
      hash.update(inputValue);

      // Get the final hash result as a hexadecimal string
      const result = hash.digest('hex');
      setHashResult(result);
    } catch (error) {
      // Handle any errors that occur during hashing
      setHashResult(error.message);
    }
  };

  // Render the component UI
  return (
    <div>
      <h1>Hash Calculator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text to hash"
      />
      <button onClick={calculateHash}>Calculate Hash</button>
      {hashResult && <p>Hash Result: {hashResult}</p>}
    </div>
  );
};

// Export the HashCalculator component
export default HashCalculator;
