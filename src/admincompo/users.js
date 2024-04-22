import React, { useState } from 'react';
// import { db } from '../firebase';
// import { collection, addDoc } from 'firebase/firestore';

const AddFoodItem = () => {
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');

  const handleAddFoodItem = async (e) => {
    e.preventDefault(); // Prevent the form from submitting in the traditional way

  //   try {
  //     await addDoc(collection(db, 'foodItems'), {
  //       name,
  //       description,
  //       price: parseFloat(price), // Ensure price is stored as a number
  //     });
  //     alert('Food item added successfully!');
  //     // Clear the input fields after successful submission
  //     setName('');
  //     setDescription('');
  //     setPrice('');
  //   } catch (error) {
  //     console.error('Error adding document: ', error);
  //     alert('Error adding food item.');
  //   }
  };

  return (
    <div>
      <h2>Add Food Item</h2>
      {/* Removed the form onSubmit and replaced it with a button onClick */}
      {/* <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button onClick={handleAddFoodItem}>Add Food Item</button>
      </div> */}
    </div>
  );
};

export default AddFoodItem;
