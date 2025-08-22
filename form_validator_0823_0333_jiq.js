// 代码生成时间: 2025-08-23 03:33:38
 * @returns {Promise<Object>} A promise that resolves with the validated data or rejects with validation errors.
 */

function FormValidator(formData, validationSchema) {
  // Check if both formData and validationSchema are provided
  if (!formData || !validationSchema) {
    throw new Error('Both formData and validationSchema are required.');
  }

  // Validate each field in the form data according to the validation schema
  return Object.keys(validationSchema).reduce((promiseChain, field) => {
    return promiseChain.then((validatedData) => {
      // Check if the field exists in formData
      if (!(field in formData)) {
        return Promise.reject({
          [field]: 'Field is missing in formData.'
        });
      }

      // Apply the validation rule to the field
      const {
        required,
        minLength,
        maxLength,
        pattern
      } = validationSchema[field];

      // Validation messages
      const errors = [];

      if (required && (formData[field] === undefined || formData[field] === '')) {
        errors.push(`${field} is required`);
      }

      if (minLength && formData[field].length < minLength) {
        errors.push(`${field} must be at least ${minLength} characters long`);
      }

      if (maxLength && formData[field].length > maxLength) {
        errors.push(`${field} must not exceed ${maxLength} characters`);
      }

      if (pattern && !new RegExp(pattern).test(formData[field])) {
        errors.push(`${field} does not match the required pattern`);
      }

      // If there are errors, reject the promise
      if (errors.length > 0) {
        return Promise.reject({
          [field]: errors
        });
      }

      // If no errors, return the validated data
      return {
        ...validatedData,
        [field]: formData[field]
      };
    });
  }, Promise.resolve({})).then((validatedData) => {
    // If all validations pass, return the validated data
    return validatedData;
  });
}

// Example usage:
const formData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: '30'
};

const validationSchema = {
  name: { required: true, minLength: 2 },
  email: { required: true, pattern: '^[^@]+@[^@]+\.[a-z]{2,6}$' },
  age: { required: true, minLength: 1, maxLength: 3 }
};

FormValidator(formData, validationSchema)
  .then((validatedData) => {
    console.log('Validated data:', validatedData);
  }).catch((errors) => {
    console.error('Validation errors:', errors);
  });