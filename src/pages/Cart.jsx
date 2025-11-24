import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartProvider";
import instance from "../config/axiosConfig";

function Cart() {
  const { cart, setCart } = useCart();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cart.length > 0) {
      getCartProducts(cart);
    } else {
      setCartItems([]);
    }
  }, [cart]);

  async function getCartProducts(cart) {
    try {
      const promises = cart.map((item) =>
        instance.get("/product/product/" + item._id)  // correct id
      );

      const responses = await Promise.all(promises);

      const finalProducts = responses.map((res, index) => ({
        ...res.data,
        quantity: cart[index].quantity,
      }));

      setCartItems(finalProducts);
    } catch (error) {
      console.log("Cart Fetch Error:", error);
    }
  }

  function quantityLess(id) {
    const updatedItems = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);

    // update real cart
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  }

  function quantityAdd(id) {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);

    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  function handleDelete(id) {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);

    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("storedCart", JSON.stringify(updatedCart));
  }

  return (
    <>
      <div className="left">
        {cartItems.length === 0 ? (
          <h2>No items in cart</h2>
        ) : (
          cartItems.map((obj) => (
            <div className="cartItem" key={obj._id}>
              <div className="img">
                <img src={obj.image} alt={obj.name} />
              </div>

              <div className="content">
                <h3>{obj.name}</h3>

                <div className="quantity-controls">
                  <button onClick={() => quantityLess(obj._id)}>-</button>
                  <span>{obj.quantity}</span>
                  <button onClick={() => quantityAdd(obj._id)}>+</button>
                </div>

                <p>₹{obj.price * obj.quantity}</p>
              </div>

              <div className="delete">
                <p onClick={() => handleDelete(obj._id)}>remove</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Cart;


//   import { useEffect, useState } from "react";
//   import { useCart } from "../contexts/CartProvider";
//   import instance from "../config/axiosConfig";

//   function Cart() {
//     const { cart, setCart } = useCart();

//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//       if (!cart || cart.length === 0) {
//         setCartItems([]);
//         return;
//       }

//       getCartProducts(cart);
//     }, [cart]);

//     async function getCartProducts(cart) {
//       try {
//         const promises = cart.map((obj) =>
//           instance.get("/product/product/" + obj._id)
//         );

//         const responses = await Promise.all(promises);

//         const products = responses.map((res, index) => ({
//           ...res.data,
//           quantity: (cart[index] && cart[index].quantity) || 1,
//         }));

//         setCartItems(products);
//       } catch (err) {
//         console.error("Cart Fetch Error:", err);
//         setCartItems([]);
//       }
//     }

//     function updateQuantityInContext(id, newQty) {
//       if (!setCart) return;
//       setCart((prev) => prev.map((it) => (it._id === id ? { ...it, quantity: newQty } : it)));
//     }

//     function quantityLess(id) {
//       setCartItems((prev) => {
//         const next = prev.map((item) =>
//           item._id === id && item.quantity > 1
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         );
//         const changed = next.find((it) => it._id === id);
//         if (changed) updateQuantityInContext(id, changed.quantity);
//         return next;
//       });
//     }

//     function quantityAdd(id) {
//       setCartItems((prev) => {
//         const next = prev.map((item) => (item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
//         const changed = next.find((it) => it._id === id);
//         if (changed) updateQuantityInContext(id, changed.quantity);
//         return next;
//       });
//     }

//     function handleDelete(id) {
//       setCartItems((prev) => prev.filter((item) => item._id !== id));
//       if (setCart) setCart((prev) => prev.filter((item) => item._id !== id));
//     }

//     const total = cartItems.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 0), 0);

//     return (
//       <>
//         <div className="left">
//           {cartItems.length === 0 ? (
//             <h2>No items in cart</h2>
//           ) : (
//             cartItems.map((obj) => (
//               <div className="cartItem" key={obj._id}>
//                 <div className="img">
//                   <img src={obj.image} alt={obj.name} />
//                 </div>

//                 <div className="content">
//                 <h3>{obj.name}</h3>

//                 <div className="quantity-controls">
//                   <button onClick={() => quantityLess(obj._id)}>-</button>
//                   <span>{obj.quantity}</span>
//                   <button onClick={() => quantityAdd(obj._id)}>+</button>
//                 </div>

//                 <p>₹{(Number(obj.price) || 0) * (obj.quantity || 0)}</p>
//               </div>

//               <div className="delete">
//                 <p onClick={() => handleDelete(obj._id)}>remove</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="right">
//         <h3>Summary</h3>
//         <p>Total: ₹{total}</p>
//       </div>
//     </>
//   );
// }

// export default Cart;






















































// import { useEffect, useState } from "react";
// import { useCart } from "../contexts/CartProvider";
// import instance from "../config/axiosConfig";

// function Cart() {
//   const { cart } = useCart();

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     getCartProducts(cart);
//   }, [cart]);

//   async function getCartProducts(cart) {
//     const promises = cart.map((obj) => {
//       return instance.get("/product/product/" + obj.id);
//     });

//     let temp = await Promise.all(promises);

//     // Add quantity = 1 for each item initially
//     setCartItems(temp.map((obj) => ({ ...obj.data, quantity: 1 })));
//   }

//   // Decrease quantity of selected product
//   function quantityLess(id) {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 }: item
//       )
//     );
//   }

//   // Increase quantity of selected product
//   function quantityAdd(id) {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id   ? { ...item, quantity: item.quantity + 1 }   : item
//       )
//     );
//   }

//   function handleDelete(id) {
//     setCartItems(
//       cartItems.filter((obj)=>{
//         return obj._id !== id
//       })
//     )
//   }

//   return (
//     <>
//       <div className="left">
//         {cartItems.map((obj) => {
//           return (
//             <div className="cartItem" key={obj._id}>
//               <div className="img">
//                 <img src={obj.image} alt={obj.name} />
//               </div>

//               <div className="content">
//                 <h3>{obj.name}</h3>

//                 <div className="quantity-controls">
//                   <button className="increment" onClick={() => quantityLess(obj._id)}>-</button>
//                   <span>{obj.quantity}</span>
//                   <button className="decrement" onClick={() => quantityAdd(obj._id)}>+</button>
//                 </div>

//                 <p>₹{obj.price * obj.quantity}</p>

//               </div>
//               <div className="delete"><p onClick={()=>{handleDelete(obj._id)}}>remove</p></div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="right"></div>
//     </>
//   );
// }

// export default Cart;



