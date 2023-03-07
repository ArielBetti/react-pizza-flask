import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="bg-amber-50 min-h-screen min-w-screen">
      <App />
    </div>
  </React.StrictMode>
);
