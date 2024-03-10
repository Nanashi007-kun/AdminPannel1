// menumanag.js

import React, { useState } from "react";
import "../admincompo/menumanag.css";

const MenuManag = () => {
  // State for managing the list of food products
  const [foodProducts, setFoodProducts] = useState([]);

  // State for managing the input fields in the popup
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null); // State to store the selected image
  const [openPopup, setOpenPopup] = useState(false);

  const addFoodProduct = () => {
    // Check if any field is empty
    if (
      !productId ||
      !productName ||
      !productPrice ||
      !productCategory ||
      !productImage
    ) {
      alert("Please fill in all fields");
      return; // Exit the function early
    }

    // Add the new food product to the list
    setFoodProducts([
      ...foodProducts,
      { productId, productName, productPrice, productCategory, productImage },
    ]);
    // Reset the input fields
    setProductId("");
    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductImage(null);
    // Close the popup window
    setOpenPopup(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  return (
    <div className="menu-manag-container">
      <h2>Menu Management</h2>

      <button onClick={() => setOpenPopup(true)}>Add Food Product</button>
      {openPopup && (
        <div className="popup">
          <h3>Add Food Product</h3>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Product ID"
          />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
          />
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Product Price"
          />
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            placeholder="Product Category"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {productImage && (
            <img
              src={URL.createObjectURL(productImage)}
              alt="Preview"
              width="100"
              className="preview-image"
            />
          )}
          <button onClick={addFoodProduct}>Add</button>
          <button onClick={() => setOpenPopup(false)}>Cancel</button>
        </div>
      )}
      <div className="food-products">
        {foodProducts.map((product, index) => (
          <div key={index} className="food-product">
            <p>Product ID: {product.productId}</p>
            <p>Product Name: {product.productName}</p>
            <p>Product Price: {product.productPrice}</p>
            <p>Product Category: {product.productCategory}</p>
            {product.productImage && (
              <img
                src={URL.createObjectURL(product.productImage)}
                alt="Product"
                className="product-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManag;
