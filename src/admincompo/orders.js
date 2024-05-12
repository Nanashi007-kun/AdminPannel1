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

const Orders = () => {
  const [foodItems, setFoodItems] = useState([]);

  const formRef = useRef(null); // Using useRef hook
  const [newFoodData, setNewFoodData] = useState({
    foodId: "",
    foodName: "",
    foodDetails: "",
    foodPrice: "",
    foodServe: "",
    foodCategory: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const foodCollectionRef = collection(firestore, "foodItems");

  const generateUniqueID = () => {
    const randomString = Math.random().toString(36).substring(2, 15); // Generate random alphanumeric string
    const timestamp = Date.now().toString(); // Optional: Add timestamp for better uniqueness
    return `uid-${randomString}-${timestamp}`; // Combine with prefix or timestamp
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) return;

    try {
      const storageRef = ref(storage, `foodImages/${generateUniqueID()}`); // Generate unique filename
      const snapshot = await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);
      setNewFoodData({ ...newFoodData, imageUrl });
      setImagePreview(URL.createObjectURL(imageFile)); // Display preview
    } catch (error) {
      console.error("Error uploading image:", error);
      // Display error message to user (e.g., modal, toast notification)
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
      const uniqueId = await generateUniqueID();
      await addDoc(foodCollectionRef, { ...newFoodData, foodId: uniqueId }); // Add food item
      console.log("Food item added successfully!");
      toast.success("Food item added successfully!"); // Display toast notification
      if (formRef.current) {
        setNewFoodData({
          ...newFoodData,
          foodId: "",
          imageUrl: "",
          imagePreview: null,
        });
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error("Error adding food item!"); // Display toast notification
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(foodCollectionRef, (querySnapshot) => {
      const foodDocs = querySnapshot.docs;
      setFoodItems(foodDocs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  }, []);

  const handleEdit = async (id) => {
    const foodDoc = doc(firestore, "foodItems", id);
    const foodSnapshot = await getDoc(foodDoc);

    if (foodSnapshot.exists) {
      const foodData = foodSnapshot.data();
      setNewFoodData({
        ...foodData,
        imagePreview: foodData.imageUrl
          ? URL.createObjectURL(new Blob())
          : null,
      }); // Set preview if image exists
      toast.error("Error adding food item!");
    } else {
      console.error("Food item not found:", id);
      toast.error("Error adding food item!");
    }
  };
  

  const handleDelete = async (id) => {
    const foodDoc = doc(firestore, "foodItems", id);  
    await deleteDoc(foodDoc);
    toast("Item delated");
  };

  return (
    <div className="add-food-item">
      <ToastContainer />
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
              setNewFoodData({ ...newFoodData, foodDetails: e.target.value })
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
              setNewFoodData({ ...newFoodData, foodPrice: e.target.value })
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
              setNewFoodData({ ...newFoodData, foodServe: e.target.value })
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
              setNewFoodData({ ...newFoodData, foodCategory: e.target.value })
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
