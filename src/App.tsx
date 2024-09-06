import React from "react";
import Home from "./pages/home-page.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/about-page.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-page" element={<Home />} />
        <Route path="/about-page" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
