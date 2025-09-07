// 代码生成时间: 2025-09-08 06:30:08
// network_status_checker.js
// A Gatsby program to check the network connection status

import React, { useState, useEffect } from 'react';

// This component checks the network connection status
const NetworkStatusChecker = () => {
  // State to store the network status
  const [isOnline, setIsOnline] = useState(true);

  // Effect hook to check the network status when component mounts
  useEffect(() => {
    // Function to handle online event
    const handleOnline = () => {
      setIsOnline(true);
    };

    // Function to handle offline event
    const handleOffline = () => {
      setIsOnline(false);
    };

    // Listen for online and offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Render the network status
  return (
    <div>
      <h1>Network Status Checker</h1>
      {isOnline ? <p>You are online.</p> : <p>You are offline.</p>}
    </div>
  );
};

// Export the NetworkStatusChecker component
export default NetworkStatusChecker;
