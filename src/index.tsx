import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EmployeeProvider } from "./store/EmployeeContext";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </React.StrictMode>
);
