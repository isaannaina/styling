import React, { useState, useEffect } from "react";

function ProductList({ products, onDelete }) {
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div>
      <h2>Product List:</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            Product ID: {product.productId}, Selling Price: {product.sellingPrice}, Product Name: {product.productName}, Category: {product.category}
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SellerAdminPage() {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [productId, setProductId] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const product = { productId, sellingPrice, productName, category };
    setProducts([...products, product]);
    setProductId("");
    setSellingPrice("");
    setProductName("");
    setCategory("");
  };

  const handleDelete = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  return (
    <div>
      <h1>Seller Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sellingPrice">Selling Price:</label>
          <input
            type="text"
            id="sellingPrice"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home and Garden">Home and Garden</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
        </form>
  <ProductList products={products} onDelete={handleDelete} />
</div>
);
} 
export default SellerAdminPage;