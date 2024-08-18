import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MyRoutes from "./routes/MyRoutes";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Router>
        <main className='container'>
          <Header /> 
          <MyRoutes />
          <ToastContainer autoClose={3000} className="toast-container"/>
        </main>
      </Router>
    </>
  );
}

export default App;
