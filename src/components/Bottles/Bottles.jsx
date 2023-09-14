import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./bottles.css";
import { addToLS, getStoredCart } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottles.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  //   load cart from Local Storage
  useEffect(() => {
    if (bottles.length > 0) {
      //   console.log("Added", bottles.length);
      const storedCart = getStoredCart();
      //   console.log(storedCart, bottles);
      const savedCart = [];
      for (const id of storedCart) {
        // console.log("id", id);
        const bottle = bottles.find((bottle) => bottle.id === id);
        // console.log(bottle.id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      console.log(savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    // console.log(bottle);
    // const newCart = [...cart, bottle];
    setCart([...cart, bottle]);
    addToLS(bottle.id);
  };

  return (
    <div>
      <h2>Bottles Available: {bottles.length}</h2>
      <Cart cart={cart}></Cart>
      <div className="bottle-container">
        {bottles.map((bottle) => (
          <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;
