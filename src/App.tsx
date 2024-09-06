import React from "react";
import Home from "./pages/home.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-page" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
