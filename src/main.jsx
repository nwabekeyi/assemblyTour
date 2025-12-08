import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlaHazratLanding from "./pages/AlaHazratLanding.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AlaHazratLanding />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
