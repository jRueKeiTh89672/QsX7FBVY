// 代码生成时间: 2025-08-04 22:06:45
// Import necessary modules from Gatsby
const path = require('path');
const { graphql, Link } = require('gatsby');

// Mock database for demonstration purposes
const inventoryDatabase = {
  data: [
    { id: 1, name: 'Item 1', quantity: 100 },
    { id: 2, name: 'Item 2', quantity: 150 },
    // Add more items here
  ],
  addNewItem(item) {
    const newItem = { id: inventoryDatabase.data.length + 1, ...item };
    inventoryDatabase.data.push(newItem);
    return newItem;
  },
  updateItem(id, updates) {
    const itemIndex = inventoryDatabase.data.findIndex((item) => item.id === id);
    if (itemIndex === -1) throw new Error('Item not found');
    inventoryDatabase.data[itemIndex] = { ...inventoryDatabase.data[itemIndex], ...updates };
    return inventoryDatabase.data[itemIndex];
  },
  removeItem(id) {
    const itemIndex = inventoryDatabase.data.findIndex((item) => item.id === id);
    if (itemIndex === -1) throw new Error('Item not found');
    return inventoryDatabase.data.splice(itemIndex, 1)[0];
  },
  getItem(id) {
    const item = inventoryDatabase.data.find((item) => item.id === id);
    if (!item) throw new Error('Item not found');
    return item;
  },
};

// Gatsby page component for listing inventory items
const InventoryPage = ({ data }) => {
  // Error handling
  if (!data) {
    return <div>Error loading inventory data.</div>;
  }

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

// Define GraphQL query for fetching inventory data
exports.pageQuery = graphql`
  query InventoryQuery {
    allInventoryItem {
      edges {
        node {
          id
          name
          quantity
        }
      }
    }
  }
`;

// Export InventoryPage component
module.exports = InventoryPage;