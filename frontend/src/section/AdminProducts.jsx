import React, { useState } from "react";
import axios from "axios";

export default function AddProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    const data = new FormData();
    data.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post("/api/admin/uploads", data, {
  headers: { "Content-Type": "multipart/form-data" },
});
      setImageUrl(res.data.imageUrl);
      setMessage({ type: "success", text: "Image uploaded successfully." });
    } catch (err) {
      console.error(err);
      setImageUrl("");
      setMessage({ type: "error", text: "Image upload failed. Try again." });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setMessage({
        type: "error",
        text: "Please upload a product image before submitting.",
      });
      return;
    }

    try {
      await axios.post("/api/products", {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        imageUrl,
      });
      setMessage({ type: "success", text: "Product added successfully!" });
      setForm({ name: "", description: "", price: "", stock: "", category: "" });
      setPreview("");
      setImageUrl("");
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to add product." });
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      {message.text && (
        <p className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p>Uploading image…</p>}
        {preview && <img src={preview} alt="Preview" className="preview-img" />}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading…" : "Add Product"}
        </button>
      </form>
    </div>
  );
}