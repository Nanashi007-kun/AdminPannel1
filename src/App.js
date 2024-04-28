import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import AdminPanel from "../src/admincompo/AdminPanel";
import { Login } from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ProtectedRoute } from "./components/protectedRoute";
import "./App.css";
import { useEffect, useState } from "react";



function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
const currentUser = false;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);

        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>
  ;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route
          path="/adminpanel/*"
          element={
            <ProtectedRoute user={user}>
                <AdminPanel></AdminPanel>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
