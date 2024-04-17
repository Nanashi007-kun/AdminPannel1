import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "../src/admincompo/AdminPanel";
// import Dashboard from "./admincompo/dashboard";
// import Menu from "./admincompo/menumanag";
// import Orders from "./admincompo/orders";
// import Users from "./admincompo/users";
// import Settings from "./admincompo/settings";
import Preloader from "./components/preloader";
import { Home } from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ProtectedRoute } from "./components/protectedRoute";
import { onMessage } from "firebase/messaging"
import "./App.css";
import { useEffect, useState } from "react";
import { generateToken , messaging} from "./firebase";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home></Home>}></Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }


function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  //for nortification 
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) =>{
      console.log(payload);
      alert("New Order!");
    })
  }, []);
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
    return    <Preloader/>
  ;
  }

  return (
    <>
    {/* <Preloader/> */}
    <BrowserRouter>
      <Routes>
        
        <Route index path="/" element={<Home user={user}></Home>}></Route>
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
    </>
  );
}

export default App;
