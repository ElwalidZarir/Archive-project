import { useState } from "react";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FunctionsBar from "./components/FunctionsBar";
import Modal from "./components/Modal.js";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./components/Main";
import SearchUsers from "./components/SearchUsers";

function App() {
  const [isOpen, setIsopen] = useState(false);
  const [isLogged, SetIsLogged] = useState(false);
  const [userType, setUserType] = useState();

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  const onOpen = () => {
    setIsopen(true);
  };
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="register" element={<Register />} />
            <Route
              path=""
              element={
                isLoggedIn ? (
                  <Main
                    userType={userType}
                    setUserType={setUserType}
                    onOpen={onOpen}
                    isOpen={isOpen}
                  />
                ) : (
                  <Login
                    userType={userType}
                    setUserType={setUserType}
                    SetIsLogged={SetIsLogged}
                  />
                )
              }
            />
            <Route
              path="profile"
              element={isLoggedIn ? <FunctionsBar /> : null}
            />
            <Route
              path="users"
              element={
                isLoggedIn ? (
                  <>
                    <FunctionsBar />
                    <br></br>
                    <br></br>
                    <SearchUsers />
                  </>
                ) : null
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
