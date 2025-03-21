import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dialogue = [
  { head: "Order Confirmation ?" },
  { head: "You need to Login to Place Order" },
];

//helper to function to find the product
//FUNCTION TO INCREASE ITEM FROM CART
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if product is existing then increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return with new cart item with quantity in it
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

//FUNCTION TO DECREASE ITEM FROM CART
const removeCartItem = (cartItems, productToRemove) => {
  // to find the item if exist in cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  //to filter out the remaining
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  // if item exist then decrease quantity
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCart = (cartItems, deleteItem) =>
  cartItems.filter((cart) => cart.id !== deleteItem.id);

//empty car and a function to add items in cart
//and calculate total amount
export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  // Modified to initialize cartItems from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [cartTotal, setCartTotal] = useState(0);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  //to get the total price by comparing quantity
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newTotal);
  }, [cartItems]);

  //for toast notification
  const notify = () => {
    toast("🥧 Recipe added to your favourites!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  //adding or removing item to cart using helper function
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const deleteItemCart = (deleteItem) => {
    setCartItems(deleteCart(cartItems, deleteItem));
  };

  const values = {
    addItemToCart,
    cartItems,
    cartTotal,
    notify,
    removeItemToCart,
    deleteItemCart,
    dialogue,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
