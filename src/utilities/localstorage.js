const getStoredCart = () => {
  const storedCartString = localStorage.getItem("cart");
  if (storedCartString) {
    // return JSON.parse(localStorage.getItem('cart'))
    return JSON.parse(storedCartString);
  }
  return [];
};

const savedCartToLS = (cart) => {
  const cartStringified = JSON.stringify(cart);
  localStorage.setItem("cart", cartStringified);
};

const addToLS = (id) => {
  const cart = getStoredCart();
  cart.push(id);
  savedCartToLS(cart);
};

export { addToLS };
