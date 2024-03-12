import React, { useState } from "react";
import "../admincompo/menumanag.css";

const MenuManag = () => {
  // State for managing the list of food products
  const [foodProducts, setFoodProducts] = useState([]);

  // State for managing the input fields in the popup
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("breakfast"); // Default to breakfast
  const [productImage, setProductImage] = useState(null); // State to store the selected image
  const [openPopup, setOpenPopup] = useState(false);
  const [editProductIndex, setEditProductIndex] = useState(null); // Index of the product being edited

  const addFoodProduct = () => {
    // Check if any field is empty
    if (
      !productId ||
      !productName ||
      !productPrice ||
      !productImage
    ) {
      alert("Please fill in all fields");
      return; // Exit the function early
    }

    // If an edit is in progress, update the existing product
    if (editProductIndex !== null) {
      const updatedProducts = [...foodProducts];
      updatedProducts[editProductIndex] = {
        productId,
        productName,
        productPrice,
        productCategory,
        productImage,
      };
      setFoodProducts(updatedProducts);
      setEditProductIndex(null);
    } else {
      // Add the new food product to the list
      setFoodProducts([
        { productId, productName, productPrice, productCategory, productImage },
        ...foodProducts, // Place the new product at the top
      ]);
    }

    // Reset the input fields
    setProductId("");
    setProductName("");
    setProductPrice("");
    setProductCategory("breakfast"); // Reset category to breakfast
    setProductImage(null);
    // Close the popup window
    setOpenPopup(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const handleEdit = (index) => {
    const product = foodProducts[index];
    setProductId(product.productId);
    setProductName(product.productName);
    setProductPrice(product.productPrice);
    setProductCategory(product.productCategory);
    setProductImage(product.productImage);
    setEditProductIndex(index);
    setOpenPopup(true);
  };

  return (
    <div className="menu-manag-container">
      <h2>Menu Management</h2>

      <button onClick={() => setOpenPopup(true)}>Add Food Product</button>
      {openPopup && (
        <div className="popup">
          <h3>{editProductIndex !== null ? "Edit" : "Add"} Food Product</h3>
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
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {productImage && (
            <img
              src={URL.createObjectURL(productImage)}
              alt="Preview"
              width="100"
              className="preview-image"
            />
          )}
          <button onClick={addFoodProduct}>
            {editProductIndex !== null ? "Save" : "Add"}
          </button>
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
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManag;
