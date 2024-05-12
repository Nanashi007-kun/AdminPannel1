import React, { useState } from 'react';
// import { db } from '../firebase';
// import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
const AddFoodItem = () => {


  const handleAddFoodItem = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way

  };

  return (
    <div>
      <h2>Add Food Item</h2>
    </div>
  );
};

export default AddFoodItem;
