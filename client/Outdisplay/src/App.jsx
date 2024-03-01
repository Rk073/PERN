import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./routes/Home";
import AllCustomers from "./routes/AllCustomers";
import {AllcustProvider  } from "./context/AllCust";
function App() {
  return (
      <AllcustProvider >
        <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllCustomers" element={<AllCustomers />} />
        </Routes>
      </Router>
    </div>

      </AllcustProvider >
      


  );
}

export default App;
