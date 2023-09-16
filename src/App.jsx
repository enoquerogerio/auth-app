import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
        </main>
      </Router>
    </>
  );
}

export default App;
