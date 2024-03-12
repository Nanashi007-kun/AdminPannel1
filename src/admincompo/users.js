// UserManage.js

import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have a firebase.js file for initializing Firebase
import "../admincompo/users.css";

const UserManage = () => {
  // State for managing the list of users
  const [users, setUsers] = useState([]);

  // State for managing the input fields in the popup
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [editUserIndex, setEditUserIndex] = useState(null); // Index of the user being edited

  useEffect(() => {
    // Function to fetch users from Firestore
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => doc.data());
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const addUser = async () => {
    // Check if any field is empty
    if (!userName || !userEmail || !userRole) {
      alert("Please fill in all fields");
      return; // Exit the function early
    }

    // If an edit is in progress, update the existing user
    if (editUserIndex !== null) {
      await updateDoc(doc(db, "users", users[editUserIndex].id), {
        userName,
        userEmail,
        userRole
      });
      const updatedUsers = [...users];
      updatedUsers[editUserIndex] = { id: users[editUserIndex].id, userName, userEmail, userRole };
      setUsers(updatedUsers);
      setEditUserIndex(null);
    } else {
      // Add the new user to Firestore
      const newUserRef = await addDoc(collection(db, "users"), {
        userName,
        userEmail,
        userRole
      });
      setUsers([
        { id: newUserRef.id, userName, userEmail, userRole },
        ...users // Place the new user at the top
      ]);
    }

    // Reset the input fields
    setUserName("");
    setUserEmail("");
    setUserRole("");
    // Close the popup window
    setOpenPopup(false);
  };

  const handleEdit = (index) => {
    const user = users[index];
    setUserName(user.userName);
    setUserEmail(user.userEmail);
    setUserRole(user.userRole);
    setEditUserIndex(index);
    setOpenPopup(true);
  };

  return (
    <div className="user-manage-container">
      <h2>User Management</h2>

      <button onClick={() => setOpenPopup(true)}>Add User</button>
      {openPopup && (
        <div className="popup">
          <h3>{editUserIndex !== null ? "Edit" : "Add"} User</h3>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
          />
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="User Email"
          />
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          <button onClick={addUser}>
            {editUserIndex !== null ? "Save" : "Add"}
          </button>
          <button onClick={() => setOpenPopup(false)}>Cancel</button>
        </div>
      )}
      <div className="user-list">
        {users.map((user, index) => (
          <div key={index} className="user">
            <p>User Name: {user.userName}</p>
            <p>User Email: {user.userEmail}</p>
            <p>User Role: {user.userRole}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManage;
