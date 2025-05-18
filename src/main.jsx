import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import { AuthProvider } from "./auth/context/AuthProvider";
import { RfidApp } from "./RfidApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <RfidApp />
    </BrowserRouter>
  </StrictMode>
);