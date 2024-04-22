import React, { useEffect, useState } from "react";
import "../admincompo/menumanag.css";
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const MenuManag = () => {
  const [foodId, setFoodId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodDetails, setFoodDetails] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodServes, setFoodServes] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "foodItems"), (snapshot) => {
      const updatedFoodItems = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setFoodItems(updatedFoodItems);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "foodItems"), {
        foodId: foodId,
        foodName: foodName,
        foodDetails: foodDetails,
        foodPrice: foodPrice,
        foodServes: foodServes,
      });
      clearFormFields();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEdit = async (id) => {
    const foodItemRef = doc(db, "foodItems", id);

    try {
      await updateDoc(foodItemRef, {
        foodName: foodName,
        foodDetails: foodDetails,
        foodPrice: foodPrice,
        foodServes: foodServes,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleDelete = async (id) => {
    const foodItemRef = doc(db, "foodItems", id);

    try {
      await deleteDoc(foodItemRef);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const clearFormFields = () => {
    setFoodId("");
    setFoodName("");
    setFoodDetails("");
    setFoodPrice("");
    setFoodServes("");
  };

  return (
    <div>
      <h2>Menu Manager</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="foodId">Food ID:</label>
        <input
          type="text"
          id="foodId"
          value={foodId}
          onChange={(e) => setFoodId(e.target.value)}
        />
        <label htmlFor="foodName">Food Name:</label>
        <input
          type="text"
          id="foodName"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <label htmlFor="foodDetails">Food Details:</label>
        <input
          type="text"
          id="foodDetails"
          value={foodDetails}
          onChange={(e) => setFoodDetails(e.target.value)}
        />
        <label htmlFor="foodPrice">Food Price:</label>
        <input
          type="text"
          id="foodPrice"
          value={foodPrice}
          onChange={(e) => setFoodPrice(e.target.value)}
        />
        <label htmlFor="foodServes">Food Serves:</label>
        <input
          type="text"
          id="foodServes"
          value={foodServes}
          onChange={(e) => setFoodServes(e.target.value)}
        />
        <button type="submit">Add Food Item</button>
      </form>

      <div>
        <h2>Food Items</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Food ID</th>
              <th>Food Name</th>
              <th>Food Details</th>
              <th>Food Price</th>
              <th>Food Serves</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((foodItem) => (
              <tr key={foodItem.id}>
                <td>{foodItem.foodId}</td>
                <td>{foodItem.foodName}</td>
                <td>{foodItem.foodDetails}</td>
                <td>{foodItem.foodPrice}</td>
                <td>{foodItem.foodServes}</td>
                <td>
                  <button onClick={() => handleEdit(foodItem.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(foodItem.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuManag;
