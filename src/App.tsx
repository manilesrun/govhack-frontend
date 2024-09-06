import React from "react";
import Home from "./pages/home.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/about.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
