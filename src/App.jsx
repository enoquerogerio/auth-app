import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MyRoutes from "./routes/MyRoutes";
import Header from "./components/Header";
import Dropdown from "./components/Dropdown";
function App() {
  return (
    <>
      <Router>
        <main className='container'>
          <Dropdown /> 
          <MyRoutes />
          <ToastContainer autoClose={3000} className="toast-container"/>
        </main>
      </Router>
    </>
  );
}

export default App;
