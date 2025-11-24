import { useState } from "react";
import { db, storage } from "../pages/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleFile(e) {
    setProduct({ ...product, image: e.target.files[0] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // Step 1: Upload Image to Firebase Storage
      const imageRef = ref(storage, `products/${product.image.name}`);
      await uploadBytes(imageRef, product.image);

      const imageURL = await getDownloadURL(imageRef);

      // Step 2: Add Product Data to Firestore
      await addDoc(collection(db, "products"), {
        name: product.name,
        price: Number(product.price),
        image: imageURL,
        createdAt: new Date(),
      });

      setMsg("Product added successfully!");
      setProduct({ name: "", price: "", image: null });

    } catch (err) {
      console.log(err);
      setMsg("Error adding product.");
    }

    setLoading(false);
  }

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      {msg && <p>{msg}</p>}

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter Product Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input type="file" onChange={handleFile} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
