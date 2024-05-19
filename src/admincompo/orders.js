import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { firestore, storage } from "../firebase"; // Assuming import from firebase.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import "./orders.css"; // Import the CSS file

const Orders = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const formRef = useRef(null); // Using useRef hook
  const [newFoodData, setNewFoodData] = useState({
    foodId: "",
    foodName: "",
    foodDetails: "",
    foodPrice: "",
    foodServe: "",
    foodCategory: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const foodCollectionRef = collection(firestore, "foodItems");
  const generateUniqueID = () => {
    const randomString = Math.random().toString(36).substring(2, 15); // Generate random alphanumeric string
    const timestamp = Date.now().toString(); // Optional: Add timestamp for better uniqueness
    return `uid-${randomString}-${timestamp}`; // Combine with prefix or timestamp
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) return; // Check if a file is selected

    try {
      const storageRef = ref(storage, `foodImages/${imageFile.name}`); // Generate unique filename using original name
      const snapshot = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      setNewFoodData({ ...newFoodData, image: imageUrl }); // Store image URL for preview and upload
      setImagePreview(URL.createObjectURL(imageFile)); // Display preview
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image!"); // Display error message to user
    }
  };

  const addFoodItem = async (e) => {
    e.preventDefault();
    const { foodName, foodId } = newFoodData; // Destructure data

    // Check for existing food name
    const existingFoodRef = collection(firestore, "foodItems");
    const foodSnapshot = await getDocs(existingFoodRef);
    const existingFoodNames = foodSnapshot.docs.map(
      (doc) => doc.data().foodName
    );

    if (existingFoodNames.includes(foodName)) {
      toast.error("Food name already exists!");
      return;
    }

    try {
      const uniqueId = generateUniqueID(); // Remove async since this function doesn't need to be awaited
      await addDoc(foodCollectionRef, { ...newFoodData, foodId: uniqueId }); // Add food item
      console.log("Food item added successfully!");
      toast.success("Food item added successfully!"); // Display toast notification
      if (formRef.current) {
        setNewFoodData({
          foodId: "",
          foodName: "",
          foodDetails: "",
          foodPrice: "",
          foodServe: "",
          foodCategory: "",
          image: "",
        });
        setImagePreview(null);
        // toast.success("Food item added successfully!");
        closeModal(); // Close the modal after adding the food item
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.warning("Error adding food item!"); // Display toast notification
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(foodCollectionRef, (querySnapshot) => {
      const foodDocs = querySnapshot.docs;
      setFoodItems(foodDocs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  }, []);
  const handleDelete = async (id) => {
    const foodDoc = doc(firestore, "foodItems", id);
    await deleteDoc(foodDoc);
    toast.success("Item delated");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewFoodData({
      foodId: "",
      foodName: "",
      foodDetails: "",
      foodPrice: "",
      foodServe: "",
      foodCategory: "",
      image: "",
    });
    setImagePreview(null);
  };

  return (
    <div className="orders-container">
      <ToastContainer />
      <button className="open-modal-button" onClick={openModal}>
        Add Food Item
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Food Item</h2>
            <form ref={formRef} onSubmit={addFoodItem}>
              <div>
                <label htmlFor="foodName">Food Name:</label>
                <input
                  type="text"
                  id="foodName"
                  value={newFoodData.foodName}
                  onChange={(e) =>
                    setNewFoodData({ ...newFoodData, foodName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="foodDetails">Food Details:</label>
                <textarea
                  id="foodDetails"
                  value={newFoodData.foodDetails}
                  onChange={(e) =>
                    setNewFoodData({
                      ...newFoodData,
                      foodDetails: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="foodPrice">Food Price (INR):</label>
                <input
                  type="number"
                  id="foodPrice"
                  value={newFoodData.foodPrice}
                  onChange={(e) =>
                    setNewFoodData({
                      ...newFoodData,
                      foodPrice: e.target.value,
                    })
                  }
                  required
                  min="0" // Set minimum price to 0
                />
              </div>
              <div>
                <label htmlFor="foodServe">Food Serve (Quantity):</label>
                <input
                  type="number"
                  id="foodServe"
                  value={newFoodData.foodServe}
                  onChange={(e) =>
                    setNewFoodData({
                      ...newFoodData,
                      foodServe: e.target.value,
                    })
                  }
                  required
                  min="1" // Set minimum quantity to 1
                />
              </div>
              <div>
                <label htmlFor="foodCategory">Food Category:</label>
                <select
                  id="foodCategory"
                  value={newFoodData.foodCategory}
                  onChange={(e) =>
                    setNewFoodData({
                      ...newFoodData,
                      foodCategory: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  {/* Add more categories as needed */}
                </select>
              </div>
              <div>
                <label htmlFor="imageUrl">Food Image:</label>
                <input type="file" id="imageUrl" onChange={handleImageUpload} />
                {imagePreview && (
                  <img src={imagePreview} alt="Food Image Preview" />
                )}{" "}
                {/* Conditionally display image preview */}
              </div>
              <button type="submit">
                {newFoodData.foodId ? "Update Food Item" : "Add Food Item"}
              </button>
            </form>
          </div>
        </div>
      )}

      <h2>Food Items</h2>
      <table>
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Food Name</th>
            <th>Details</th>
            <th>Price (INR)</th>
            <th>Serve</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((foodItem) => (
            <tr key={foodItem.id}>
              <td>{foodItem.foodId}</td>
              <td>{foodItem.foodName}</td>
              <td>{foodItem.foodDetails.substring(0, 30) + "..."}</td>
              <td>{foodItem.foodPrice}</td>
              <td>{foodItem.foodServe}</td>
              <td>{foodItem.foodCategory}</td>
              <td>
                {foodItem.image ? (
                  <img
                    src={foodItem.image}
                    alt={foodItem.foodName}
                    style={{ width: "100px", height: "auto" }}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>
                {/* <button onClick={() => handleEdit(foodItem.id)}>Edit</button> */}

                <button onClick={() => handleDelete(foodItem.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
