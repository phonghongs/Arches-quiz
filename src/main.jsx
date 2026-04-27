import React from "react";
import { createRoot } from "react-dom/client";
import CoffeeQuiz from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CoffeeQuiz />
  </React.StrictMode>
);
