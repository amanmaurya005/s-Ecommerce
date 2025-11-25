import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import './styles/AddProduct.css';

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  async function handleAddProduct(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        image,
        description: desc,
        createdAt: new Date()
      });

      alert("Product Added Successfully!");

      // Clear form
      setName("");
      setPrice("");
      setImage("");
      setDesc("");
    } catch (error) {
      console.log("Error adding product:", error);
      alert("Error adding product");
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Add New Product</h2>

      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
