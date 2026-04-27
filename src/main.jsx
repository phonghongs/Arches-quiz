import React from "react";
import { createRoot } from "react-dom/client";
import FutureQuest from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FutureQuest />
  </React.StrictMode>
);
