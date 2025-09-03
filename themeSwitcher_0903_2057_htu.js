// 代码生成时间: 2025-09-03 20:57:59
 * Usage:
 * - Use ThemeProvider to wrap your application, providing a theme context.
 * - Use the useTheme hook to access the current theme and the toggle function.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to hold the current theme
const ThemeContext = createContext();

// ThemeProvider component that provides the theme context
const ThemeProvider = ({ children }) => {
  // State to hold the current theme
  const [theme, setTheme] = useState('light');

  // Function to toggle the theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // Provide the theme and toggle function to the context
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

// useTheme hook to access the current theme and toggle function
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export the ThemeProvider and useTheme hook
export { ThemeProvider, useTheme };

/*
 * Example usage:
 *
 * const App = () => {
 *   const { theme, toggleTheme } = useTheme();
 *   return (
 *     <div className={theme} onClick={toggleTheme}>
 *       <h1>Theme: {theme}</h1>
 *     </div>
 *   );
 * };
 *
 * function Main() {
 *   return (
 *     <ThemeProvider>
 *       <App />
 *     </ThemeProvider>
 *   );
 * }
 */