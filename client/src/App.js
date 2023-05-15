import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FunctionsBar from "./components/FunctionsBar";
import Modal from "./components/Modal.js";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./components/Main";

function App() {
  const [isOpen, setIsopen] = useState(false);
  const [isLogged, SetIsLogged] = useState(false);
  const onOpen = () => {
    setIsopen(true);
  };
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login SetIsLogged={SetIsLogged} />} />
            <Route element={<PrivateRoute isLogged={isLogged} />}>
              <Route
                path="functions"
                element={<Main onOpen={onOpen} isOpen={isOpen} />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
