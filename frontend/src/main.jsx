import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./styles/index.css";
import "./styles/base.css";
import "./styles/auth.css";
import "./styles/signup.css";
import "./styles/illustration.css";
import "./styles/app-pages.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter><AppProvider><App /></AppProvider></BrowserRouter>
  </React.StrictMode>
);