import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../pages/Firebase";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Firestore cart collection reference
  const cartRef = collection(db, "cart");

  // Firestore: Add or Update item
  async function updateCartInDB(item) {
    await setDoc(doc(cartRef, String(item.id)), item);
  }

  // Firestore: Remove item
  async function removeFromDB(id) {
    await deleteDoc(doc(cartRef, String(id)));
  }

  return (
    <CartContext.Provider
      value={{ cart, setCart, updateCartInDB, removeFromDB }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}














// import { createContext, useContext, useState } from "react";

// const cartContext = createContext();

// function CartProvider({ children }) {
//   const [cart, setCart] = useState(
//     localStorage.getItem("storedCart") !== null
//       ? JSON.parse(localStorage.getItem("storedCart"))
//       : []
//   );

//   return (
//     <cartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </cartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(cartContext);
// }

// export default CartProvider;
