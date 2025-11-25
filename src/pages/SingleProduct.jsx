import instance from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

function SingleProduct() {
  const { id } = useParams();
  const { cart, setCart, updateCartInDB } = useCart();   // <-- Firestore function use किया
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSingleData(id);
  }, [id]);

  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cart));
  }, [cart]);

  // Fetch single product
  async function getSingleData(id) {
    try {
      setLoading(true);
      const response = await instance.get(`/product/product/${id}`);

      if (!response.data || Object.keys(response.data).length === 0) {
        setError("Product not found");
        setLoading(false);
        return;
      }

      setSingleProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Check product ID.");
      setLoading(false);
    }
  }

  // Add product only once + Firestore Sync
  async function handleAddToCart() {
    const alreadyExists = cart.find((item) => item.id === singleProduct._id);

    if (alreadyExists) {
      alert("You have already added this product to the cart!");
      return; // block duplicate add
    }

    const newItem = {
      id: singleProduct._id,
      name: singleProduct.name,
      price: singleProduct.price,
      image: singleProduct.image,
      quantity: 1,
    };

    // ⬅ UI Cart Update
    setCart([...cart, newItem]);

    // ⬅ Firestore Add
    await updateCartInDB(newItem);

    alert("Product added to cart!");
  }

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="singleProduct">
      <div className="left">
        <img src={singleProduct.image} alt={singleProduct.name} />
      </div>

      <div className="right">
        <h2>{singleProduct.name}</h2>
        <p>{singleProduct.category}</p>
        <h4>₹{singleProduct.price}</h4>
        <p className="desc">{singleProduct.description}</p>

        <button onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </section>
  );
}

export default SingleProduct;




// import instance from "../config/axiosConfig";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../contexts/CartProvider";

// function SingleProduct() {
//   const { id } = useParams();
//   const {cart,setCart}=useCart();
//   const [singleProduct, setSingleProduct] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  

//   useEffect(() => {
//     getSingleData(id);
//   }, [id]);

//   useEffect(() => {
//     localStorage.setItem("storedCart", JSON.stringify(cart));
//   }, [cart]);

//   async function getSingleData(id) {
//     try {
//       setLoading(true);
//       const response = await instance.get("/product/product/" + id);
//       if (response.data.length === 0) {
//         setLoading(false);
//         setError("Check the ID parameter");
//       } else {
//         setSingleProduct(response.data);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setError("Check the ID parameter");
//       setLoading(false);
//     }
//   }

//   async function handleAddToCart(idToAdd) {
//     setCart([...cart, { id: idToAdd, quantity: 1 }]);
//   }

//   console.log(cart);

//   if (loading) return <div className="loader">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <>
//       <section className="singleProduct">
//         <div className="left">
//           <img src={singleProduct.image} alt={singleProduct.name} />
//         </div>
//         <div className="right">
//           <h2>{singleProduct.name}</h2>
//           <p>{singleProduct.cateogry}</p>
//           <h4>{singleProduct.price}</h4>
//           <p className="desc">{singleProduct.description}</p>
//           <button onClick={() => handleAddToCart(singleProduct._id)}>
//             Add To Cart
//           </button>
//         </div>
//       </section>
//     </>
//   );
// }

// export default SingleProduct;
