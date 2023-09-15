import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <main className='container'>
          <Header />
          <MyRoutes />
        </main>
      </Router>
    </>
  );
}

export default App;
