// 代码生成时间: 2025-09-05 07:24:10
const createCart = () => {
  // Cart object to hold cart items
  let cart = [];

  // Function to add an item to the cart
  const addItem = (item) => {
    if (!item.id || !item.name || !item.price) {
      throw new Error('Item must have id, name, and price');
    }
    cart.push(item);
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
      cart.splice(index, 1);
    } else {
      throw new Error('Item not found in cart');
    }
  };

  // Function to get the cart items
  const getCart = () => {
    return [...cart]; // Return a copy of the cart to avoid direct mutations
  };

  // Function to clear the cart
  const clearCart = () => {
    cart = [];
  };

  // Function to calculate the total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Return the public API of the cart
  return {
    addItem,
    removeItem,
    getCart,
    clearCart,
    getTotalPrice
  };
};

// Usage example
const cart = createCart();

try {
  cart.addItem({ id: 1, name: 'Apple', price: 0.99 });
  cart.addItem({ id: 2, name: 'Banana', price: 0.59 });
  console.log(cart.getCart()); // Get items in cart
  console.log(cart.getTotalPrice()); // Get total price
  cart.removeItem(1); // Remove apple from cart
  console.log(cart.getCart()); // Get updated cart
  cart.clearCart(); // Clear the cart
} catch (error) {
  console.error(error);
}